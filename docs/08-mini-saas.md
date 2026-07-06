# 08 — Mini SaaS

**Progress:** [progress.md](../progress.md) · **All lessons:** [lessons.md](../lessons.md) · **Prev:** [07-mongodb.md](07-mongodb.md)

Combine Lessons 3–7 into a small product: **users log in**, see **their own data**, and **deploy** online.

## Goals

1. **Auth** — register, login, JWT tokens
2. **Protected routes** — `/todos` and `/notes` require login
3. **Multi-user data** — each user sees only their rows/documents
4. **React login UI** — login page + token in API calls
5. **Deploy** — backend + frontend on the internet

## Architecture (after Lesson 8)

```
React (login + dashboard)
    ↓ Authorization: Bearer <JWT>
FastAPI
    ├── /auth/register, /auth/login, /auth/me
    ├── /todos  →  PostgreSQL (filtered by user_id)
    └── /notes  →  MongoDB (filtered by user_id)
```

## Step 1 — Backend auth ✅

### Endpoints

| Method | Path | Auth | Body / response |
|--------|------|------|-----------------|
| POST | `/auth/register` | No | `{ email, password, display_name? }` → JWT |
| POST | `/auth/login` | No | `{ email, password }` → JWT |
| GET | `/auth/me` | Yes | Current user profile |

### Files

| File | Purpose |
|------|---------|
| `backend/app/auth.py` | bcrypt passwords + JWT create/decode |
| `backend/app/deps.py` | `get_current_user` dependency |
| `backend/app/config.py` | `JWT_SECRET`, expiry settings |

### Try in `/docs`

1. **POST `/auth/register`** — password min 6 chars, valid email
2. Copy `access_token` from response
3. Click **Authorize** (lock icon) → paste token
4. **GET `/auth/me`** — shows your email

Example register body:

```json
{
  "email": "jatin@example.com",
  "password": "secret123",
  "display_name": "Jatin"
}
```

## Step 2 — Protected CRUD ✅

`/todos` and `/notes` require header:

```
Authorization: Bearer <your_access_token>
```

- **Todos** — `WHERE user_id = current_user.id` in PostgreSQL
- **Notes** — `{ user_id: current_user.id }` filter in MongoDB

Without a token → **401 Unauthorized**.

## Step 3 — React login UI ✅

Implemented in `frontend/react/src/`:

| File | Purpose |
|------|---------|
| `api.js` | `getToken`, `setToken`, `authFetch` with Bearer header |
| `App.jsx` | Login/register forms, dashboard, logout |

### Try it

**Terminal 1 — API:**
```powershell
cd backend
.\.venv\Scripts\uvicorn.exe app.main:app --reload
```

**Terminal 2 — React:**
```powershell
cd frontend/react
npm.cmd run dev
```

1. Open http://localhost:5173 (or port Vite shows)
2. **Register** or **Log in** with your account
3. Add todos — only yours appear
4. **Log out** — returns to login screen
5. Refresh page — still logged in (token in `localStorage`)

## Step 4 — Deploy

**Full guide:** [deploy.md](deploy.md)

| Platform | What |
|----------|------|
| **Render** | FastAPI + PostgreSQL (`render.yaml`) |
| **MongoDB Atlas** | MongoDB free M0 cluster |
| **Vercel** | React frontend |

### Quick steps

1. **MongoDB Atlas** — create free cluster → copy `MONGODB_URL`
2. **Render** — New Blueprint from GitHub → uses `render.yaml`
3. Set on Render: `MONGODB_URL`, `CORS_ORIGINS` (after Vercel)
4. **Vercel** — import repo, root `frontend/react`, set `VITE_API_URL=https://YOUR-API.onrender.com`
5. Test your public URL — register, login, add todos

**Production checklist:**

- Strong `JWT_SECRET` (Render can auto-generate)
- `CORS_ORIGINS` = your exact Vercel URL
- Never commit `.env` files

## Database migration

Existing Postgres containers need `password_hash` column:

```powershell
docker cp database/postgres/migrations/001_add_password_hash.sql dev-lab-postgres:/tmp/001.sql
docker exec dev-lab-postgres psql -U devlab -d devlab -f /tmp/001.sql
```

Fresh Docker installs get this from `init.sql` automatically.

## Environment variables

See `backend/.env.example`:

```
JWT_SECRET=change-me-in-production
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=10080
```

## Security notes (learning)

- Passwords stored as **bcrypt hashes** — never plain text
- JWT proves identity between requests
- Change `JWT_SECRET` before any real deployment
- `.env` is gitignored — secrets stay local

## Checklist

- [x] Register + login work in `/docs`
- [x] `/auth/me` returns user with token
- [x] `/todos` and `/notes` require auth
- [x] Each user sees only their data
- [x] React login UI wired up
- [ ] Deployed to a public URL

## You completed the curriculum when…

Lesson 8 Steps 3–4 are done and your mini SaaS is live on a URL anyone can visit.

Congratulations — that's a full-stack developer journey from zero.
