"""Executable, fixture-backed Milestone 1 FinAgent reference."""

from __future__ import annotations

import argparse
import json
import re
import time
from dataclasses import dataclass
from functools import partial
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


APP_VERSION = "1.0.0"
FIXTURE_PATH = Path(__file__).with_name("fixtures.json")
LEARNER_EVALUATION_PATH = (
    Path(__file__).resolve().parents[2]
    / "curriculum"
    / "main-track"
    / "06-capstone-projects"
    / "week-03-integration-build"
    / "fixtures"
    / "evaluation_cases.json"
)
MAX_BODY_BYTES = 64 * 1024
MAX_PROVIDER_ATTEMPTS = 2
TOKEN_PATTERN = re.compile(r"[a-z0-9]+")
TICKER_PATTERN = re.compile(r"[A-Z]{1,5}")
STOP_WORDS = {
    "a",
    "about",
    "and",
    "are",
    "be",
    "does",
    "for",
    "is",
    "me",
    "of",
    "say",
    "summarize",
    "the",
    "this",
    "to",
    "what",
}
ADVICE_PHRASES = ("should i buy", "should i sell", "tell me whether i should")


@dataclass(frozen=True)
class EvidenceChunk:
    chunk_id: str
    ticker: str
    text: str
    citation: str


@dataclass(frozen=True)
class FinAgentRequest:
    ticker: str
    question: str
    tool: str | None = None
    approved: bool = False


@dataclass(frozen=True)
class EvaluationCase:
    case_id: str
    request: dict[str, object]
    expected_status: str
    requires_citations: bool
    expected_abstained: bool


@dataclass(frozen=True)
class Quote:
    price: float
    currency: str
    as_of: str


@dataclass(frozen=True)
class FinAgentResponse:
    status: str
    answer: str
    citations: tuple[str, ...]
    abstained: bool
    tool_result: dict[str, object] | None
    trace: tuple[dict[str, object], ...]
    metrics: dict[str, object]

    def to_dict(self) -> dict[str, object]:
        return {
            "status": self.status,
            "answer": self.answer,
            "citations": list(self.citations),
            "abstained": self.abstained,
            "tool_result": self.tool_result,
            "trace": list(self.trace),
            "metrics": self.metrics,
        }


class TransientProviderError(RuntimeError):
    """A retryable fixture-provider failure."""


class FixtureProvider:
    """Deterministic stand-in for the probabilistic model boundary."""

    def __init__(self, failures_before_success: int = 0) -> None:
        self.failures_before_success = failures_before_success
        self.calls = 0

    def generate(
        self,
        request: FinAgentRequest,
        evidence: list[EvidenceChunk],
    ) -> dict[str, object]:
        self.calls += 1
        if self.calls <= self.failures_before_success:
            raise TransientProviderError("simulated transient provider failure")
        return {
            "answer": f"{request.ticker}: " + " ".join(chunk.text for chunk in evidence),
            "citations": [chunk.citation for chunk in evidence],
        }


@dataclass(frozen=True)
class ReferenceApplication:
    evidence: tuple[EvidenceChunk, ...]
    quotes: dict[str, Quote]
    evaluation_cases: tuple[EvaluationCase, ...]

    def run(
        self,
        payload: object,
        *,
        provider: FixtureProvider | None = None,
    ) -> FinAgentResponse:
        started = time.perf_counter()
        request = validate_request(payload)
        trace: list[dict[str, object]] = [
            {"step": "validate", "status": "ok", "ticker": request.ticker}
        ]

        def finish(
            status: str,
            answer: str,
            *,
            citations: tuple[str, ...] = (),
            abstained: bool = False,
            tool_result: dict[str, object] | None = None,
        ) -> FinAgentResponse:
            input_tokens = estimate_tokens(request.question)
            output_tokens = estimate_tokens(answer)
            return FinAgentResponse(
                status=status,
                answer=answer,
                citations=citations,
                abstained=abstained,
                tool_result=tool_result,
                trace=tuple(trace),
                metrics={
                    "provider_mode": "fixture",
                    "live_provider_verified": False,
                    "latency_ms": round((time.perf_counter() - started) * 1000, 3),
                    "input_tokens_estimated": input_tokens,
                    "output_tokens_estimated": output_tokens,
                    "estimated_live_cost_usd": round(
                        (input_tokens + output_tokens) / 1000 * 0.002,
                        6,
                    ),
                    "actual_fixture_cost_usd": 0.0,
                },
            )

        lowered_question = request.question.lower()
        if any(phrase in lowered_question for phrase in ADVICE_PHRASES):
            trace.append({"step": "safety_gate", "status": "refused"})
            return finish(
                "refused",
                "I can explain cited information, but I cannot provide investment advice.",
            )

        tool_result: dict[str, object] | None = None
        if request.tool is not None:
            if request.tool != "quote_lookup":
                trace.append(
                    {"step": "tool_gate", "status": "denied", "tool": request.tool}
                )
                return finish("tool_denied", "The requested tool is not allowed.")
            if not request.approved:
                trace.append(
                    {
                        "step": "tool_gate",
                        "status": "approval_required",
                        "tool": request.tool,
                    }
                )
                return finish(
                    "approval_required",
                    "Human approval is required before this tool can run.",
                )
            quote = self.quotes.get(request.ticker)
            if quote is None:
                trace.append(
                    {"step": "tool_gate", "status": "denied", "reason": "no_quote"}
                )
                return finish("tool_denied", "No approved quote is available.")
            tool_result = {
                "tool": "quote_lookup",
                "ticker": request.ticker,
                "price": quote.price,
                "currency": quote.currency,
                "as_of": quote.as_of,
            }
            trace.append(
                {"step": "tool_gate", "status": "executed", "tool": request.tool}
            )

        evidence = retrieve(request, self.evidence)
        trace.append(
            {
                "step": "retrieve",
                "status": "ok" if evidence else "empty",
                "evidence_ids": [chunk.chunk_id for chunk in evidence],
            }
        )
        if not evidence:
            return finish(
                "abstained",
                "I do not have approved evidence for that question.",
                abstained=True,
                tool_result=tool_result,
            )

        active_provider = provider or FixtureProvider()
        for attempt in range(1, MAX_PROVIDER_ATTEMPTS + 1):
            try:
                output = active_provider.generate(request, evidence)
                answer, citations = validate_provider_output(output, evidence)
                trace.append(
                    {"step": "model", "status": "ok", "attempt": attempt}
                )
                return finish(
                    "supported",
                    answer,
                    citations=citations,
                    tool_result=tool_result,
                )
            except TransientProviderError:
                trace.append(
                    {"step": "model", "status": "retry", "attempt": attempt}
                )
            except ValueError:
                trace.append(
                    {"step": "model", "status": "invalid_output", "attempt": attempt}
                )
                return finish(
                    "provider_error",
                    "The model boundary returned an invalid structured response.",
                    abstained=True,
                    tool_result=tool_result,
                )

        trace.append(
            {
                "step": "model",
                "status": "failed",
                "attempts": MAX_PROVIDER_ATTEMPTS,
            }
        )
        return finish(
            "provider_error",
            "The model boundary failed after the bounded retry limit.",
            abstained=True,
            tool_result=tool_result,
        )

    def evaluate(self) -> dict[str, object]:
        failures: list[dict[str, object]] = []
        for case in self.evaluation_cases:
            observed = self.run(case.request)
            categories: list[str] = []
            if observed.status != case.expected_status:
                categories.append("wrong_status")
            if case.requires_citations and not observed.citations:
                categories.append("missing_citation")
            if observed.abstained != case.expected_abstained:
                categories.append("wrong_abstention")
            if categories:
                failures.append(
                    {
                        "case_id": case.case_id,
                        "failure_categories": categories,
                    }
                )
        return {
            "total": len(self.evaluation_cases),
            "passed": len(self.evaluation_cases) - len(failures),
            "failed": len(failures),
            "failures": failures,
            "provider_mode": "fixture",
            "live_provider_verified": False,
        }


def _required_string(mapping: dict[str, object], key: str) -> str:
    value = mapping.get(key)
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{key} must be a non-empty string")
    return value.strip()


def load_application(
    path: Path = FIXTURE_PATH,
    evaluation_path: Path = LEARNER_EVALUATION_PATH,
) -> ReferenceApplication:
    raw = json.loads(path.read_text(encoding="utf-8"))
    raw_evaluation = json.loads(evaluation_path.read_text(encoding="utf-8"))
    if not isinstance(raw, dict):
        raise ValueError("fixture root must be an object")
    if not isinstance(raw_evaluation, dict):
        raise ValueError("evaluation fixture root must be an object")

    raw_evidence = raw.get("evidence")
    raw_quotes = raw.get("quotes")
    raw_cases = raw_evaluation.get("cases")
    if not isinstance(raw_evidence, list):
        raise ValueError("evidence must be a list")
    if not isinstance(raw_quotes, dict):
        raise ValueError("quotes must be an object")
    if not isinstance(raw_cases, list):
        raise ValueError("evaluation_cases must be a list")

    evidence: list[EvidenceChunk] = []
    for item in raw_evidence:
        if not isinstance(item, dict):
            raise ValueError("each evidence item must be an object")
        evidence.append(
            EvidenceChunk(
                chunk_id=_required_string(item, "chunk_id"),
                ticker=_required_string(item, "ticker").upper(),
                text=_required_string(item, "text"),
                citation=_required_string(item, "citation"),
            )
        )

    quotes: dict[str, Quote] = {}
    for ticker, quote in raw_quotes.items():
        if not isinstance(ticker, str) or not isinstance(quote, dict):
            raise ValueError("each quote must be a ticker/object pair")
        price = quote.get("price")
        if isinstance(price, bool) or not isinstance(price, (int, float)) or price <= 0:
            raise ValueError("quote price must be a positive number")
        quotes[ticker.upper()] = Quote(
            price=float(price),
            currency=_required_string(quote, "currency"),
            as_of=_required_string(quote, "as_of"),
        )

    cases: list[EvaluationCase] = []
    for item in raw_cases:
        if not isinstance(item, dict) or not isinstance(item.get("request"), dict):
            raise ValueError("each evaluation case must contain a request object")
        requires_citations = item.get("requires_citations")
        expected_abstained = item.get("expected_abstained")
        if not isinstance(requires_citations, bool) or not isinstance(
            expected_abstained, bool
        ):
            raise ValueError("evaluation expectations must be booleans")
        cases.append(
            EvaluationCase(
                case_id=_required_string(item, "case_id"),
                request=item["request"],
                expected_status=_required_string(item, "expected_status"),
                requires_citations=requires_citations,
                expected_abstained=expected_abstained,
            )
        )

    return ReferenceApplication(tuple(evidence), quotes, tuple(cases))


def validate_request(payload: object) -> FinAgentRequest:
    if not isinstance(payload, dict):
        raise ValueError("request body must be an object")
    ticker = _required_string(payload, "ticker").upper()
    question = _required_string(payload, "question")
    if not TICKER_PATTERN.fullmatch(ticker):
        raise ValueError("ticker must contain 1-5 ASCII letters")
    if len(question) > 2000:
        raise ValueError("question must be 2000 characters or fewer")
    tool = payload.get("tool")
    approved = payload.get("approved", False)
    if tool is not None and (not isinstance(tool, str) or not tool.strip()):
        raise ValueError("tool must be a non-empty string when provided")
    if not isinstance(approved, bool):
        raise ValueError("approved must be a boolean")
    return FinAgentRequest(ticker, question, tool.strip() if tool else None, approved)


def tokenize(text: str) -> set[str]:
    return {
        token
        for token in TOKEN_PATTERN.findall(text.lower())
        if len(token) > 1 and token not in STOP_WORDS
    }


def retrieve(
    request: FinAgentRequest,
    evidence: tuple[EvidenceChunk, ...],
    limit: int = 2,
) -> list[EvidenceChunk]:
    query_terms = tokenize(request.question)
    ranked = [
        (len(query_terms & tokenize(chunk.text)), chunk)
        for chunk in evidence
        if chunk.ticker == request.ticker
    ]
    ranked.sort(key=lambda item: (-item[0], item[1].chunk_id))
    return [chunk for score, chunk in ranked[:limit] if score > 0]


def validate_provider_output(
    output: object,
    evidence: list[EvidenceChunk],
) -> tuple[str, tuple[str, ...]]:
    if not isinstance(output, dict):
        raise ValueError("provider output must be an object")
    answer = _required_string(output, "answer")
    citations = output.get("citations")
    if not isinstance(citations, list) or not all(
        isinstance(citation, str) for citation in citations
    ):
        raise ValueError("provider citations must be a list of strings")
    approved = {chunk.citation for chunk in evidence}
    if not citations or not set(citations).issubset(approved):
        raise ValueError("provider citations must come from retrieved evidence")
    return answer, tuple(citations)


def estimate_tokens(text: str) -> int:
    return len(TOKEN_PATTERN.findall(text))


class ReferenceRequestHandler(BaseHTTPRequestHandler):
    def __init__(
        self,
        *args: object,
        application: ReferenceApplication,
        **kwargs: object,
    ) -> None:
        self.application = application
        super().__init__(*args, **kwargs)

    def _send(self, status_code: int, payload: dict[str, object]) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:  # noqa: N802 - BaseHTTPRequestHandler contract.
        if self.path != "/health":
            self._send(404, {"ok": False, "error": "not found"})
            return
        self._send(
            200,
            {
                "ok": True,
                "service": "milestone-1-finagent-reference",
                "version": APP_VERSION,
                "provider_mode": "fixture",
                "live_provider_verified": False,
            },
        )

    def do_POST(self) -> None:  # noqa: N802 - BaseHTTPRequestHandler contract.
        if self.path != "/brief":
            self._send(404, {"ok": False, "error": "not found"})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self._send(400, {"ok": False, "error": "invalid content length"})
            return
        if length <= 0 or length > MAX_BODY_BYTES:
            self._send(413, {"ok": False, "error": "invalid request size"})
            return
        try:
            payload = json.loads(self.rfile.read(length))
        except (json.JSONDecodeError, UnicodeDecodeError):
            self._send(400, {"ok": False, "error": "request must be UTF-8 JSON"})
            return
        try:
            response = self.application.run(payload)
        except ValueError as error:
            self._send(422, {"ok": False, "error": str(error)})
            return
        self._send(200, {"ok": True, **response.to_dict()})

    def log_message(self, format: str, *args: object) -> None:
        return


def build_server(
    application: ReferenceApplication,
    host: str = "127.0.0.1",
    port: int = 0,
) -> ThreadingHTTPServer:
    handler = partial(ReferenceRequestHandler, application=application)
    return ThreadingHTTPServer((host, port), handler)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--serve", action="store_true", help="Serve GET /health and POST /brief.")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()

    application = load_application()
    if not args.serve:
        report = application.evaluate()
        print(json.dumps(report, indent=2))
        return 0 if report["failed"] == 0 else 1

    server = build_server(application, port=args.port)
    print(f"Serving fixture-backed FinAgent at http://127.0.0.1:{server.server_port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
