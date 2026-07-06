# 01 — Getting Started

**Progress:** [progress.md](../progress.md) · **All lessons:** [lessons.md](../lessons.md) · **Next:** [02-git-basics.md](02-git-basics.md)

Welcome to your development lab. This lesson sets up your mindset, tools, and first Git commit.

## Goals

- Understand the web app stack (browser → API → database)
- Open a terminal and run basic commands
- Verify Git and Python are installed
- Make your first commit

## The stack you'll build

```
Browser (HTML / JS / React)
        ↓ HTTP
Backend (Python + FastAPI)
        ↓
Database (PostgreSQL + MongoDB)
```

You'll touch every layer in this repo.

## Tools

| Tool | Purpose |
|------|---------|
| **Cursor** | Code editor + AI pair programmer |
| **Git** | Track changes, undo mistakes, push to GitHub |
| **Python** | Backend API logic |
| **Node.js** | React frontend (Lesson 5) |
| **Docker** | Run Postgres + MongoDB locally (Lessons 6–7) |
| **Browser** | Test frontends and API docs |

## Step-by-step

### Step 1 — Open terminal

In Cursor: **Ctrl + `** (backtick). Use **PowerShell**.

Navigate to the project:

```powershell
cd C:\Users\KevinTewani\Documents\Projects\dev-learning-lab
```

### Step 2 — Verify Git

```powershell
git status
git --version
```

If `git` is not found, refresh PATH or open a new terminal:

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

### Step 3 — Verify Python

```powershell
python --version
```

You want **3.11+** (this lab uses 3.12).

### Step 4 — Read the Git guide

Open [02-git-basics.md](02-git-basics.md) — you'll use Git every day.

### Step 5 — First exercise

1. Add your name at the bottom of this file (in a comment)
2. Stage, commit, push:

```powershell
git add docs/01-getting-started.md
git commit -m "docs: add my name to getting started"
git push origin main
```

## Key concepts

- **Terminal** — type commands; the computer runs them
- **Repository** — this project folder, tracked by Git
- **Commit** — a saved snapshot with a message
- Only paste **commands** in the terminal — not markdown fences or example output

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Pasted ` ``` ` or doc output into terminal | Copy only the command line |
| Git not found in old terminal | New terminal or refresh PATH |
| Committed without `git add` | Run `git add filename` first |

## Checklist

- [ ] `git status` works
- [ ] `python --version` shows 3.11+
- [ ] Name added and committed
- [ ] Pushed to GitHub

## Next lesson

[02 — Git basics](02-git-basics.md) — branches, merge, daily workflow.

---

<!-- Jatin — completed my first Git exercise -->
