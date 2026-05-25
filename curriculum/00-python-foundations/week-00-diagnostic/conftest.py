"""Ensure local imports resolve correctly under importlib mode."""
import sys
from pathlib import Path

_dir = str(Path(__file__).parent)

# Evict locally-named modules cached from a previous day directory
for _mod in ("diagnostic_workbench", "workbench", "core", "utils", "main"):
    sys.modules.pop(_mod, None)

# Ensure this day's directory is first on sys.path
if _dir in sys.path:
    sys.path.remove(_dir)
sys.path.insert(0, _dir)
