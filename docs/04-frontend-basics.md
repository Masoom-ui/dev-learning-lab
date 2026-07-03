# 04 — Frontend Basics (HTML + CSS + JavaScript)

Before React, learn how the browser works with plain **HTML**, **CSS**, and **JavaScript**.

## The three layers

| Layer | Role | File types |
|-------|------|------------|
| HTML | Structure (headings, forms, buttons) | `.html` |
| CSS | Appearance (colors, layout) | `.css` |
| JavaScript | Behavior (clicks, fetch API data) | `.js` |

## Where to practice

Open `frontend/vanilla/index.html` in your browser (or use Live Server in Cursor).

## Fetching from your Python API

```javascript
async function loadHealth() {
  const response = await fetch("http://127.0.0.1:8000/health");
  const data = await response.json();
  document.getElementById("status").textContent = data.status;
}
```

This is the same pattern React uses under the hood.

## Key concepts

- **DOM** — the tree of elements JavaScript can read and update
- **Events** — `click`, `submit`, `input`
- **async/await** — wait for network requests without freezing the page
- **CORS** — browsers block cross-origin requests unless the API allows them (FastAPI handles this)

## Exercises

1. Add a button that calls `/health` and shows the result
2. Build a simple form that POSTs to a backend route
3. Style the page with CSS (flexbox is enough to start)

## When to move to React

Move to React when:

- You have many UI pieces that share state
- Updating the DOM manually feels repetitive
- You want to build a multi-page app experience

See [05-react.md](05-react.md).
