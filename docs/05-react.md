# 05 — React

React is a JavaScript library for building user interfaces with **components** — reusable pieces of UI that manage their own state.

## Why React for SaaS?

- Component reuse (buttons, modals, tables)
- Rich ecosystem (routing, forms, UI kits)
- Same skills transfer to React Native (mobile) later

## Setup (when you're ready)

```bash
cd frontend/react
npm install
npm run dev
```

The starter uses **Vite** — fast dev server and build tool.

## Core ideas

### Component

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

### State

```jsx
const [count, setCount] = useState(0);
```

State changes trigger a re-render — React updates the DOM for you.

### Effects (side effects)

```jsx
useEffect(() => {
  fetch("/api/health").then(/* ... */);
}, []);
```

Run once on mount to load data.

### Calling your Python API

During development, Vite can proxy `/api` to `http://127.0.0.1:8000` (configured in `vite.config.js`).

## Learning path

1. Run the starter app and edit `App.jsx`
2. Fetch data from your FastAPI backend
3. Build a todo list (classic learning project)
4. Add React Router for multiple pages
5. Add auth when we cover JWT in the backend

## Vanilla vs React

| Vanilla JS | React |
|------------|-------|
| You update DOM manually | React updates DOM from state |
| Great for learning | Great for larger apps |
| No build step | Needs `npm run dev` / build |

Learn vanilla first; React will feel natural afterward.
