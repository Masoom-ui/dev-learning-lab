# 06 — PostgreSQL

PostgreSQL is a **relational** database. Data lives in **tables** with **rows** and **columns**. Tables link via **foreign keys** — ideal for structured SaaS data (users, subscriptions, invoices).

## When to use PostgreSQL

- Data has clear structure and relationships
- You need transactions (money, inventory)
- Complex queries with JOINs
- Strong consistency requirements

## Local setup

```bash
docker compose up -d postgres
```

Connection (see `backend/.env.example`):

```
postgresql://devlab:devlab@localhost:5432/devlab
```

## SQL essentials

```sql
-- Create
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert
INSERT INTO users (email) VALUES ('you@example.com');

-- Query
SELECT * FROM users WHERE email = 'you@example.com';

-- Update
UPDATE users SET email = 'new@example.com' WHERE id = 1;

-- Delete
DELETE FROM users WHERE id = 1;
```

## Relationships

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title TEXT NOT NULL,
  done BOOLEAN DEFAULT FALSE
);
```

One user → many todos. Query with JOIN:

```sql
SELECT todos.* FROM todos
JOIN users ON users.id = todos.user_id
WHERE users.email = 'you@example.com';
```

## From Python (SQLAlchemy — we'll add later)

```python
# Conceptual — we'll implement together
user = session.query(User).filter_by(email="you@example.com").first()
```

## Files in this repo

- `database/postgres/init.sql` — schema created when Docker starts
- Practice queries in `database/postgres/exercises.sql` (create with me)

## PostgreSQL vs MongoDB

| PostgreSQL | MongoDB |
|------------|---------|
| Tables, rows, columns | Collections, documents |
| Fixed schema (mostly) | Flexible schema |
| JOINs across tables | Embed or reference documents |
| ACID transactions | Transactions supported, often document-scoped |

Many SaaS apps use **both**: Postgres for core business data, Mongo for logs, analytics events, or unstructured content.
