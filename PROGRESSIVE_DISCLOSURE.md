# Progressive Disclosure & Topic Matrix: Cthru-Python

This document is the master registry of all Python concepts taught in Cthru-Python. It defines the multi-layered progression for each topic, the traditional documentation foils we roast, the spatial data models, production examples, and AI agent verification traps.

For architectural and pedagogical principles, see [PEDAGOGY.md](file:///Users/ashwath/projects/Cthru-Python/PEDAGOGY.md).

---

## Topic Architecture Specification

Every topic in Cthru-Python is defined across five dimensions:

1. **The Traditional Foil (The Roast)**: What the Official Python Docs or GeeksforGeeks say, and why their explanation breaks down or misleads developers.
2. **Layer 1: Intuition & Observable Reality**: Accessible high-level behavior anchored by a runnable cognitive friction puzzle.
3. **Layer 2: Virtual Machine & Memory Mechanics**: Spatial topology, pointer arrays, call stack frames (`localsplus`), and bytecode disassembly.
4. **Layer 3: CPython C Internals**: Raw C structs (`Include/object.h`, `Include/cpython/*.h`), memory allocators (`PyMalloc`), and virtual machine loop implementation.
5. **Production Reality & AI Agent Verification Trap**: Real-world library architecture (FastAPI, PyTorch, SQLAlchemy) and how to catch subtle traps in AI-generated diffs within 5 seconds.

---

## Core Topics Master Matrix

### Variables, Names, and Object Binding

- **The Traditional Foil (The Roast)**:
  - _GeeksforGeeks_: Claims variables are "containers that store values" and invents separate "pass by value vs pass by reference" rules.
  - _Official Docs_: States "assignment statements bind a name to an object" but never provides a visual model of memory or explains pointer aliasing.
- **Layer 1: Intuition & Observable Reality**:
  - The Aliasing Mystery: `a = [1, 2]; b = a; b.append(3)`. Why did `a` change?
  - Names are sticky notes, not boxes. Object identity (`id()`) vs value equality (`==`).
- **Layer 2: Virtual Machine & Memory Mechanics**:
  - 8-byte pointer addresses on the 64-bit architecture.
  - Call Stack frame `localsplus` array vs global `f_globals` dictionary lookup.
  - Bytecode: `LOAD_FAST` ($O(1)$ array offset) vs `LOAD_GLOBAL` ($O(1)$ hash table lookup).
- **Layer 3: CPython C Internals**:
  - `PyFrameObject` structure in `Include/cpython/frameobject.h`.
  - Pointer assignment: `Py_INCREF` and `Py_XDECREF` reference count adjustments.
- **Production Reality & AI Agent Verification**:
  - _AI Trap_: AI agents creating mutable default arguments or passing shared cached dictionaries to concurrent request handlers, causing cross-request data leaks.

---

### Data Mutability and Sequence Layouts

- **The Traditional Foil (The Roast)**:
  - _GeeksforGeeks_: Memorization list: "Lists are mutable, tuples are immutable."
  - _The Trap_: `t = (1, [2, 3]); t[1].append(4)` mutates successfully, but `t[1] += [5]` mutates _and_ throws a `TypeError`. GeeksforGeeks has zero explanation for this.
- **Layer 1: Intuition & Observable Reality**:
  - The Mutable Tuple Paradox. Mutability is not a type property; it is an architectural property of the object's internal memory buffer.
- **Layer 2: Virtual Machine & Memory Mechanics**:
  - Spatial Model: A tuple is a contiguous fixed-size array of 8-byte pointers. The list inside is an 8-byte pointer pointing to a separate, dynamically resizable heap buffer.
  - Bytecode disassembly of `+=` (`INPLACE_ADD` vs `STORE_SUBSCR`).
- **Layer 3: CPython C Internals**:
  - `PyTupleObject` vs `PyListObject` (`ob_item` pointer array and `allocated` capacity).
  - List over-allocation growth formula: $A = (N \gg 3) + (N < 9 \,?\, 3 : 6)$.
- **Production Reality & AI Agent Verification**:
  - _AI Trap_: Pre-allocating list elements using `[[0] * 5] * 5` where all rows point to the exact same heap buffer, causing multi-dimensional matrix bugs in data pipelines.

---

### Small Integers, Primitives, and Object Headers

- **The Traditional Foil (The Roast)**:
  - _GeeksforGeeks_: Claims integers are primitive values stored directly in variables.
  - _Official Docs_: Mentions integers have arbitrary precision but does not explain the 28-byte overhead or why `256 is 256` is `True` while `257 is 257` is `False` in the REPL.
- **Layer 1: Intuition & Observable Reality**:
  - Why an integer 0 takes 28 bytes of RAM (`sys.getsizeof(0)`).
  - The Singleton Illusion: Small integer caching from $-5$ to $256$.
- **Layer 2: Virtual Machine & Memory Mechanics**:
  - Every value is an allocated heap block.
  - The universal 16-byte object header: `ob_refcnt` (8 bytes) + `ob_type` (8 bytes).
- **Layer 3: CPython C Internals**:
  - `PyLongObject` and 30-bit digits (`ob_digit` array in `Include/cpython/longintrepr.h`).
  - The `small_ints` array statically allocated at interpreter boot.
- **Production Reality & AI Agent Verification**:
  - _AI Trap_: Comparing integers or strings using `is` instead of `==` in authentication or ID checks, passing local unit tests (due to small int caching) and crashing in production.

---

### Functions, Closures, and Scope Frames

- **The Traditional Foil (The Roast)**:
  - _GeeksforGeeks_: Calls functions "blocks of code that only run when called."
  - _Official Docs_: Mentions default values are evaluated once at definition, but doesn't explain _where_ they live.
- **Layer 1: Intuition & Observable Reality**:
  - The Accumulator Trap: `def append_to(val, target=[])`. Why does `target` remember past calls?
- **Layer 2: Virtual Machine & Memory Mechanics**:
  - `def` is an executable statement that instantiates a `PyFunctionObject` on the heap at runtime.
  - Default arguments are stored in the heap object's `__defaults__` tuple.
  - Closures: `PyCellObject` holding an indirect pointer to bridge variable lifetimes across stack frame pops.
- **Layer 3: CPython C Internals**:
  - `PyFunctionObject` (`func_code`, `func_globals`, `func_defaults`).
  - Frame creation via `_PyFrame_New_NoTrack`.
- **Production Reality & AI Agent Verification**:
  - _AI Trap_: Defining database session or HTTP client singletons via default arguments in FastAPI routes, leading to connection exhaustion and shared session race conditions.

---

### The Global Interpreter Lock (GIL) and Concurrency

- **The Traditional Foil (The Roast)**:
  - _GeeksforGeeks_: Vaguely states "Python is single-threaded because of GIL." (Factually wrong: Python uses native OS threads).
  - _Official Docs_: Dry technical description of mutex synchronization without illustrating the multi-core CPU bottleneck.
- **Layer 1: Intuition & Observable Reality**:
  - The Two-Core Paradox: Running CPU-bound tasks in two threads takes 2x _longer_ than a single thread on an 8-core CPU.
  - CPU-bound vs I/O-bound reality.
- **Layer 2: Virtual Machine & Memory Mechanics**:
  - Why the GIL exists: `ob_refcnt` is not atomic; multi-threaded increment/decrement without a mutex leads to memory corruption.
  - Thread switching interval (`sys.getswitchinterval()`).
- **Layer 3: CPython C Internals**:
  - `take_eval_breaker()` and condition variable handoffs in `Python/ceval.c`.
  - C extension GIL release (`Py_BEGIN_ALLOW_THREADS`).
  - Free-threaded Python (PEP 703): mimalloc thread-local heaps, biased reference counting, and immortal objects.
- **Production Reality & AI Agent Verification**:
  - _AI Trap_: AI suggesting `threading.Thread` for parallel CPU image resizing or data transformations instead of `multiprocessing` or native C/Rust extensions.

---

### Memory Management and Cyclic Garbage Collection

- **The Traditional Foil (The Roast)**:
  - _GeeksforGeeks_: Equates Python garbage collection with Java's JVM GC without mentioning reference counting.
  - _Official Docs_: References `gc` module documentation without visualizing pointer cycle graphs.
- **Layer 1: Intuition & Observable Reality**:
  - Immediate deallocation on `del` vs the cyclic leak: `a = []; a.append(a); del a`.
- **Layer 2: Virtual Machine & Memory Mechanics**:
  - Deterministic reference counting (`Py_DECREF` drops to 0 $\rightarrow$ instant free).
  - Generational GC (Gen 0, 1, 2) and collection thresholds (`gc.get_threshold()`).
- **Layer 3: CPython C Internals**:
  - `PyGC_Head` 16-byte prepended header for container objects.
  - Doubly-linked lists for GC generations and the tri-color marking algorithm.
- **Production Reality & AI Agent Verification**:
  - _AI Trap_: Building tree/graph data structures with back-pointers to parents without using `weakref`, causing silent memory bloat in long-running services.
