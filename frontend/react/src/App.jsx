import { useEffect, useState } from "react";
import { apiUrl, authFetch, clearToken, getToken, setToken } from "./api";
import AuthForm from "./components/AuthForm";
import NotesList from "./components/NotesList";
import TodoList from "./components/TodoList";
import { useNotes } from "./hooks/useNotes";
import { useTodos } from "./hooks/useTodos";

function App() {
  const [health, setHealth] = useState("checking...");
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const loggedIn = Boolean(user);
  const {
    todos,
    loading: todosLoading,
    error: todosError,
    search,
    setSearch,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearTodos,
  } = useTodos(loggedIn);

  const {
    notes,
    loading: notesLoading,
    error: notesError,
    addNote,
    toggleNote,
    deleteNote,
    clearNotes,
  } = useNotes(loggedIn);

  useEffect(() => {
    fetch(apiUrl("/api/health"))
      .then((res) => res.json())
      .then((data) => setHealth(data.status))
      .catch(() => setHealth("offline — start backend + npm run dev"));
  }, []);

  useEffect(() => {
    if (!getToken()) return;

    authFetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Session expired");
        return res.json();
      })
      .then(setUser)
      .catch(() => {
        clearToken();
        setUser(null);
      });
  }, []);

  async function handleAuth(e) {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    const path =
      authMode === "login" ? "/api/auth/login" : "/api/auth/register";
    const body =
      authMode === "login"
        ? { email, password }
        : { email, password, display_name: displayName || undefined };

    try {
      const res = await fetch(apiUrl(path), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.detail || "Authentication failed");
        return;
      }

      setToken(data.access_token);

      const meRes = await authFetch("/api/auth/me");
      if (!meRes.ok) throw new Error("Could not load profile");
      setUser(await meRes.json());
      setPassword("");
    } catch {
      setAuthError("Could not reach the API — is uvicorn running?");
    } finally {
      setAuthLoading(false);
    }
  }

  function handleLogout() {
    clearToken();
    setUser(null);
    clearTodos();
    clearNotes();
    setAuthError("");
  }

  if (!user) {
    return (
      <AuthForm
        health={health}
        authMode={authMode}
        setAuthMode={(mode) => {
          setAuthMode(mode);
          setAuthError("");
        }}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        displayName={displayName}
        setDisplayName={setDisplayName}
        authError={authError}
        authLoading={authLoading}
        onSubmit={handleAuth}
      />
    );
  }

  return (
    <main className="container">
      <header className="dashboard-header">
        <div>
          <h1>Dev Learning Lab — React</h1>
          <p className="subtitle">
            Signed in as {user.display_name || user.email} · API: {health}
          </p>
        </div>
        <button type="button" className="secondary" onClick={handleLogout}>
          Log out
        </button>
      </header>

      <TodoList
        todos={todos}
        loading={todosLoading}
        error={todosError}
        search={search}
        onSearchChange={setSearch}
        onAdd={addTodo}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <NotesList
        notes={notes}
        loading={notesLoading}
        error={notesError}
        onAdd={addNote}
        onToggle={toggleNote}
        onDelete={deleteNote}
      />
    </main>
  );
}

export default App;
