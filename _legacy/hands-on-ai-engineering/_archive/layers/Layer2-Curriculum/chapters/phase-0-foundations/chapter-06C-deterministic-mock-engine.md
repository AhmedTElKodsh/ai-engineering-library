# Chapter 6C: The Deterministic Mock Engine — Building the Financial Testbench

<!--
METADATA
Phase: 0 - Foundations
Time: 2 hours (30 min reading + 90 min hands-on)
Difficulty: ⭐⭐⭐
Type: Implementation
Prerequisites: Chapter 3 (Pydantic), Chapter 6B (Error Handling)
Builds Toward: Financial RAGAS (Ch 15), Self-Reflective RAG (Ch 17)
Correctness Properties: P100 (Ground Truth Integrity), P101 (Mock Determinism)
Project Thread: The Verification Testbench
-->

---

## ☕ Coffee Shop Intro

**Imagine this**: You are building a high-speed trading algorithm for a bank. 🏦
Do you test your brand-new, unproven code by connecting it to the real New York Stock Exchange with $1,000,000 of real money?
Of course not. You'd be fired before the first trade finished.

You use a **Simulator**. A "Fake NYSE" where you know exactly what the prices are going to be. If you know the price of Apple should be $150.02 at 10:00 AM, and your AI says it's $155.00, you know your AI is hallucinating.

In AI Engineering, the biggest mistake is "Testing in Production" by calling live APIs (OpenAI/Anthropic) and "Vibe Checking" the results. 
**Verification Engineering** demands a "Ground Truth"—a fixed, deterministic set of data that the AI *must* match.

**By the end of this chapter**, you'll build the `DeterministicMockEngine`: the heart of our financial testbench. 🛡️

---

## 🛑 The War Story: The $10,000 "Vibe" Mistake

In 2024, a junior engineer at a fintech startup built a "Sentiment Bot" to analyze earnings calls. They tested it by asking it about Tesla's latest quarter. The bot said, *"Tesla's revenue grew by 15%!"*
The engineer thought, *"Sounds about right,"* and deployed it. (Classic Vibe Coding).

**The Reality**: Tesla's revenue had actually *shrunk* by 8%. 
Because the engineer didn't have a **Deterministic Ground Truth** file to test against, they didn't realize the model was hallucinating "growth" because it "vibe-aligned" with Tesla's general brand. 

By the time the error was caught, the bot had sent 5,000 incorrect alerts to premium subscribers. The cost in refunds and lost trust? Over $10,000.

**The Lesson**: Never trust a "vibe." Trust the Ground Truth.

---

## Part 1: Defining the Ground Truth Schema

To verify an AI, we need a "Golden Dataset"—a file that contains the absolute facts. We'll use Pydantic to ensure our Ground Truth is as strict as a bank ledger.

### 🔬 Try This! (Hands-On Practice #1)

**Create `src/verification/models.py`**:

```python
from pydantic import BaseModel, Field
from typing import List, Dict

class FinancialFact(BaseModel):
    ticker: str
    period: str  # e.g., "2025-Q3"
    metric: str  # e.g., "revenue", "net_income"
    value: float
    unit: str = "USD"
    source_citation: str = Field(..., description="The exact page/line in the SEC filing")

class GroundTruth(BaseModel):
    version: str
    facts: List[FinancialFact]

    def find_fact(self, ticker: str, metric: str) -> FinancialFact:
        for fact in self.facts:
            if fact.ticker == ticker and fact.metric == metric:
                return fact
        raise ValueError(f"Fact not found for {ticker} {metric}")
```

---

## Part 2: The Mock Engine Implementation

Now, we build the engine that "pretends" to be a live financial API but actually pulls from our local facts. This allows us to test our agents for **zero cost** and **100% accuracy**.

### 🔬 Try This! (Hands-On Practice #2)

**Create `src/verification/mock_engine.py`**:

```python
import json
from .models import GroundTruth, FinancialFact

class DeterministicMockEngine:
    """
    The 'Fake NYSE'. Returns absolute truth for testing.
    """
    def __init__(self, ground_truth_path: str):
        with open(ground_truth_path, "r") as f:
            data = json.load(f)
            self.db = GroundTruth(**data)

    def get_metric(self, ticker: str, metric: str) -> float:
        """Simulates an API call to a financial provider."""
        try:
            fact = self.db.find_fact(ticker, metric)
            return fact.value
        except ValueError:
            return 0.0

# 1. Create a sample 'ground_truth.json'
sample_data = {
    "version": "1.0",
    "facts": [
        {
            "ticker": "AAPL",
            "period": "2025-Q3",
            "metric": "revenue",
            "value": 94.9,
            "unit": "Billion",
            "source_citation": "SEC 10-Q, Page 12, Line 4"
        }
    ]
}

with open("ground_truth.json", "w") as f:
    json.dump(sample_data, f)
```

---

## Part 3: The Verification Loop (Zero-Hallucination)

This is where the magic happens. We'll write a script that asks an AI a question, then uses the `MockEngine` to **automatically prove** if the AI is lying.

### 🔬 Try This! (Hands-On Practice #3)

**Create `verify_agent_output.py`**:

```python
from src.verification.mock_engine import DeterministicMockEngine

# Setup the Testbench
engine = DeterministicMockEngine("ground_truth.json")

def verify_report(agent_output: dict):
    """
    Verifies an Agent's report against the Ground Truth.
    """
    ticker = agent_output["ticker"]
    reported_revenue = agent_output["revenue"]
    
    # Fetch Ground Truth
    actual_revenue = engine.get_metric(ticker, "revenue")
    
    # The Verification Check
    if reported_revenue == actual_revenue:
        print(f"✅ VERIFIED: {ticker} Revenue is correct ({actual_revenue}B).")
    else:
        diff = abs(reported_revenue - actual_revenue)
        print(f"❌ HALLUCINATION DETECTED!")
        print(f"   Agent said: {reported_revenue}B")
        print(f"   Truth says: {actual_revenue}B")
        print(f"   Error Margin: {diff}B")

# Simulation: The Agent makes a mistake
bad_agent_output = {"ticker": "AAPL", "revenue": 98.5} 
verify_report(bad_agent_output)

# Simulation: The Agent gets it right
good_agent_output = {"ticker": "AAPL", "revenue": 94.9}
verify_report(good_agent_output)
```

---

## Quick Reference Card

### The "Hardware" Testbench Pattern
1.  **Fixtures**: Your static JSON data (Ground Truth).
2.  **Mocks**: Code that replaces live APIs with your Fixtures.
3.  **Assertions**: Code that compares AI output to your Fixtures.

### Pydantic Validation
Use `Field(..., gt=0)` to ensure financial metrics are never negative.

---

## Verification (REQUIRED SECTION)

We must prove **P100 (Ground Truth Integrity)**.

**Create `tests/verify_ch6c.py`**:

```python
import sys
import os
from src.verification.mock_engine import DeterministicMockEngine

print("🧪 Running Mock Engine Verification...\n")

# 1. Test Determinism (P101)
engine = DeterministicMockEngine("ground_truth.json")
val1 = engine.get_metric("AAPL", "revenue")
val2 = engine.get_metric("AAPL", "revenue")

if val1 == val2 == 94.9:
    print("✅ P101 Passed: Engine is deterministic.")
else:
    print("❌ Failed: Engine returned inconsistent results.")
    sys.exit(1)

# 2. Test Error Handling (Circuit Breaker)
val_unknown = engine.get_metric("FAKE", "revenue")
if val_unknown == 0.0:
    print("✅ P100 Passed: Unknown tickers handled safely.")
else:
    print("❌ Failed: Unknown ticker returned data!")
    sys.exit(1)

print("\n🎉 Chapter 6C Complete! You have a Testbench.")
```

---

## Summary

**What you learned:**

1. ✅ **Deterministic vs. Stochastic**: Why testing AI against a moving target is impossible.
2. ✅ **Ground Truth**: Building a "Golden Dataset" of financial facts.
3. ✅ **Mocking**: Simulating complex APIs with local, reliable code.
4. ✅ **Verification Loop**: Automatically detecting hallucinations using the testbench.

**Key Takeaway**: You are no longer "Vibe Coding." You are building a system that can *prove* its own accuracy.

**Skills unlocked**: 🎯
- Software Testing Architecture
- Financial Data Modeling
- Deterministic System Design

**Looking ahead**: Now that we have a way to verify the truth, we need a standardized way to access real data. In **Chapter 7**, we build the **Financial MCP Server**—the standardized pipe for all our financial documents.

---

**Next**: [Chapter 7: The Financial MCP Server →](../../phase-1-llm-fundamentals/chapter-07-mcp-server.md)
