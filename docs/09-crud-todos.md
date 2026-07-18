# 09 — Full todo CRUD

**Progress:** [progress.md](../progress.md) · **All lessons:** [lessons.md](../lessons.md) · **Prev:** [08-mini-saas.md](08-mini-saas.md) · **Next:** [10-notes-ui.md](10-notes-ui.md)

Complete the todo feature with **PATCH** and **DELETE** — the rest of REST beyond GET and POST.

## Goals

1. `PATCH /todos/{id}` — mark a todo done or update title
2. `DELETE /todos/{id}` — remove a todo (only if it belongs to you)
3. React checkbox + delete button wired to the API

## Backend

**File:** [backend/app/main.py](../backend/app/main.py)

| Method | Path | Body | Response |
|--------|------|------|----------|
| `PATCH` | `/todos/{id}` | `{ "done": true }` | Updated todo |
| `DELETE` | `/todos/{id}` | — | `204 No Content` |

Ownership: SQL always includes `WHERE user_id = current_user.id`. Wrong id → **404**.

## Frontend

**Files:** [frontend/react/src/components/TodoList.jsx](../frontend/react/src/components/TodoList.jsx), [frontend/react/src/hooks/useTodos.js](../frontend/react/src/hooks/useTodos.js)

- Checkbox calls `PATCH` with `{ done: !todo.done }`
- Delete button calls `DELETE`, then removes from state
- Done todos show strikethrough (CSS class `.done`)

## Try it

**Terminal 1 — API:**
```powershell
cd backend
.\.venv\Scripts\uvicorn.exe app.main:app --reload
```

**Terminal 2 — React:**
```powershell
cd frontend/react
npm.cmd run dev
```

1. Log in at http://localhost:5173
2. Add a todo → check the checkbox → title strikes through
3. Click **Delete** → todo disappears
4. Test in `/docs` with your Bearer token

## Concepts learned

- **PATCH** = partial update (only send fields that change)
- **DELETE** = remove a resource
- **404** = resource not found or not yours
- Immutable React state: `setTodos(prev => prev.map(...))`

## Checklist

- [x] `PATCH /todos/{id}` works in `/docs`
- [x] `DELETE /todos/{id}` returns 204
- [x] Checkbox toggles done in React
- [x] Delete button removes todo from UI
