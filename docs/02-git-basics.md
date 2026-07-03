# 02 — Git Basics

Git is a **version control system**. It records snapshots of your project so you can:

- See what changed and when
- Undo mistakes
- Work on features in branches without breaking main code
- Collaborate with others (via GitHub, GitLab, etc.)

## Core concepts

| Term | Meaning |
|------|---------|
| **Repository (repo)** | A project folder tracked by Git |
| **Commit** | A saved snapshot with a message describing the change |
| **Branch** | A parallel line of development (e.g. `feature/login`) |
| **Merge** | Combine branch changes back into another branch |
| **Remote** | A copy of the repo on a server (GitHub) |
| **Push / Pull** | Send commits to remote / download commits from remote |

## The basic workflow

```
edit files → git add → git commit → git push
```

### 1. Check status

```bash
git status
```

Shows modified, staged, and untracked files.

### 2. Stage changes

```bash
git add path/to/file.py      # one file
git add .                    # everything changed
```

Staging means "include these changes in the next commit."

### 3. Commit

```bash
git commit -m "feat: add health check endpoint"
```

Write messages that explain **why**, not just what:

- Good: `fix: handle empty email on signup`
- Weak: `update file`

### 4. View history

```bash
git log --oneline
```

### 5. Branches

```bash
git branch                    # list branches
git checkout -b feature/todos # create and switch
git checkout main             # switch back
```

Modern Git also uses:

```bash
git switch -c feature/todos
git switch main
```

### 6. Connect to GitHub

After creating a repo on GitHub:

```bash
git remote add origin https://github.com/YOUR_USER/dev-learning-lab.git
git push -u origin main
```

## Common situations

### Undo unstaged edits to a file

```bash
git checkout -- path/to/file
# or
git restore path/to/file
```

### See what changed

```bash
git diff
```

### `.gitignore`

Files listed in `.gitignore` are never committed — secrets (`.env`), dependencies (`node_modules/`), etc.

## Practice exercises

Do these in order with me:

1. **First commit** — commit the initial repo structure
2. **Branch practice** — create `practice/git-branch`, add a line to `exercises/README.md`, commit, merge to `main`
3. **Push to GitHub** — create a remote repo and push

## Commit message convention (optional but helpful)

```
type: short description

feat:     new feature
fix:      bug fix
docs:     documentation only
refactor: code change, no behavior change
test:     adding tests
```

---

When you're ready, say *"Let's do the first Git exercise"* and we'll walk through it live.
