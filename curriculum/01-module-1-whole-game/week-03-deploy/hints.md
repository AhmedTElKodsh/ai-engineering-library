# Hints: Local FinAgent Request Boundary

## Hint 1

Keep validation separate from analysis. A function that receives arbitrary request data should not also calculate the stock movement.

## Hint 2

Normalize the ticker by stripping whitespace and uppercasing it. Use the same simple rule as earlier lessons: 1-5 alphabetic characters.

## Hint 3

The response should be a dictionary because dictionaries map naturally to JSON responses later.

## Hint 4

Trace metadata can be simple. Include enough information to answer: what operation ran, what source was used, and whether the result succeeded.
