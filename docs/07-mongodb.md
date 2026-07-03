# 07 — MongoDB

MongoDB stores **documents** (JSON-like BSON) in **collections**. No rigid table schema — great for evolving data shapes and nested objects.

## When to use MongoDB

- Document structure varies (user-generated content, configs)
- Nested arrays/objects are common
- Rapid prototyping without migrations
- Event logs, activity feeds, CMS content

## Local setup

```bash
docker compose up -d mongodb
```

Connection string:

```
mongodb://devlab:devlab@localhost:27017
```

## Basic operations (MongoDB shell / Compass)

```javascript
// Insert
db.notes.insertOne({
  title: "My first note",
  tags: ["learning", "dev"],
  createdAt: new Date()
});

// Find
db.notes.find({ tags: "learning" });

// Update
db.notes.updateOne(
  { title: "My first note" },
  { $set: { done: true } }
);

// Delete
db.notes.deleteOne({ title: "My first note" });
```

## From Python (Motor/PyMongo — we'll add later)

```python
# Conceptual
await db.notes.insert_one({"title": "Hello", "tags": ["demo"]})
docs = await db.notes.find({"tags": "demo"}).to_list(100)
```

## Modeling tips

**Embed** when data is read together and doesn't grow unbounded:

```json
{
  "user": "alice",
  "comments": [
    { "text": "Nice!", "at": "2026-01-01" }
  ]
}
```

**Reference** when related data is large or shared:

```json
{ "userId": "abc123", "postId": "xyz789" }
```

## Learning exercises

1. Insert sample notes via MongoDB Compass (GUI) or shell
2. Add a FastAPI route that reads/writes notes in Mongo
3. Compare the same "todo" feature in Postgres vs Mongo — notice tradeoffs

We'll do exercise 3 together — it's one of the best ways to internalize when to use which database.
