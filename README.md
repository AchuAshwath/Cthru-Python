# Cthru-Python

A technical reference and interactive execution visualizer dedicated to CPython internals, memory layouts, reference counting, and the bytecode evaluation loop.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/AchuAshwath/Cthru-Python/actions/workflows/deploy.yml/badge.svg)](https://github.com/AchuAshwath/Cthru-Python/actions)

---

## Architectural Scope

Cthru-Python documents and visualizes the CPython runtime across four primary layers:

1. **Physical Machine & Process Space**: Contiguous linear RAM addressing, 64-bit word sizes, virtual memory segmentation (Code, Call Stack, and Private Heap).
2. **CPython Object Model**: The 16-byte `PyObject` header (`ob_refcnt`, `ob_type`), arbitrary precision integers (`PyLongObject`), compact hash tables (`PyDictObject`), and pointer arrays (`PyListObject`).
3. **Compilation Pipeline**: Tokenizer, Abstract Syntax Tree (AST), symbol tables, and code objects (`PyCodeObject`).
4. **Virtual Machine**: The stack-based evaluation loop in `ceval.c` (`_PyEval_EvalFrameDefault`), stack frames (`PyFrameObject`), and bytecode dispatching.

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0 or later)
- Python 3.10+ (for running memory verification scripts)

### Installation

```bash
# Clone the repository
git clone https://github.com/AchuAshwath/Cthru-Python.git
cd Cthru-Python

# Install dependencies
bun install
```

### Development

```bash
# Start local development server
bun run dev

# Run code linters (Oxlint and @shadcn/lint)
bun run lint

# Check code formatting (Oxfmt)
bun run format:check

# Format codebase
bun run format

# Build static documentation
bun run build
```

---

## Tech Stack

- **Documentation Engine**: [Astro](https://astro.build/) with [Starlight](https://starlight.astro.build/)
- **Visualizer UI**: React 19, Tailwind CSS v4
- **Diagrams**: [Mermaid](https://mermaid.js.org/) via `astro-mermaid`
- **Tooling**: Oxlint, Oxfmt, Bun

---

## License

MIT License. See [LICENSE](LICENSE) for details.
