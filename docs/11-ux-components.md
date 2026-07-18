# 11 — UX and React structure

**Progress:** [progress.md](../progress.md) · **All lessons:** [lessons.md](../lessons.md) · **Prev:** [10-notes-ui.md](10-notes-ui.md) · **Next:** [12-search-todos.md](12-search-todos.md)

Refactor the dashboard into **components** and **custom hooks** — patterns used in real React codebases.

## Goals

1. Extract `TodoList`, `NotesList`, `AuthForm` components
2. Custom hooks: `useTodos()`, `useNotes()`
3. Loading, error, and empty states

## File structure

```
frontend/react/src/
  App.jsx              — auth + layout only
  components/
    AuthForm.jsx
    TodoList.jsx
    NotesList.jsx
  hooks/
    useTodos.js        — fetch, add, toggle, delete, search
    useNotes.js        — fetch, add, toggle, delete
```

## UX patterns

| State | What the user sees |
|-------|-------------------|
| Loading | "Loading todos..." |
| Error | Red message if API fails |
| Empty | "No todos yet — add one above." |
| Search empty | "No todos match your search." |

## Concepts learned

- **Components** = reusable UI pieces
- **Custom hooks** = reusable state + API logic
- **Separation of concerns** — `App.jsx` orchestrates, hooks fetch data
- **Props** — pass data and callbacks down to children

## Checklist

- [x] Components in `src/components/`
- [x] Hooks in `src/hooks/`
- [x] Loading and error states visible
