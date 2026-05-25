# Curated Learning Resources

Use this file as a starting map for optional student references. It is not a replacement for the lesson flow.

Before publishing a lesson, the AI author must do a fresh web search for one current, high-quality visual or video resource for the exact lesson topic. Prefer official course pages, respected educators, university material, or project documentation. Do not link to pirated books, unofficial PDF mirrors, or low-trust reposts.

## How To Use Resources In Lessons

Add optional resources only after the core lesson path:

```markdown
## Cafe Visual Break

If you want a more visual explanation before continuing, watch or skim:

- Video: [title](url) - why this helps
- Diagram or mind map: included below or linked here

You do not need this to finish the exercise. Return to `workbench.py` after the visual pass.
```

Keep the tone friendly and concrete: explain the idea like a friend at a cafe with a notebook, a sketch, and small examples. Resources should support the learner's understanding, not become an endless detour.

## Resource Selection Rules

- Prefer one best video/resource per lesson, not a long playlist.
- Prefer visual explainers for abstract concepts such as attention, transformers, RAG flow, agents, evals, and deployment.
- Prefer docs or books for exact APIs and professional references.
- Add a one-sentence reason for every link.
- Include the access expectation: free, free-to-audit, paid, or library/subscription.
- If a resource is time-sensitive, write "refresh before publishing".

## Module Resource Map

| Area | Seed visual/video resource | Books and deeper references | Courses and docs |
| --- | --- | --- | --- |
| Module 0: Python and pytest | Search fresh for a short topic-specific Python/pytest video before publishing each lesson. | [Python documentation](https://docs.python.org/3/) and [pytest documentation](https://docs.pytest.org/) | [pytest docs](https://docs.pytest.org/en/stable/contents.html) |
| Module 1: Whole-game AI engineering | [fast.ai Practical Deep Learning for Coders](https://course.fast.ai/index.html), for action-first teaching style | [Designing Machine Learning Systems](https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/) for system thinking | [Made With ML](https://madewithml.com/) for production-oriented ML workflow |
| Module 2: first principles and transformers | [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html) and [3Blue1Brown attention lesson](https://www.3blue1brown.com/lessons/attention/) | [Hands-On Large Language Models](https://www.llm-book.com/) | [How Transformer LLMs Work](https://learn.deeplearning.ai/courses/how-transformer-llms-work/information) |
| Module 3: LLM APIs, PromptOps, tools, MCP | Search fresh for the exact API/tool topic; prefer official provider tutorials or visual walkthroughs. | [Hands-On Large Language Models](https://www.llm-book.com/) | [OpenAI prompting guide](https://platform.openai.com/docs/guides/prompting), [OpenAI prompt engineering help](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api), [MCP docs](https://modelcontextprotocol.io/docs/learn) |
| Module 4: RAG and agentic workflows | Search fresh for a visual RAG or workflow diagram/video for each lesson. | [RAG with Python Cookbook](https://www.oreilly.com/library/view/rag-with-python/9798341600553/) | [Hugging Face Agents Course](https://huggingface.co/learn/agents-course/unit1), [AI Agents in LangGraph](https://learn.deeplearning.ai/courses/ai-agents-in-langgraph/information) |
| Module 5: production evaluation and reliability | Search fresh for eval, observability, or deployment videos tied to the lesson. | [Designing Machine Learning Systems](https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/) | [OpenAI evaluation best practices](https://platform.openai.com/docs/guides/evaluation-best-practices), [Made With ML](https://madewithml.com/) |
| Module 6: FinAgent capstone | Search fresh for portfolio/demo walkthroughs relevant to the chosen capstone interface. | [AI Engineering by Chip Huyen](https://www.oreilly.com/library/view/ai-engineering/9781098166298/) if available through library/subscription; use official publisher pages only | [Full Stack LLM Bootcamp](https://fullstackdeeplearning.com/llm-bootcamp) for end-to-end AI app patterns |
| Web scraping specialization | Search fresh for a lesson-specific scraping ethics or parser walkthrough. | Official docs for the selected parser/browser library | Use official docs for Requests/BeautifulSoup/Playwright/Scrapy depending on the project |

## Visual Standards

Each module should include at least one of these:

- Mermaid flowchart for data or control flow
- Mermaid mind map for conceptual relationships
- sequence diagram for tool/API/agent interactions
- table mapping input -> transformation -> output -> failure mode
- small ASCII sketch when Mermaid would be overkill

Visuals must clarify the learner's next action. Do not add decorative diagrams.
