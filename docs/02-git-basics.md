# 02 — Git Basics

**Progress:** [progress.md](../progress.md) · **All lessons:** [lessons.md](../lessons.md) · **Prev:** [01-getting-started.md](01-getting-started.md) · **Next:** [03-python-backend.md](03-python-backend.md)

Git is a **version control system**. It records snapshots of your project so you can undo mistakes, branch safely, and collaborate on GitHub.

## Goals

- Stage, commit, and push changes
- Create and merge branches
- Understand the daily developer workflow

## Core concepts

| Term | Meaning |
|------|---------|
| **Repository (repo)** | Project folder tracked by Git |
| **Commit** | Saved snapshot with a message |
| **Branch** | Parallel line of work (e.g. `feature/login`) |
| **Merge** | Combine branch back into `main` |
| **Remote** | Copy on GitHub |
| **Push / Pull** | Upload / download commits |

## The basic workflow

```
edit files → git add → git commit → git push
```

## Step-by-step

### Step 1 — Check status

```powershell
git status
```

Shows modified, staged, and untracked files.

### Step 2 — Stage changes

```powershell
git add path/to/file.md
git add progress.md lessons.md
```

Staging = "include in the next commit."

### Step 3 — Commit

```powershell
git commit -m "docs: complete branch practice exercise"
```

Good messages explain **why**: `feat: add health endpoint`, `fix: handle empty email`.

### Step 4 — View history

```powershell
git log --oneline
```

### Step 5 — Branch practice

```powershell
git switch -c practice/git-branch
# edit a file, then:
git add exercises/README.md
git commit -m "docs: branch practice"
git switch main
git merge practice/git-branch
git push origin main
```

### Step 6 — Connect to GitHub

```powershell
git remote -v
git push origin main
```

## Commit message types (optional)

| Type | Use |
|------|-----|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `chore:` | Setup, tooling |

## Common situations

```powershell
git diff                    # see unstaged changes
git restore path/to/file    # undo unstaged edits
git branch                  # list branches (* = current)
```

## `.gitignore`

Never commit secrets (`.env`), dependencies (`node_modules/`), or virtualenvs (`.venv/`).

## Exercises

Do these in [exercises/README.md](../exercises/README.md):

1. **First commit** — add your name, commit, push
2. **Branch practice** — create branch, edit, merge to `main`
3. **Push to GitHub** — keep remote in sync

## Checklist

- [ ] Made at least one commit
- [ ] Created and merged a branch
- [ ] Pushed to GitHub (`Masoom-ui/dev-learning-lab`)

## Next lesson

[03 — Python backend](03-python-backend.md) — your first API.
