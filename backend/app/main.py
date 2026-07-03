from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.config import settings

app = FastAPI(
    title=settings.app_name,
    description="Experimental API for learning backend development.",
    version="0.1.0",
)

# Allow frontend (vanilla + React dev server) to call this API during learning
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",  # Live Server
        "http://localhost:5500",
        "http://127.0.0.1:5173",  # Vite (React)
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TodoCreate(BaseModel):
    title: str


class Todo(TodoCreate):
    id: int
    done: bool = False


# In-memory store for early lessons — we'll replace with PostgreSQL/MongoDB later
_todos: list[Todo] = []
_next_id = 1


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
    return _todos


@app.post("/todos", response_model=Todo, status_code=201)
def create_todo(payload: TodoCreate):
    global _next_id
    todo = Todo(id=_next_id, title=payload.title)
    _next_id += 1
    _todos.append(todo)
    return todo
