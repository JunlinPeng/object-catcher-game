#!/usr/bin/env python3
"""Verify the Python environment is correctly configured."""

import sys
import subprocess


def check_python_version() -> bool:
    """Ensure Python 3.10 or higher is in use."""
    major, minor = sys.version_info[:2]
    if (major, minor) >= (3, 10):
        print(f"[OK] Python {major}.{minor} detected")
        return True
    print(f"[FAIL] Python {major}.{minor} — need 3.10+")
    return False


def check_requirements() -> bool:
    """Check if requirements.txt dependencies are installed."""
    try:
        result = subprocess.run(
            [sys.executable, "-m", "pip", "check"],
            capture_output=True,
            text=True,
        )
        if result.returncode == 0:
            print("[OK] All dependencies satisfied")
            return True
        print(f"[FAIL] Dependency issues:\n{result.stdout}{result.stderr}")
        return False
    except FileNotFoundError:
        print("[FAIL] pip not found")
        return False


def main() -> int:
    """Run all checks and return exit code."""
    print("=== Environment Setup Check ===\n")
    py_ok = check_python_version()
    req_ok = check_requirements()
    print()
    if py_ok and req_ok:
        print("All checks passed.")
        return 0
    print("Some checks failed. Review the output above.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
