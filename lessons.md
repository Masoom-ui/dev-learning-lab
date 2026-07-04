# Lessons — Dev Learning Lab

Curriculum index for this repo. Each lesson links to its guide, exercises, and your live progress.

**→ Track what you've done:** [progress.md](progress.md)

---

## How to use these files

| File | Purpose |
|------|---------|
| **[lessons.md](lessons.md)** (this file) | What to learn, in what order, and where the guides live |
| **[progress.md](progress.md)** | What you've completed, what's in progress, session notes |

When starting a new chat or after context resets, tell the AI:

> *"Read `progress.md` and `lessons.md` — continue where we left off."*

---

## Learning path

```
Lesson 1 ──► Lesson 2 ──► Lesson 3 ──► Lesson 4 ──► Lesson 5 ──► Lesson 6 ──► Lesson 7 ──► Lesson 8
  Setup        Git          API        HTML/JS       React        Postgres      MongoDB       SaaS
```

---

## Lesson index

| # | Topic | Guide | Code / practice | Status |
|---|-------|-------|-----------------|--------|
| 1 | Getting started | [docs/01-getting-started.md](docs/01-getting-started.md) | Terminal, `git status`, `python --version` | ✅ Done |
| 2 | Git basics | [docs/02-git-basics.md](docs/02-git-basics.md) | [exercises/README.md](exercises/README.md) § Git | ✅ Done |
| 3 | Python backend | [docs/03-python-backend.md](docs/03-python-backend.md) | [backend/](backend/) | ✅ Core done |
| 4 | Frontend basics | [docs/04-frontend-basics.md](docs/04-frontend-basics.md) | [frontend/vanilla/](frontend/vanilla/) | 🔄 In progress |
| 5 | React | [docs/05-react.md](docs/05-react.md) | [frontend/react/](frontend/react/) | ⬜ Not started |
| 6 | PostgreSQL | [docs/06-postgresql.md](docs/06-postgresql.md) | [database/postgres/](database/postgres/) | ⬜ Not started |
| 7 | MongoDB | [docs/07-mongodb.md](docs/07-mongodb.md) | [database/mongodb/](database/mongodb/) | ⬜ Not started |
| 8 | Mini SaaS project | *(built across lessons)* | Full stack + deploy | ⬜ Not started |

Status key: ✅ Done · 🔄 In progress · ⬜ Not started

*Status is mirrored in [progress.md](progress.md) — update both when a lesson advances.*

---

## Lesson 1 — Getting started

**Goals:** Understand the stack, open a terminal, verify Git and Python.

**Guide:** [docs/01-getting-started.md](docs/01-getting-started.md)

**Exercises:**
- Run `git status`
- Run `python --version`
- Add your name to `docs/01-getting-started.md` and commit

**Details:** [progress.md § Lesson 1](progress.md#lesson-1--getting-started)

---

## Lesson 2 — Git basics

**Goals:** Commits, branches, merge, push — the daily developer workflow.

**Guide:** [docs/02-git-basics.md](docs/02-git-basics.md)

**Exercises:** [exercises/README.md](exercises/README.md) — Git section

| Exercise | What you practice |
|----------|-------------------|
| First commit | `add` → `commit` → `push` |
| Branch practice | `switch -c` → edit → commit → `switch main` → `merge` → `push` |
| Push to GitHub | Remote already connected; push after each exercise |

**Details:** [progress.md § Lesson 2](progress.md#lesson-2--git-basics)

---

## Lesson 3 — Python backend

**Goals:** Run FastAPI, understand routes, hit `/docs`.

**Guide:** [docs/03-python-backend.md](docs/03-python-backend.md) · **Code:** [backend/README.md](backend/README.md)

**Exercises:** Backend section in [exercises/README.md](exercises/README.md)

---

## Lesson 4 — Frontend basics

**Goals:** HTML/CSS/JS, DOM, `fetch()` to your API.

**Guide:** [docs/04-frontend-basics.md](docs/04-frontend-basics.md) · **Code:** [frontend/vanilla/](frontend/vanilla/)

---

## Lesson 5 — React

**Goals:** Components, state, call API via Vite proxy.

**Guide:** [docs/05-react.md](docs/05-react.md) · **Code:** [frontend/react/](frontend/react/)

---

## Lesson 6 — PostgreSQL

**Goals:** Tables, SQL, relationships. Docker: `docker compose up -d postgres`

**Guide:** [docs/06-postgresql.md](docs/06-postgresql.md) · **Schema:** [database/postgres/init.sql](database/postgres/init.sql)

---

## Lesson 7 — MongoDB

**Goals:** Documents, collections, when to use vs Postgres.

**Guide:** [docs/07-mongodb.md](docs/07-mongodb.md)

---

## Lesson 8 — Mini SaaS (later)

**Goals:** Auth, multi-user data, deploy.

Built by combining lessons 3–7.

---

## Repo & resources

| Resource | Link |
|----------|------|
| GitHub repo | https://github.com/Masoom-ui/dev-learning-lab |
| Main README | [README.md](README.md) |
| Your progress | [progress.md](progress.md) |
| All exercises | [exercises/README.md](exercises/README.md) |

---

*Last updated: 2026-07-03 — see [progress.md](progress.md) for session log.*
