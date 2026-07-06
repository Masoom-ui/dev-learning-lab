# 05 — React

**Progress:** [progress.md](../progress.md) · **All lessons:** [lessons.md](../lessons.md) · **Prev:** [04-frontend-basics.md](04-frontend-basics.md) · **Next:** [06-postgresql.md](06-postgresql.md)

React builds UIs with **components** — reusable pieces that manage **state** and re-render automatically.

## Goals

- Install Node.js and run the Vite dev server
- Edit `App.jsx` and see live updates
- Fetch todos from the API via Vite proxy
- Build a todo list with forms

**Practice code:** [frontend/react/](../frontend/react/)

## Setup

### Step 1 — Install Node.js

Download LTS from https://nodejs.org, then verify:

```powershell
node --version
npm.cmd --version
```

**Windows tip:** If `npm` fails in PowerShell, use **`npm.cmd`** instead.

### Step 2 — Install dependencies

```powershell
cd frontend\react
npm.cmd install
```

### Step 3 — Start React (Terminal 2)

```powershell
cd frontend\react
npm.cmd run dev
```

Open the URL Vite prints (usually http://localhost:5173).

### Step 4 — Start API (Terminal 1)

```powershell
cd backend
.\.venv\Scripts\uvicorn.exe app.main:app --reload
```

## Vite proxy

`vite.config.js` forwards `/api/*` → `http://127.0.0.1:8000`:

```
fetch("/api/todos")  →  http://127.0.0.1:8000/todos
```

## Core ideas

### Component + JSX

```jsx
function App() {
  return <h1>Dev Learning Lab — React</h1>;
}
```

### State

```jsx
const [todos, setTodos] = useState([]);
const [title, setTitle] = useState("");
```

Changing state re-renders the UI — no manual DOM updates.

### Load data on mount

```jsx
useEffect(() => {
  fetch("/api/health")
    .then((res) => res.json())
    .then((data) => setHealth(data.status));
  fetch("/api/todos")
    .then((res) => res.json())
    .then(setTodos);
}, []);
```

### Add a todo

```jsx
await fetch("/api/todos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title }),
});
```

## Step-by-step checklist

| Step | Action |
|------|--------|
| 1 | Install Node.js + `npm.cmd install` |
| 2 | Run `npm.cmd run dev` |
| 3 | Edit `App.jsx` — see hot reload |
| 4 | API status shows `great` |
| 5 | Todos load and POST works |

## Vanilla vs React

| Vanilla JS | React |
|------------|-------|
| Manual DOM updates | UI updates from state |
| No build step | `npm.cmd run dev` |
| Great for learning | Great for larger apps |

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `npm` not recognized | Refresh PATH or use `npm.cmd` |
| API status "offline" | Start uvicorn in Terminal 1 |
| Port 5173 in use | Vite picks 5174, 5175 — use that URL |

## Next lessons

- [06 — PostgreSQL](06-postgresql.md) — todos persist on disk
- [08 — Mini SaaS](08-mini-saas.md) — login required for API (Step 3: add auth to React)

## Note (Lesson 8)

After auth is added to the backend, React must send `Authorization: Bearer <token>` — see [08-mini-saas.md](08-mini-saas.md) Step 3.
