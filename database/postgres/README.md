# PostgreSQL

Start the database:

```bash
docker compose up -d postgres
```

Connect with any SQL client:

- Host: `localhost`
- Port: `5432`
- User: `devlab`
- Password: `devlab`
- Database: `devlab`

`init.sql` creates `users` and `todos` tables with sample data.

See [docs/06-postgresql.md](../../docs/06-postgresql.md) for the learning guide.
