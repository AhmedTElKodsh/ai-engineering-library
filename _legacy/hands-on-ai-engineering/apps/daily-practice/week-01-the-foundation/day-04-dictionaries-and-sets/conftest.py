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
║              DAY 04 — MODEL ANSWERS & BEST APPROACHES                      ║
╚══════════════════════════════════════════════════════════════════════════════╝

─── merge_dicts ──────────────────────────────────────────────────────────────
APPROACH A  (copy + update — explicit and readable)
    result = dict_a.copy()
    result.update(dict_b)
    return result

★ BEST APPROACH  (merge operator, Python 3.9+ — most concise)
    # The | operator merges two dicts; right-hand side wins on conflict.
    # dict_a.copy() + update() is equally idiomatic for older Python.
    return dict_a | dict_b

─── invert_dict ──────────────────────────────────────────────────────────────
APPROACH A  (explicit loop)
    result = {}
    for key, value in d.items():
        result[value] = key
    return result

★ BEST APPROACH  (dict comprehension — Pythonic one-liner)
    # {v: k for k, v in d.items()} is the canonical inversion pattern.
    # Assumes values are unique and hashable — duplicates would silently overwrite.
    return {v: k for k, v in d.items()}

─── common_elements ──────────────────────────────────────────────────────────
APPROACH A  (manual loop)
    seen_a = set(list_a)
    result = []
    for item in list_b:
        if item in seen_a and item not in result:
            result.append(item)
    return sorted(result)

★ BEST APPROACH  (set intersection + sorted — concise and O(n))
    # set & set gives the intersection in O(n) average time.
    # sorted() returns a new list — sets have no guaranteed order.
    return sorted(set(list_a) & set(list_b))

─── group_by_length ──────────────────────────────────────────────────────────
APPROACH A  (setdefault — avoids explicit key-existence check)
    result = {}
    for word in words:
        result.setdefault(len(word), []).append(word)
    return result

★ BEST APPROACH  (defaultdict — cleanest intent)
    # defaultdict(list) auto-initialises missing keys to an empty list.
    # Convert back to a plain dict if callers shouldn't see defaultdict behaviour.
    from collections import defaultdict
    groups = defaultdict(list)
    for word in words:
        groups[len(word)].append(word)
    return dict(groups)

─── dict_diff ────────────────────────────────────────────────────────────────
★ BEST APPROACH
    # Only iterate over dict_a's keys — keys only in dict_b are ignored.
    # Use dict_b.get(key) to safely retrieve the b-side value (returns None
    # if the key is absent, which is exactly what the spec requires).
    result = {}
    for key, a_val in dict_a.items():
        b_val = dict_b.get(key)
        if key not in dict_b or a_val != b_val:
            result[key] = (a_val, b_val)
    return result

══════════════════════════════════════════════════════════════════════════════
"""


def pytest_terminal_summary(terminalreporter, exitstatus: int, config) -> None:
    """Show model answers after the terminal summary — only when all tests pass."""
    if exitstatus == 0:
        terminalreporter.section(
            "DAY 04 — MODEL ANSWERS & BEST APPROACHES", sep="═"
        )
        terminalreporter.write(_MODEL_ANSWERS)
