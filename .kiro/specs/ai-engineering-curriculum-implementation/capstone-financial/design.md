# Design Document: FinAgent — AI-Powered Financial Intelligence Platform

## Overview

FinAgent is the capstone project for the AI Engineering Curriculum, demonstrating full-stack mastery across all 7 modules (0-6). It is a production-grade financial intelligence platform that ingests real-time market data, performs sentiment analysis on news/social media, predicts price movements using transformer models, manages portfolios via Modern Portfolio Theory, and exposes everything through a FastAPI service with full observability.

### System Purpose

FinAgent demonstrates:

- **Module 0**: Python OOP, error handling, context managers, generators for financial data models
- **Module 1**: Execute and modify complete LangGraph multi-agent system
- **Module 2**: Build BPE tokenization, vector embeddings, attention mechanisms, mini-Transformer from scratch
- **Module 3**: MCP server with Resources/Tools/Prompts, OAuth 2.1, RBAC security
- **Module 4**: RAG (Self-RAG, CRAG, RAPTOR), agentic patterns (ReAct, Reflection, Planning, HITL), LangGraph orchestration, multi-agent collaboration
- **Module 5**: Golden datasets, regression testing, CI/CD, FastAPI, Docker, LangSmith/Arize Phoenix observability, NeMo guardrails, fine-tuning
- **Module 6**: Full integration, documentation, security audit, portfolio-ready deployment

### Key Design Principles

1. **Pedagogy-First**: Every component maps to a specific curriculum module with explicit learning outcomes
2. **Financial Domain Value**: Not a toy project — uses real market data, proven algorithms, and produces actionable insights
3. **Production-Grade**: Docker, CI/CD, observability, security audit — not a prototype
4. **Verification Mindset**: 80% of Module 5 effort on testbenches, golden datasets, and regression suites
5. **Portfolio-Ready**: Clean code, architecture diagrams, API docs, deployment guide — ready for employer review

### Technology Stack

| Layer | Technology | Curriculum Module |
|-------|------------|-----------------|
| Language | Python 3.11+ | Module 0 |
| Agent Framework | LangGraph (Multi-agent orchestration) | Module 1, 4 |
| LLM Internals | Manual BPE, attention, transformer (NumPy only for core) | Module 2 |
| MCP Server | FastMCP (Python) | Module 3 |
| RAG | Chroma/Weaviate + sentence-transformers | Module 4 |
| API | FastAPI (async endpoints, SSE streaming) | Module 5 |
| Containerization | Docker + docker-compose | Module 5 |
| Observability | LangSmith + Arize Phoenix + OpenTelemetry | Module 5 |
| Fine-tuning | Unsloth + DPO + GGUF export | Module 5 |
| Testing | pytest + golden datasets + GitHub Actions CI/CD | Module 5 |
| Data Sources | Polygon.io, Alpha Vantage, NewsAPI, Reddit API, Finnhub | Module 1-4 |
| Frontend (Optional) | React + TradingView Lightweight Charts | — |

---

## Architecture

### High-Level System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser / CLI]
        APIClient[FastAPI Clients]
    end

    subgraph "API Layer"
        FastAPI[FastAPI Service<br/>Async + SSE]
        LangGraph[LangGraph<br/>Multi-Agent Orchestrator]
    end

    subgraph "Agent Layer"
        DataAgent[DataCollector<br/>Agent]
        SentAgent[SentimentAnalyzer<br/>Agent]
        TechAgent[TechnicalAnalyzer<br/>Agent]
        PredAgent[Predictor<br/>Agent]
        PortAgent[PortfolioManager<br/>Agent]
        Supervisor[TradingSupervisor<br/>Agent]
    end

    subgraph "MCP Layer"
        MCPServer[FinancialData MCP<br/>FastMCP Server]
        Resources[MCP Resources<br/>Quotes, Filings, News]
        Tools[MCP Tools<br/>fetch_quote, indicators, sentiment]
        Prompts[MCP Prompts<br/>Analysis Templates]
    end

    subgraph "RAG Layer"
        VectorDB[(Vector Database<br/>Chroma/Weaviate)]
        DocProcessor[Document Processor<br/>Chunking + Embedding]
        SelfRAG[Self-RAG<br/>Critic Scoring]
        CRAG[CRAG<br/>Corrective Retrieval]
        RAPTOR[RAPTOR<br/>Hierarchical Summaries]
    end

    subgraph "Model Layer"
        BPE[BPE Tokenizer<br/>From Scratch]
        Transformer[Mini-Transformer<br/>From Scratch]
        FinBERT[FinBERT<br/>Sentiment Scoring]
        FineTuned[Fine-Tuned Model<br/>Unsloth + GGUF]
    end

    subgraph "Data Layer"
        MarketAPI[Market Data APIs<br/>Polygon, Alpha Vantage]
        NewsAPI[News APIs<br/>NewsAPI, Finnhub]
        SocialAPI[Social APIs<br/>Reddit, Twitter]
        SEC[SEC EDGAR<br/>Filings]
        GoldenDB[(Golden Dataset<br/>1000+ Verified Pairs)]
        Postgres[(PostgreSQL<br/>User + Portfolio Data)]
        Redis[(Redis<br/>Cache + Sessions)]
    end

    subgraph "Observability Layer"
        LangSmith[LangSmith<br/>Agent Tracing]
        Arize[Arize Phoenix<br/>Model Monitoring]
        OTEL[OpenTelemetry<br/>Distributed Tracing]
    end

    subgraph "Production Layer"
        Docker[docker-compose<br/>Multi-Service]
        GitHubActions[GitHub Actions<br/>CI/CD]
        NeMo[NeMo Guardrails<br/>Safety Filters]
    end

    Browser --> FastAPI
    APIClient --> FastAPI
    FastAPI --> LangGraph
    LangGraph --> Supervisor
    Supervisor --> DataAgent
    Supervisor --> SentAgent
    Supervisor --> TechAgent
    Supervisor --> PredAgent
    Supervisor --> PortAgent

    DataAgent --> MCPServer
    SentAgent --> RAG Layer
    SentAgent --> FinBERT
    TechAgent --> MCPServer
    PredAgent --> Transformer
    PredAgent --> BPE
    PortAgent --> Postgres

    MCPServer --> MarketAPI
    MCPServer --> SEC
    MCPServer --> NewsAPI

    RAG Layer --> VectorDB
    DocProcessor --> NewsAPI
    DocProcessor --> SocialAPI
    SelfRAG --> VectorDB
    CRAG --> NewsAPI
    RAPTOR --> DocProcessor

    LangGraph --> LangSmith
    FastAPI --> OTEL
    LangSmith --> Arize

    GitHubActions --> Docker
    FastAPI --> NeMo
    GoldenDB --> GitHubActions
```

### Architecture Layers

#### 1. Client Layer
- **Web Browser / CLI**: Primary interface for interacting with FinAgent
- **FastAPI Clients**: Programmatic access to prediction, sentiment, and portfolio endpoints
- **Optional React Frontend**: Real-time dashboard with TradingView charts (not required for capstone, but included as extension)

#### 2. API Layer
**FastAPI Service**
- Async endpoints for low-latency market data
- SSE (Server-Sent Events) for real-time streaming updates
- OpenAPI/Swagger documentation auto-generated
- Rate limiting (100 req/min per API key)

**LangGraph Orchestrator**
- State machine: `AnalyzeState → PredictState → DecideState → ExecuteState`
- Conditional routing based on market state (bull/bear/neutral)
- Checkpointing for long-running analyses with state persistence
- Integration with LangSmith for full execution tracing

#### 3. Agent Layer

**DataCollectorAgent**
- Fetches real-time quotes via MCP server
- Retrieves historical prices for backtesting
- Handles API rate limits with exponential backoff

**SentimentAnalyzerAgent**
- Queries RAG system for news/social sentiment
- Runs FinBERT sentiment scoring
- Applies confidence thresholds (neutral if < 0.6)

**TechnicalAnalyzerAgent**
- Calculates indicators: MACD, RSI, Bollinger Bands, Fibonacci
- Detects chart patterns: head-and-shoulders, double-top
- Outputs technical score 0-10

**PredictorAgent**
- Runs mini-Transformer on price + sentiment + technical features
- Outputs predicted direction (up/down/neutral) with confidence
- Logs prediction to golden dataset for regression testing

**PortfolioManagerAgent**
- Implements Modern Portfolio Theory (MPT) optimization
- Calculates Sharpe ratio, max drawdown, VaR
- Generates rebalancing recommendations

**TradingSupervisorAgent**
- Coordinates all specialist agents (Supervisor pattern)
- Routes tasks based on agent expertise
- Implements Human-in-the-Loop pause before high-stakes actions

#### 4. MCP Layer

**FinancialData-MCP Server (FastMCP)**

Resources:
- `market://quote/{symbol}` — JSON quote data
- `market://filings/{symbol}` — SEC EDGAR 10-K/10-Q
- `market://news/{symbol}` — Recent news articles

Tools:
- `fetch_quote(symbol: str) -> dict`
- `calculate_indicators(symbol: str, indicators: list) -> dict`
- `run_sentiment_analysis(text: str) -> dict`
- `get_historical_prices(symbol: str, days: int) -> list`
- `search_filings(symbol: str, form_type: str) -> list`

Prompts:
- `analyze_stock` — "Perform comprehensive analysis of {symbol} including sentiment, technicals, and prediction"
- `generate_portfolio_report` — "Generate performance report for portfolio with risk assessment"

Security:
- OAuth 2.1 with JWT tokens (role-based: read-only, trader, admin)
- Input schema validation (Pydantic)
- Telemetry logging on every tool invocation
- Threat model compliance (STRIDE analysis)

#### 5. RAG Layer

**Document Processor**
- Chunking: 512 tokens with 50-token overlap for financial documents
- Embeddings: `all-MiniLM-L6-v2` via sentence-transformers
- Storage: Chroma vector database with metadata filtering

**Self-RAG**
- Generator retrieves documents → Critic scores relevance 0-10
- If score < 7, regenerate with refined query
- Max 3 refinement iterations

**CRAG (Corrective RAG)**
- If retrieval confidence < 0.7, fallback to web search
- Merge retrieved + web results with weighted scoring
- Output: synthesized answer with source attribution

**RAPTOR (Recursive Abstractive Processing)**
- Build hierarchical summaries of earnings reports
- Tree structure: chunk → section summary → full report summary
- Query traverses tree top-down for context

#### 6. Model Layer

**BPE Tokenizer (From Scratch)**
- `BPETokenizer` class with `encode()` and `decode()` methods
- Trained on financial corpus (earnings reports, news)
- Round-trip test: `decode(encode(text)) == text`
- Visual simulation of token merging on financial text

**Mini-Transformer (From Scratch)**
- Encoder-only architecture for financial text classification
- Manual scaled dot-product attention (for-loops → matrix mul)
- Manual backpropagation (no PyTorch autograd)
- Input: combined sentiment + technical + price features
- Output: direction prediction (up/down/neutral) with probability distribution

**FinBERT**
- Pre-trained FinBERT for financial sentiment scoring
- Output: positive/negative/neutral with confidence scores
- Used by SentimentAnalyzerAgent

**Fine-Tuned Model**
- Unsloth for fine-tuning on custom financial sentiment dataset (5000+ samples)
- DPO (Direct Preference Optimization) for alignment
- Export to GGUF format for local inference with llama.cpp

#### 7. Data Layer

**Market Data APIs**
- Polygon.io: real-time stocks, options, crypto (paid tier: $29/month)
- Alpha Vantage: free tier (500 calls/day) for MVP
- IEX Cloud: real-time US equities
- Finnhub: global stocks + news

**News & Social APIs**
- NewsAPI: 70,000+ news sources
- Reddit API: r/wallstreetbets, r/stocks (PRAW)
- Twitter API v2: financial sentiment from tweets
- Finnhub News API: financial-specific news

**SEC EDGAR**
- 10-K, 10-Q, 8-K filings via SEC API
- Ingested into RAG system for fundamental analysis

**Golden Dataset**
- 1000+ human-verified input-output pairs
- Schema: `{symbol, date, news_text, technical_features, actual_movement, prediction, accuracy}`
- Used for CI/CD regression testing (fail if accuracy < 85%)

**PostgreSQL**
- User profiles, portfolio holdings, trade history
- Connection pooling, prepared statements

**Redis**
- Cache for market data (TTL: 60s for quotes, 300s for historical)
- Session storage for API authentication
- Pub/sub for real-time price update notifications

#### 8. Observability Layer

**LangSmith**
- Trace all LangGraph agent executions
- Log tool invocations, token consumption, reasoning traces
- View execution flow as DAG with timing breakdowns
- Set up alerts for > 5s agent execution time

**Arize Phoenix**
- Monitor model performance: sentiment accuracy, prediction MAE/MSE
- Drift detection: alert if sentiment distribution shifts
- Embedding visualization: cluster financial documents

**OpenTelemetry**
- Distributed tracing across FastAPI → LangGraph → MCP → Data APIs
- Export traces to LangSmith or Jaeger
- Custom metrics: API latency, prediction confidence, agent step count

#### 9. Production Layer

**docker-compose**
- Services: `api`, `mcp-server`, `agent-system`, `redis`, `postgres`, `vector-db`
- Volume mounts for model weights, golden dataset
- Network isolation: internal bridge for service-to-service communication
- Resource limits: api (1 CPU, 512MB), mcp-server (0.5 CPU, 256MB)

**GitHub Actions CI/CD**
- On push: run unit tests → golden dataset regression → build Docker images → push to Docker Hub
- On PR: code quality checks (Black, Ruff) → integration tests → security scan
- On merge to main: deploy to staging → run E2E tests → deploy to prod

**NeMo Guardrails**
- Block unsafe financial advice ("Buy this stock now!") without disclaimers
- Content filtering for inappropriate queries
- Rate limiting per API key
- Output validation: ensure predictions include "Not financial advice" disclaimer

---

## Components and Interfaces

### Core Python Components (Module 0)

```python
# Financial instruments
class FinancialInstrument:
    def __init__(self, symbol: str, name: str, asset_type: str):
        self.symbol = symbol
        self.name = name
        self.asset_type = asset_type  # stock, option, crypto, forex

    def __str__(self) -> str:
        return f"{self.symbol}: {self.name} ({self.asset_type})"

    def __eq__(self, other) -> bool:
        return isinstance(other, FinancialInstrument) and self.symbol == other.symbol

class Stock(FinancialInstrument):
    def __init__(self, symbol: str, name: str, sector: str, market_cap: float):
        super().__init__(symbol, name, "stock")
        self.sector = sector
        self.market_cap = market_cap

class Option(FinancialInstrument):
    def __init__(self, underlying: str, strike: float, expiry: date, option_type: str):
        super().__init__(f"{underlying}_{strike}_{expiry}", f"{option_type} Option", "option")
        self.underlying = underlying
        self.strike = strike
        self.expiry = expiry
        self.option_type = option_type  # call or put

# CLI tool
def fetch_market_data(symbols: list[str], api_key: str) -> dict:
    """Fetch market data with error handling and retries."""
    try:
        async with aiohttp.ClientSession() as session:
            tasks = [fetch_quote(session, sym, api_key) for sym in symbols]
            results = await asyncio.gather(*tasks, return_exceptions=True)
            return {sym: res for sym, res in zip(symbols, results) if not isinstance(res, Exception)}
    except Exception as e:
        logger.error(f"Failed to fetch data: {e}")
        raise DataFetchError(f"API error: {e}") from e
```

### LangGraph Multi-Agent System (Modules 1, 4)

```python
from langgraph.graph import StateGraph, END

class TradingState(TypedDict):
    symbol: str
    market_data: dict
    sentiment_score: float
    technical_score: float
    prediction: dict
    portfolio_action: str
    human_approval: bool

# Build graph
workflow = StateGraph(TradingState)
workflow.add_node("collect_data", DataCollectorAgent())
workflow.add_node("analyze_sentiment", SentimentAnalyzerAgent())
workflow.add_node("analyze_technical", TechnicalAnalyzerAgent())
workflow.add_node("predict", PredictorAgent())
workflow.add_node("decide", PortfolioManagerAgent())
workflow.add_node("human_review", human_in_the_loop_node)

workflow.set_entry_point("collect_data")
workflow.add_edge("collect_data", "analyze_sentiment")
workflow.add_edge("analyze_sentiment", "analyze_technical")
workflow.add_edge("analyze_technical", "predict")
workflow.add_conditional_edges("predict", should_escalate_to_human)
workflow.add_edge("human_review", "decide")
workflow.add_edge("decide", END)

app = workflow.compile(checkpointer=SqliteSaver.from_conn_string("checkpoints.db"))
```

### MCP Server (Module 3)

```python
from fastmcp import FastMCP
import yfinance as yf
from pydantic import BaseModel

mcp = FastMCP("FinancialData-MCP")

class QuoteRequest(BaseModel):
    symbol: str

class IndicatorRequest(BaseModel):
    symbol: str
    indicators: list[str]  # ["macd", "rsi", "bbands"]

@mcp.tool()
async def fetch_quote(symbol: str) -> dict:
    """Fetch real-time quote for given symbol."""
    ticker = yf.Ticker(symbol)
    return ticker.info

@mcp.tool()
async def calculate_indicators(symbol: str, indicators: list[str]) -> dict:
    """Calculate technical indicators for symbol."""
    # Implementation with TA-Lib or manual calculation
    pass

@mcp.tool()
async def run_sentiment_analysis(text: str) -> dict:
    """Run FinBERT sentiment analysis on text."""
    from transformers import pipeline
    classifier = pipeline("sentiment-analysis", model="yiyanghkust/finbert-tone")
    result = classifier(text)
    return {"sentiment": result[0]["label"], "confidence": result[0]["score"]}

@mcp.resource("market://quote/{symbol}")
async def get_quote_resource(symbol: str) -> str:
    """Market quote as MCP resource."""
    ticker = yf.Ticker(symbol)
    return json.dumps(ticker.info, indent=2)

@mcp.prompt()
async def analyze_stock(symbol: str) -> str:
    """Generate analysis prompt for stock."""
    return f"""Perform comprehensive analysis of {symbol}:
    1. Fetch latest quote and key metrics
    2. Analyze recent news sentiment
    3. Calculate technical indicators
    4. Predict next-day price movement
    5. Recommend action (buy/sell/hold) with rationale"""

if __name__ == "__main__":
    mcp.run()
```

### BPE Tokenizer (Module 2)

```python
class BPETokenizer:
    def __init__(self, vocab_size: int = 10000):
        self.vocab_size = vocab_size
        self.merges = {}  # (token1, token2) -> new_token
        self.vocab = {}   # token_id -> token_string

    def train(self, corpus: list[str]) -> None:
        """Train BPE on financial text corpus."""
        # Initialize with character-level vocab
        # Iterate: find most frequent pair, merge, update vocab
        # Stop when vocab_size reached
        pass

    def encode(self, text: str) -> list[int]:
        """Encode text to token IDs."""
        # Split into words, apply merges, convert to IDs
        pass

    def decode(self, token_ids: list[int]) -> str:
        """Decode token IDs back to text."""
        # Convert IDs to tokens, apply reverse merges
        pass

    def test_roundtrip(self, text: str) -> bool:
        """Verify parse(print(x)) == x."""
        return self.decode(self.encode(text)) == text
```

### FastAPI Service (Module 5)

```python
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
import asyncio

app = FastAPI(title="FinAgent API", version="1.0.0")

@app.post("/api/v1/predict")
async def predict(symbol: str) -> dict:
    """Predict next-day price movement for symbol."""
    # Trigger LangGraph workflow
    result = await app_graph.ainvoke({"symbol": symbol})
    return {
        "symbol": symbol,
        "prediction": result["prediction"],
        "confidence": result["prediction"]["confidence"],
        "disclaimer": "Past performance does not guarantee future results. Not financial advice."
    }

@app.post("/api/v1/sentiment")
async def sentiment(text: str) -> dict:
    """Analyze sentiment of given text."""
    result = await sentiment_analyzer.analyze(text)
    return result

@app.get("/api/v1/market/quote/{symbol}")
async def get_quote(symbol: str) -> dict:
    """Get real-time quote for symbol."""
    return await mcp_client.call_tool("fetch_quote", {"symbol": symbol})

@app.get("/api/v1/stream")
async def stream_updates(symbols: list[str]):
    """SSE stream for real-time market updates."""
    async def event_generator():
        while True:
            for sym in symbols:
                quote = await mcp_client.call_tool("fetch_quote", {"symbol": sym})
                yield f"data: {json.dumps(quote)}\n\n"
            await asyncio.sleep(1)
    return StreamingResponse(event_generator(), media_type="text/event-stream")
```

---

## Data Flow Patterns

### End-to-End Prediction Flow

```mermaid
sequenceDiagram
    participant Client
    participant FastAPI
    participant LangGraph
    participant DataAgent
    participant SentAgent
    participant PredAgent
    participant MCP
    participant RAG
    participant Model

    Client->>FastAPI: POST /api/v1/predict {symbol: "AAPL"}
    FastAPI->>LangGraph: ainvoke({symbol: "AAPL"})

    LangGraph->>DataAgent: collect_data
    DataAgent->>MCP: fetch_quote("AAPL")
    MCP-->>DataAgent: {price: 150.25, volume: 50000000}
    DataAgent-->>LangGraph: market_data

    LangGraph->>SentAgent: analyze_sentiment
    SentAgent->>RAG: query("AAPL recent news")
    RAG-->>SentAgent: [news1, news2, news3]
    SentAgent->>Model: FinBERT(news)
    Model-->>SentAgent: {sentiment: "positive", confidence: 0.87}
    SentAgent-->>LangGraph: sentiment_score

    LangGraph->>PredAgent: predict
    PredAgent->>PredAgent: encode_features(market_data, sentiment, technical)
    PredAgent->>Model: Transformer.predict(features)
    Model-->>PredAgent: {direction: "up", confidence: 0.78}
    PredAgent-->>LangGraph: prediction

    LangGraph-->>FastAPI: result
    FastAPI-->>Client: {prediction: {direction: "up", confidence: 0.78}, disclaimer: "..."}
```

### MCP Tool Invocation Flow

```mermaid
sequenceDiagram
    participant Agent
    participant MCP_Server
    participant Auth
    participant API
    participant Cache
    participant LangSmith

    Agent->>MCP_Server: call_tool("fetch_quote", {symbol: "AAPL"})
    MCP_Server->>Auth: validate_JWT(token)
    Auth-->>MCP_Server: authorized (role: trader)

    MCP_Server->>Cache: check("quote:AAPL")
    alt Cache hit
        Cache-->>MCP_Server: cached data
    else Cache miss
        MCP_Server->>API: GET polygon.io/v2/aggs/ticker/AAPL/prev
        API-->>MCP_Server: {close: 150.25, volume: 50000000}
        MCP_Server->>Cache: store("quote:AAPL", data, TTL=60s)
    end

    MCP_Server->>LangSmith: log_tool_invocation(tool="fetch_quote", latency_ms=45)
    MCP_Server-->>Agent: return data
```

### RAG Retrieval Flow

```mermaid
sequenceDiagram
    participant Agent
    participant DocProcessor
    participant VectorDB
    participant SelfRAG
    participant WebSearch

    Agent->>DocProcessor: query("AAPL sentiment news")
    DocProcessor->>VectorDB: similarity_search(query_embedding, k=10)
    VectorDB-->>DocProcessor: [doc1, doc2, ..., doc10]

    DocProcessor->>SelfRAG: score_relevance(docs, query)
    SelfRAG-->>DocProcessor: scores [8, 7, 9, 5, ...]

    alt Low relevance detected (score < 7)
        SelfRAG->>WebSearch: search("AAPL news today")
        WebSearch-->>SelfRAG: [web1, web2, web3]
        SelfRAG->>SelfRAG: merge_and_rescore(local + web)
    end

    DocProcessor-->>Agent: return top 5 docs with scores
```

### Golden Dataset Regression Flow (CI/CD)

```mermaid
sequenceDiagram
    participant GitHub
    participant CI
    participant FastAPI
    participant GoldenDB
    participant Agent
    participant Report

    GitHub->>CI: push to main
    CI->>GoldenDB: fetch golden dataset (1000+ pairs)
    CI->>FastAPI: for each pair: POST /predict

    loop For each golden pair
        FastAPI->>Agent: predict(pair.input)
        Agent-->>FastAPI: result
        FastAPI-->>CI: compare(result, pair.expected)
    end

    CI->>CI: calculate accuracy = correct/total
    alt accuracy < 85%
        CI->>Report: FAIL: accuracy dropped to {acc}%
        CI->>GitHub: block deployment
    else accuracy >= 85%
        CI->>Report: PASS: accuracy = {acc}%
        CI->>GitHub: allow deployment
    end
```

---

## Security Architecture

### Authentication & Authorization (Module 3)

- **OAuth 2.1** for MCP server access with JWT tokens (RS256 signing)
- **Role-Based Access Control (RBAC)**:
  - `read-only`: Can call `fetch_quote`, `get_filings`, `run_sentiment_analysis`
  - `trader`: All read-only tools + `calculate_indicators`, `predict`
  - `admin`: All tools + manage users, view audit logs
- **API Keys** for FastAPI access with rate limiting (100 req/min, 1000 req/day)
- **Multi-Factor Authentication (MFA)** for admin roles via TOTP

### MCP Security (STRIDE Analysis)

| Threat | Mitigation |
|--------|------------|
| **S**poofing | JWT token validation, OAuth 2.1 with PKCE |
| **T**ampering | Request signing, input schema validation (Pydantic) |
| **R**epudiation | Audit logging for all tool invocations with timestamp, user, args |
| **I**nformation Disclosure | TLS 1.3, encrypt sensitive data in transit/rest |
| **D**enial of Service | Rate limiting, request throttling, circuit breakers |
| **E**levation of Privilege | RBAC enforcement on every tool call, principle of least privilege |

### Data Security

- **Encryption at rest**: PostgreSQL (AES-256), Redis (TLS), Vector DB (encrypted storage)
- **Encryption in transit**: TLS 1.3 for all connections (MCP, FastAPI, APIs)
- **PII Protection**: Minimal user data collection, anonymization for analytics
- **GDPR Compliance**: Data export endpoint, deletion request handling, consent management

### Code Execution Security (for LangGraph agents)

- **Input sanitization**: Validate all user inputs and API responses
- **Resource limits**: Agent execution timeout (30s), memory limit (512MB per agent)
- **Network isolation**: MCP server can access external APIs, internal services isolated
- **Audit logging**: All agent actions, tool calls, and predictions logged with trace ID

---

## Scalability Considerations

### Horizontal Scaling

- **Stateless services**: FastAPI and MCP server designed for horizontal scaling behind load balancer
- **LangGraph checkpointer**: Use PostgreSQL saver for state persistence across instances
- **Redis caching**: Share cache across FastAPI instances
- **Vector DB**: Chroma with persistence, or migrate to managed Weaviate for scaling

### Performance Optimization

- **Lazy loading**: Load transformer models on-demand, keep in memory for reuse
- **Connection pooling**: PostgreSQL (20 connections), Redis (50 connections)
- **Streaming responses**: SSE for real-time updates instead of polling
- **Batch predictions**: MCP tools support batch requests for multiple symbols
- **CDN**: Cache static API responses (quotes, historical data) at edge

### Capacity Planning

- **Target**: Support 100 concurrent users for capstone demo
- **Prediction throughput**: 50 predictions/minute (LangGraph execution: ~2s each)
- **API rate limits**: Golden dataset tests run sequentially to respect external API limits
- **Storage**: Golden dataset (~10MB), vector embeddings (~500MB for 10K documents)

---

## Deployment Architecture

### docker-compose.yml

```yaml
version: "3.8"
services:
  api:
    build: ./api
    ports:
      - "8000:8000"
    environment:
      - MCP_SERVER_URL=http://mcp-server:5000
      - REDIS_URL=redis://redis:6379
      - DATABASE_URL=postgresql://user:pass@postgres:5432/finagent
    depends_on:
      - mcp-server
      - redis
      - postgres
    deploy:
      resources:
        limits:
          cpus: "1"
          memory: 512M

  mcp-server:
    build: ./mcp-server
    ports:
      - "5000:5000"
    environment:
      - POLYGON_API_KEY=${POLYGON_API_KEY}
      - NEWS_API_KEY=${NEWS_API_KEY}
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: 256M

  agent-system:
    build: ./agent-system
    environment:
      - LANGCHAIN_API_KEY=${LANGCHAIN_API_KEY}
      - LANGSMITH_TRACING=true
    depends_on:
      - mcp-server
      - redis
    deploy:
      resources:
        limits:
          cpus: "1"
          memory: 1G

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    deploy:
      resources:
        limits:
          memory: 256M

  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=finagent
    volumes:
      - pg_data:/var/lib/postgresql/data
    deploy:
      resources:
        limits:
          memory: 512M

  vector-db:
    image: chromadb/chroma:latest
    ports:
      - "8001:8000"
    volumes:
      - chroma_data:/chroma/chroma
    deploy:
      resources:
        limits:
          memory: 1G

volumes:
  redis_data:
  pg_data:
  chroma_data:
```

### CI/CD Pipeline (.github/workflows/deploy.yml)

```yaml
name: FinAgent CI/CD
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run unit tests
        run: pytest tests/ -v --cov=src --cov-report=term-missing
      - name: Run golden dataset regression
        env:
          POLYGON_API_KEY: ${{ secrets.POLYGON_API_KEY }}
        run: pytest tests/test_golden_dataset.py -v --regression-threshold=0.85

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build Docker images
        run: docker-compose build
      - name: Push to Docker Hub
        if: github.ref == 'refs/heads/main'
        run: |
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
          docker-compose push

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to staging
        run: ./scripts/deploy.sh staging
      - name: Run E2E tests
        run: pytest tests/e2e/ -v
      - name: Deploy to production
        run: ./scripts/deploy.sh prod
```

---

## Observability Configuration

### LangSmith Setup

```python
import os
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = os.getenv("LANGCHAIN_API_KEY")
os.environ["LANGCHAIN_PROJECT"] = "finagent-capstone"

# All LangGraph executions automatically traced
# View traces at: https://smith.langchain.com/projects/finagent-capstone
```

### Arize Phoenix Setup

```python
from phoenix.trace import OpenInferenceTracer
from phoenix.trace.exporter import HttpExporter
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider

# Set up Phoenix tracer
tracer_provider = TracerProvider()
trace.set_tracer_provider(tracer_provider)
tracer_provider.add_span_processor(
    OpenInferenceTracer(exporter=HttpExporter(endpoint="http://localhost:6006/v1/traces"))
)

# Monitor model performance
# View dashboard at: http://localhost:6006
```

### Custom Metrics

```python
# Log prediction to golden dataset for regression
async def log_prediction(symbol: str, prediction: dict, actual: float = None):
    """Log prediction to golden dataset store."""
    await golden_db.insert({
        "symbol": symbol,
        "timestamp": datetime.utcnow().isoformat(),
        "prediction": prediction,
        "actual_movement": actual,  # Filled later when actual data available
        "model_version": "transformer-v1"
    })

# Alert on low confidence
if prediction["confidence"] < 0.6:
    logger.warning(f"Low confidence prediction for {symbol}: {prediction['confidence']}")
```
