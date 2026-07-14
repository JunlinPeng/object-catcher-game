# Playbook: Example Setup

## Purpose
Verify the project environment is correctly configured and all dependencies are installed. After execution, the developer can run the project and execute tests.

## Prerequisites
- Python 3.10+ installed
- `pip` available on the PATH
- `requirements.txt` present in the project root

## Steps
1. Run `scripts/setup_check.py` to validate the Python version and installed packages.
2. If the script reports missing dependencies, run `pip install -r requirements.txt`.
3. Run `scripts/run_tests.sh` to execute the test suite and confirm everything passes.

## Expected Outcome
- Python version ≥ 3.10 confirmed.
- All packages in `requirements.txt` installed without errors.
- All tests pass with green output.

## Rollback Plan
To revert to the initial state:
1. Deactivate and delete the virtual environment (`rm -rf .venv/`).
2. Re-create the virtual environment and re-install dependencies from scratch.
