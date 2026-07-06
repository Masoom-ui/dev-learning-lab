# Deploy — Dev Learning Lab Mini SaaS

Deploy the **FastAPI backend** (Render) + **React frontend** (Vercel) + **MongoDB Atlas** (free tier).

**Local dev still uses Docker** for Postgres/Mongo — production uses hosted databases.

---

## Overview

| Piece | Platform | Free tier |
|-------|----------|-----------|
| Backend API | [Render](https://render.com) | Yes |
| PostgreSQL | Render Postgres | Yes |
| MongoDB | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) | M0 free |
| React frontend | [Vercel](https://vercel.com) | Yes |

---

## Part A — MongoDB Atlas (5 min)

1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a **free M0 cluster**
3. Database Access → add user (username + password)
4. Network Access → **Allow access from anywhere** (`0.0.0.0/0`) for learning
5. Connect → copy connection string, e.g.:

```
mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/devlab?retryWrites=true&w=majority
```

Save this as **MONGODB_URL** for Render.

---

## Part B — Backend on Render (10 min)

1. Push latest code to GitHub (`Masoom-ui/dev-learning-lab`)
2. Go to https://dashboard.render.com → **New +** → **Blueprint**
3. Connect your GitHub repo
4. Render reads `render.yaml` at repo root — or create manually:

### Manual web service

- **New +** → **Web Service** → connect repo
- **Root directory:** leave empty
- **Runtime:** Docker
- **Dockerfile path:** `backend/Dockerfile`
- **Instance type:** Free

### Add PostgreSQL

- **New +** → **PostgreSQL** (free)
- Copy **Internal Database URL** → set as `DATABASE_URL` on the web service

### Environment variables (web service)

| Key | Value |
|-----|-------|
| `DATABASE_URL` | From Render Postgres (auto-linked if using Blueprint) |
| `MONGODB_URL` | Your Atlas connection string |
| `JWT_SECRET` | Long random string (generate: `openssl rand -hex 32`) |
| `CORS_ORIGINS` | Your Vercel URL (set after Part C), e.g. `https://dev-learning-lab.vercel.app` |
| `DEBUG` | `false` |

5. **Deploy** — wait until live
6. Test: `https://YOUR-SERVICE.onrender.com/health` → `{"status":"great",...}`

Tables are created automatically on startup (`bootstrap.py`).

---

## Part C — Frontend on Vercel (5 min)

1. Go to https://vercel.com → **Add New Project**
2. Import `Masoom-ui/dev-learning-lab` from GitHub
3. **Root Directory:** `frontend/react`
4. Framework: **Vite** (auto-detected)
5. **Environment variable:**

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://YOUR-SERVICE.onrender.com` (no trailing slash) |

6. Deploy
7. Copy your Vercel URL (e.g. `https://dev-learning-lab-xxx.vercel.app`)

### Update Render CORS

Go back to Render → web service → **Environment** → set:

```
CORS_ORIGINS=https://your-app.vercel.app
```

Redeploy if needed.

---

## Part D — Test production

1. Open your **Vercel URL**
2. **Register** a new account (production DB is empty)
3. Log in, add todos
4. Log out and back in — todos persist

---

## Blueprint (optional)

This repo includes `render.yaml` for one-click Render setup (API + Postgres). You still add `MONGODB_URL`, `JWT_SECRET`, and `CORS_ORIGINS` manually in the Render dashboard.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Frontend "offline" | Check `VITE_API_URL` matches Render URL |
| CORS error in browser | Set `CORS_ORIGINS` to exact Vercel URL |
| Login 500 | Check `DATABASE_URL` and Render logs |
| Notes fail | Check `MONGODB_URL` / Atlas network access |
| Render cold start | Free tier sleeps — first request takes ~30s |

---

## Security (before sharing publicly)

- Use a strong unique `JWT_SECRET`
- Restrict MongoDB Atlas IP allowlist when not learning
- Never commit `.env` files

---

## Local vs production

| | Local | Production |
|---|-------|------------|
| API | `localhost:8000` | Render URL |
| React | `localhost:5173` + Vite proxy | Vercel + `VITE_API_URL` |
| Postgres | Docker | Render Postgres |
| Mongo | Docker | MongoDB Atlas |
