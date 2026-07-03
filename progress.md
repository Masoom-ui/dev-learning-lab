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
Current lesson: 3 — Python backend (API concepts, step by step)
Next step: Step 4 — add GET /about route with your name
Read: progress.md + lessons.md
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
| Node.js | — | ⬜ Not installed yet (needed for React) |
| Docker Desktop | — | ⬜ Not installed yet (needed for databases) |

**PATH tip:** After installing tools, open a **new terminal** or refresh PATH:

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

---

## Current focus

**Lesson 3 — Python backend · Understanding APIs (slow path)**

| Step | Action | Status |
|------|--------|--------|
| 1 | Open `/health` in browser, see JSON answer | ✅ Done |
| 2 | Connect browser answer to `health()` in `main.py` | ✅ Done |
| 3 | Change `return` line, refresh, see answer change | ✅ Done |
| 4 | Add your own `GET /about` route | ⬜ Next |
| 5 | Commit + push API changes | ⬜ Pending |

**Key insight (Jatin's words):** *"I changed the code and the API answer changes and browser shows the new JSON."*

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
- [x] Branch created: `practice/git-branch`
- [x] File edited and committed on branch (`d488fc1`)
- [x] Switched back to `main` (`git switch main`)
- [x] Merged branch into `main` (`git merge practice/git-branch`)
- [x] Pushed to GitHub (`git push`)

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

## Lessons not started

| Lesson | Topic | Guide |
|--------|-------|-------|
| 3 | Python backend | [docs/03-python-backend.md](docs/03-python-backend.md) |
| 4 | Frontend basics | [docs/04-frontend-basics.md](docs/04-frontend-basics.md) |
| 5 | React | [docs/05-react.md](docs/05-react.md) |
| 6 | PostgreSQL | [docs/06-postgresql.md](docs/06-postgresql.md) |
| 7 | MongoDB | [docs/07-mongodb.md](docs/07-mongodb.md) |
| 8 | Mini SaaS | TBD |

---

## Git commit history (key commits)

| Commit | Message | Branch |
|--------|---------|--------|
| `dc0c0d1` | `chore: initial learning lab scaffold` | `main` |
| `183ed92` | `docs: add my name to getting started` | `main` |
| `d488fc1` | `docs: complete branch practice exercise` | merged into `main`, pushed |

---

## Session log

### 2026-07-03

- Created repo, installed Git + GitHub CLI, authenticated via browser (Masoom-ui)
- Set Git identity: Jatin &lt;jatinwork.001@gmail.com&gt;
- Installed Python 3.12.10
- Completed first commit exercise
- Started branch practice; reset and redid step-by-step
- Steps 1–4 of branch redo completed; paused before merge
- Created `progress.md` and `lessons.md` for continuity across chats
- Completed branch exercise steps 5–7 (switch, merge, push) — Lesson 2 done

---

## Next up

1. Commit `progress.md` + `lessons.md` to GitHub
2. **Lesson 3:** Run FastAPI backend — `uvicorn app.main:app --reload`
3. Open http://127.0.0.1:8000/docs

---

*Last updated: 2026-07-03 · Maintained with [lessons.md](lessons.md)*
