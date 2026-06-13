# Troubleshooting

## Pytest Collects Too Much

Disable third-party pytest plugin autoloading:

```powershell
$env:PYTEST_DISABLE_PLUGIN_AUTOLOAD='1'
python -m pytest --collect-only curriculum -q
```

## Starter Tests Fail

That is normal. Starter workbenches contain TODOs. A healthy first run should
collect tests cleanly, import the lesson files, and then fail on TODO behavior.

## Import Errors

Run pytest from the repo root:

```powershell
python -m pytest curriculum/main-track/00-python-foundations/week-00-diagnostic -q
```

If imports still fail, check that the lesson test inserts the local lesson path
before importing `workbench.py`.

## API Keys

Most Course 1 lessons do not need real provider keys. Use fake providers and
fixtures unless a lesson explicitly asks for a real API boundary.

## Windows Paths

Prefer running commands from the repository root. PowerShell examples are used
throughout the curriculum.
