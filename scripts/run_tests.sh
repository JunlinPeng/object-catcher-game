#!/usr/bin/env bash
# Run the project test suite with pytest.
set -euo pipefail

echo "=== Running Test Suite ==="
pytest tests/ --cov=src --cov-report=term-missing "$@"
