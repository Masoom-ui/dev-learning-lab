import { useEffect, useState } from "react";
import { apiUrl, authFetch, clearToken, getToken, setToken } from "./api";

function App() {
  const [health, setHealth] = useState("checking...");
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

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

  useEffect(() => {
    if (!user) return;

    authFetch("/api/todos")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load todos");
        return res.json();
      })
      .then(setTodos)
      .catch(() => setTodos([]));
  }, [user]);

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
    setTodos([]);
    setAuthError("");
  }

  async function addTodo(e) {
    e.preventDefault();
    if (!title.trim()) return;

    const res = await authFetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      const todo = await res.json();
      setTodos((prev) => [...prev, todo]);
      setTitle("");
    }
  }

  if (!user) {
    return (
      <main className="container">
        <h1>Dev Learning Lab — Sign in</h1>
        <p className="subtitle">API status: {health}</p>

        <section className="card auth-card">
          <div className="auth-tabs">
            <button
              type="button"
              className={authMode === "login" ? "tab active" : "tab"}
              onClick={() => {
                setAuthMode("login");
                setAuthError("");
              }}
            >
              Log in
            </button>
            <button
              type="button"
              className={authMode === "register" ? "tab active" : "tab"}
              onClick={() => {
                setAuthMode("register");
                setAuthError("");
              }}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleAuth} className="auth-form">
            {authMode === "register" && (
              <label>
                Display name
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Jatin"
                />
              </label>
            )}
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                minLength={6}
                required
              />
            </label>
            {authError && <p className="error">{authError}</p>}
            <button type="submit" disabled={authLoading}>
              {authLoading
                ? "Please wait..."
                : authMode === "login"
                  ? "Log in"
                  : "Create account"}
            </button>
          </form>
        </section>
      </main>
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

      <section className="card">
        <h2>Your todos</h2>
        <form onSubmit={addTodo} className="todo-form">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What are you building today?"
          />
          <button type="submit">Add</button>
        </form>
        {todos.length === 0 ? (
          <p className="muted">No todos yet — add one above.</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
