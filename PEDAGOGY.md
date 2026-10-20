# Pedagogical Philosophy & Architecture: Cthru-Python

This document establishes the official educational methodology and information architecture for Cthru-Python. All content, chapters, and visualizations must strictly adhere to these principles.

---

## The Core Philosophy: Cognitive Friction & Progressive Disclosure

Traditional Python education fails because it either stays at a superficial syntax level (using flawed metaphors like "variables are boxes") or jumps straight into an overwhelming dump of C structs and OS memory concepts without context.

Cthru-Python operates on **Progressive Disclosure driven by Cognitive Friction**:

```
+-----------------------------------------------------------+
| 1. Cognitive Friction (The "Why")                         |
|    Start with runnable Python code that defies            |
|    traditional intuition or breaks conventional models.   |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
| 2. Mechanical Empathy (The "How")                         |
|    Reveal the isolated slice of CPython internals         |
|    required to demystify that exact behavior.             |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
| 3. Deep Dive Bridge (The "Rabbit Hole")                   |
|    Provide a clean, direct portal to the standalone       |
|    reference for readers who want the complete engine.    |
+-----------------------------------------------------------+
```

Never introduce a C struct, an allocator, or a virtual machine constraint in the conceptual journey until the reader has experienced the problem it solves.

---

## The Dual-Track Information Architecture

Cthru-Python serves two distinct user personas simultaneously:

1. **The Linear Traveler**: A developer reading sequentially to rebuild their mental model of Python from the ground up.
2. **The Search / Reference Engineer**: An engineer arriving directly from a search query (e.g. searching "How does Python GIL work" or "Python list over-allocation") who needs a comprehensive, self-contained deep dive.

To serve both without compromise, content is partitioned into two distinct tracks:

```
Documentation Structure
|
+-- Track 1: The Guided Journey (Conceptual Progression)
|   |-- Variables: The Aliasing Mystery (Names as Pointers)
|   |-- Mutability: The Immutable Tuple Trap (Pointer Arrays)
|   |-- Numbers & Strings: The 28-Byte Integer (PyObject Header)
|   |-- Functions: The Persistent Default (Stack Frames & Heap Objects)
|   |-- Closures: Escaping the Frame (Cell Objects)
|   |-- Classes: The Shared Attribute Trap (Type Pointers & Dictionaries)
|   +-- Concurrency: The Two-Core Paradox (The First Glimpse of the GIL)
|
+-- Track 2: The Engine (Standalone Reference Deep Dives)
    |-- The PyObject Specification (Complete Header & Type Descriptors)
    |-- The Global Interpreter Lock (Architecture, CEval, and PEP 703)
    |-- Memory Allocator (PyMalloc, Arenas, Pools, and Small Objects)
    |-- Bytecode & The VM (Compiler, Stack, and ceval.c)
    +-- Cyclic Garbage Collector (Generations, Tri-color marking)
```

---

## How Cross-Track Integration Works

### Rule 1: Journey Chapters Disclose Only the Relevant Slice

In Track 1 (The Journey), introduce only the slice of an internal concept that resolves the active cognitive friction:

- **In "Functions"**: Introduce `PyFrameObject` and `localsplus` to explain why local variable lookup is instantaneous and parameters are passed by copying pointer values. Do not explain the entire bytecode dispatch loop or generator frame suspension yet.
- **In "Concurrency"**: Demonstrate two CPU-bound threads taking longer than one. Introduce the GIL as a mutex protecting `ob_refcnt` from multi-threaded race conditions.

### Rule 2: The Deep Dive Bridge

Every time a Journey chapter reveals an internal mechanism, it concludes the section with a standardized **Deep Dive Bridge**:

> **Under the Hood**: Looking for the exhaustive breakdown of the mutex implementation, `take_eval_breaker()`, and Python 3.13 free-threading? Read [The Global Interpreter Lock: Complete Architecture](/internals/gil).

### Rule 3: Deep Dives Are 100% Self-Contained

Track 2 reference pages must assume zero prior reading from Track 1:

- Start with a clear **Executive Summary** and high-level architectural diagram.
- Explain all prerequisites concisely in a dedicated "Context & Prerequisites" collapsible or callout.
- Provide exhaustive, authoritative detail: exact C structs, memory offsets, bytecode instructions, and performance trade-offs.

---

## The Concept-to-Internals Progressive Disclosure Matrix

| Python Feature   | Cognitive Friction (The Mystery)                      | Internal Revealed (The Slice)                       | Track 2 Deep Dive          |
| :--------------- | :---------------------------------------------------- | :-------------------------------------------------- | :------------------------- |
| **Variables**    | `b = a; b.append(1)` mutates `a`                      | Variables are 8-byte pointers; heap objects         | Memory Model               |
| **Mutability**   | `(1, [2])` can have its list mutated                  | Fixed pointer array pointing to dynamic heap block  | PyObject & Sequences       |
| **Primitives**   | `x = 256; y = 256` is identical; `257` is not         | Small int cache array (`small_ints[-5..256]`)       | PyObject Anatomy           |
| **Functions**    | Default argument `def f(x, l=[])` accumulates         | `PyFunctionObject` lives on heap; `__defaults__`    | Stack Frames & Bytecode    |
| **Closures**     | Loop variable captures late in lambda                 | `PyCellObject` holds indirect pointer across frames | Execution & Scopes         |
| **OOP**          | Class attribute modification affects all instances    | `ob_type` pointer and instance `__dict__` lookup    | Object Model & Descriptors |
| **Threads**      | Multi-threading CPU work is slower than single-thread | Thread safety for `ob_refcnt` requires global mutex | The GIL                    |
| **Deallocation** | Cyclic list `a.append(a)` never frees on `del a`      | Reference counting vs Cyclic Garbage Collector      | Garbage Collector          |
