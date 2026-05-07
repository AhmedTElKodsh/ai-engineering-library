"""Ensure local imports resolve correctly under importlib mode."""
import sys
from pathlib import Path

_dir = str(Path(__file__).parent)

for _mod in ("solution_template", "core", "utils", "main"):
    sys.modules.pop(_mod, None)

if _dir in sys.path:
    sys.path.remove(_dir)
sys.path.insert(0, _dir)
