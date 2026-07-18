# 10 — Notes in React

**Progress:** [progress.md](../progress.md) · **All lessons:** [lessons.md](../lessons.md) · **Prev:** [09-crud-todos.md](09-crud-todos.md) · **Next:** [11-ux-components.md](11-ux-components.md)

Surface the **MongoDB notes API** in the React dashboard — your app now uses both databases in one UI.

## Goals

1. `PATCH /notes/{id}` and `DELETE /notes/{id}` on the backend
2. Notes section in React — list, create, toggle, delete
3. Tags as comma-separated input

## Backend

**File:** [backend/app/main.py](../backend/app/main.py)

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/notes` | List user's notes |
| `POST` | `/notes` | Create with `title` + `tags` |
| `PATCH` | `/notes/{id}` | Update `done`, `title`, or `tags` |
| `DELETE` | `/notes/{id}` | Remove document |

MongoDB uses `ObjectId` for note ids (strings in JSON).

## Frontend

**Files:** [frontend/react/src/components/NotesList.jsx](../frontend/react/src/components/NotesList.jsx), [frontend/react/src/hooks/useNotes.js](../frontend/react/src/hooks/useNotes.js)

- Form: title + tags (comma-separated)
- Each note shows tag chips
- Checkbox toggles done; Delete removes note

## Try it

1. Log in → scroll to **Your notes**
2. Add a note with tags: `learning, mongodb`
3. Toggle done, delete a note
4. Compare: todos live in **Postgres**, notes in **MongoDB**

## Concepts learned

- Two resources in one React app
- MongoDB document IDs as strings
- `$set` updates in MongoDB
- When to use SQL vs documents

## Checklist

- [x] Notes list loads after login
- [x] Create note with tags
- [x] PATCH and DELETE work for notes
