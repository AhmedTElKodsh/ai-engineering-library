# Learning Path

## Step 0 — Diagnostic (15 min)

Run the Python diagnostic first. It tells you where to start.

```bash
# Option A: Python foundations diagnostic
pytest 00-python-foundations/day-00-assessment/ -v

# Option B: AI engineering diagnostic (if you have Python experience)
python 01-ai-engineering/guides/DAY-00-DIAGNOSTIC.py
```

### Scoring → Entry Point

| Python Foundations Score | AI Engineering Diagnostic | → Start |
|---|---|---|
| < 50% | — | `00-python-foundations/week-01-the-foundation/` |
| 50–80% | — | `00-python-foundations/week-02-intermediate-python/` |
| > 80% | 0–2 / 5 | `01-ai-engineering/` Week 0 (compressed) |
| > 80% | 3–4 / 5 | `01-ai-engineering/` Week 1 (compressed, 3 days) |
| > 80% | 5 / 5 | `01-ai-engineering/` Week 1 (full pace) |

---

## Path A — Python First (Recommended for Beginners)

```
Week 01: Day 01–07  (Core Python)
Week 02: Day 08–14  (Production Python)
     ↓
01-ai-engineering/ Phase 1: Weeks 1–4  (FastAPI + SQL + First LLM)
01-ai-engineering/ Phase 2: Weeks 5–10 (RAG Engineering)
01-ai-engineering/ Phase 3: Weeks 11–16 (AI Agents)
01-ai-engineering/ Phase 4: Weeks 17–22 (Production)
01-ai-engineering/ Phase 5: Weeks 23–28 (Capstone + Jobs)
```

Total: ~30 weeks at 20 hrs/week.

---

## Path B — Python Accelerated (Some Python Background)

```
Day 00: Assessment → identify gaps
Days 08–14: Error handling, OOP, generators (1 week sprint)
     ↓
01-ai-engineering/ Phase 1 onward
```

Total: ~29 weeks.

---

## Path C — AI Engineering Direct (Strong Python)

```
01-ai-engineering/guides/DAY-00-DIAGNOSTIC.py → score 4-5/5?
     ↓
01-ai-engineering/ Week 1 onward
```

Total: 28 weeks.

---

## Python Foundations → AI Engineering Curriculum Map

| Python Topic | Days | First Used In AI Curriculum |
|---|---|---|
| Variables & Types | Day 01 | Week 1, Day 1 (SQL schema types) |
| Strings & F-strings | Day 02 | Week 3 (prompt templates) |
| Lists & Tuples | Day 03 | Week 4 (embedding vectors) |
| Dictionaries & Sets | Day 04 | Week 3 (LLM response parsing) |
| Control Flow | Day 05 | Week 1 (route logic) |
| Functions & Closures | Day 06 | Week 2 (pytest fixtures, decorators) |
| Weekly Project | Day 07 | — (consolidation) |
| Error Handling | Day 08 | Week 2 (API error patterns) + Week 3 (LLM retry) |
| Context Managers | Day 09 | Week 2 (DB sessions) + Week 10 (file handling) |
| OOP & Inheritance | Day 10 | Week 1 (Pydantic models) + Week 11 (agent base classes) |
| Magic Methods | Day 11 | Week 4 (custom embedding types) + Week 11 (agent protocols) |
| Comprehensions | Day 12 | Week 4 (batch embeddings) + Week 6 (RAG pipelines) |
| Generators & Yield | Day 12 | Week 3 (streaming LLM responses) |
| Unpacking & Patterns | Day 13 | Week 8 (LangChain chains) + Week 12 (LangGraph nodes) |
| Weekly Project | Day 14 | — (consolidation) |

Full mapping with code examples: [00-python-foundations/CONNECTIONS.md](00-python-foundations/CONNECTIONS.md)

---

## Daily Rhythm (AI Engineering Phase)

```
80 min  → Learn (read guides, watch concepts)
120 min → Build (write code, run tests)
40 min  → Document + Commit + Reflect
```

Track progress in [01-ai-engineering/guides/PROGRESS-TRACKER.md](01-ai-engineering/guides/PROGRESS-TRACKER.md).
