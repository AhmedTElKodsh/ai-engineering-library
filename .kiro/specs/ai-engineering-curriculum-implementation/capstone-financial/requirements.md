# Capstone Project Requirements: FinAgent — AI-Powered Financial Intelligence Platform

## Introduction

The FinAgent capstone project is a comprehensive, portfolio-ready AI engineering application that integrates all concepts from the 28-week AI Engineering Curriculum into a real-world financial market intelligence platform. Learners build a system that ingests real-time market data, analyzes news sentiment, predicts price movements, manages portfolios, and exposes everything through a production-grade API — demonstrating mastery of Python foundations, transformer internals, MCP integration, agentic workflows, and production deployment.

The project targets the high-demand financial technology sector (global fintech market: $949B by 2030) and produces a demonstrable portfolio piece combining AI engineering with quant finance.

## Glossary

- **FinAgent**: The complete capstone system — a multi-agent financial intelligence platform
- **MarketData_MCP**: MCP server exposing financial data sources as Resources, Tools, and Prompts
- **Sentiment_RAG**: RAG system ingesting news/social media for sentiment-driven predictions
- **Trading_Agent**: LangGraph multi-agent system orchestrating analysis, prediction, and execution
- **Prediction_Engine**: Transformer-based time-series model for price forecasting
- **Portfolio_Optimizer**: Modern Portfolio Theory implementation for asset allocation
- **Golden_Dataset**: Human-verified historical predictions with actual outcomes for regression testing
- **Observability_Stack**: LangSmith + Arize Phoenix for tracing agent executions and model performance
- **Financial_Instrument**: OOP model for stocks, options, crypto, forex pairs
- **Guardrail_System**: NeMo guardrails preventing unsafe financial advice

## Requirements

### Requirement 1: Python Foundations — Financial Data Models & CLI

**User Story:** As a learner, I want to build Python foundation components for financial data, so that I can model real-world financial instruments with proper OOP, error handling, and context managers.

#### Acceptance Criteria

1. THE FinAgent system SHALL include FinancialInstrument base class with subclasses for Stock, Option, Crypto, Forex
2. THE FinancialInstrument classes SHALL implement magic methods (__str__, __repr__, __eq__) for display and comparison
3. THE FinAgent system SHALL include a CLI tool (argparse/click) for fetching market data from Alpha Vantage or Polygon.io
4. THE CLI tool SHALL use OOP design with base Fetcher class and API-specific subclasses
5. THE CLI tool SHALL handle errors (API rate limits, network failures, invalid symbols) with try/except and custom exception classes
6. THE FinAgent system SHALL use context managers for database connections (SQLite/PostgreSQL) and file I/O operations
7. THE FinAgent system SHALL include list/dict comprehensions and generators for efficient data processing (e.g., filter stocks by sector)
8. WHEN the CLI tool completes a fetch, THE system SHALL output structured JSON with price, volume, and metadata
9. THE FinAgent system SHALL include unit tests for all data models and CLI functions

### Requirement 2: Whole Game — Execute & Modify Complete Agentic System

**User Story:** As a learner, I want to execute a complete LangGraph multi-agent financial system first, so that I understand the full value before diving into internals.

#### Acceptance Criteria

1. THE FinAgent system SHALL provide a complete, runnable LangGraph multi-agent system on Day 1
2. THE multi-agent system SHALL include minimum 3 agents: DataCollectorAgent, SentimentAnalyzerAgent, PredictorAgent
3. WHEN executing the system, THE learner SHALL observe agent routing, tool invocations, and state transitions in real-time logs
4. THE learner SHALL modify agent prompts to change analysis strategy (e.g., switch from conservative to aggressive sentiment weighting)
5. THE learner SHALL add a new tool (e.g., fetch_earnings_calendar) to an existing agent
6. THE learner SHALL modify routing logic to add a new decision branch (e.g., skip prediction if sentiment is neutral)
7. THE learner SHALL deploy the system locally with FastAPI and observe API requests/responses
8. THE learner SHALL add LangSmith observability tracing to all agent executions
9. WHEN the system completes analysis, THE learner SHALL see a structured financial report with predictions and confidence scores

### Requirement 3: First Principles — Build LLM Components from Scratch

**User Story:** As a learner, I want to build LLM internals from scratch, so that I deeply understand tokenization, embeddings, attention, and transformers applied to financial text.

#### Acceptance Criteria

1. THE FinAgent system SHALL implement BPE tokenization from scratch for financial text (earnings reports, news articles)
2. THE BPE implementation SHALL include a BPETokenizer class with encode() and decode() methods
3. THE FinAgent system SHALL implement vector embeddings for financial documents using manual matrix operations (no high-level ML libraries for core logic)
4. THE FinAgent system SHALL implement scaled dot-product attention mechanism using nested for-loops, then optimize to matrix multiplication
5. THE FinAgent system SHALL implement a mini-Transformer with encoder-only architecture for financial text classification
6. THE FinAgent system SHALL implement backpropagation manually (no PyTorch autograd) for the transformer's forward pass, loss function, and weight updates
7. THE learner SHALL create explorable explanations with sliders for temperature, top-p, and learning rate showing real-time impact on token probability distributions
8. THE FinAgent system SHALL include visual simulations showing BPE token merging on financial text and attention weight flow for earnings sentiment
9. THE FinAgent system SHALL include round-trip property tests: parse(print(x)) == x for BPE tokenizer and transformer output serialization

### Requirement 4: MCP Integration — Financial Data MCP Server

**User Story:** As a learner, I want to build a secure MCP server for financial data, so that I can connect LLMs to market data, news, and SEC filings via the Model Context Protocol.

#### Acceptance Criteria

1. THE FinAgent system SHALL include an MCP server built with FastMCP exposing financial data sources
2. THE MCP server SHALL expose Resources:
   - `market://quote/{symbol}` — real-time quote data (JSON)
   - `market://filings/{symbol}` — SEC EDGAR 10-K/10-Q filings
   - `market://news/{symbol}` — recent news articles (Markdown)
3. THE MCP server SHALL expose Tools:
   - `fetch_quote(symbol: str) -> dict` — get real-time price/volume
   - `calculate_indicators(symbol: str, indicators: list) -> dict` — compute MACD, RSI, Bollinger Bands
   - `run_sentiment_analysis(text: str) -> dict` — FinBERT sentiment scoring
   - `get_historical_prices(symbol: str, days: int) -> list` — historical OHLCV data
4. THE MCP server SHALL expose Prompts:
   - `analyze_stock` — template for comprehensive stock analysis
   - `generate_portfolio_report` — template for portfolio performance report
5. THE learner SHALL implement context engineering: pre-process and simplify large JSON payloads from market APIs before sending to LLM to prevent hallucinations
6. THE learner SHALL implement continuous telemetry logging on every MCP tool invocation (timestamp, tool name, args, latency, token usage)
7. THE MCP server SHALL implement OAuth 2.1 with JWT tokens for authenticated API access
8. THE MCP server SHALL implement RBAC: read-only roles for basic quotes, trader roles for sentiment/tools, admin roles for all operations
9. THE learner SHALL produce a security audit report demonstrating MCP threat model compliance (injection attacks, excessive permission, data exfiltration vectors)
10. THE MCP server SHALL validate all input schemas and sanitize outputs

### Requirement 5: Agentic Workflows — RAG & Multi-Agent Orchestration

**User Story:** As a learner, I want to build advanced RAG systems and orchestrate multi-agent financial workflows with LangGraph, so that I can demonstrate mastery of production-grade agentic patterns.

#### Acceptance Criteria

1. THE FinAgent system SHALL implement a RAG system ingesting financial news (NewsAPI, Reuters) and social media (Reddit r/wallstreetbets, Twitter)
2. THE RAG system SHALL implement chunking strategy optimized for financial documents (sliding window with 512 tokens, 50 token overlap)
3. THE RAG system SHALL implement vector embeddings using sentence-transformers (all-MiniLM-L6-v2) stored in Chroma/Weaviate
4. THE RAG system SHALL implement Self-RAG: self-reflection on retrieval quality with critic agent scoring relevance 0-10
5. THE RAG system SHALL implement CRAG (Corrective RAG): fallback to web search if retrieval confidence < 0.7
6. THE RAG system SHALL implement RAPTOR: recursive abstractive processing building hierarchical summaries of financial reports
7. THE FinAgent system SHALL implement ReAct pattern: interleave reasoning traces with actionable steps (fetch data → analyze → predict → decide)
8. THE FinAgent system SHALL implement Reflection pattern: Generator agent produces analysis → Critic agent reviews for accuracy → refinement loop (max 3 iterations)
9. THE FinAgent system SHALL implement Planning pattern: decompose "Generate portfolio recommendation" into sequential steps (assess risk → fetch data → analyze → optimize → report)
10. THE FinAgent system SHALL implement Human-in-the-Loop pattern: pause autonomous execution before simulated trades requiring explicit human authorization
11. THE FinAgent system SHALL use LangGraph for orchestration with state machine: AnalyzeState → PredictState → DecideState → ExecuteState
12. THE LangGraph workflow SHALL implement conditional routing based on market state (bull/bear/neutral)
13. THE LangGraph workflow SHALL implement checkpoints for long-running analyses (overnight backtests) with state persistence
14. THE FinAgent system SHALL implement Supervisor pattern: master TradingSupervisorAgent coordinates DataCollector, SentimentAnalyzer, TechnicalAnalyzer, Predictor, PortfolioManager agents
15. THE FinAgent system SHALL implement Swarm pattern: peer-to-peer agent collaboration where agents vote on consensus predictions
16. THE system SHALL include a production readiness matrix: Tool Use (Low Risk), ReAct (Medium Risk), Reflection (Medium Risk), Multi-Agent (High Risk) with guardrails for each

### Requirement 6: Production & Verification — Deployment, Testing, Observability

**User Story:** As a learner, I want to deploy the FinAgent system with production-grade testing, observability, and guardrails, so that I can demonstrate verification engineering mindset.

#### Acceptance Criteria

1. THE FinAgent system SHALL include a golden dataset of 1000+ human-verified input-output pairs (historical stock, actual price movement, sentiment label, prediction accuracy)
2. THE FinAgent system SHALL include a regression test suite running against the golden dataset in CI/CD (GitHub Actions)
3. THE CI/CD pipeline SHALL fail deployment if golden dataset accuracy drops below 85%
4. THE FinAgent system SHALL expose a FastAPI service with async endpoints:
   - `POST /api/v1/predict` — price prediction for given symbol
   - `POST /api/v1/sentiment` — sentiment analysis for given text
   - `POST /api/v1/portfolio/recommend` — portfolio recommendations
   - `GET /api/v1/market/quote/{symbol}` — real-time quote
   - `SSE /api/v1/stream` — server-sent events for real-time market updates
5. THE FinAgent system SHALL include Docker containerization with docker-compose.yml defining services: api, mcp-server, agent-system, frontend, redis, postgres
6. THE FinAgent system SHALL integrate LangSmith for observability: trace all agent executions, tool invocations, token consumption, and reasoning traces
7. THE FinAgent system SHALL integrate Arize Phoenix for model performance monitoring: sentiment accuracy, prediction error (MAE/MSE), drift detection
8. THE FinAgent system SHALL implement distributed tracing across microservices using OpenTelemetry
9. THE FinAgent system SHALL implement NeMo guardrails preventing unsafe financial advice (e.g., block "buy this stock now" without disclaimers)
10. THE FinAgent system SHALL implement content filtering for inappropriate queries and rate limiting (100 requests/minute per API key)
11. THE FinAgent system SHALL implement fine-tuning with Unsloth: fine-tune FinBERT on custom financial sentiment dataset (5000+ samples)
12. THE FinAgent system SHALL implement DPO (Direct Preference Optimization) aligning model with financial domain preferences
13. THE FinAgent system SHALL export fine-tuned models to GGUF format for local inference with llama.cpp
14. THE learner SHALL spend 70% of Module 5 time building testbenches, not writing logic — demonstrating verification engineer mindset
15. THE FinAgent system SHALL log every tool invocation, token consumption, and reasoning trace for audit trails

### Requirement 7: Capstone Integration — Portfolio-Ready Project

**User Story:** As a learner, I want to integrate all components into a polished, portfolio-ready project, so that I can demonstrate full-stack AI engineering mastery to employers.

#### Acceptance Criteria

1. THE FinAgent system SHALL include comprehensive architecture diagrams (Mermaid) showing all components and data flows
2. THE FinAgent system SHALL include OpenAPI/Swagger documentation for all FastAPI endpoints
3. THE FinAgent system SHALL include a deployment guide (README.md) with:
   - Prerequisites (API keys, Python version, Docker)
   - Environment setup instructions
   - docker-compose up command for full system launch
   - Verification steps (health checks, sample API calls)
4. THE FinAgent system SHALL include a security audit report covering:
   - MCP threat model compliance (STRIDE analysis)
   - OAuth 2.1 implementation review
   - RBAC permission matrix
   - Data encryption (at rest and in transit)
5. THE FinAgent system SHALL include a test suite with >80% code coverage including:
   - Unit tests for all Python modules
   - Integration tests for agent workflows
   - Golden dataset regression tests in CI/CD
   - Load tests for API endpoints (100 concurrent requests)
6. THE FinAgent system SHALL include a project summary document highlighting:
   - All AI engineering concepts demonstrated (map to Module 0-6)
   - Financial domain value proposition
   - Architecture decisions and trade-offs
   - Sample screenshots/terminal outputs
7. THE FinAgent system SHALL run as a single docker-compose up command launching all services
8. WHEN all services are running, THE learner SHALL demonstrate end-to-end flow: API request → MCP tool call → agent analysis → prediction → portfolio recommendation
9. THE FinAgent system SHALL include a liability disclaimer: "Past performance does not guarantee future results. This is a portfolio project, not licensed financial advice."

### Requirement 8: Pedagogical Integration — Code Comprehension & Professional Workflow

**User Story:** As a learner, I want to practice code comprehension, professional workflows, and interview preparation throughout the capstone, so that I develop industry-ready skills.

#### Acceptance Criteria

1. THE FinAgent system SHALL include "Explain in Plain English" (EiPE) exercises for all major code sections (agents, MCP server, transformer implementation)
2. THE learner SHALL follow read → explain → modify → create progression for all new components
3. THE FinAgent codebase SHALL use Git with meaningful commit messages following conventional commits
4. THE learner SHALL create feature branches for each major component, submit PRs, and perform code review on their own code
5. THE FinAgent system SHALL include unit tests written BEFORE or alongside implementation code (TDD where applicable)
6. THE learner SHALL practice think-aloud: record or write explanations of their reasoning while solving capstone problems
7. THE FinAgent system SHALL include a mock interview preparation section with:
   - 5 technical interview questions specific to the project
   - Sample answers demonstrating communication of technical decisions
   - Coding challenge: "Implement a new MCP tool for options chain data"
8. THE FinAgent codebase SHALL be deployable as a portfolio piece with clean project structure:
   - `src/` — source code
   - `tests/` — test suite
   - `docs/` — documentation
   - `docker/` — container configs
   - `notebooks/` — exploration notebooks

## Success Criteria

Upon completion, the learner will have:

1. **Portfolio project** — A GitHub repository with >2000 lines of production-quality code
2. **Live demo** — docker-compose up launches full system accessible via localhost
3. **Architecture proof** — Mermaid diagrams showing all 7 curriculum modules integrated
4. **Test coverage** — >80% with golden dataset regression in CI/CD
5. **Security audit** — MCP threat model compliance report
6. **Observability** — LangSmith traces and Arize Phoenix dashboards
7. **Financial domain value** — Real-time sentiment analysis, price predictions, portfolio recommendations
8. **Interview readiness** — Can explain every component from BPE tokens to multi-agent orchestration

## Mapping to Curriculum Modules

| Curriculum Module | FinAgent Component | Key Concepts Demonstrated |
|------------------|-------------------|-----------------------------|
| Module 0: Python Foundations | FinancialInstrument models, CLI tool | OOP, error handling, context managers, comprehensions, generators |
| Module 1: Whole Game | LangGraph multi-agent system execution | Complete agentic system, modify prompts/tools/routing, deploy with observability |
| Module 2: First Principles | BPE tokenization, mini-Transformer | Manual implementation of tokenization, embeddings, attention, backpropagation |
| Module 3: MCP Integration | FinancialData-MCP server | Resources, Tools, Prompts, context engineering, OAuth 2.1, RBAC, threat modeling |
| Module 4: Agentic Workflows | RAG + multi-agent LangGraph | Self-RAG/CRAG/RAPTOR, ReAct/Reflection/Planning/HITL, Supervisor/Swarm patterns |
| Module 5: Production & Verification | FastAPI + Docker + Observability | Golden datasets, regression tests, CI/CD, LangSmith, NeMo guardrails, fine-tuning |
| Module 6: Capstone | Full integration | All components unified, documentation, security audit, portfolio-ready |
