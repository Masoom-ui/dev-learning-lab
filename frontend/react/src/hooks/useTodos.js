import { useCallback, useEffect, useState } from "react";
import { authFetch } from "../api";

export function useTodos(enabled) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadTodos = useCallback(async (query = "") => {
    setLoading(true);
    setError("");
    const path = query.trim()
      ? `/api/todos?q=${encodeURIComponent(query.trim())}`
      : "/api/todos";

    try {
      const res = await authFetch(path);
      if (!res.ok) throw new Error("Could not load todos");
      setTodos(await res.json());
    } catch {
      setError("Could not load todos — is the API running?");
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setTodos([]);
      return;
    }
    const timer = setTimeout(() => loadTodos(search), search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [enabled, search, loadTodos]);

  async function addTodo(title) {
    const res = await authFetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) {
      setError("Could not add todo");
      return false;
    }
    const todo = await res.json();
    setTodos((prev) => [...prev, todo]);
    return true;
  }

  async function toggleTodo(todo) {
    const res = await authFetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !todo.done }),
    });
    if (!res.ok) {
      setError("Could not update todo");
      return;
    }
    const updated = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  async function deleteTodo(todoId) {
    const res = await authFetch(`/api/todos/${todoId}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Could not delete todo");
      return;
    }
    setTodos((prev) => prev.filter((t) => t.id !== todoId));
  }

  function clearTodos() {
    setTodos([]);
    setSearch("");
    setError("");
  }

  return {
    todos,
    loading,
    error,
    search,
    setSearch,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearTodos,
    reload: () => loadTodos(search),
  };
}
