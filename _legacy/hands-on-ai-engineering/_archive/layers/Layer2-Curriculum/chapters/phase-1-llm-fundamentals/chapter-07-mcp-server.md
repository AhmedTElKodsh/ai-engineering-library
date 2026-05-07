# Chapter 7: The Financial MCP Server — The "USB-C" for Your AI

<!--
METADATA
Phase: 1 - Standardized Data & First Calls
Time: 2 hours (30 min reading + 90 min hands-on)
Difficulty: ⭐⭐⭐
Type: Implementation
Prerequisites: Chapter 6C (Mock Engine), Chapter 6D (File Handling)
Builds Toward: Multi-Provider Client (Ch 8), Agentic RAG (Ch 17)
Correctness Properties: P102 (MCP Resource Compliance), P103 (Tool Schema Validity)
Project Thread: Standardized Data Access
-->

---

## ☕ Coffee Shop Intro

**Imagine this**: You buy a new pair of high-end headphones. 🎧
You try to plug them into your phone, but they use a proprietary "Triangle Plug." You try your laptop, but it uses a "Square Plug." You end up buying five different adapters just to listen to music.

**This was AI development in 2024.**
If you wanted to connect your AI to a database, you wrote custom code. If you wanted to connect it to a file folder, more custom code. If you switched from LangChain to LlamaIndex, you had to rewrite *everything*.

**MCP (Model Context Protocol)** is the "USB-C" for AI.
It is a standardized way for an AI to talk to *any* data source. You build the server once, and **any** MCP-compliant model (Claude, Gemini, GPT) can plug into it and "see" your financial data instantly.

**By the end of this chapter**, you'll build a Financial MCP Server that exposes SEC filings and ticker data as standardized tools for your future agents. 🔌

---

## 🛑 The War Story: The "Integration Hell" of 2024

A major hedge fund tried to build an AI analyst. They had data in three places:
1.  A folder of PDFs (SEC Filings).
2.  An SQL database (Trade History).
3.  A REST API (Live Tickers).

They spent **three months** writing custom "Loaders" and "Connectors" for their LangChain bot. When they decided to try a new model that worked better with a different framework, they realized their connectors were incompatible. They had to start over.

**The Solution**: In 2026, we don't write connectors. We write **MCP Servers**.
The hedge fund could have built one MCP server for their filings, one for their DB, and one for their API. Any model, any framework, could have plugged in and started working on Day 1.

---

## Part 1: The MCP Architecture

MCP has three main "Plug Types":
1.  **Resources**: Static data (like reading a file).
2.  **Tools**: Dynamic actions (like fetching a live stock price).
3.  **Prompts**: Standardized ways to ask the model to do something.

We will use the `FastMCP` library, which makes building these servers as easy as writing a Python function.

### 🔬 Try This! (Hands-On Practice #1)

**Install the MCP SDK**:
```bash
pip install mcp mcp[cli] fastmcp
```

---

## Part 2: Building the Financial Resource Server

We want our AI to be able to "browse" our financial filings folder without us writing custom file-reading logic every time.

### 🔬 Try This! (Hands-On Practice #2)

**Create `src/mcp/fin_server.py`**:

```python
from fastmcp import FastMCP
import os

# 1. Initialize the Server
mcp = FastMCP("FinancialIntelligence")

# 2. Expose a Folder as a Resource
# This allows the AI to 'read' any filing in the data folder
@mcp.resource("file://filings/{filename}")
def get_filing(filename: str) -> str:
    """Reads a specific SEC filing from the local data directory."""
    path = f"data/filings/{filename}"
    if not os.path.exists(path):
        return f"Error: Filing {filename} not found."
    
    with open(path, "r") as f:
        return f.read()

# 3. Create a Tool to List Filings
@mcp.tool()
def list_available_filings() -> list[str]:
    """Returns a list of all SEC filings currently available in the system."""
    return os.listdir("data/filings")

if __name__ == "__main__":
    mcp.run()
```

---

## Part 3: Building Financial Tools (Live Tickers)

Now let's give the AI a **Tool** to fetch data. In this chapter, we'll connect it to our `DeterministicMockEngine` from Chapter 6C so we can verify the results.

### 🔬 Try This! (Hands-On Practice #3)

**Update `src/mcp/fin_server.py`**:

```python
from src.verification.mock_engine import DeterministicMockEngine

# Initialize our Ground Truth engine
engine = DeterministicMockEngine("ground_truth.json")

@mcp.tool()
def fetch_ticker_metric(ticker: str, metric: str) -> str:
    """
    Fetches a specific financial metric for a ticker.
    Use this to get verified Revenue, Net Income, or Debt ratios.
    """
    value = engine.get_metric(ticker, metric)
    return f"The {metric} for {ticker} is {value}B (Verified via Ground Truth)."

@mcp.tool()
def calculate_growth(ticker: str, metric: str, current_val: float) -> str:
    """
    Calculates growth percentage compared to the Ground Truth.
    """
    truth_val = engine.get_metric(ticker, metric)
    if truth_val == 0:
        return "Error: No historical data found for calculation."
    
    growth = ((current_val - truth_val) / truth_val) * 100
    return f"Growth for {ticker} {metric} is {growth:.2f}% vs. Ground Truth."
```

---

## Part 4: Testing with the MCP Inspector

MCP comes with a "Debugger" called the Inspector. It lets you "see" what the AI sees.

### 🔬 Try This! (Hands-On Practice #4)

Run the inspector on your server:
```bash
mcp inspector src/mcp/fin_server.py
```

**What to look for**:
1.  Open the web UI (usually at `localhost:3000`).
2.  Click on **Tools**. You should see `fetch_ticker_metric`.
3.  Try running the tool with `ticker="AAPL"` and `metric="revenue"`.
4.  It should return `94.9B`—exactly what's in our `ground_truth.json`!

---

## Quick Reference Card

### FastMCP Cheat Sheet
- `@mcp.resource(uri)`: Exposes static data.
- `@mcp.tool()`: Exposes a function for the AI to call.
- `mcp.run()`: Starts the server.

### Why MCP?
1.  **Security**: The server (you) controls exactly what files the AI can see.
2.  **Standardization**: Works with Claude Desktop, IDEs, and custom bots.
3.  **Decoupling**: You can change your database backend without changing the AI's "Tools."

---

## Verification (REQUIRED SECTION)

We must prove **P102 (Resource Compliance)** and **P103 (Tool Schema)**.

**Create `tests/verify_ch7.py`**:

```python
"""
Verification script for Chapter 7.
Checks if the MCP server correctly exposes tools and resources.
"""
from src.mcp.fin_server import mcp
import sys

print("🧪 Running MCP Server Verification...\n")

# 1. Verify Tools exist
tools = mcp.list_tools()
tool_names = [t.name for t in tools]

expected_tools = ["list_available_filings", "fetch_ticker_metric", "calculate_growth"]

for expected in expected_tools:
    if expected in tool_names:
        print(f"✅ Tool Found: {expected}")
    else:
        print(f"❌ Missing Tool: {expected}")
        sys.exit(1)

# 2. Verify Resource Logic (P102)
# We mock the return for the verify script
resources = mcp.list_resources()
if len(resources) > 0:
    print(f"✅ P102 Passed: {len(resources)} Resources exposed.")
else:
    print("❌ Failed: No resources found.")
    sys.exit(1)

print("\n🎉 Chapter 7 Complete! Your data pipe is ready.")
```

---

## Summary

**What you learned:**

1. ✅ **MCP Concept**: The standardized protocol for AI-data communication.
2. ✅ **Resources vs. Tools**: When to give the AI a file vs. an action.
3. ✅ **FastMCP**: Rapidly building servers with Python decorators.
4. ✅ **Decoupling**: Using the Mock Engine inside MCP to guarantee truth.

**Key Takeaway**: Don't build custom connectors. Build MCP Servers. This is how you create a modular, 2026-ready AI architecture.

**Skills unlocked**: 🎯
- Protocol Implementation (MCP)
- Tool-Use Design
- System Interoperability

**Looking ahead**: Now that the AI has a "pipe" to the data, we need to build the **Multi-Provider Client** in **Chapter 8** so we can actually start making LLM calls through this pipe!

---

**Next**: [Chapter 8: Multi-Provider Financial Client →](chapter-08-multi-provider-client.md)
