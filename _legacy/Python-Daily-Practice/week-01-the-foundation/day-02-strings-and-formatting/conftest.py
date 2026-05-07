"""Ensure local imports resolve correctly under importlib mode."""
import sys
from pathlib import Path

_dir = str(Path(__file__).parent)

# Evict locally-named modules cached from a previous day directory
for _mod in ("solution_template", "core", "utils", "main"):
    sys.modules.pop(_mod, None)

# Ensure this day's directory is first on sys.path
if _dir in sys.path:
    sys.path.remove(_dir)
sys.path.insert(0, _dir)


# ── Model answers — shown in terminal after all tests pass ──────────────────

_MODEL_ANSWERS = """\

╔══════════════════════════════════════════════════════════════════════════════╗
║              DAY 02 — MODEL ANSWERS & BEST APPROACHES                      ║
╚══════════════════════════════════════════════════════════════════════════════╝

─── reverse_string ───────────────────────────────────────────────────────────
APPROACH A  (manual loop — explicit, educational)
    reverse = []
    for i in range(1, len(text) + 1):
        reverse.append(text[-i])
    return "".join(reverse)

★ BEST APPROACH  (slice with step -1 — idiomatic Python, one line)
    # text[::-1] means: take all characters, stepping backwards by 1.
    # This is the canonical Python idiom for string reversal.
    return text[::-1]

─── count_vowels ─────────────────────────────────────────────────────────────
APPROACH A  (explicit loop with counter variable)
    count = 0
    for ch in text.lower():
        if ch in "aeiou":
            count += 1
    return count

★ BEST APPROACH  (sum() + generator expression — Pythonic one-liner)
    # sum() over a generator is concise and avoids a mutable counter variable.
    # text.lower() handles case-insensitivity in one call before the loop.
    return sum(1 for ch in text.lower() if ch in "aeiou")

─── title_case ───────────────────────────────────────────────────────────────
APPROACH A  (explicit loop)
    words = text.split(" ")
    result = []
    for word in words:
        result.append(word[0].upper() + word[1:].lower() if word else "")
    return " ".join(result)

★ BEST APPROACH  (list comprehension + str.join — Pythonic)
    # word[0].upper() + word[1:].lower() manually replicates .title() behaviour
    # without calling it. The list comprehension + join is the idiomatic pattern.
    # Guard `if word` handles empty strings from multiple consecutive spaces.
    return " ".join(
        word[0].upper() + word[1:].lower() if word else ""
        for word in text.split(" ")
    )

─── extract_digits ───────────────────────────────────────────────────────────
APPROACH A  (explicit loop + list append)
    digits = []
    for ch in text:
        if ch.isdigit():
            digits.append(ch)
    return "".join(digits)

★ BEST APPROACH  (join + generator expression — Pythonic one-liner)
    # Combining join() with a generator avoids building an intermediate list.
    # str.isdigit() returns True for Unicode digit characters, not just 0-9.
    return "".join(ch for ch in text if ch.isdigit())

─── format_greeting ──────────────────────────────────────────────────────────
★ BEST APPROACH  (f-string interpolation — only sensible approach here)
    # f-strings are the modern Python 3.6+ way to embed expressions in strings.
    # Note the exact punctuation: comma after "Hello", exclamation after name,
    # period at the end — the test checks for these literally.
    return f"Hello, {name}! You are {age} years old and live in {city}."

══════════════════════════════════════════════════════════════════════════════
"""


def pytest_terminal_summary(terminalreporter, exitstatus: int, config) -> None:
    """Show model answers only when all tests pass — reward, not spoiler."""
    if exitstatus == 0:
        terminalreporter.section(
            "DAY 02 — MODEL ANSWERS & BEST APPROACHES", sep="═"
        )
        terminalreporter.write(_MODEL_ANSWERS)
