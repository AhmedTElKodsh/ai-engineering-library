"""
Week 02 - Python for Production
Patterns that appear in every production AI system.

Sections:
    1. Error Handling     - custom exceptions, retry, validation
    2. Context Managers   - resource cleanup, timing, transactions
    3. OOP & Inheritance  - base classes, super(), class hierarchies
    4. Magic Methods      - __str__, __eq__, __or__, @property
    5. Comprehensions     - list/dict/set with filtering
    6. Generators         - yield, lazy pipelines, streaming
    7. Pythonic Patterns  - **, zip, enumerate, EAFP
"""



# ===========================================================
# SECTION 1 - Error Handling
# AI use: LLM retry, API validation, structured error reporting
# ===========================================================

class ValidationError(Exception):
    """Raised when input validation fails.

    Attributes:
        field (str): the field that failed
        message (str): human-readable description
    """
    def __init__(self, field: str, message: str):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")


class APIError(Exception):
    """Raised when an external API call fails.

    Attributes:
        status_code (int): HTTP status code (e.g. 429, 500)
        message (str): error description
    """
    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message
        super().__init__(f"HTTP {status_code}: {message}")


def safe_divide(a, b) -> float:
    """Return a / b.

    Raises:
        TypeError: if a or b is not int or float
        ZeroDivisionError: if b == 0
    """
    pass  # YOUR CODE HERE


def validate_llm_config(config: dict) -> dict:
    """Validate an LLM configuration dictionary.

    Required keys and rules:
        "model" (str, non-empty)
        "temperature" (float, 0.0 <= value <= 2.0)
        "max_tokens" (int, 1 <= value <= 32768)

    Returns:
        The validated config dict unchanged.

    Raises:
        ValidationError: with field name if any rule fails.

    AI use: Pydantic does this automatically in Week 1, but understanding
            the manual version makes you a better schema designer.
    """
    if not isinstance(config, dict):
        raise ValidationError("config", "must be a dictionary")
    pass  # YOUR CODE HERE


def process_api_responses(responses: list[dict]) -> dict:
    """Process a list of API responses, separating successes from errors.

    Each response dict has a "status" key (200 = success) and either
    "data" (on success) or "error" (on failure).

    Returns:
        {"successes": [data, ...], "failures": [{"index": i, "error": msg}, ...]}

    AI use: batch LLM processing - some calls succeed and some fail.
    """
    pass  # YOUR CODE HERE


# ===========================================================
# SECTION 2 - Context Managers
# AI use: DB sessions, file handling, LangSmith tracing
# ===========================================================

class Timer:
    """Context manager that measures elapsed time in seconds.

    After the block, self.elapsed holds the duration.

    Usage:
        with Timer() as t:
            do_something()
        print(t.elapsed)

    AI use: timing LLM calls and measuring retrieval latency in production work.
    
    CONCEPT CLARIFICATION:
    Context managers use __enter__ and __exit__ to wrap a code block.
    
    Pattern: with Something() as x: ... triggers:
    1. __enter__ runs BEFORE the block
    2. Your code runs
    3. __exit__ runs AFTER the block (even if there's an error!)
    
    For timing:
    - __enter__: record start time, return self
    - __exit__: record end time, calculate elapsed = end - start
    
    Tip: Use time.time() to get current timestamp in seconds
    """
    def __enter__(self):
        pass  # YOUR CODE HERE

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass  # YOUR CODE HERE


class Suppress:
    """Context manager that suppresses specified exception types.

    Suppressed exceptions are stored in self.exception.

    Usage:
        s = Suppress(ValueError)
        with s:
            int("abc")
        print(s.exception)  # the ValueError

    AI use: suppressing transient network errors in non-critical paths.
    
    CONCEPT CLARIFICATION:
    Like try/except, but as a reusable context manager.
    
    How __exit__ works:
    - exc_type: type of exception (e.g., ValueError) or None
    - exc_val: the actual exception object
    - exc_tb: traceback (you won't need this)
    - Return True to suppress (swallow) the exception
    - Return False/None to let it propagate
    
    Your job:
    - Store the exception types you want to catch
    - In __exit__, check if exc_type matches your types
    - If match: save exc_val and return True (suppress)
    - If no match: return False (let it raise)
    """
    def __init__(self, *exception_types):
        pass  # YOUR CODE HERE

    def __enter__(self):
        pass  # YOUR CODE HERE

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass  # YOUR CODE HERE


class ManagedResource:
    """A simple context manager simulating a DB connection / file handle.

    On enter: sets self.open = True, appends "opened" to self.log.
    On exit (no exception): sets self.open = False, appends "closed".
    On exit (with exception): appends "error: {exc_type.__name__}", then closes.
    Never suppresses exceptions.

    AI use: mirrors SQLAlchemy `with Session() as session:` (Week 1).
    """
    def __init__(self, name: str):
        self.name = name
        self.open = False
        self.log: list[str] = []

    def __enter__(self):
        pass  # YOUR CODE HERE

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass  # YOUR CODE HERE


# ===========================================================
# SECTION 3 - OOP & Inheritance
# AI use: Pydantic BaseModel, agent class hierarchies
# ===========================================================

class BaseModel:
    """Minimal base class - mirrors how Pydantic's BaseModel works.

    Subclasses call super().__init__(**fields) to store typed fields.

    Attributes set by __init__: whatever **fields are passed in.

    Methods:
        model_dump() -> dict: return all instance attributes as a dict
        __repr__() -> str: "ClassName(field=value, ...)"

    AI use: understanding Pydantic's BaseModel pattern (Week 1).
    
    CONCEPT CLARIFICATION:
    The **fields pattern lets you pass any keyword arguments and store them.
    
    Example:
    BaseModel(name="Alice", age=30) → fields = {"name": "Alice", "age": 30}
    
    What **kwargs does:
    - Captures all keyword arguments as a dictionary
    - You can then set them as instance attributes
    
    Pattern for __init__:
    - Loop through fields.items()
    - Use setattr(self, key, value) to set each attribute
    
    For __repr__:
    - Get all attributes with self.__dict__
    - Format as "ClassName(key=value, key=value)"
    """
    def __init__(self, **fields):
        pass  # YOUR CODE HERE

    def model_dump(self) -> dict:
        pass  # YOUR CODE HERE

    def __repr__(self) -> str:
        pass  # YOUR CODE HERE


class DocumentSchema(BaseModel):
    """Schema for a RAG document chunk.

    Fields: title (str), content (str), source (str), chunk_index (int)

    AI use: this mirrors real Pydantic schemas used in Week 1 FastAPI endpoints.

    Example:
        doc = DocumentSchema(title="AI Paper", content="RAG is...", source="arxiv", chunk_index=0)
        doc.model_dump()  # {"title": "AI Paper", ...}
    """
    def __init__(self, title: str, content: str, source: str, chunk_index: int):
        pass  # YOUR CODE HERE


class BaseAgent:
    """Base class for AI agents.

    Attributes:
        name (str): agent name
        model (str): LLM model identifier
        _call_count (int): number of times run() has been called (starts at 0)

    Methods:
        run(input_text: str) -> str: must be overridden by subclasses
        get_stats() -> dict: return {"name", "model", "calls"}
    """
    def __init__(self, name: str, model: str):
        pass  # YOUR CODE HERE

    def run(self, input_text: str) -> str:
        raise NotImplementedError("Subclasses must implement run()")

    def get_stats(self) -> dict:
        pass  # YOUR CODE HERE


class RAGAgent(BaseAgent):
    """A retrieval-augmented generation agent.

    Additional attributes:
        retriever (callable): a function that takes a query string and returns context str
        prompt_template (str): f-string template with {context} and {question} placeholders

    run(question):
        1. Call self.retriever(question) to get context
        2. Format self.prompt_template with context and question
        3. Increment self._call_count
        4. Return the formatted prompt (simulates sending to LLM)

    AI use: this is the RAGAgent pattern learners revisit in the agent module.
    """
    def __init__(self, name: str, model: str, retriever, prompt_template: str):
        pass  # YOUR CODE HERE

    def run(self, question: str) -> str:
        pass  # YOUR CODE HERE


# ===========================================================
# SECTION 4 - Magic Methods
# AI use: LangChain | pipe operator, custom embedding types
# ===========================================================

class Step:
    """A pipeline step that can be composed with | operator.

    Attributes:
        name (str): step name
        transform (callable): function applied to input

    Magic methods:
        __call__(data): apply self.transform(data)
        __or__(other): return Pipeline([self, other])
        __repr__: "Step('{name}')"

    AI use: LangChain builds chains exactly this way using __or__ (Week 8).
    
    CONCEPT CLARIFICATION:
    The | operator lets you chain operations: step1 | step2 | step3
    
    How Python handles operators:
    - a | b calls a.__or__(b)
    - __call__ makes an object callable like a function
    
    Example flow:
    double = Step("double", lambda x: x * 2)
    add_one = Step("add1", lambda x: x + 1)
    chain = double | add_one  # Creates Pipeline([double, add_one])
    result = chain(5)  # 5 → double → 10 → add_one → 11
    
    Your __or__ should: return Pipeline([self, other])
    Your __call__ should: return self.transform(data)
    """
    def __init__(self, name: str, transform):
        self.name = name
        self.transform = transform

    def __call__(self, data):
        pass  # YOUR CODE HERE

    def __or__(self, other):
        pass  # YOUR CODE HERE

    def __repr__(self):
        pass  # YOUR CODE HERE


class Pipeline:
    """An ordered sequence of Steps, composable with |.

    Attributes:
        steps (list[Step]): ordered steps

    __call__(data): apply each step in sequence
    __or__(other): append another step or pipeline, return new Pipeline
    __len__: number of steps
    __repr__: "Pipeline([Step('a'), Step('b')])"
    """
    def __init__(self, steps: list):
        self.steps = steps

    def __call__(self, data):
        pass  # YOUR CODE HERE

    def __or__(self, other):
        pass  # YOUR CODE HERE

    def __len__(self):
        pass  # YOUR CODE HERE

    def __repr__(self):
        pass  # YOUR CODE HERE


class EmbeddingVector:
    """Represents a dense embedding vector.

    Attributes:
        values (list[float]): the vector components
        model (str): the embedding model name

    Magic methods:
        __len__: dimension of the vector
        __eq__: equal if same model and values match within 1e-6
        __repr__: "EmbeddingVector(dim={n}, model='{model}')"
        __getitem__: index/slice into values

    AI use: custom embedding types in the retrieval module.
    """
    def __init__(self, values: list[float], model: str = "text-embedding-3-small"):
        self.values = values
        self.model = model

    def __len__(self):
        pass  # YOUR CODE HERE

    def __eq__(self, other):
        pass  # YOUR CODE HERE

    def __repr__(self):
        pass  # YOUR CODE HERE

    def __getitem__(self, index):
        pass  # YOUR CODE HERE


# ===========================================================
# SECTION 5 - Comprehensions
# AI use: batch embedding, filtering retrieved docs
# ===========================================================

def batch_embed(chunks: list[str], embed_fn) -> list:
    """Apply embed_fn to every chunk using a list comprehension.

    AI use: [embed(c) for c in chunks] - the core of retrieval indexing.
    """
    pass  # YOUR CODE HERE


def filter_by_score(records: list[dict], min_score: float, score_key: str = "score") -> list[dict]:
    """Return records where record[score_key] >= min_score, using list comprehension.

    AI use: filtering retrieved chunks by relevance score.
    """
    pass  # YOUR CODE HERE


def build_metadata_index(docs: list[dict]) -> dict[str, dict]:
    """Build a {source: metadata_dict} index using dict comprehension.

    Each doc has "source" (str) and "metadata" (dict) keys.

    AI use: building document metadata lookup tables.
    """
    pass  # YOUR CODE HERE


def count_by_category(items: list[dict], category_key: str) -> dict[str, int]:
    """Count items per category value using comprehension + grouping.

    AI use: analytics on retrieved document categories in evaluation work.
    """
    pass  # YOUR CODE HERE


# ===========================================================
# SECTION 6 - Generators
# AI use: LLM streaming, lazy document processing pipelines
# ===========================================================

def stream_tokens(text: str, chunk_size: int = 1):
    """Simulate LLM token streaming by yielding text in chunks.

    Yields strings of up to chunk_size characters.

    AI use: every streaming LLM response uses this pattern:
        for chunk in stream_tokens(response): print(chunk, end="", flush=True)
    """
    pass  # YOUR CODE HERE


def batch_generator(items: list, batch_size: int):
    """Yield items in batches of batch_size.

    AI use: processing embeddings in batches to respect API rate limits.

    Example:
        list(batch_generator([1,2,3,4,5], 2)) == [[1,2],[3,4],[5]]
    
    CONCEPT CLARIFICATION:
    A generator function uses `yield` instead of `return` to produce values one at a time.
    
    Example walk-through: batch_generator([1, 2, 3, 4, 5], 2)
    
    First call to next():
    - i = 0
    - Slice items[0:2] = [1, 2]
    - yield [1, 2] (pause here, give [1, 2] to caller)
    
    Second call to next():
    - Resume from where we paused
    - i = 2
    - Slice items[2:4] = [3, 4]
    - yield [3, 4] (pause here, give [3, 4] to caller)
    
    Third call to next():
    - Resume again
    - i = 4
    - Slice items[4:6] = [5]
    - yield [5] (pause here, give [5] to caller)
    
    Fourth call to next():
    - Resume, but loop ends
    - Generator is exhausted, raises StopIteration
    
    Why generators?
    - Memory efficient: don't create all batches at once
    - Lazy: only compute next batch when needed
    - Perfect for large datasets or streaming
    
    Pattern:
    - Loop through items in steps of batch_size: range(0, len(items), batch_size)
    - For each i, slice items[i:i+batch_size]
    - yield (not return!) each batch
    
    Usage: for batch in batch_generator([1,2,3,4,5], 2): print(batch)
    """
    pass  # YOUR CODE HERE


def document_pipeline(raw_docs: list[str], chunk_size: int = 100):
    """Generator pipeline: split each doc into chunks and yield them.

    For each doc, yield chunks of chunk_size characters.
    Skip empty docs.

    AI use: the document ingestion pipeline used in RAG indexing.
    """
    pass  # YOUR CODE HERE


def fibonacci(n: int):
    """Generate first n Fibonacci numbers using yield.

    AI use: generator pattern - same mechanism as streaming LLM responses.
    """
    pass  # YOUR CODE HERE


# ===========================================================
# SECTION 7 - Pythonic Patterns
# AI use: LangGraph state updates, LangChain chain unpacking
# ===========================================================

def update_state(state: dict, **updates) -> dict:
    """Return a new dict merging state with updates (immutable state update).

    AI use: LangGraph state updates use exactly this pattern:
        return {**state, "messages": state["messages"] + [new_msg]}
    """
    pass  # YOUR CODE HERE


def zip_to_records(headers: list[str], *rows) -> list[dict]:
    """Zip headers with each row to create a list of dicts.

    AI use: building structured records from parallel lists.

    Example:
        zip_to_records(["name", "score"], ["Alice", 95], ["Bob", 87])
        -> [{"name": "Alice", "score": 95}, {"name": "Bob", "score": 87}]
    """
    pass  # YOUR CODE HERE


def indexed_chunks(chunks: list[str], start: int = 0) -> list[dict]:
    """Return [{"index": i, "chunk": text}, ...] using enumerate.

    AI use: chunk_index tracking for vector store insertion.
    """
    pass  # YOUR CODE HERE


def deep_get(data: dict, path: str, default=None):
    """Safely navigate nested dict with dot-separated path (EAFP style).

    AI use: safely extracting fields from LLM JSON responses.

    Example:
        deep_get({"user": {"name": "Alice"}}, "user.name") -> "Alice"
        deep_get({"user": {}}, "user.email", "N/A") -> "N/A"
    
    CONCEPT CLARIFICATION:
    Navigate nested dicts like navigating folders: "user.profile.email"
    
    Example walk-through: deep_get({"user": {"profile": {"email": "alice@example.com"}}}, "user.profile.email")
    
    Step 1: Split path by "." → ["user", "profile", "email"]
    Step 2: Start with current = entire dict
    Step 3: Loop through keys:
    
      Iteration 1: key = "user"
      - current = current["user"]
      - current is now {"profile": {"email": "alice@example.com"}}
      
      Iteration 2: key = "profile"
      - current = current["profile"]
      - current is now {"email": "alice@example.com"}
      
      Iteration 3: key = "email"
      - current = current["email"]
      - current is now "alice@example.com"
    
    Step 4: Return current → "alice@example.com" ✓
    
    Example with missing key: deep_get({"user": {}}, "user.email", "N/A")
    
    Step 1: Split path → ["user", "email"]
    Step 2: current = entire dict
    Step 3: Loop:
      
      Iteration 1: key = "user"
      - current = current["user"]
      - current is now {}
      
      Iteration 2: key = "email"
      - Try: current["email"]
      - KeyError! The key doesn't exist
      - Caught by try/except
    
    Step 4: Return default → "N/A"
    
    EAFP = "Easier to Ask Forgiveness than Permission"
    - Don't check if key exists first
    - Just try to access it!
    - Catch KeyError if it fails → return default
    
    Pattern:
    - Split path by "."
    - Try: loop through keys, go deeper each time
    - Except KeyError: return default
    """
    pass  # YOUR CODE HERE
