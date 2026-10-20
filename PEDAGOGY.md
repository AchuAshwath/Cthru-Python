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
| 3. Progressive Layer Unlocking (The "Read More...")       |
|    Readers can expand into deeper layers on demand        |
|    or follow contextual entry links (?layer=1, ?layer=2). |
+-----------------------------------------------------------+
```

Never introduce a C struct, an allocator, or a virtual machine constraint until the reader has experienced the problem it solves.

---

## Single Canonical Pages with Progressive Layer Unlocking

Instead of duplicating content across separate parallel tracks, each major topic lives on a **single canonical page** organized into 3 ascending layers of depth:

- **Layer 1: Intuition & Observable Behavior**
  - Accessible to anyone with basic Python knowledge.
  - Explains the concept using high-level mechanical reality (e.g., "The Heap is the shared memory pool where all Python objects live").
  - Anchored by a runnable code puzzle exposing the confusing behavior.
- **Layer 2: Virtual Machine & Memory Mechanics**
  - How CPython manages it: stack frames, pointer dereferencing, reference count tracking, allocator pools.
  - Bytecode disassemblies (`LOAD_FAST`, `STORE_FAST`) and pointer diagrams.
- **Layer 3: CPython C Internals & Source Specs**
  - The raw C structs (`Include/object.h`, `Python/ceval.c`), exact byte layouts, bitwise flags, and OS memory interactions.

---

## How "Read More..." and Context Metadata Work

### 1. Contextual Link Parameters (`?layer=1`, `?layer=2`, `?layer=3`)

When a chapter links to a deep concept, the incoming link carries a metadata query parameter representing the reader's current conceptual readiness:

- **From Chapter 1 (Variables / Mental Model)**:
  `[The Heap](/foundations/process-stack-and-heap?layer=1)`
  The reader lands on the Heap page with only **Layer 1** unlocked. They learn that the Heap is the shared dynamic storage where all Python objects live, without getting bogged down in 256KB arenas, pools, or free lists.
- **From Garbage Collection or Memory Management**:
  `[CPython Allocator Pools](/foundations/process-stack-and-heap?layer=2)`
  The reader lands on the same page with **Layer 1 and Layer 2** unlocked, immediately seeing how pools and arenas manage object lifetimes.

### 2. The Interactive "Read More..." Trigger

At the bottom of each layer, an interactive shadcn-grade button lets the reader unlock the next depth level when they are ready:

```
+-----------------------------------------------------------+
| [Layer 1 Content: The Heap as the Dynamic Object Pool]    |
+-----------------------------------------------------------+
|  [ Read More: Unlock Virtual Machine Mechanics (Layer 2) ]|
+-----------------------------------------------------------+
```

Clicking the button smoothly reveals Layer 2 inline, without losing reading position or navigating away.

### 3. Direct Search Visitors

When an engineer finds the page via Google or the Starlight search bar:

- The top of the page displays a discreet Depth Pill Selector: `[ Layer 1 | Layer 2 | Layer 3 | All Layers ]`.
- Visitors can either read Layer 1 and click "Read More...", or jump straight to Layer 3 / click "All Layers" to read the entire document in one view.
- All layers are pre-rendered in the static HTML (SSR), ensuring Pagefind and search engines index 100% of the content.

---

## Progressive Disclosure by Topic

| Topic                     | Layer 1: Intuition & Behavior            | Layer 2: Virtual Machine Mechanics                | Layer 3: CPython C Internals                             |
| :------------------------ | :--------------------------------------- | :------------------------------------------------ | :------------------------------------------------------- |
| **Variables & Names**     | Aliasing mystery, `id()`, `is` vs `==`   | Frame `localsplus` array vs `f_globals` dict      | `PyFrameObject`, `STORE_FAST`, pointer offsets           |
| **The Heap & Memory**     | Dynamic object pool vs call stack        | PyMalloc: Arenas (256KB), Pools (4KB), Blocks     | `ob_refcnt`, `PyObject_Malloc`, OS `brk`/`mmap`          |
| **Data Mutability**       | Mutating a list inside a tuple           | Fixed pointer array targeting dynamic heap buffer | `PyTupleObject`, `PyListObject`, over-allocation         |
| **Integers & Primitives** | Why integers consume 28 bytes            | Small int cache ($-5$ to $256$), immutability     | `PyLongObject`, `ob_digit`, arbitrary precision          |
| **Functions & Defaults**  | Default mutable argument persistence     | Heap-allocated `PyFunctionObject`, `__defaults__` | `func->func_defaults`, bytecode `MAKE_FUNCTION`          |
| **The GIL**               | Why CPU threads don't speed up execution | Mutex protecting `ob_refcnt` during execution     | `ceval.c`, `take_eval_breaker()`, PEP 703 free-threading |
| **Garbage Collection**    | Cyclic reference memory leak             | Reference counting vs Generational GC (Gen 0-2)   | `PyGC_Head`, doubly-linked lists, tri-color marking      |
