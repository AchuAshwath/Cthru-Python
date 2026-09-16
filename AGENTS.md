# Project Guidelines: Cthru-Python

Cthru-Python is an open-source technical reference and visual execution guide dedicated to CPython internals, memory layouts, reference counting, and the bytecode evaluation loop.

---

## 1. Project Vision & Direction

The mission of Cthru-Python is to build true **Mechanical Empathy** for Python developers:

- Bridge the gap between writing Python syntax and understanding how the computer physically executes it.
- Demystify memory management, object pointers, stack frames, and the CPython C runtime.
- Provide a resource that works equally well for learners who know basic Python and want to master it, as well as intermediate and advanced engineers seeking deep CPython systems knowledge.

---

## 2. Information Architecture & Sidebar Rules

1. **NO Numbered Categories in the Sidebar**:
   - Do NOT use prefixes like `1. Foundations`, `2. Execution`.
   - Learning is about **depth and conceptual order**, not a rigid school syllabus. People explore topics in ascending order according to their curiosity.
2. **Ascending Conceptual Progression**:
   - Order groups and pages so that each naturally builds on the previous concept:
     - `Overview`
     - `Mental Models`
     - `Computer Architecture & Memory`
     - `The CPython Runtime`
     - `Execution & Frames`
     - `References & Bibliography`

---

## 3. Page Structure: Progressive Depth Architecture (LOD)

Every documentation page MUST follow a consistent 3-level progressive depth structure. This allows readers to choose their level of depth and drop off when satisfied, without getting stuck:

### Level 1: The Basics (Intuition & What Happens)

- **Target Audience**: Beginners with a basic understanding of Python syntax.
- **Content**: Plain, clear, approachable English. No pretension, no heavy academic jargon.
- **Hook**: Anchor the topic with a real, concrete Python puzzle or surprising behavior (e.g., `b = a`, mutable default arguments, `is` vs `==`).
- **Hands-on**: Include a "Try This in Your Terminal" REPL snippet.

### Level 2: The Intermediate (The Mechanics & Virtual Machine)

- **Target Audience**: Developers who want to understand _why_ the behavior happens.
- **Content**: How the CPython virtual machine handles the operation:
  - Stack frames (`PyFrameObject`)
  - Local symbol tables (`f_locals`)
  - Pointer dereferencing
  - Bytecode disassembly (`dis` opcodes like `LOAD_FAST`, `STORE_FAST`, `BINARY_OP`)
  - Mermaid diagrams showing Call Stack vs Private Heap pointer flows.

### Level 3: The Advanced (CPython C Internals & Memory Layout)

- **Target Audience**: Systems engineers and developers seeking full C-level mastery.
- **Content**:
  - The underlying C structs from CPython source (`Include/object.h`, `Include/cpython/longintrepr.h`, etc.).
  - Memory layouts and byte sizes (`sys.getsizeof()`, `ctypes.string_at()`).
  - Allocation mechanisms (`pymalloc`, free lists, reference counting rules).
  - Direct permalinks to CPython GitHub source lines.

---

## 4. Tone, Voice & Style Guidelines

- **Zero Emojis**: Never use decorative emojis in headers, text, callouts, or tables. It degrades technical credibility.
- **Human Developer Voice**: Write like a senior engineer explaining concepts to a curious colleague over coffee (similar to _Crafting Interpreters_, _Nand2Tetris_, and Julia Evans). Avoid both marketing hype and dry, impenetrable academic textbook language.
- **Concrete over Abstract**: Always lead with runnable code rather than definitions. Show the behavior first, then explain the mechanism.
- **Respect the Reader's Intelligence**: Do not lecture or condescend. Treat the reader as an engineer building a serious mental model.

---

## 5. Development & Code Quality Commands

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
