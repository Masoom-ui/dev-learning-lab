# 06 — PostgreSQL

**Progress:** [progress.md](../progress.md) · **All lessons:** [lessons.md](../lessons.md) · **Prev:** [05-react.md](05-react.md) · **Next:** [07-mongodb.md](07-mongodb.md)

PostgreSQL is a **relational** database — **tables**, **rows**, **columns**, and **foreign keys**. Ideal for structured SaaS data (users, orders, todos).

## Goals

- Run Postgres in Docker
- Query sample data with SQL
- Connect FastAPI to PostgreSQL
- Prove todos survive API restart

## When to use PostgreSQL

- Clear structure and relationships
- Transactions (money, inventory)
- JOINs across tables
- Strong consistency

## Step-by-step

### Step 1 — Install Docker Desktop

Download from https://www.docker.com/products/docker-desktop/

### Step 2 — Start Postgres

```powershell
cd C:\Users\KevinTewani\Documents\Projects\dev-learning-lab
docker compose up -d postgres
```

Container: **`dev-lab-postgres`** on port **5432**.

### Step 3 — See sample data

```powershell
docker exec -it dev-lab-postgres psql -U devlab -d devlab
```

```sql
SELECT * FROM users;
SELECT * FROM todos;
\q
```

Sample user: `learner@devlab.local` · Sample todo: `Learn Git basics`

### Step 4 — Connect Python API

Files added/changed:

| File | Purpose |
|------|---------|
| `backend/app/db.py` | PostgreSQL connection helper |
| `backend/app/main.py` | SQL instead of in-memory `_todos` |
| `backend/requirements.txt` | `psycopg2-binary` |

Install driver:

```powershell
cd backend
.\.venv\Scripts\pip.exe install psycopg2-binary
```

Connection string (in `.env`):

```
postgresql://devlab:devlab@localhost:5432/devlab
```

**GET `/todos`** runs:

```sql
SELECT id, title, done FROM todos ORDER BY id
```

### Step 5 — Prove persistence

1. Start uvicorn, GET `/todos` — see todos
2. Stop uvicorn (Ctrl+C), start again
3. GET `/todos` — todos still there (from disk, not memory)

## SQL essentials

```sql
SELECT * FROM todos WHERE user_id = 1;
INSERT INTO todos (user_id, title) VALUES (1, 'New todo');
UPDATE todos SET done = true WHERE id = 1;
DELETE FROM todos WHERE id = 1;
```

## Schema

See [database/postgres/init.sql](../database/postgres/init.sql):

- `users` — id, email, display_name, password_hash (Lesson 8)
- `todos` — id, user_id → users, title, done

## Files in this repo

- `database/postgres/init.sql` — schema + sample data
- `database/postgres/README.md` — connection details
- `database/postgres/migrations/` — schema updates (Lesson 8)

## PostgreSQL vs MongoDB

| PostgreSQL | MongoDB |
|------------|---------|
| Tables, rows | Collections, documents |
| Fixed schema | Flexible JSON shape |
| SQL + JOINs | Document queries |

Many apps use **both** — Postgres for core data, Mongo for flexible content.

## Checklist

- [ ] Docker running, Postgres up
- [ ] Queried `users` and `todos` in psql
- [ ] API returns todos from database
- [ ] Todos survive uvicorn restart
- [ ] Committed: `feat: persist todos in PostgreSQL instead of in-memory store`

## Next lesson

[07 — MongoDB](07-mongodb.md) — flexible documents for notes.
