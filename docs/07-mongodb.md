# 07 — MongoDB

**Progress:** [progress.md](../progress.md) · **All lessons:** [lessons.md](../lessons.md) · **Prev:** [06-postgresql.md](06-postgresql.md) · **Next:** [08-mini-saas.md](08-mini-saas.md)

MongoDB stores **documents** (JSON-like BSON) in **collections**. Flexible schema — great for nested data, tags, and evolving shapes.

## Goals

- Run MongoDB in Docker
- Insert and browse sample notes
- Connect FastAPI with PyMongo
- Compare Postgres todos vs Mongo notes

## When to use MongoDB

- Variable document structure
- Nested arrays/objects (tags, comments)
- Rapid prototyping without migrations
- Logs, feeds, CMS content

## Step-by-step

### Step 1 — Start MongoDB

```powershell
docker compose up -d mongodb
```

Container: **`dev-lab-mongo`** on port **27017**.

### Step 2 — Seed sample notes

```powershell
docker cp database/mongodb/seed-notes.js dev-lab-mongo:/seed-notes.js
docker exec dev-lab-mongo mongosh -u devlab -p devlab --authenticationDatabase admin devlab --file /seed-notes.js
```

Or insert manually in shell:

```powershell
docker exec -it dev-lab-mongo mongosh -u devlab -p devlab --authenticationDatabase admin
```

```javascript
use devlab
db.notes.insertOne({
  title: "My first note",
  tags: ["learning", "dev"],
  createdAt: new Date()
})
db.notes.find()
```

### Step 3 — Browse data

Use [MongoDB Compass](https://www.mongodb.com/products/compass):

```
mongodb://devlab:devlab@localhost:27017/devlab?authSource=admin
```

### Step 4 — Connect Python API

Files added/changed:

| File | Purpose |
|------|---------|
| `backend/app/mongo_client.py` | MongoDB connection |
| `backend/app/main.py` | `GET/POST /notes` |
| `backend/requirements.txt` | `pymongo` |

```powershell
cd backend
.\.venv\Scripts\pip.exe install pymongo
```

### Step 5 — Compare both databases

In http://127.0.0.1:8000/docs:

| Endpoint | Database | Shape |
|----------|----------|-------|
| GET `/todos` | PostgreSQL | `{ id: 1, title, done }` — numeric id |
| GET `/notes` | MongoDB | `{ id: "6a4a...", title, tags: [] }` — string id + tags |

Same API, different storage models.

## Basic MongoDB operations

```javascript
db.notes.insertOne({ title: "Hello", tags: ["demo"] })
db.notes.find({ tags: "learning" })
db.notes.updateOne({ title: "Hello" }, { $set: { done: true } })
db.notes.deleteOne({ title: "Hello" })
```

## Modeling tips

**Embed** small data read together:

```json
{ "user": "alice", "comments": [{ "text": "Nice!" }] }
```

**Reference** large or shared data:

```json
{ "userId": 1, "postId": "abc123" }
```

## Files in this repo

- [database/mongodb/seed-notes.js](../database/mongodb/seed-notes.js)
- [database/mongodb/README.md](../database/mongodb/README.md)

## Checklist

- [ ] MongoDB container running
- [ ] Sample notes in `devlab.notes`
- [ ] GET `/notes` returns documents
- [ ] POST `/notes` creates a note
- [ ] Compared `/todos` vs `/notes` in `/docs`
- [ ] Committed: `feat: add MongoDB notes API with pymongo and seed data`

## Next lesson

[08 — Mini SaaS](08-mini-saas.md) — auth, multi-user data, deploy.
