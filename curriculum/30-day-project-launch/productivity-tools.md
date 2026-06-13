# Productivity Tools For The 30-Day Launch

Timing: set up tools in 45-60 minutes before Day 1. Spend no more than 10
minutes per day maintaining them.

Tools should reduce friction, not become a second project. Use the smallest set
that helps you plan, focus, test, write, and commit.

## Recommended Minimal Stack

| Need | Default choice | Why it fits |
| --- | --- | --- |
| Task board | GitHub Projects or a simple markdown kanban | keeps backlog close to code |
| Daily log | `templates/DAILY_ENGINEERING_LOG.md` in the project repo | produces portfolio and debugging evidence |
| Focus timer | phone timer, desktop timer, or Pomofocus | protects 90-120 minute build blocks |
| Calendar blocks | any calendar app | reserves 5-7 focused hours before the day starts |
| Notes | markdown files, Obsidian, or a plain repo folder | keeps decisions searchable and portable |
| Test command memory | `Makefile`, `justfile`, or `scripts/check_project.py` | avoids forgetting the quality gate |

## Board Setup

Use five columns:

```text
Backlog -> Today -> In Progress -> Review/Debug -> Done
```

Rules:

- Keep only one implementation card in `In Progress`.
- Every card must name the artifact it changes.
- Milestone cards must link tests, evals, logs, or docs.
- Move unfinished work back to `Backlog` or `Today` during the evening review.

GitHub Projects is a good fit when the project already lives on GitHub because
it can track issues, pull requests, board views, and roadmap views in one place.
Trello is a reasonable lightweight kanban alternative when you want a visual
board without tying every task to a GitHub issue.

## Daily Log Setup

Use one log file per day or one running log with dated sections. The log must
capture:

- goal
- files touched
- command run
- first failure
- final result
- AI assistance used
- limitation discovered
- next step

Obsidian daily notes can work if you already use Obsidian, but plain markdown in
the project repository is enough and easier to review with commits.

## Focus Setup

Use timed blocks:

- 45-60 minutes read or trace
- 90-120 minutes build
- 60-120 minutes test and debug
- 30-45 minutes log and commit

Pomodoro-style timers can help when focus is weak, but do not force 25-minute
chunks if a deeper build block is working. The route cares about evidence, not
timer purity.

## Weekly Review Checklist

Run this on Days 7, 14, 21, and 28:

- Is the milestone artifact present?
- Did I run the validation command?
- Do I have one failure example?
- Can I explain the biggest design tradeoff without AI?
- Which stretch items should be cut?

## Optional Tools And Sources

- [GitHub Projects](https://docs.github.com/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects):
  project boards and roadmaps close to repository work.
- [Trello kanban board template](https://trello.com/templates/engineering/kanban-dev-board-lvRpONOJ):
  simple kanban board for learners who prefer a separate visual board.
- [Obsidian Daily Notes](https://obsidian.md/help/plugins/daily-notes):
  dated notes for daily logs and technical journaling.
- [Pomofocus](https://pomofocus.io/): lightweight focus timer.

Tool choice is optional. Do not spend paid tool money for this route unless an
instructor or team already requires it.
