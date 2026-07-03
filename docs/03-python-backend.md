# 03 — Python Backend

The backend is the **brain** of your app. It handles business logic, talks to databases, and exposes **APIs** that frontends call over HTTP.

We use **FastAPI** — modern, fast, and great for learning because it auto-generates API documentation.

## Project structure

```
backend/
├── app/
│   ├── main.py       # App entry point, routes
│   ├── config.py     # Settings (DB URLs, secrets)
│   └── db/           # Database connections (added later)
├── requirements.txt
└── .env.example
```

## Running the API

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

- API: http://127.0.0.1:8000
- Interactive docs: http://127.0.0.1:8000/docs

## Key concepts

### Routes (endpoints)

A route maps a URL + HTTP method to a function:

```python
@app.get("/hello")
def hello():
    return {"message": "Hello!"}
```

| Method | Typical use |
|--------|-------------|
| GET | Read data |
| POST | Create data |
| PUT/PATCH | Update data |
| DELETE | Remove data |

### Request & response bodies

POST/PATCH often send JSON:

```python
@app.post("/items")
def create_item(item: Item):  # Pydantic model validates input
    return item
```

### Environment variables

Never hardcode passwords. Use `.env` (see `.env.example`) and load with `config.py`.

## Learning path

1. Read and run `backend/app/main.py`
2. Add a new GET route `/about` returning your name
3. Add a POST route that accepts `{ "title": "..." }` for a todo
4. Connect PostgreSQL (see [06-postgresql.md](06-postgresql.md))
5. Connect MongoDB (see [07-mongodb.md](07-mongodb.md))

## SaaS building blocks (later)

- User authentication (JWT or sessions)
- Multi-tenant data (org_id on every row)
- Background jobs (emails, reports)
- Rate limiting and validation

We'll add these incrementally as mini-projects.
