import { useState } from "react";

export default function NotesList({
  notes,
  loading,
  error,
  onAdd,
  onToggle,
  onDelete,
}) {
  const [title, setTitle] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const ok = await onAdd(title.trim(), tags);
    if (ok) {
      setTitle("");
      setTagsInput("");
    }
  }

  return (
    <section className="card">
      <h2>Your notes</h2>
      <p className="muted small-hint">Stored in MongoDB — separate from Postgres todos.</p>
      <form onSubmit={handleSubmit} className="note-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
        />
        <input
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="Tags (comma-separated)"
        />
        <button type="submit">Add note</button>
      </form>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="muted">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="muted">No notes yet — add one above.</p>
      ) : (
        <ul className="item-list">
          {notes.map((note) => (
            <li key={note.id} className={note.done ? "done" : ""}>
              <label className="todo-row">
                <input
                  type="checkbox"
                  checked={note.done}
                  onChange={() => onToggle(note)}
                />
                <span>{note.title}</span>
              </label>
              {note.tags?.length > 0 && (
                <div className="tags">
                  {note.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <button
                type="button"
                className="danger small"
                onClick={() => onDelete(note.id)}
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
