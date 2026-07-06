# 04 — Frontend Basics (HTML + CSS + JavaScript)

**Progress:** [progress.md](../progress.md) · **All lessons:** [lessons.md](../lessons.md) · **Prev:** [03-python-backend.md](03-python-backend.md) · **Next:** [05-react.md](05-react.md)

Before React, learn how the browser works with plain **HTML**, **CSS**, and **JavaScript**.

## Goals

- Read HTML structure and match it to what you see
- Use `fetch()` to call your FastAPI backend
- Update the page with JavaScript (DOM)
- Run the frontend over HTTP (not `file://`)

## The three layers

| Layer | Role | Files |
|-------|------|-------|
| HTML | Structure (headings, forms, buttons) | `index.html` |
| CSS | Appearance (colors, layout) | `styles.css` |
| JavaScript | Behavior (clicks, API calls) | `app.js` |

**Practice code:** [frontend/vanilla/](../frontend/vanilla/)

## Step-by-step

### Step 1 — Start the API (Terminal 1)

```powershell
cd backend
.\.venv\Scripts\uvicorn.exe app.main:app --reload
```

### Step 2 — Serve the frontend (Terminal 2)

```powershell
cd frontend\vanilla
..\..\backend\.venv\Scripts\python.exe -m http.server 5500
```

### Step 3 — Open in Chrome

Paste in the **address bar** (not the terminal):

```
http://127.0.0.1:5500
```

Do **not** double-click `index.html` — `file://` breaks `fetch()`.

### Step 4 — Match HTML to the page

Open `index.html` — find `h1`, buttons, and `id` attributes. JavaScript uses those ids to find elements.

### Step 5 — "Check backend" button

In `app.js`, find `fetch("http://127.0.0.1:8000/health")` — same as opening that URL in Chrome. The status span updates with `data.status`.

### Step 6 — About section + todos

- Fetch `/about` and display name + role
- Todo form POSTs to `/todos` with `{ "title": "..." }`

## Key concepts

```javascript
async function loadHealth() {
  const response = await fetch("http://127.0.0.1:8000/health");
  const data = await response.json();
  document.getElementById("status").textContent = data.status;
}
```

| Concept | Meaning |
|---------|---------|
| **DOM** | Tree of page elements JS can read/update |
| **fetch()** | Browser asks the API a question |
| **addEventListener** | Connect button click → function |
| **CORS** | Browser security; API must allow your frontend origin |

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Opened page via double-click (`file://`) | Use `http.server` + port 5500 |
| Pasted URL in PowerShell | URLs go in Chrome |
| JS in `index.html` instead of `app.js` | Structure in HTML, behavior in JS |

## Checklist

- [ ] Both servers running (API + http.server)
- [ ] "Check backend" shows `great`
- [ ] `/about` data visible on page
- [ ] Added a todo via the form
- [ ] Committed: `feat: connect frontend to API with about section and todos`

## Next lesson

[05 — React](05-react.md) — same ideas, component-based UI.
