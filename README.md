# HKU AI Creator's Lab

> Multi-language project with Python as the primary stack.

## Project Overview

*To be filled in as the project evolves.*

## Tech Stack

- **Primary**: Python 3.x
- **Testing**: pytest
- **Code Style**: PEP8

## Directory Structure

```
project-root/
├── CLAUDE.md          # Project context & collaboration framework
├── playbooks/         # Orchestration: Playbook definitions (Markdown)
├── scripts/           # Execution: Deterministic scripts (.sh/.py)
├── src/               # Source code
├── tests/             # Test files
├── .tmp/              # Temporary files (not committed)
├── README.md          # This file
└── requirements.txt   # Python dependencies
```

## Getting Started

1. Create a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Linux/macOS
   # .venv\Scripts\activate   # Windows
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run tests:
   ```bash
   pytest
   ```

## Collaboration Framework

This project uses the **Playbooks & Scripts** two-layer framework:

- **Playbooks** (`/playbooks/`) — Define the **what** and **why**. Each playbook is a Markdown file that describes purpose, prerequisites, steps, expected outcome, and rollback plan.
- **Scripts** (`/scripts/`) — Deterministic execution scripts referenced by playbooks.

### Commit Convention

```
<type>: <description>
```

Examples: `feat: add user login`, `fix: resolve null pointer`, `docs: update README`
