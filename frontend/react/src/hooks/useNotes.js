import { useCallback, useEffect, useState } from "react";
import { authFetch } from "../api";

export function useNotes(enabled) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadNotes = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authFetch("/api/notes");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || `Could not load notes (${res.status})`);
      }
      setNotes(await res.json());
    } catch (err) {
      setError(
        err.message?.includes("notes")
          ? err.message
          : "Could not load notes — is MongoDB running?",
      );
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setNotes([]);
      return;
    }
    loadNotes();
  }, [enabled, loadNotes]);

  async function addNote(title, tags = []) {
    const res = await authFetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, tags }),
    });
    if (!res.ok) {
      setError("Could not add note");
      return false;
    }
    const note = await res.json();
    setNotes((prev) => [...prev, note]);
    return true;
  }

  async function toggleNote(note) {
    const res = await authFetch(`/api/notes/${note.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !note.done }),
    });
    if (!res.ok) {
      setError("Could not update note");
      return;
    }
    const updated = await res.json();
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  }

  async function deleteNote(noteId) {
    const res = await authFetch(`/api/notes/${noteId}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Could not delete note");
      return;
    }
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  }

  function clearNotes() {
    setNotes([]);
    setError("");
  }

  return {
    notes,
    loading,
    error,
    addNote,
    toggleNote,
    deleteNote,
    clearNotes,
    reload: loadNotes,
  };
}
