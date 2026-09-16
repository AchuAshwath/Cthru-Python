# Project Guidelines: Cthru-Python

Cthru-Python is an open-source technical reference and visual execution guide dedicated to CPython internals, memory layouts, reference counting, and the bytecode evaluation loop.

---

## Project Vision & Direction

The mission of Cthru-Python is to build true **Mechanical Empathy** for Python developers:

- Bridge the gap between writing Python syntax and understanding how the computer physically executes it.
- Demystify memory management, object pointers, stack frames, and the CPython C runtime.
- Provide a resource that works equally well for learners who know basic Python and want to master it, as well as intermediate and advanced engineers seeking deep CPython systems knowledge.

---

## Information Architecture & Heading Standards

- **No Numbers on Navigation or Categorical Headings**:
  - Do not use numbered prefixes in the sidebar (`Overview`, `Memory & Architecture`, `CPython Internals`, `References`).
  - Do not use numbers on subheadings unless describing an explicit, chronological sequence of execution steps or quantified metrics.
  - Concept categories, features, and topics must use clean, descriptive titles (e.g., `## Linear Memory Addressing`, not `## 1. Linear Memory Addressing`).
- **Ascending Conceptual Progression**:
  - Topics are ordered so that each naturally builds on the previous concept without enforcing a rigid school-syllabus numbering scheme.

---

## Page Structure: Progressive Depth Architecture

Every documentation page follows a 3-tier progressive depth structure so readers can choose their level of depth and drop off whenever they are satisfied:

- **Basics (Intuition & Observable Behavior)**:
  - Accessible to anyone with basic Python knowledge.
  - Written in plain, clear English without pretension or academic jargon.
  - Anchored by real code puzzles exposing confusing behavior (e.g., mutable defaults, aliasing, `is` vs `==`).
  - Includes a "Try This in Your Terminal" hands-on REPL prompt.
- **Intermediate (Mechanics & Virtual Machine)**:
  - How CPython executes the concept: stack frames, pointer dereferencing, symbol tables.
  - Bytecode analysis using `dis` (`LOAD_FAST`, `STORE_FAST`, `BINARY_OP`).
  - Clear Mermaid pointer diagrams linking the Call Stack to Heap objects.
- **Advanced (CPython C Internals & Memory Layout)**:
  - Underlying C structs (`Include/object.h`, `Include/cpython/longintrepr.h`).
  - Memory layouts, byte sizes (`sys.getsizeof()`, `ctypes.string_at()`).
  - Memory allocation mechanisms (`pymalloc`, free lists, reference counting rules).
  - Direct permalinks to CPython GitHub source files.

---

## Mermaid Diagram Writing Standards

- **Direction by Semantic Meaning**:
  - Use `flowchart LR` for pointer references, memory addresses, and data relationships (e.g. Stack frame pointers referencing Heap objects).
  - Use `flowchart TD` for compilation pipelines, architectural hierarchies, and vertical stack-to-heap layouts.
  - Use `sequenceDiagram` for temporal lifecycles (e.g. reference count increment, alias creation, decref, and deallocation).
- **Syntax Precision**:
  - Always wrap node labels containing special characters, brackets, or parentheses in double quotes: `id["PyListObject at 0x105a20 [ 1, 2, 3 ]"]`.
  - Avoid raw HTML formatting inside node text that can break SVG rendering.
- **Clarity & Focus**:
  - Keep diagrams focused on a single mental model (5–8 nodes maximum).
  - Use semantic subgraphs to clearly delineate memory boundaries: `subgraph Stack["Call Stack: Current Frame"]` and `subgraph Heap["Private Heap Space"]`.

---

## Tone, Voice & Style Guidelines

- **Zero Emojis**: Never use decorative emojis in headers, text, callouts, or tables. It degrades technical credibility.
- **Human Developer Voice**: Write like a senior engineer explaining concepts to a curious colleague over coffee (similar to _Crafting Interpreters_, _Nand2Tetris_, and Julia Evans). Avoid marketing hype and dry academic textbook language.
- **Concrete over Abstract**: Always lead with runnable code rather than definitions. Show the behavior first, then explain the mechanism.
- **Respect the Reader's Intelligence**: Do not lecture or condescend. Treat the reader as an engineer building a serious mental model.

---

## Development & Code Quality Commands

When making changes, always ensure code quality checks pass:

```bash
# Start background dev server
bun run dev

# Code linting (Oxlint and @shadcn/lint)
bun run lint

# Code formatting check (Oxfmt)
bun run format:check

# Auto-format codebase
bun run format

# Static production build
bun run build
```
