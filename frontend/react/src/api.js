const TOKEN_KEY = "devlab_token";

/** Dev: uses Vite proxy (/api → localhost:8000). Prod: set VITE_API_URL to your backend URL. */
export function apiUrl(path) {
  const base = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";
  if (!base) return path;
  const suffix = path.startsWith("/api") ? path.slice(4) : path;
  return `${base}${suffix}`;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function authFetch(path, options = {}) {
  const token = getToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(apiUrl(path), { ...options, headers });
}
