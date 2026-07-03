# Backend (Python + FastAPI)

Starter API for learning backend development.

## Setup

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env   # or copy manually on Windows
uvicorn app.main:app --reload
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Welcome message |
| GET | `/health` | Health check |
| GET | `/todos` | List todos (in-memory) |
| POST | `/todos` | Create todo `{ "title": "..." }` |

Interactive docs: http://127.0.0.1:8000/docs
