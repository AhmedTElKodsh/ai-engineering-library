# Chapter 16A: The MCP Standard — Your Universal Data Connector

<!--
METADATA
Phase: 2 - Embeddings & Vectors
Time: 1.5 hours (45 min reading + 60 min hands-on)
Difficulty: ⭐⭐⭐
Type: Implementation
Prerequisites: Chapter 16 (Document Loaders), Chapter 7 (LLM Call)
Builds Toward: Production RAG (Ch 17+)
Correctness Properties: P25 (MCP Protocol Compliance), P26 (Secure Resource Access)
Project Thread: DomainExpertChatbot - MCP Integration

NAVIGATION
→ Quick Reference: #quick-reference-card
→ Verification: #verification-required-section
→ What's Next: #whats-next
-->

---

## ☕ Coffee Shop Intro

**Imagine this**: You just bought a brand new, top-of-the-line laptop. 💻
You want to plug in your mouse, your external drive, and your monitor.
In the old days (the 90s), every device had a different, proprietary plug. You needed a bag full of adapters.

Then came **USB-C**. One plug to rule them all. Power, data, video—it just works.

**Model Context Protocol (MCP)** is the USB-C of the AI world.
Right now, if you want your AI to read a local folder, you write a custom loader. If you want it to search Google, you write a tool. If you want it to query a database, you write a connector.

MCP replaces this "spaghetti code" with a universal standard. You build an MCP server once, and *any* MCP-compliant AI (Claude Desktop, Cursor, or your own Python agents) can instantly "see" and use your data.

**By the end of this chapter**, you'll build your first MCP server and connect your chatbot to it. No more custom loaders—just pure, standardized data flow. 🔌

---

## Prerequisites Check

We need the MCP SDK and the FastMCP helper for rapid development.

```bash
pip install mcp fastmcp
```

---

## The War Story: The "Integration Hell" of 2024

### The Problem (Custom Connector Fatigue)

At a mid-sized engineering firm, the AI team was drowning. Every department wanted a chatbot.
- **Structural** wanted to query PDFs in SharePoint.
- **Geotechnical** wanted to see data in their local SQL database.
- **Project Management** wanted to read emails in Outlook.

For every new data source, the team had to write 500 lines of "glue code" to load, chunk, and feed the data to the LLM. When the LLM updated its API, half the connectors broke. It was a maintenance nightmare.

### The Solution (MCP Standardization)

Then came MCP. Instead of building "Connectors for the LLM", they built "MCP Servers for the Data".
The Geotechnical team built one MCP server that exposed their SQL data as "Resources".
Suddenly, *every* AI tool the company used—from the custom chatbot to the developers' IDEs—could instantly access the soil data without writing a single new line of integration code.

The team stopped being "Glue Code Janitors" and started being "Data Architects".

---

## Part 1: What is MCP? (The Protocol)

MCP is an open standard that lets AI models interact with external data and tools. It consists of three main components:

1.  **Resources**: Like files or database rows (Read-only data).
2.  **Tools**: Functions the AI can call (e.g., "calculate_load" or "search_web").
3.  **Prompts**: Pre-defined templates for interacting with the data.

**Why is this better?**
- **Standardization**: Use the same server for Claude, your Python script, and future AI models.
- **Security**: The server acts as a gatekeeper. The LLM never touches your file system directly.
- **Decoupling**: Update your data source without breaking your AI logic.

---

## Part 2: Building a FastMCP Server

We'll build a server that exposes a folder of Civil Engineering documents.

### 🔬 Try This! (Hands-On Practice #1)

**Create `mcp_server.py`**:

```python
from fastmcp import FastMCP
import os

# 1. Initialize FastMCP server
mcp = FastMCP("CivilEngineeringDocs")

# 2. Define a Resource (Read-only access to documents)
# We'll expose the 'docs/ce' folder
DOCS_PATH = os.path.abspath("docs/ce")

@mcp.resource("file://{filename}")
def get_doc(filename: str) -> str:
    """Retrieve a specific civil engineering document."""
    path = os.path.join(DOCS_PATH, filename)
    
    # Security: Ensure the file is inside our allowed folder
    if not os.path.commonprefix([os.path.realpath(path), os.path.realpath(DOCS_PATH)]) == os.path.realpath(DOCS_PATH):
        return "Access Denied: Path escape detected."

    if not os.path.exists(path):
        return f"Document {filename} not found."
        
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

# 3. Define a Tool (Search functionality)
@mcp.tool()
def list_available_docs() -> list[str]:
    """List all available civil engineering documents in the repository."""
    if not os.path.exists(DOCS_PATH):
        return []
    return [f for f in os.listdir(DOCS_PATH) if f.endswith(".txt") or f.endswith(".md")]

if __name__ == "__main__":
    mcp.run()
```

**Run it**:
```bash
python mcp_server.py
```
*Note: This starts a local server that communicates over Standard Input/Output (stdio).*

---

## Part 3: Connecting the 'DomainExpertChatbot'

Now, let's update your Chatbot from Chapter 7 to use this MCP server instead of hardcoded strings.

### 🔬 Try This! (Hands-On Practice #2)

**Create `mcp_chatbot.py`**:

```python
import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()

async def run_mcp_chat():
    # 1. Configure the MCP Server connection
    server_params = StdioServerParameters(
        command="python",
        args=["mcp_server.py"], # Path to your server file
    )

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            # Initialize the session
            await session.initialize()
            
            # 2. Get data from MCP
            print("🔍 Asking MCP for available documents...")
            docs = await session.call_tool("list_available_docs")
            
            # 3. Let's pick a doc and read its content via MCP
            if docs:
                target_doc = docs[0]
                print(f"📄 Reading {target_doc} via MCP...")
                content = await session.read_resource(f"file://{target_doc}")
                
                # 4. Use the content in our Ch 7 Chatbot pattern
                messages = [
                    {"role": "system", "content": "You are a Civil Engineering expert."},
                    {"role": "user", "content": f"Based on this document: {content}\n\nSummarize the key safety requirements."}
                ]
                
                response = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=messages
                )
                print(f"\n🤖 AI Summary:\n{response.choices[0].message.content}")
            else:
                print("❌ No documents found in MCP server.")

if __name__ == "__main__":
    asyncio.run(run_mcp_chat())
```

---

## Part 4: Why is this better?

| Feature | Custom Loader (Ch 16) | MCP Standard (Ch 16A) |
| :--- | :--- | :--- |
| **Reusability** | Locked into your script. | Use with any MCP client (Claude, Cursor, Python). |
| **Security** | Script has full FS access. | LLM only sees what the server exposes. |
| **Complexity** | You handle parsing/formatting. | Server handles data; Client just asks. |
| **Decoupling** | Hardcoded file paths. | Dynamic URI-based resources (`file://...`). |

---

## Quick Reference Card

### FastMCP Cheat Sheet

```python
mcp = FastMCP("MyServer")

@mcp.resource("protocol://{id}")
def read_data(id: str): ...

@mcp.tool()
def my_tool(arg: str): ...
```

### Protocol Interaction

1. **Client** sends request (JSON-RPC) over stdio.
2. **Server** executes logic and returns JSON-RPC response.
3. **Transport** is usually Standard I/O or SSE (Server-Sent Events).

---

## Verification (REQUIRED SECTION)

We need to prove **P25 (Protocol Compliance)** and **P26 (Secure Access)**.

**Create `verify_mcp.py`**:

```python
"""
Verification script for Chapter 16A.
Properties: P25 (Protocol), P26 (Security).
"""
import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
import os

async def verify():
    print("🧪 Running MCP Verification...\n")
    
    # Setup dummy doc
    os.makedirs("docs/ce", exist_ok=True)
    with open("docs/ce/test_spec.txt", "w") as f:
        f.write("Safety Factor: 2.0")

    server_params = StdioServerParameters(command="python", args=["mcp_server.py"])

    try:
        async with stdio_client(server_params) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()
                
                # Test P25: Tool Call
                print("Test 1: Tool Protocol...")
                res = await session.call_tool("list_available_docs")
                if "test_spec.txt" in res:
                    print("✅ P25 Passed: Tool responded correctly.")
                else:
                    print("❌ Failed: Tool output incorrect.")

                # Test P26: Security (Path Escape)
                print("Test 2: Security Gate...")
                # Try to read a file outside the sandbox
                escaped = await session.read_resource("file://../../secret.env")
                if "Access Denied" in escaped:
                    print("✅ P26 Passed: Path escape blocked by server.")
                else:
                    print("❌ Failed: Server allowed access outside sandbox!")

    finally:
        if os.path.exists("docs/ce/test_spec.txt"):
            os.remove("docs/ce/test_spec.txt")

if __name__ == "__main__":
    asyncio.run(verify())
```

---

## Summary

**What you learned:**

1. ✅ **The USB-C of AI**: Why MCP is the future of data integration.
2. ✅ **FastMCP**: How to build servers in minutes.
3. ✅ **Protocol Patterns**: Resources vs. Tools.
4. ✅ **Decoupled AI**: Connecting your Ch 7 Chatbot to a standardized data source.

**Key Takeaway**: Don't build custom connectors. Build MCP Servers. Your data becomes "pluggable" to the entire AI ecosystem.

**Next**: [Phase 3: RAG Fundamentals (Chapter 17) →](../phase-3-rag-fundamentals/chapter-17-first-rag-system.md)
