from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

from app.auth import create_access_token, hash_password, verify_password
from app.config import settings
from app.db import get_connection
from app.deps import CurrentUser, get_current_user
from app.mongo_client import get_notes_collection

app = FastAPI(
    title=settings.app_name,
    description="Experimental API for learning backend development.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    display_name: str | None = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserPublic(BaseModel):
    id: int
    email: EmailStr
    display_name: str | None = None


class TodoCreate(BaseModel):
    title: str


class Todo(TodoCreate):
    id: int
    done: bool = False


class NoteCreate(BaseModel):
    title: str
    tags: list[str] = Field(default_factory=list)


class Note(NoteCreate):
    id: str
    done: bool = False


def _doc_to_note(doc: dict) -> Note:
    return Note(
        id=str(doc["_id"]),
        title=doc["title"],
        tags=doc.get("tags", []),
        done=doc.get("done", False),
    )


def _issue_token(user_id: int, email: str) -> Token:
    return Token(access_token=create_access_token(user_id=user_id, email=email))


@app.get("/")
def root():
    return {
        "message": "Welcome to Dev Learning Lab API",
        "docs": "/docs",
        "health": "/health",
        "auth": "/auth/register",
    }


@app.get("/health")
def health():
    return {"status": "great", "app": settings.app_name}


@app.get("/about")
def about():
    return {"name": "Jatin", "role": "learning backend development"}


@app.post("/auth/register", response_model=Token, status_code=201)
def register(payload: UserRegister):
    password_hash = hash_password(payload.password)
    display_name = payload.display_name or payload.email.split("@")[0]

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id FROM users WHERE email = %s", (payload.email,))
            if cur.fetchone():
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Email already registered",
                )

            cur.execute(
                """
                INSERT INTO users (email, display_name, password_hash)
                VALUES (%s, %s, %s)
                RETURNING id, email
                """,
                (payload.email, display_name, password_hash),
            )
            row = cur.fetchone()
            conn.commit()

    return _issue_token(row["id"], row["email"])


@app.post("/auth/login", response_model=Token)
def login(payload: UserLogin):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id, email, password_hash FROM users WHERE email = %s",
                (payload.email,),
            )
            row = cur.fetchone()

    if not row or not row["password_hash"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not verify_password(payload.password, row["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    return _issue_token(row["id"], row["email"])


@app.get("/auth/me", response_model=UserPublic)
def me(current_user: CurrentUser = Depends(get_current_user)):
    return UserPublic(
        id=current_user.id,
        email=current_user.email,
        display_name=current_user.display_name,
    )


@app.get("/todos", response_model=list[Todo])
def list_todos(current_user: CurrentUser = Depends(get_current_user)):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id, title, done FROM todos WHERE user_id = %s ORDER BY id",
                (current_user.id,),
            )
            rows = cur.fetchall()
    return [Todo(**row) for row in rows]


@app.post("/todos", response_model=Todo, status_code=201)
def create_todo(
    payload: TodoCreate,
    current_user: CurrentUser = Depends(get_current_user),
):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO todos (user_id, title)
                VALUES (%s, %s)
                RETURNING id, title, done
                """,
                (current_user.id, payload.title),
            )
            row = cur.fetchone()
            conn.commit()
    return Todo(**row)


@app.get("/notes", response_model=list[Note])
def list_notes(current_user: CurrentUser = Depends(get_current_user)):
    docs = get_notes_collection().find({"user_id": current_user.id}).sort("_id", 1)
    return [_doc_to_note(doc) for doc in docs]


@app.post("/notes", response_model=Note, status_code=201)
def create_note(
    payload: NoteCreate,
    current_user: CurrentUser = Depends(get_current_user),
):
    doc = {
        "user_id": current_user.id,
        "title": payload.title,
        "tags": payload.tags,
        "done": False,
    }
    result = get_notes_collection().insert_one(doc)
    doc["_id"] = result.inserted_id
    return _doc_to_note(doc)
