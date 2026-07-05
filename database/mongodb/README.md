# MongoDB

Start the database:

```bash
docker compose up -d mongodb
```

Connection string:

```
mongodb://devlab:devlab@localhost:27017/devlab?authSource=admin
```

## Seed sample notes

```powershell
docker cp database/mongodb/seed-notes.js dev-lab-mongo:/seed-notes.js
docker exec dev-lab-mongo mongosh -u devlab -p devlab --authenticationDatabase admin devlab --file /seed-notes.js
```

Or browse with [MongoDB Compass](https://www.mongodb.com/products/compass) using the connection string above.

API endpoints (after backend is running):

| Method | Path | Description |
|--------|------|-------------|
| GET | `/notes` | List notes from MongoDB |
| POST | `/notes` | Create note `{ "title": "...", "tags": ["..."] }` |

See [docs/07-mongodb.md](../../docs/07-mongodb.md) for the learning guide.
