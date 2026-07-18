# 12 — Search todos

**Progress:** [progress.md](../progress.md) · **All lessons:** [lessons.md](../lessons.md) · **Prev:** [11-ux-components.md](11-ux-components.md)

Add **server-side search** — filter todos by title without loading everything into the browser.

## Goals

1. `GET /todos?q=keyword` — SQL `ILIKE` filter
2. Search input in React with debounce (300ms)
3. Empty state when no matches

## Backend

**File:** [backend/app/main.py](../backend/app/main.py)

```python
@app.get("/todos")
def list_todos(q: str | None = Query(default=None), ...):
    # WHERE title ILIKE '%q%' when q is provided
```

`ILIKE` = case-insensitive pattern match in PostgreSQL.

## Frontend

**Files:** [frontend/react/src/hooks/useTodos.js](../frontend/react/src/hooks/useTodos.js), [TodoList.jsx](../frontend/react/src/components/TodoList.jsx)

- Search input updates `search` state
- `useEffect` waits 300ms before calling API (debounce)
- URL: `/api/todos?q=react`

## Try it

1. Add todos: "Learn React", "Buy groceries", "React hooks"
2. Type `react` in search → only matching todos show
3. Clear search → all todos return

## Concepts learned

- **Query parameters** — `?q=value` on GET requests
- **Debouncing** — wait until user stops typing before API call
- **Server-side filtering** — database does the work, not JavaScript

## Other power features (pick later)

- Tags on todos (schema migration)
- Due dates (validation + sorting)
- Dark/light theme (CSS variables only)

## Checklist

- [x] `GET /todos?q=...` filters by title
- [x] Search input in React with debounce
- [x] Empty state for no matches
