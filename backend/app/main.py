from contextlib import asynccontextmanager

from bson import ObjectId
from bson.errors import InvalidId
from fastapi import Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from pymongo import ReturnDocument

from app.auth import create_access_token, hash_password, verify_password
from app.bootstrap import bootstrap_db
from app.config import settings
from app.db import get_connection
from app.deps import CurrentUser, get_current_user
from app.mongo_client import get_notes_collection


@asynccontextmanager
async def lifespan(app: FastAPI):
    bootstrap_db()
    yield


app = FastAPI(
    title=settings.app_name,
    description="Experimental API for learning backend development.",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
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


class TodoUpdate(BaseModel):
    done: bool | None = None
    title: str | None = None


class Todo(TodoCreate):
    id: int
    done: bool = False


class NoteCreate(BaseModel):
    title: str
    tags: list[str] = Field(default_factory=list)


class NoteUpdate(BaseModel):
    title: str | None = None
    tags: list[str] | None = None
    done: bool | None = None


class Note(NoteCreate):
    id: str
    done: bool = False


def _parse_note_id(note_id: str) -> ObjectId:
    try:
        return ObjectId(note_id)
    except InvalidId as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found",
        ) from exc


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
def list_todos(
    q: str | None = Query(default=None, min_length=1),
    current_user: CurrentUser = Depends(get_current_user),
):
    with get_connection() as conn:
        with conn.cursor() as cur:
            if q:
                cur.execute(
                    """
                    SELECT id, title, done FROM todos
                    WHERE user_id = %s AND title ILIKE %s
                    ORDER BY id
                    """,
                    (current_user.id, f"%{q}%"),
                )
            else:
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


@app.patch("/todos/{todo_id}", response_model=Todo)
def update_todo(
    todo_id: int,
    payload: TodoUpdate,
    current_user: CurrentUser = Depends(get_current_user),
):
    if payload.done is None and payload.title is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Nothing to update",
        )

    with get_connection() as conn:
        with conn.cursor() as cur:
            if payload.done is not None and payload.title is not None:
                cur.execute(
                    """
                    UPDATE todos SET done = %s, title = %s
                    WHERE id = %s AND user_id = %s
                    RETURNING id, title, done
                    """,
                    (payload.done, payload.title, todo_id, current_user.id),
                )
            elif payload.done is not None:
                cur.execute(
                    """
                    UPDATE todos SET done = %s
                    WHERE id = %s AND user_id = %s
                    RETURNING id, title, done
                    """,
                    (payload.done, todo_id, current_user.id),
                )
            else:
                cur.execute(
                    """
                    UPDATE todos SET title = %s
                    WHERE id = %s AND user_id = %s
                    RETURNING id, title, done
                    """,
                    (payload.title, todo_id, current_user.id),
                )
            row = cur.fetchone()
            if not row:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Todo not found",
                )
            conn.commit()
    return Todo(**row)


@app.delete("/todos/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(
    todo_id: int,
    current_user: CurrentUser = Depends(get_current_user),
):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "DELETE FROM todos WHERE id = %s AND user_id = %s RETURNING id",
                (todo_id, current_user.id),
            )
            row = cur.fetchone()
            conn.commit()
    if not row:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found",
        )


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


@app.patch("/notes/{note_id}", response_model=Note)
def update_note(
    note_id: str,
    payload: NoteUpdate,
    current_user: CurrentUser = Depends(get_current_user),
):
    if payload.title is None and payload.tags is None and payload.done is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Nothing to update",
        )

    oid = _parse_note_id(note_id)
    updates: dict = {}
    if payload.title is not None:
        updates["title"] = payload.title
    if payload.tags is not None:
        updates["tags"] = payload.tags
    if payload.done is not None:
        updates["done"] = payload.done

    result = get_notes_collection().find_one_and_update(
        {"_id": oid, "user_id": current_user.id},
        {"$set": updates},
        return_document=ReturnDocument.AFTER,
    )
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found",
        )
    return _doc_to_note(result)


@app.delete("/notes/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_note(
    note_id: str,
    current_user: CurrentUser = Depends(get_current_user),
):
    oid = _parse_note_id(note_id)
    result = get_notes_collection().delete_one(
        {"_id": oid, "user_id": current_user.id},
    )
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found",
        )
