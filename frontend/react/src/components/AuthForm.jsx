export default function AuthForm({
  health,
  authMode,
  setAuthMode,
  email,
  setEmail,
  password,
  setPassword,
  displayName,
  setDisplayName,
  authError,
  authLoading,
  onSubmit,
}) {
  return (
    <main className="container">
      <h1>Dev Learning Lab — Sign in</h1>
      <p className="subtitle">API status: {health}</p>

      <section className="card auth-card">
        <div className="auth-tabs">
          <button
            type="button"
            className={authMode === "login" ? "tab active" : "tab"}
            onClick={() => setAuthMode("login")}
          >
            Log in
          </button>
          <button
            type="button"
            className={authMode === "register" ? "tab active" : "tab"}
            onClick={() => setAuthMode("register")}
          >
            Register
          </button>
        </div>

        <form onSubmit={onSubmit} className="auth-form">
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
