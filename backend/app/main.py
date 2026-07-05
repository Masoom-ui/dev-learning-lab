from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.config import settings
from app.db import get_connection

app = FastAPI(
    title=settings.app_name,
    description="Experimental API for learning backend development.",
    version="0.1.0",
)

# Allow frontend to call this API during learning (permissive for local dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TodoCreate(BaseModel):
    title: str


class Todo(TodoCreate):
    id: int
    done: bool = False


@app.get("/")
def root():
    return {
        "message": "Welcome to Dev Learning Lab API",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health")
def health():
    return {"status": "great", "app": settings.app_name}


@app.get("/about")
def about():
    return {"name": "Jatin", "role": "learning backend development"}


@app.get("/todos", response_model=list[Todo])
def list_todos():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id, title, done FROM todos ORDER BY id")
            rows = cur.fetchall()
    return [Todo(**row) for row in rows]


@app.post("/todos", response_model=Todo, status_code=201)
def create_todo(payload: TodoCreate):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO todos (user_id, title)
                SELECT id, %s FROM users WHERE email = 'learner@devlab.local'
                RETURNING id, title, done
                """,
                (payload.title,),
            )
            row = cur.fetchone()
            conn.commit()
    return Todo(**row)
