# Week 00 Hints

Use these only after you have run the setup check and the diagnostic at least once.

The diagnostic is a placement tool. Do not try to force every test green before you understand what the failures are telling you.

## Layer 1

Start with the first failure, not the longest failure.

Before editing, answer:

- Did pytest fail before importing the learner file?
- Did the test name a specific function or class?
- Did the assertion compare an expected value with the value your code returned?
- Which concept row in `../concept-review-map.md` matches this failure?

If the failure is a setup or import problem, fix that before changing behavior. If it is an assertion failure, move to the matching function in `diagnostic_workbench.py`.

## Layer 2

### Reading The Signal

A setup failure usually means Python, pytest, or the command path is wrong.

An import failure usually means the learner file has syntax or top-level execution trouble.

An assertion failure means the file loaded, and now one behavior does not match the test example.

Use that distinction to choose the next action. Do not treat all red output the same.

### Choosing Remediation

If failures cluster around lists, dictionaries, or strings, Week 01 is the right next stop.

If failures cluster around classes, exceptions, context managers, or generators, Week 02 is the optional reinforcement lab to keep nearby.

If the diagnostic mostly makes sense, move into Module 1 and return here only when a real blocker appears.

## Layer 3

### Working One Diagnostic Function

For one failing function, read the test example as a tiny user story:

- "given this input"
- "the function should produce this result"
- "because later FinAgent code needs this kind of behavior"

Then make the smallest change you can explain. Re-run only the diagnostic test you touched before moving on.

### Final Check

When you have enough signal, stop. The point of Week 00 is to choose the right path, not to complete a hidden assignment.
