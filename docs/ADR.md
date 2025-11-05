# ADR-001: Keep Lit

## 1. Why Keep **Lit**?

Lit is a lightweight library for building **fast, encapsulated web components** using native platform features.

| **Pros**                                                                                  | **Cons** |
|-------------------------------------------------------------------------------------------|--------|
| **True CSS encapsulation** via Shadow DOM — no style leaks, no BEM prefixes needed        | Smaller community & fewer third-party UI kits compared to React/Vue |
| **Tiny runtime (~5 KB )** — faster than React + ReactDOM (~45 KB)                  | No built-in state management or routing (must add separately) |
| **Uses standard web APIs** (`customElements`, `<template>`, `HTMLElement`) — future-proof | Slightly different mental model (`html` tagged templates, reactive properties) |
| **Tree-shakable** — unused components + their CSS are dropped by Vite                     | Less familiar to developers coming from JSX/JS-in-HTML frameworks |
| **Works *inside* any framework** — can embed `<todo-app>` in React, Vue, or plain HTML    | — |

> **Verdict:** Lit is the **ideal abstraction** over native web components. It gives us encapsulation and reactivity **without framework lock-in**. Rewriting in vanilla JS would mean manual DOM diffing and verbose templates. Switching to React would bloat the bundle and break native element semantics. **We keep Lit.**

---

# ADR-002: Keep MVC
## 2. Why Keep **MVC**?

The app follows a classic **Model-View-Controller** pattern:
- **Model**: `TodoModel` + `StorageService`
- **View**: Lit components (`todo-item`, `todo-list`, etc.)
- **Controller**: `todo-app.js` (event wiring)

| **Pros** | **Cons** |
|--------|--------|
| **Clear separation of concerns** — business logic lives only in `TodoModel` | Slight overhead: events bubble up through `todo-app` |
| **Highly testable** — `TodoModel` has 100% unit test coverage with mocks | Not as "reactive" as signal-based stores (e.g. Preact Signals, Solid) |
| **Scalable** — easy to add new views (mobile list, calendar) without touching model | More files and indirection than a single reactive store |
| **Familiar pattern** — aligns with backend MVC, easy to teach | —