# Core Lab 3: API-First Collection

## Learning Logic

Use the course map in `curriculum/LEARNER_JOURNEY_MAP.md` and the local module README to keep this lesson bounded.

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | extract records from static HTML fixtures. |
| What new capability am I adding? | prefer JSON APIs, validate records, and separate raw/clean/failed layers. |
| What failure does this help me catch? | schema drift, missing payload fields, and silent bad records. |
| How does this improve FinAgent or a practical AI system? | helps FinAgent use stable API data before scraping pages. |
| What should I be able to explain afterward? | why API-first collection is often safer than scraping. |

## Minimum Path, Enrichment, And Doorway

- **Minimum path:** read the scenario, inspect the tests or fixtures, complete the TODOs in `workbench.py`, run the verification command, and write the reflection/evidence note.
- **Optional enrichment:** add one edge case, comparison, or small test after the required behavior works.
- **Advanced doorway:** notice the later advanced topic this prepares for, then return to the bounded Course 1 task.

## Evidence Portfolio

Leave this lesson with technical evidence, failure evidence, explanation evidence, and transfer evidence. A passing test alone is not the whole learning outcome.

## Learning Goal

Prefer a stable JSON endpoint over scraping HTML when an approved source offers structured data.

**Expected time to finish:** 3-4 hours

## Real-World Context

If a source provides structured JSON, use it. API-first collection usually gives cleaner fields, fewer broken selectors, clearer errors, and better provenance than scraping rendered pages.

## Visual Map

```mermaid
flowchart LR
    A["Approved JSON fixture"] --> B["Parse response"]
    B --> C["Validate required fields"]
    C --> D{"Record valid?"}
    D -->|"yes"| E["Clean API records"]
    D -->|"no"| F["Failed API records"]
    E --> G["Raw and clean layers"]
    F --> G
```

## Evidence First

Run:

```powershell
python -m pytest curriculum/specializations/web-scraping/core-lab-03-api-first-collection/tests -v
```

The first run should collect cleanly and fail on TODO behavior in `workbench.py`.

## Learner Outputs

| Artifact | Purpose |
| --- | --- |
| JSON fixture loader | Practice API-style collection without live network instability. |
| Validation report | Keep malformed records visible. |
| Raw and clean layers | Preserve source payload and normalized records separately. |
| API-first decision note | Explain why JSON is preferred over scraping for this source. |

## Module 4 Handoff

The clean API records use the same provenance habit as Core Lab 2, so Module 4 can retrieve from both HTML-derived and API-derived context without losing citation fields.

## Cafe Visual Break

- Reference: [Requests quickstart](https://requests.readthedocs.io/en/master/user/quickstart/) - use the JSON response and status-error sections when you later replace fixtures with live requests.
- Reference: [Python json documentation](https://docs.python.org/3/library/json.html) - use it to understand how fixture JSON becomes Python dictionaries and lists.

