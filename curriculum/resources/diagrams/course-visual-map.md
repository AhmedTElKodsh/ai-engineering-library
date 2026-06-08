# Course Visual Map

Use these Mermaid diagrams as the standard visual language for Course 1. Copy a
diagram into a module README only when it clarifies the lesson.

## Module 0: Python Skill To AI Engineering Use

```mermaid
flowchart LR
    A["Python basics"] --> B["Validation"]
    B --> C["Structured data"]
    C --> D["Tests"]
    D --> E["Small pipelines"]
    E --> F["AI engineering workbenches"]
```

## Module 1: Deterministic FinAgent Pipeline

```mermaid
flowchart LR
    A["Ticker and prices"] --> B["Validate input"]
    B --> C["Compute movement"]
    C --> D["Classify risk wording"]
    D --> E["Educational summary"]
    E --> F["Local request boundary"]
```

## Module 2: Text To Transformer-Style Output

```mermaid
flowchart LR
    A["Text"] --> B["Tokens"]
    B --> C["Vectors"]
    C --> D["Attention"]
    D --> E["Transformer block"]
    E --> F["Traceable output"]
```

## Module 3: Provider, Prompt, Tool, And Trace Boundary

```mermaid
flowchart LR
    A["User request"] --> B["Prompt template"]
    B --> C["Provider boundary"]
    C --> D["Tool contract"]
    D --> E["Structured output"]
    E --> F["Trace metadata"]
```

## Module 4: Raw Data To Cited Answer

```mermaid
flowchart LR
    A["Raw source"] --> B["Clean record"]
    B --> C["Chunk"]
    C --> D["Retrieve"]
    D --> E{"Enough evidence?"}
    E -->|"yes"| F["Cited answer"]
    E -->|"no"| G["Abstain"]
```

## Module 5: Production Release Gate

```mermaid
flowchart LR
    A["Feature"] --> B["Golden eval"]
    B --> C["Logs and traces"]
    C --> D["Cost and latency check"]
    D --> E["Release checklist"]
    E --> F["Known limitations"]
```

## Module 6: FinAgent Capstone Architecture

```mermaid
flowchart LR
    A["Allowed question"] --> B["Validated request"]
    B --> C["Cited retrieval"]
    C --> D["Safety boundary"]
    D --> E["Educational answer"]
    E --> F["Eval and portfolio evidence"]
```
