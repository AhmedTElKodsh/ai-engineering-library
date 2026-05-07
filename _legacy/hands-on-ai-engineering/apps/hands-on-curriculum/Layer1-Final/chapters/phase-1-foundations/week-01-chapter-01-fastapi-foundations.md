# Week 1 · Phase 1: Build Your First Document API
### *Or: how one async keyword changes everything*

<!--
METADATA
week: 1
phase: Phase 1 — Engineering Foundations + LLM Contact
time: 4 hours (80 min learn · 120 min build · 40 min document)
difficulty: ⭐⭐ (assumes Python basics from Phase 0)
concepts_introduced: [async/await, FastAPI routing, Pydantic request/response models, SQLAlchemy async sessions]
concepts_reinforced: [Pydantic BaseModel, type hints, .env config]
concepts_previewed: [LLM integration in Week 3, Docker in Week 2]
flagship_project: Flagship #1 – v1 first endpoint
prerequisites: Phase 0 complete (Pydantic, type hints, env vars)
-->

---

## 🗺️ The Map — Where You Are, Where You're Going

You just finished Phase 0. You can model data with Pydantic, handle config with `.env`, and write typed Python. 

Today you build your first server. Not a toy server — a production-style async API that you'll evolve for the next 22 weeks.

By the end of this chapter you'll have:
- A running FastAPI app that talks to PostgreSQL
- Two endpoints: `POST /documents` and `GET /documents/{id}`
- One pytest test that proves it works
- Your first commit to the Flagship project

```mermaid
mindmap
  root((Week 1))
    You Already Know
      Pydantic models
      Type hints
      .env config
    New Today
      async/await
      FastAPI routing
      SQLAlchemy async
      Alembic migrations
    Coming Soon
      Docker & CI in Week 2
      First LLM call in Week 3
      Vector search in Week 4
```

---

## 🎣 Act 1 — The Hook

It's Monday morning at an Egyptian infrastructure consultancy — the kind that manages bridge inspections, soil reports, and structural assessments across 200+ active projects.

The junior developer hands you a ticket: *"Our document upload script is crashing under load. Engineers are waiting 20 seconds per upload. Can you fix it?"*

You open the file.

```python
# current_upload.py  ← what you inherited
import psycopg2
import flask

app = flask.Flask(__name__)

@app.route("/upload", methods=["POST"])
def upload_document():
    # This connects to DB for EVERY single request.
    # One slow request blocks all others.
    conn = psycopg2.connect(DATABASE_URL)  
    data = request.json
    conn.execute("INSERT INTO documents VALUES (...)")
    conn.close()
    return {"status": "ok"}
```

Three engineers upload simultaneously. The server handles them *one at a time*. The second engineer waits for the first to finish. The third waits for both.

**Stop and think for 10 seconds:** why does this get worse as the team grows, not better?

---

The answer is in a single word: *synchronous*. One thread, one job at a time. The whole server freezes while waiting for Postgres.

Today you replace this with an async API that handles dozens of simultaneous uploads without breaking a sweat. And you'll understand exactly why it works.

---

## 🔥 Act 2 — The Friction

Let's make the problem concrete. Run this (no Postgres needed — we simulate the wait):

```python
# friction_demo.py
import time
import threading

def handle_upload(engineer_name: str):
    print(f"{engineer_name} started upload")
    time.sleep(2)  # simulate DB write taking 2 seconds
    print(f"{engineer_name} upload complete")

# Three engineers upload at the same time:
start = time.time()
# Synchronous — one at a time:
handle_upload("Ahmed")
handle_upload("Sara")
handle_upload("Karim")
print(f"Total time: {time.time() - start:.1f}s")
```

**Expected output:**
```
Ahmed started upload
Ahmed upload complete
Sara started upload
Sara upload complete
Karim started upload
Karim upload complete
Total time: 6.0s
```

Six seconds. Three engineers waiting. Ahmed is done in 2s but Sara can't start until Ahmed finishes.

> **Now the question:** what if all three could *start at the same time*, each waiting for the DB without blocking each other?

That's what async gives you. We'll see the proof at the end of this chapter.

---

## 💡 Act 3 — Concepts

### Concept 1: async/await — Cooperative Multitasking

Here's the honest explanation: `async def` doesn't run code faster. It tells Python: *"when you hit an `await`, you're allowed to go do something else while waiting."*

**The analogy:** You're a waiter at a café. Synchronous means you stand at the coffee machine waiting for each espresso to brew before taking the next order. Async means you take three orders, start all three machines, then deliver as each one finishes. Same machines, same brew time — but you're *never idle*.

```mermaid
sequenceDiagram
    participant A as Ahmed's Request
    participant B as Sara's Request  
    participant C as Karim's Request
    participant DB as PostgreSQL

    Note over A,DB: Synchronous (current)
    A->>DB: INSERT document
    DB-->>A: Done (2s later)
    B->>DB: INSERT document
    DB-->>B: Done (2s later)
    C->>DB: INSERT document
    DB-->>C: Done (2s later)
    Note over A,DB: Total: 6 seconds

    Note over A,DB: Async (today)
    A->>DB: INSERT document (awaits)
    B->>DB: INSERT document (awaits)
    C->>DB: INSERT document (awaits)
    DB-->>A: Done
    DB-->>B: Done
    DB-->>C: Done
    Note over A,DB: Total: ~2 seconds
```

*All three requests hit the DB concurrently. The server isn't idle — it's managing all three at once.*

**The minimal version:**

```python
import asyncio

async def handle_upload(engineer_name: str):
    print(f"{engineer_name} started")
    await asyncio.sleep(2)  # "await" = "I'm waiting, go do something else"
    print(f"{engineer_name} done")

async def main():
    # Run all three concurrently:
    await asyncio.gather(
        handle_upload("Ahmed"),
        handle_upload("Sara"),
        handle_upload("Karim"),
    )

asyncio.run(main())
```

**Try it now.** Save and run. You'll see all three start immediately, all three finish around the 2-second mark. Total time: ~2 seconds, not 6.

> **Stop and think:** why does `asyncio.sleep(2)` work here but `time.sleep(2)` wouldn't?

`time.sleep` is *blocking* — it freezes the whole thread. `asyncio.sleep` tells the event loop: "I'm waiting, give the CPU to someone else." The distinction matters: DB queries, HTTP calls, and file I/O are all `await`-able. CPU-heavy work is not.

---

### Concept 2: FastAPI + Pydantic — Typed HTTP

You already know Pydantic from Phase 0. FastAPI is built on top of it. The connection is direct: your Pydantic models *become* your API schema. No manual serialization, no schema files — the types you write are the contract.

```mermaid
graph LR
    subgraph "What you write (Python)"
        A["class DocumentCreate\n(BaseModel):\n  title: str\n  content: str\n  project_id: int"]
    end
    subgraph "What FastAPI generates automatically"
        B["POST /documents\nRequest body: {\n  title: string,\n  content: string,\n  project_id: integer\n}"]
        C["OpenAPI docs at\n/docs"]
        D["Validation errors\nwith clear messages"]
    end
    A --> B
    A --> C
    A --> D
    style A fill:#3b82f6,color:#fff
    style B fill:#22c55e,color:#fff
```

*Caption: Your Pydantic class does triple duty — it validates, documents, and serializes. For free.*

**The pattern — always the same three layers:**

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Layer 1: Request model (what you ACCEPT)
class DocumentCreate(BaseModel):
    title: str
    content: str
    project_id: int

# Layer 2: Response model (what you RETURN)
class DocumentResponse(BaseModel):
    id: int
    title: str
    project_id: int
    created_at: str

# Layer 3: The endpoint wires them together
@app.post("/documents", response_model=DocumentResponse)
async def create_document(doc: DocumentCreate):
    # doc is already validated by the time you get here
    # if title is missing, FastAPI returned 422 before calling this
    ...
```

> **Stop and think:** if someone sends `{"title": 42, "content": "...", "project_id": "abc"}`, what happens?

FastAPI/Pydantic returns a `422 Unprocessable Entity` with a detailed error message — before your function is ever called. You don't write any validation logic. The types are the validation.

---

## 🧠 Act 4 — Expert Modeling: Watch Me Build It

OK — I'm going to build the actual Document API. I'll narrate what I'm thinking at each decision point.

**First: project structure.** I don't dump everything in one file. Even week 1 gets a real layout:

```
src/
├── api/
│   ├── __init__.py
│   └── routes/
│       ├── __init__.py
│       └── documents.py    ← our router today
├── models/
│   ├── __init__.py
│   ├── schemas.py          ← Pydantic request/response models
│   └── database.py         ← DB models + session
└── main.py                 ← app factory
```

*Why separate `schemas.py` from `database.py`? Because your Pydantic models (what the API shows) and your DB models (what Postgres stores) are different things. They overlap, but they're not the same. Mixing them causes pain at week 18.*

---

**Step 1: Database session (the async part that matters)**

```python
# src/models/database.py

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import Column, Integer, String, Text, DateTime, func

DATABASE_URL = "postgresql+asyncpg://user:pass@localhost/civil_docs"

# asyncpg driver = the key to async DB calls
engine = create_async_engine(DATABASE_URL, echo=False)

# Session factory — gives you a new async session per request
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    content = Column(Text)
    project_id = Column(Integer, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
```

*I'm using `postgresql+asyncpg` not just `postgresql`. The `asyncpg` driver is what makes DB calls awaitable. Without it, `async def` is just decoration — you'd still block.*

---

**Step 2: Pydantic schemas**

```python
# src/models/schemas.py

from pydantic import BaseModel, Field
from datetime import datetime


class DocumentCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    content: str
    project_id: int = Field(..., gt=0)


class DocumentResponse(BaseModel):
    id: int
    title: str
    project_id: int
    created_at: datetime

    class Config:
        from_attributes = True  # allows building from SQLAlchemy ORM objects
```

*Notice `from_attributes = True`. Without it, `DocumentResponse.from_orm(db_doc)` fails because Pydantic can't read SQLAlchemy attribute objects. This trips everyone up the first time.*

---

**Step 3: The router**

```python
# src/api/routes/documents.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.models.database import Document, AsyncSessionLocal
from src.models.schemas import DocumentCreate, DocumentResponse

router = APIRouter(prefix="/documents", tags=["documents"])


async def get_db():
    """Dependency: gives each request its own DB session, closes it after."""
    async with AsyncSessionLocal() as session:
        yield session
        # session.close() happens automatically here


@router.post("", response_model=DocumentResponse, status_code=201)
async def create_document(
    doc: DocumentCreate,
    db: AsyncSession = Depends(get_db)  # FastAPI injects the session
):
    db_doc = Document(
        title=doc.title,
        content=doc.content,
        project_id=doc.project_id
    )
    db.add(db_doc)
    await db.commit()
    await db.refresh(db_doc)  # loads the auto-generated id and created_at
    return db_doc


@router.get("/{document_id}", response_model=DocumentResponse)
async def get_document(
    document_id: int,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Document).where(Document.id == document_id)
    )
    doc = result.scalar_one_or_none()
    if doc is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc
```

*`Depends(get_db)` is FastAPI's dependency injection. It runs `get_db()`, hands you the session, and automatically closes it when the request finishes — even if an exception was raised. You never call `session.close()` yourself. This is one of FastAPI's best features.*

---

**Step 4: App factory**

```python
# src/main.py

from fastapi import FastAPI
from src.api.routes.documents import router as documents_router


def create_app() -> FastAPI:
    app = FastAPI(
        title="Civil Engineering Document API",
        description="Phase 1 Flagship — Document management for structural projects",
        version="0.1.0"
    )
    app.include_router(documents_router)
    return app


app = create_app()
```

**Run it:**
```bash
uvicorn src.main:app --reload --port 8000
```

Open `http://localhost:8000/docs` — your full API documentation is live. No extra work.

---

**What I'd do differently in production:**
> Add connection pooling config (`pool_size`, `max_overflow`), structured logging with request IDs, and a `/health` endpoint. We'll add all three in Week 17. Don't add them now — it's noise until you understand why you need them.

---

## ✍️ Act 5 — Your Turn: Scaffolded Practice

### Exercise 1 — Guided (TODOs provided)

Add a `PATCH /documents/{id}` endpoint that updates the title.

```python
# src/api/routes/documents.py — add this below the GET endpoint

class DocumentUpdate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)


@router.patch("/{document_id}", response_model=DocumentResponse)
async def update_document_title(
    document_id: int,
    update: DocumentUpdate,
    db: AsyncSession = Depends(get_db)
):
    # TODO 1: Fetch the document (use the same pattern as get_document above)
    doc = TODO

    # TODO 2: If not found, raise HTTPException (status_code=404)
    if doc is TODO:
        raise TODO

    # TODO 3: Update the title
    doc.title = TODO

    # TODO 4: Commit and refresh
    await db.TODO
    await db.TODO

    return doc
```

<details>
<summary>💡 Hint — stuck on TODO 1?</summary>

Use the exact same `select` pattern from `get_document`. You already wrote it — copy and adapt it.

</details>

<details>
<summary>✅ Solution</summary>

```python
@router.patch("/{document_id}", response_model=DocumentResponse)
async def update_document_title(
    document_id: int,
    update: DocumentUpdate,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Document).where(Document.id == document_id)
    )
    doc = result.scalar_one_or_none()
    if doc is None:
        raise HTTPException(status_code=404, detail="Document not found")
    
    doc.title = update.title
    await db.commit()
    await db.refresh(doc)
    return doc
```

**Why `db.refresh(doc)`?** After commit, the in-memory object might be stale. `refresh` reloads from DB — important if the DB has triggers that modify other fields.

</details>

---

### Exercise 2 — Semi-Guided (requirements only)

Add a `DELETE /documents/{id}` endpoint.

Requirements:
- Return `204 No Content` on success (not 200)
- Return `404` if the document doesn't exist
- The response body should be empty (no JSON)

Hint: in FastAPI, `status_code=204` + `return None` gives you an empty 204 response. Look up `Response` from `fastapi` if you want to be explicit.

*No starter code this time. You have everything you need from the examples above.*

---

### Exercise 3 — Open (you design it) 🐛

The code below has a bug. It compiles, it runs, and tests pass for normal cases. But it silently corrupts data under one specific condition. Find it.

```python
@router.post("", response_model=DocumentResponse, status_code=201)
async def create_document(doc: DocumentCreate, db: AsyncSession = Depends(get_db)):
    db_doc = Document(**doc.dict())
    db.add(db_doc)
    await db.commit()
    return db_doc  # ← bug is here
```

<details>
<summary>🔍 What breaks and when</summary>

`return db_doc` without `await db.refresh(db_doc)` means you're returning the in-memory object *before* the DB fills in auto-generated fields (`id`, `created_at`). 

For simple cases this still "works" because SQLAlchemy populates `id` after commit — but `created_at` (set by `server_default=func.now()`) is a server-side default. SQLAlchemy doesn't know its value until you refresh. You'll return `created_at: null` to the caller.

**The fix:** always `await db.refresh(db_doc)` after commit when you return the object.

</details>

---

## 🏗️ Act 6 — Build: Wire Into Flagship #1

You've got working endpoints. Now make them the foundation of your evolving project.

**Your Flagship #1 starts here.** Every week it gains a layer. By Week 10, it's a production RAG system with auth, monitoring, and hybrid search. But the bones are the CRUD API you just built.

**Do this now:**

1. Create `apps/flagship-1/` in your portfolio repo (not inside this curriculum repo — in your own portfolio).

2. Copy your `src/` structure into it. Your Flagship is a *real project*, not a chapter exercise.

3. Add this test to `tests/test_documents.py`:

```python
# tests/test_documents.py
import pytest
from httpx import AsyncClient, ASGITransport
from src.main import app


@pytest.mark.asyncio
async def test_create_and_fetch_document():
    """Round-trip: create a document, then retrieve it by ID."""
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as client:
        # Create
        response = await client.post("/documents", json={
            "title": "Bridge #B12 Inspection Report",
            "content": "Rebar corrosion detected at expansion joint B2.",
            "project_id": 1
        })
        assert response.status_code == 201
        doc_id = response.json()["id"]
        assert response.json()["title"] == "Bridge #B12 Inspection Report"

        # Fetch by ID
        response = await client.get(f"/documents/{doc_id}")
        assert response.status_code == 200
        assert response.json()["project_id"] == 1


async def test_fetch_missing_document():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as client:
        response = await client.get("/documents/99999")
        assert response.status_code == 404
```

4. Run it:
```bash
pytest tests/test_documents.py -v
```

You should see:
```
PASSED tests/test_documents.py::test_create_and_fetch_document
PASSED tests/test_documents.py::test_fetch_missing_document
```

---

## 🔭 Act 7 — The Bigger Picture

Here's your Flagship #1 architecture after today. It's small. It's supposed to be small. Watch how it grows.

```mermaid
graph TD
    subgraph "Week 1 — What You Built Today"
        Client["🧑‍💻 API Client\n(curl, pytest, Postman)"]
        API["FastAPI App\nPOST /documents\nGET /documents/:id\nPATCH /documents/:id\nDELETE /documents/:id"]
        DB[("PostgreSQL\ndocuments table")]
        Client -->|"HTTP request\n+ Pydantic validation"| API
        API -->|"async SQLAlchemy\nawait db.execute()"| DB
    end

    subgraph "Week 2 — Coming Soon"
        Docker["🐳 Docker\n+ docker-compose"]
        CI["GitHub Actions CI\npytest on every push"]
    end

    subgraph "Week 3 — Coming Soon"
        LLM["🤖 LLM Layer\nText extraction\nfrom raw documents"]
    end

    API -.->|"will run inside"| Docker
    API -.->|"will be tested by"| CI
    API -.->|"will be enhanced by"| LLM

    style API fill:#3b82f6,color:#fff
    style DB fill:#6b7280,color:#fff
    style Docker fill:#f59e0b,color:#000
    style LLM fill:#22c55e,color:#fff
```

*The blue box is today. The yellow and green boxes are the next two weeks. Notice: you're not adding new endpoints — you're adding layers around what already exists.*

**What's next:** Week 2 is Docker + CI. You're going to containerize this API, write a `docker-compose.yml` that spins up Postgres automatically, and add a GitHub Actions workflow that runs your tests on every push. That's it — but it'll make every future week easier.

---

## 🐛 Debugging Challenge — Find the Real Bug

This code runs, passes basic tests, but has a problem that will hurt you at scale. What is it?

```python
# A junior dev wrote this list endpoint
@router.get("", response_model=list[DocumentResponse])
async def list_documents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Document))
    return result.scalars().all()
```

<details>
<summary>🔍 The Problem + Why It Hurts</summary>

No pagination. `select(Document)` without `LIMIT` returns *every row in the table*. At 100 documents this seems fine. At 10,000 inspection reports it returns 10,000 rows in a single response. Memory spikes, response times balloon, and the DB query holds a lock.

**The fix:**
```python
@router.get("", response_model=list[DocumentResponse])
async def list_documents(
    skip: int = 0,
    limit: int = Query(default=20, le=100),  # max 100 per page
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Document).offset(skip).limit(limit)
    )
    return result.scalars().all()
```

This is one of those bugs that only shows up in production. Put it in your Failure Log.

</details>

---

## 📝 Act 8 — Reflection + Commit

### Your Failure Log Entry

Drop this into `Layer1-Final/guides/FAILURE-LOG.md`:

```markdown
## Week 1: FastAPI Foundations

**What broke:**
[The error or unexpected behavior you hit today — exact message if possible]

**Why it broke:**
[What you misunderstood or overlooked]

**How I fixed it:**
[What you actually did]

**What I'd do differently:**
[One change if starting fresh]
```

---

### The One-Sentence Test (Feynman Check)

Complete this before committing:

> "Today I learned that _____________ because I _____________, and next week I'll
> use this when I _____________."

If you can't fill it in naturally, re-read Act 3 (the async concept section).

---

### Commit

```bash
git add src/ tests/ 
git commit -m "week-01: async FastAPI CRUD API for civil engineering documents

- POST /documents with Pydantic validation
- GET /documents/:id with 404 handling
- PATCH and DELETE endpoints
- pytest round-trip test passing

Flagship #1 v0.1 — foundation layer"

git push
```

---

### Looking Ahead

You've got async, Pydantic schemas, SQLAlchemy sessions, and a working test. Week 2 takes this exact project and wraps it in Docker so it runs anywhere, then adds GitHub Actions so tests run automatically on every push.

Here's the thing you'll discover in Week 2: the `asyncpg` driver needs to be in your `requirements.txt`, or the Docker container fails silently at startup. You'll see why pinning dependencies matters.

---

## ⚡ Quick Reference Card

### The Four FastAPI Patterns You'll Use Weekly

```python
# 1. Create (POST) — returns 201
@router.post("", response_model=ResponseModel, status_code=201)
async def create(body: CreateModel, db: AsyncSession = Depends(get_db)):
    ...

# 2. Read (GET) — returns 200 or 404
@router.get("/{id}", response_model=ResponseModel)
async def get(id: int, db: AsyncSession = Depends(get_db)):
    ...

# 3. Update (PATCH) — partial update, returns 200
@router.patch("/{id}", response_model=ResponseModel)
async def update(id: int, body: UpdateModel, db: AsyncSession = Depends(get_db)):
    ...

# 4. Delete (DELETE) — returns 204, no body
@router.delete("/{id}", status_code=204)
async def delete(id: int, db: AsyncSession = Depends(get_db)):
    ...
```

### Key Async DB Pattern

```python
# Always: execute → extract → use
result = await db.execute(select(Model).where(Model.id == id))
obj = result.scalar_one_or_none()  # None if not found
if obj is None:
    raise HTTPException(404)
```

### Error Status Codes

| Code | Meaning | When to use |
|------|---------|-------------|
| `201 Created` | POST success | Resource was created |
| `204 No Content` | DELETE success | No body to return |
| `400 Bad Request` | Client sent bad data | You raise this explicitly |
| `404 Not Found` | Resource missing | After `scalar_one_or_none() is None` |
| `422 Unprocessable` | Pydantic validation failed | FastAPI raises this automatically |

### Key Definitions

- **async/await**: cooperative multitasking — `await` yields the thread to the event loop while waiting for I/O
- **`AsyncSession`**: SQLAlchemy session that uses `await` for all DB operations
- **`Depends(get_db)`**: FastAPI dependency injection — runs `get_db()`, passes the result to your function
- **`from_attributes = True`**: tells Pydantic to read from ORM object attributes, not just dicts

---

## ✅ Author Checklist

- [x] Hook is a story (Egyptian infrastructure consultancy). Ends with a question.
- [x] Friction shows broken code + simulated output.
- [x] Max 2 new concepts per section (async/await, FastAPI+Pydantic).
- [x] Each concept: plain English + analogy + mermaid diagram + code + stop-and-think.
- [x] Expert modeling narrates decisions (asyncpg, `from_attributes`, `Depends`).
- [x] Three exercise levels: guided (TODOs) → semi-guided (requirements) → open (bug hunt).
- [x] Flagship build: specific files, working test, commit message.
- [x] Architecture diagram shows Week 1 layer + Week 2/3 previews highlighted.
- [x] Spiral: references Phase 0 (Pydantic) + previews Week 2/3/17.
- [x] Tone: second person, contractions, acknowledges tricky parts.
- [x] Failure Log template included.
- [x] Commit message template included.

---

**Week 1 Complete!** ✓

`▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░ 1/28 weeks`

---

<!--
CHAPTER METADATA
week: 1
phase: 1 — Engineering Foundations + LLM Contact
concepts_introduced: [async/await, FastAPI routing, Pydantic schemas (request/response split), SQLAlchemy async sessions, Alembic migrations, FastAPI Depends injection]
concepts_reinforced: [Pydantic BaseModel, Field validators, type hints, .env config]
concepts_previewed: [Docker Week 2, GitHub Actions Week 2, LLM integration Week 3, pgvector Week 4]
flagship_project: Flagship #1 v0.1 — foundation layer
mermaid_diagrams:
  - mindmap: "Week 1 knowledge map — prior, new, upcoming"
  - sequenceDiagram: "Sync vs async request handling comparison"
  - graph LR: "Pydantic → FastAPI schema generation flow"
  - graph TD: "Full Flagship #1 architecture — Week 1 layer with previews"
exercises:
  - guided: "Add PATCH /documents/:id with TODO scaffolding + solution in <details>"
  - semi_guided: "Add DELETE /documents/:id from requirements only"
  - open: "Debug list endpoint — missing pagination bug hunt"
estimated_hours: 4
difficulty: intermediate (Phase 0 prerequisite)
-->
