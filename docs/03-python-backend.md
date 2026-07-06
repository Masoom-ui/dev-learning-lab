# 03 — Python Backend

**Progress:** [progress.md](../progress.md) · **All lessons:** [lessons.md](../lessons.md) · **Prev:** [02-git-basics.md](02-git-basics.md) · **Next:** [04-frontend-basics.md](04-frontend-basics.md)

The backend is the **brain** of your app — business logic, databases, and **APIs** that frontends call over HTTP.

We use **FastAPI** with auto-generated docs at `/docs`.

## Goals

- Run the API with uvicorn
- Understand routes (URLs → Python functions)
- Build GET and POST endpoints
- Read JSON request/response

## Project structure

```
backend/
├── app/
│   ├── main.py          # Routes and app setup
│   ├── config.py        # Settings from .env
│   ├── db.py            # PostgreSQL (Lesson 6)
│   └── mongo_client.py  # MongoDB (Lesson 7)
├── requirements.txt
└── .env.example
```

## Step-by-step

### Step 1 — Setup (first time)

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\pip.exe install -r requirements.txt
copy .env.example .env
```

### Step 2 — Start the API

```powershell
cd backend
.\.venv\Scripts\uvicorn.exe app.main:app --reload
```

- API: http://127.0.0.1:8000
- Docs: http://127.0.0.1:8000/docs

Leave this terminal open.

### Step 3 — Hit `/health` in the browser

Open http://127.0.0.1:8000/health — you should see JSON like:

```json
{"status": "great", "app": "Dev Learning Lab API"}
```

### Step 4 — Connect URL to code

In `backend/app/main.py`, find `@app.get("/health")` — the URL maps to that function. Change the `return` line and refresh the browser.

### Step 5 — Build `/about`

Add your own endpoint:

```python
@app.get("/about")
def about():
    return {"name": "Jatin", "role": "learning backend development"}
```

Test at http://127.0.0.1:8000/about

### Step 6 — Understand todos (early version)

`GET /todos` and `POST /todos` — initially in-memory, later PostgreSQL (Lesson 6).

## Key concepts

| Concept | Meaning |
|---------|---------|
| `@app.get("/path")` | Listen for GET requests at that URL |
| `return {...}` | JSON response sent to the client |
| **Pydantic** | Validates request bodies (`TodoCreate`) |
| **uvicorn** | Keeps Python running to answer HTTP requests |
| **CORS** | Lets the browser call your API from another port |

## HTTP methods

| Method | Typical use |
|--------|-------------|
| GET | Read data |
| POST | Create data |
| PUT/PATCH | Update |
| DELETE | Remove |

## Endpoints you'll build

| URL | Method | Description |
|-----|--------|-------------|
| `/` | GET | Welcome |
| `/health` | GET | Health check |
| `/about` | GET | Your name + role |
| `/todos` | GET/POST | Todo list |
| `/notes` | GET/POST | Notes (Lesson 7) |
| `/auth/*` | POST/GET | Login (Lesson 8) |

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `python` not found | Use `.\.venv\Scripts\uvicorn.exe` directly |
| Port 8000 in use | Stop old uvicorn with Ctrl+C |
| Edited code, no change | Check `--reload` terminal for errors |

## Checklist

- [ ] uvicorn running, `/docs` opens
- [ ] Edited `/health`, saw browser update
- [ ] Built `/about` endpoint
- [ ] Committed: `feat: add /about endpoint and learn API basics`

## Next lessons

- [04 — Frontend basics](04-frontend-basics.md) — call this API from a webpage
- [06 — PostgreSQL](06-postgresql.md) — persist todos to disk
