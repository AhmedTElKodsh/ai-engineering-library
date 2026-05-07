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
║              DAY 01 — MODEL ANSWERS & BEST APPROACHES                      ║
╚══════════════════════════════════════════════════════════════════════════════╝

─── classify_type ────────────────────────────────────────────────────────────
APPROACH A  (type identity — acceptable, less idiomatic)
    if type(value) is bool:    return "boolean"
    elif type(value) is int:   return "integer"
    elif type(value) is float: return "float"
    elif type(value) is str:   return "string"
    else:                      return "other"

★ BEST APPROACH  (isinstance with bool-first guard — Pythonic)
    # bool is a subclass of int: isinstance(True, int) is True.
    # Always check bool FIRST, then int.
    if isinstance(value, bool):    return "boolean"
    elif isinstance(value, int):   return "integer"
    elif isinstance(value, float): return "float"
    elif isinstance(value, str):   return "string"
    else:                          return "other"

─── safe_convert_to_int ──────────────────────────────────────────────────────
★ BEST APPROACH  (EAFP — Easier to Ask Forgiveness than Permission)
    # Attempt the conversion; catch only the specific failure exception.
    # Return None to honour the return type annotation: int | None.
    try:
        return int(value)
    except ValueError:
        return None

─── swap_values ──────────────────────────────────────────────────────────────
APPROACH A  (explicit tuple — readable)
    return (b, a)

★ BEST APPROACH  (implicit tuple packing — most Pythonic)
    return b, a   # Python packs comma-separated values into a tuple automatically

─── build_profile ────────────────────────────────────────────────────────────
★ BEST APPROACH
    # f-string: single braces {var} interpolate the value.
    # Double braces {{ }} produce a literal { } character — a common gotcha.
    summary = f"{name} ({age}) - {score}"
    return {"name": name, "age": age, "score": score, "summary": summary}

─── calculate_stats ──────────────────────────────────────────────────────────
APPROACH A  (manual loop — explicit, educational)
    total = 0
    for n in numbers: total += n
    count = len(numbers)
    minimum, maximum = numbers[0], numbers[0]
    for n in numbers:
        if n < minimum: minimum = n
        if n > maximum: maximum = n
    return {"total": total, "count": count, "average": total / count,
            "minimum": minimum, "maximum": maximum}

★ BEST APPROACH  (idiomatic Python builtins — concise & C-optimised)
    # sum(), len(), min(), max() are implemented in C — prefer them over loops.
    if not numbers:
        raise ValueError("calculate_stats requires a non-empty list")
    total = sum(numbers)
    count = len(numbers)
    return {"total": total, "count": count, "average": total / count,
            "minimum": min(numbers), "maximum": max(numbers)}

══════════════════════════════════════════════════════════════════════════════
"""


def pytest_terminal_summary(terminalreporter, exitstatus: int, config) -> None:
    """Show model answers after the terminal summary — only when all tests pass."""
    if exitstatus == 0:
        terminalreporter.section(
            "DAY 01 — MODEL ANSWERS & BEST APPROACHES", sep="═"
        )
        terminalreporter.write(_MODEL_ANSWERS)
