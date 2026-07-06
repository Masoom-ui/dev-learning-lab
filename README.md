# Dev Learning Lab

An experimental repository for learning software development from the ground up — with hands-on practice in Git, Python backends, web frontends, and databases.

This is **your sandbox**. Break things, try ideas, and build small projects here. I'll guide you through each topic as we go.

**Track your learning:**
- **[docs/README.md](docs/README.md)** — all 8 lesson guides in one place
- **[lessons.md](lessons.md)** — curriculum and lesson index
- **[progress.md](progress.md)** — what you've completed and what's next

---

## What you'll learn here

| Area | Stack | Where to start |
|------|-------|----------------|
| Version control | Git & GitHub | [docs/02-git-basics.md](docs/02-git-basics.md) |
| Backend APIs | Python (FastAPI) | [backend/](backend/) |
| Frontend (basics) | HTML, CSS, JavaScript | [frontend/vanilla/](frontend/vanilla/) |
| Frontend (apps) | React | [frontend/react/](frontend/react/) |
| Relational DB | PostgreSQL | [database/postgres/](database/postgres/) |
| Document DB | MongoDB | [database/mongodb/](database/mongodb/) |

---

## Repository layout

```
dev-learning-lab/
├── docs/              # Step-by-step learning guides
├── backend/           # Python API (FastAPI)
├── frontend/
│   ├── vanilla/       # Plain HTML + JS (learn fundamentals first)
│   └── react/         # React app (build on vanilla skills)
├── database/
│   ├── postgres/      # SQL schemas, seeds, exercises
│   └── mongodb/       # Document models, exercises
├── exercises/         # Small challenges we'll work through together
└── docker-compose.yml # Local PostgreSQL + MongoDB (optional)
```

---

## Quick start

### 1. Prerequisites

Install these on your machine (we can do this together step by step):

- [Git](https://git-scm.com/downloads)
- [Python 3.11+](https://www.python.org/downloads/)
- [Node.js 20+](https://nodejs.org/) (for React later)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (optional, for local databases)

### 2. Clone or open this repo

If you've pushed this to GitHub:

```bash
git clone <your-repo-url>
cd dev-learning-lab
```

Or just open the folder in Cursor.

### 3. Start the backend (when ready)

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Visit http://127.0.0.1:8000/docs for the interactive API docs.

### 4. Start databases (optional)

```bash
docker compose up -d
```

PostgreSQL → `localhost:5432` · MongoDB → `localhost:27017`

---

## Suggested learning path

We'll adapt this to your pace, but this order builds skills naturally:

1. **Git basics** — commits, branches, pushing to GitHub
2. **HTML + JS** — how browsers and the DOM work
3. **Python backend** — your first API endpoint
4. **Connect frontend → backend** — fetch data from your API
5. **PostgreSQL** — tables, queries, relationships (users, orders, etc.)
6. **MongoDB** — flexible documents (logs, content, nested data)
7. **React** — component-based UIs for real apps
8. **Mini SaaS project** — auth, CRUD, deploy (when you're ready)

Each step has a guide in `docs/` and practice space in the repo.

---

## How we'll use this together

When you want to learn something, tell me:

- *"Teach me Git branching"* → we'll use `docs/02-git-basics.md` and practice in this repo
- *"Build a todo API"* → we'll add code under `backend/` and connect a frontend
- *"Explain PostgreSQL vs MongoDB"* → we'll compare with real examples in `database/`

Ask questions anytime. This repo grows with you.

---

## Rules of the lab

- **Experiment freely** — this is not production code
- **Commit often** — small commits make Git easier to understand
- **One concept at a time** — depth beats rushing through topics
- **Break things on purpose** — fixing errors is how you learn

---

## Next step

Check [progress.md](progress.md) for where you left off, or open [lessons.md](lessons.md) to see the full path.
