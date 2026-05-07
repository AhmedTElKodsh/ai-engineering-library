# Chapter 9: Financial Prompt Engineering — The Art of the Directive

<!--
METADATA
Phase: 1 - Standardized Data & First Calls
Time: 1.5 hours (30 min reading + 60 min hands-on)
Difficulty: ⭐⭐
Type: Concept + Implementation
Prerequisites: Chapter 7 (MCP), Chapter 8 (Client)
Builds Toward: Financial RAGAS (Ch 15), Agentic RAG (Ch 17)
Correctness Properties: P106 (Prompt Schema Validation), P107 (Few-Shot Consistency)
Project Thread: Financial Logic Design
-->

---

## ☕ Coffee Shop Intro

**Imagine this**: You are the head of a major hedge fund. 🏦
You have a new intern, fresh from university. You tell them: *"Go look at Apple's numbers and tell me if they are doing well."*

The intern comes back an hour later with a 10-page essay about how "The iPhone is a cool product" and "The stores look nice." They didn't even look at the balance sheet. 
**This is a Vague Prompt.**

Professional traders don't give "vibey" suggestions. They give **Directives**: *"Extract the Q3 Net Income from the 10-Q on page 14, compare it to Q2, and output a JSON object with the percentage change."*

**Prompt Engineering** is the art of turning "Vibes" into "Directives."

**By the end of this chapter**, you'll build a `FinancialPromptManager` that ensures your AI follows strict reasoning patterns (like Chain of Thought) and extracts data with 100% format reliability using Few-Shot examples. 📜

---

## 🛑 The War Story: The $50,000 "Summarization" Hallucination

In 2023, a boutique investment firm used a simple prompt: *"Summarize this earnings call transcript."*
The model summarized it beautifully, but it **hallucinated a negative number** for "Free Cash Flow" because it misinterpreted a parenthetical remark in the text as a negative sign instead of a footnote reference.

The firm's sentiment algorithm saw "Negative Cash Flow" and automatically sold their position. They lost **$50,000** in slippage fees before they realized the AI had simply "vibed" its way through a complex sentence.

**The Fix**: They rewrote the prompt using the **CIF Pattern** and added **Chain of Thought** reasoning. The model was forced to: 
1.  Identify the sentence.
2.  Explain the math.
3.  State the final number.
The hallucination vanished.

---

## Part 1: The CIF Pattern for Finance

Good financial prompts follow the **CIF** structure:
1.  **C**ontext: "You are a Forensic Accountant." (Set the persona and rules).
2.  **I**nstructions: "Identify all litigation risks." (Define the specific task).
3.  **F**ormat: "Output as a bulleted list with page citations." (Define the schema).

### 🔬 Try This! (Hands-On Practice #1)

**Create `src/prompts/cif_tester.py`**:

```python
from src.llm.factory import FinancialLLMFactory, ChatMessage

client = FinancialLLMFactory.create("openai", "gpt-4o-mini")

# ❌ VIBE PROMPT
vibe_prompt = "Tell me if this company is a good investment: [Insert 10-K snippet here]"

# ✅ DIRECTIVE PROMPT (CIF)
directive_prompt = """
[CONTEXT]
You are a Quantitative Risk Analyst. You prioritize conservative estimates and explicit citations.

[INSTRUCTIONS]
1. Read the provided SEC snippet.
2. Identify the 'Debt-to-Equity' ratio.
3. If not explicitly stated, calculate it: (Total Liabilities / Total Shareholder Equity).

[FORMAT]
Return ONLY a JSON object: {"ratio": float, "calculated": bool, "citation": str}.
"""

print("--- Sending Directive Prompt ---")
# result = client.chat([ChatMessage(role="user", content=directive_prompt)])
```

---

## Part 2: Chain of Thought (CoT) — The "Show Your Work" Rule

In Finance, a number without a calculation is a "black box." We use **Chain of Thought** to force the LLM to think step-by-step.

### 🔬 Try This! (Hands-On Practice #2)

**Update your prompt template to include reasoning**:

```python
COT_TEMPLATE = """
[INSTRUCTIONS]
Perform a 'Step-by-Step' analysis of the Operating Margin.

You MUST follow this reasoning pattern:
Step 1: Locate 'Revenue' and 'Operating Income'.
Step 2: State both values clearly.
Step 3: Perform the division: (Operating Income / Revenue).
Step 4: State the final percentage.

[INPUT]
{financial_text}
"""
```

---

## Part 3: Few-Shot Prompting (The Gold Standard)

The most effective way to ensure an AI matches your "Ground Truth" is to give it 2-3 examples.

### 🔬 Try This! (Hands-On Practice #3)

**Create `src/prompts/few_shot.py`**:

```python
FEW_SHOT_EXTRACTION = """
Task: Extract the Ticker and the primary Revenue figure.

Example 1:
Input: "Microsoft (MSFT) announced a record-breaking revenue of $56.5 billion."
Output: {"ticker": "MSFT", "revenue": 56.5, "unit": "B"}

Example 2:
Input: "Tesla reported total revenue of 25.17B for the fourth quarter."
Output: {"ticker": "TSLA", "revenue": 25.17, "unit": "B"}

Input: {user_input}
Output:
"""
```

---

## Part 4: The Financial Prompt Manager

We don't want strings scattered in our code. We build a manager to handle the "Plumbing."

### 🔬 Try This! (Hands-On Practice #4)

**Create `src/prompts/manager.py`**:

```python
class FinancialPromptManager:
    """
    Ensures all prompts follow the 'Verification Engineering' standard.
    """
    def __init__(self):
        self.templates = {
            "risk_assessment": "Context: Risk Officer. Task: Identify {metric} risks in {text}. Format: JSON."
        }

    def get_prompt(self, name: str, **kwargs) -> str:
        template = self.templates.get(name)
        if not template:
            raise ValueError(f"Prompt {name} not found.")
        
        # Validation: Ensure all {variables} are provided (Verification Engineering!)
        return template.format(**kwargs)

# Usage:
# mgr = FinancialPromptManager()
# prompt = mgr.get_prompt("risk_assessment", metric="liquidity", text="...")
```

---

## Quick Reference Card

### The "Zero-Hallucination" Checklist
1.  **Persona**: Did you set a professional persona (Accountant, Analyst)?
2.  **Steps**: Did you tell it to think "Step-by-Step"?
3.  **Examples**: Did you provide at least 2 Few-Shot examples?
4.  **Citations**: Did you demand page/line numbers?

---

## Verification (REQUIRED SECTION)

We must prove **P106 (Schema Validation)**.

**Create `tests/verify_ch9.py`**:

```python
"""
Verification script for Chapter 9.
"""
from src.prompts.manager import FinancialPromptManager
import sys

print("🧪 Running Prompt Manager Verification...\n")

mgr = FinancialPromptManager()

# 1. Test Variable Substitution
try:
    p = mgr.get_prompt("risk_assessment", metric="Debt", text="Sample text")
    if "Debt" in p and "Sample text" in p:
        print("✅ P106 Passed: Variable substitution is correct.")
    else:
        print("❌ Failed: Variable substitution failed.")
        sys.exit(1)
except Exception as e:
    print(f"❌ Failed with error: {e}")
    sys.exit(1)

print("\n🎉 Chapter 9 Complete! You are a Directive Engineer.")
```

---

## Summary

**What you learned:**

1. ✅ **Directive vs. Vibe**: Why clear instructions are mandatory in Finance.
2. ✅ **CIF Pattern**: A structured framework for every prompt.
3. ✅ **Chain of Thought**: Forcing step-by-step mathematical reasoning.
4. ✅ **Few-Shot**: Using examples to guarantee 100% extraction accuracy.

**Key Takeaway**: Don't just "ask" the AI. Give it a **Directive**. If it doesn't show its work and cite its sources, don't trust the answer.

**Skills unlocked**: 🎯
- Advanced Instruction Design
- Logic Orchestration
- Forensic Data Extraction

**Looking ahead**: Now that we have the "Brain" (Prompts) and the "Terminal" (Client), we need to learn how to handle **Streaming Responses** in **Chapter 10** to provide real-time updates as the AI thinks.

---

**Next**: [Chapter 10: Streaming Financial Intelligence →](chapter-10-streaming.md)
