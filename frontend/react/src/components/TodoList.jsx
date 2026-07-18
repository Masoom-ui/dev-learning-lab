import { useState } from "react";

export default function TodoList({
  todos,
  loading,
  error,
  search,
  onSearchChange,
  onAdd,
  onToggle,
  onDelete,
}) {
  const [title, setTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const ok = await onAdd(title.trim());
    if (ok) setTitle("");
  }

  return (
    <section className="card">
      <h2>Your todos</h2>
      <input
        className="search-input"
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search todos..."
        aria-label="Search todos"
      />
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What are you building today?"
        />
        <button type="submit">Add</button>
      </form>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="muted">Loading todos...</p>
      ) : todos.length === 0 ? (
        <p className="muted">
          {search.trim() ? "No todos match your search." : "No todos yet — add one above."}
        </p>
      ) : (
        <ul className="item-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.done ? "done" : ""}>
              <label className="todo-row">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => onToggle(todo)}
                />
                <span>{todo.title}</span>
              </label>
              <button
                type="button"
                className="danger small"
                onClick={() => onDelete(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
