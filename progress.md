# Progress — Dev Learning Lab

Live record of what you've done, what's in progress, and what's next.  
Updated as we learn together.

**→ See full curriculum:** [lessons.md](lessons.md)

---

## Quick resume (for new chats)

Copy this to the AI if context was reset:

```
Repo: dev-learning-lab
GitHub: https://github.com/Masoom-ui/dev-learning-lab
Learner: Jatin (jatinwork.001@gmail.com)
GitHub account: Masoom-ui
Current lesson: 12 — Search todos (complete)
Next step: Optional — pytest, CI, TypeScript, or portfolio polish
Read: progress.md + lessons.md

Live app: https://dev-learning-lab.vercel.app
API: https://dev-learning-lab-api.onrender.com

Servers needed for local dev (Lesson 4+):
  Terminal 1: cd backend && .\.venv\Scripts\uvicorn.exe app.main:app --reload
  Terminal 2: cd frontend/react && npm.cmd run dev
  Browser: http://localhost:5173
```

---

## Learner profile

| Field | Value |
|-------|-------|
| Name (Git commits) | Jatin |
| Email (Git commits) | jatinwork.001@gmail.com |
| GitHub | [Masoom-ui](https://github.com/Masoom-ui) |
| Repo | [dev-learning-lab](https://github.com/Masoom-ui/dev-learning-lab) |
| Terminal | PowerShell (recommended) |
| OS | Windows |

---

## Environment setup

| Tool | Version | Status |
|------|---------|--------|
| Git | 2.55.0 | ✅ Installed |
| GitHub CLI (`gh`) | 2.96.0 | ✅ Installed + browser auth |
| Python | 3.12.10 | ✅ Installed |
| Node.js | 24.18.0 | ✅ Installed |
| Docker Desktop | 29.6.1 | ✅ Installed |

**PATH tip:** After installing tools, open a **new terminal** or refresh PATH:

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

**Python tip:** If `python` not found, use venv Python directly:

```powershell
..\..\backend\.venv\Scripts\python.exe
```

---

## Current focus

**Lessons 9–12 — Extend the live app** — ✅ Complete

| Lesson | Topic | Status |
|--------|-------|--------|
| 9 | Full todo CRUD (PATCH/DELETE) | ✅ Done |
| 10 | Notes UI in React (MongoDB) | ✅ Done |
| 11 | Components, hooks, loading/error UX | ✅ Done |
| 12 | Search todos (`GET /todos?q=`) | ✅ Done |

**Guides:** [docs/09-crud-todos.md](docs/09-crud-todos.md) through [docs/12-search-todos.md](docs/12-search-todos.md)

**Live app:** https://dev-learning-lab.vercel.app

---

## Lesson 8 — Mini SaaS (complete)

| Step | Action | Status |
|------|--------|--------|
| 1 | Backend auth — register, login, JWT | ✅ Done |
| 2 | Protect `/todos` and `/notes` | ✅ Done |
| 3 | React login UI + send token | ✅ Done |
| 4 | Deploy to the internet | ✅ Done |

**Guide:** [docs/08-mini-saas.md](docs/08-mini-saas.md) · [docs/deploy.md](docs/deploy.md)

---

## Lesson 7 — MongoDB (complete)

| Step | Action | Status |
|------|--------|--------|
| 1 | Start MongoDB (`docker compose up -d mongodb`) | ✅ Done |
| 2 | Insert sample notes (shell or Compass) | ✅ Done |
| 3 | Browse data in MongoDB | ✅ Done |
| 4 | Connect Python API to MongoDB | ✅ Done |
| 5 | Compare Postgres todos vs Mongo notes | ✅ Done |

**Guide:** [docs/07-mongodb.md](docs/07-mongodb.md) · **Code:** [database/mongodb/](database/mongodb/)

**You are on branch:** `main`

---

## Lesson 5 — React (complete)

**Lesson 5 — React · Components, state, API calls** — ✅ Complete

| Step | Action | Status |
|------|--------|--------|
| 1 | Install Node.js + `npm install` | ✅ Done |
| 2 | Run `npm run dev` — open http://localhost:5173 | ✅ Done |
| 3 | Edit `App.jsx` — see changes live | ✅ Done |
| 4 | Fetch todos from API via Vite proxy | ✅ Done |
| 5 | Build todo list in React | ✅ Done |

**Guide:** [docs/05-react.md](docs/05-react.md) · **Code:** [frontend/react/](frontend/react/)

**You are on branch:** `main`

---

## Lesson 6 — PostgreSQL (complete)

**Lesson 6 — PostgreSQL · Save data permanently** — ✅ Complete

| Step | Action | Status |
|------|--------|--------|
| 1 | Install Docker Desktop | ✅ Done |
| 2 | Start Postgres (`docker compose up -d postgres`) | ✅ Done |
| 3 | See sample data (users + todos tables) | ✅ Done |
| 4 | Connect Python API to PostgreSQL | ✅ Done |
| 5 | Todos survive API restart | ✅ Done |

**Why this lesson:** Right now todos live in memory — they vanish when you stop uvicorn. PostgreSQL **persists** data to disk.

**You are on branch:** `main`

---

## Lesson 1 — Getting started

**Status:** ✅ Complete

### Completed

- [x] Opened terminal in Cursor (PowerShell)
- [x] Learned `cd` into project folder
- [x] `git status` — works after PATH refresh
- [x] `python --version` — Python 3.12.10
- [x] Read [docs/02-git-basics.md](docs/02-git-basics.md)
- [x] Added name to [docs/01-getting-started.md](docs/01-getting-started.md)
- [x] First commit: `183ed92` — `docs: add my name to getting started`
- [x] Pushed to GitHub

### Concepts learned

- Terminal opens with **Ctrl + `**
- Only paste **commands**, not markdown fences (` ``` `) or example output (`Fast-forward`)
- Git workflow: `edit → git add → git commit → git push`
- Commits are local snapshots; `push` uploads to GitHub

---

## Lesson 2 — Git basics

**Status:** ✅ Complete

### Completed

- [x] Initial repo commit on GitHub (`dc0c0d1`)
- [x] First personal commit (`183ed92`)
- [x] Branch practice — created `practice/git-branch`, committed, merged, pushed
- [x] Tracking files committed (`064eebd` — `progress.md`, `lessons.md`)
- [x] Checked off Git exercises in [exercises/README.md](exercises/README.md)

### Concepts learned

- **Branch** = side path for experiments; `main` stays safe until merge
- `git switch -c <name>` = create + switch to new branch
- `git branch` = list branches (`*` = current)
- `git add` needs a filename: `git add path/to/file`
- Commit on a branch only affects that branch until merge

### Mistakes & fixes (worth remembering)

| Mistake | Fix |
|---------|-----|
| Pasted commit message without `git commit -m "..."` | Full command: `git commit -m "your message"` |
| Ran `git add` with no filename | Use `git add exercises/README.md` |
| Pasted `Fast-forward` from docs into terminal | That's output, not a command — ignore it |
| Git not found in old terminal | New terminal or refresh PATH |

### Branch exercise reset (2026-07-03)

First branch attempt was undone with `git reset --hard 183ed92` to redo step-by-step with understanding. First exercise (name commit) was kept.

---

## Lesson 3 — Python backend

**Status:** ✅ Core complete

### Completed

- [x] Understood API = question (request) + answer (response)
- [x] Opened `/health` in browser, saw JSON
- [x] Connected URL to `health()` function in `main.py`
- [x] Changed `return` line (`ok` → `great`), saw browser answer change
- [x] Wrote own endpoint: `GET /about` returning name + role
- [x] Committed + pushed: `79c9c72` — `feat: add /about endpoint and learn API basics`
- [x] Ran API with: `.\.venv\Scripts\uvicorn.exe app.main:app --reload`

### Key insight (Jatin's words)

> *"I changed the code and the API answer changes and browser shows the new JSON."*

### Concepts learned

- `@app.get("/path")` = URL address the API listens on
- `return {...}` = the JSON answer
- `uvicorn` = keeps Python awake to answer requests
- `.venv` = isolated Python environment for this project
- PowerShell may block `.venv\Scripts\activate` — use `.\.venv\Scripts\uvicorn.exe` directly

### API endpoints built

| URL | Method | Returns |
|-----|--------|---------|
| `/` | GET | Welcome message |
| `/health` | GET | `{"status": "great", "app": "..."}` |
| `/about` | GET | `{"name": "Jatin", "role": "..."}` |
| `/todos` | GET/POST | Todo list (not exercised yet) |

---

## Lesson 4 — Frontend basics

**Status:** ✅ Complete

### Completed

- [x] Opened `frontend/vanilla/index.html` — saw Dev Learning Lab page
- [x] Matched visible UI to HTML structure (h1, button, span ids)
- [x] Learned HTML / CSS / JS roles (structure / style / behavior)
- [x] Got "Check backend" working — status shows **`great`**
- [x] Learned `fetch()` in `app.js` calls API same as typing URL in Chrome
- [x] Learned `addEventListener("click", ...)` connects button to function

### Concepts learned

- **HTML** = page structure; `id` attributes let JavaScript find elements
- **JavaScript `fetch()`** = webpage asks the API a question
- **DOM** = updating `statusEl.textContent` changes what you see on screen
- **CORS** = browser security rules for cross-origin requests
- Must open page via **`http://127.0.0.1:5500`** — not `file://`
- URLs go in **Chrome address bar**, not the terminal

### Mistakes & fixes (worth remembering)

| Mistake | Fix |
|---------|-----|
| Opened page via double-click (`file://`) | Use `python -m http.server 5500` + `http://127.0.0.1:5500` |
| Pasted `http://127.0.0.1:5500` in terminal | URLs go in Chrome, not PowerShell |
| `python` not found in new terminal | Refresh PATH or use `..\..\backend\.venv\Scripts\python.exe` |
| Pasted JavaScript into `index.html` instead of `app.js` | HTML = structure only; JS goes in `app.js` |

### How to run both servers

**Terminal 1 — API:**
```powershell
cd C:\Users\KevinTewani\Documents\Projects\dev-learning-lab\backend
.\.venv\Scripts\uvicorn.exe app.main:app --reload
```

**Terminal 2 — Frontend:**
```powershell
cd C:\Users\KevinTewani\Documents\Projects\dev-learning-lab\frontend\vanilla
..\..\backend\.venv\Scripts\python.exe -m http.server 5500
```

**Browser:** http://127.0.0.1:5500

### Not yet done

- [x] Try todo form (POST to API)
- [x] Commit frontend + CORS changes (`da55127`)

---

## Lessons not started (optional next)

| Topic | Ideas |
|-------|-------|
| Testing | `pytest` for API, Vitest for React |
| CI | GitHub Actions on push |
| TypeScript | Migrate React to `.tsx` |
| React Router | Separate login/dashboard URLs |

---

## Git commit history (key commits)

| Commit | Message | Notes |
|--------|---------|-------|
| `dc0c0d1` | `chore: initial learning lab scaffold` | First commit |
| `183ed92` | `docs: add my name to getting started` | Lesson 1 exercise |
| `d488fc1` | `docs: complete branch practice exercise` | Lesson 2, merged to main |
| `064eebd` | `docs: add progress and lessons tracking files` | Tracking files |
| `79c9c72` | `feat: add /about endpoint and learn API basics` | Lesson 3 |
| `da55127` | `feat: connect frontend to API with about section and todos` | Lesson 4 |

---

## Session log

### 2026-07-03

- Created repo, installed Git + GitHub CLI, authenticated via browser (Masoom-ui)
- Set Git identity: Jatin &lt;jatinwork.001@gmail.com&gt;
- Installed Python 3.12.10
- Completed Lesson 1 (first commit exercise)
- Completed Lesson 2 (branch practice, step-by-step redo)
- Created `progress.md` and `lessons.md`

### 2026-07-04

- Started Lesson 3 — slow path (understand API before copy-paste)
- Learned request/response, edited `/health`, built `/about` endpoint
- Committed + pushed API changes (`79c9c72`)
- Started Lesson 4 — opened vanilla frontend
- Fixed file:// vs http://5500 issue, got "Check backend" showing `great`
- Read `app.js` fetch pattern — connected Lesson 3 + 4
- Relaxed CORS in `main.py` for local learning (not yet committed)

---

### 2026-07-18

- Deployed to production: Render API + Vercel frontend + MongoDB Atlas
- Set `MONGODB_URL` and `CORS_ORIGINS` on Render
- Completed Lessons 9–12: todo CRUD, notes UI, components/hooks, search
- Updated exercises checklist, progress, and lesson guides

---

## Next up

1. **Optional** — API tests with pytest
2. **Optional** — GitHub Actions CI
3. **Portfolio** — screenshots + README polish for job applications

---

*Last updated: 2026-07-18 · Maintained with [lessons.md](lessons.md)*
