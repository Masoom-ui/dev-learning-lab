const API_BASE = "http://127.0.0.1:8000";

const statusEl = document.getElementById("status");
const checkHealthBtn = document.getElementById("check-health");
const aboutNameEl = document.getElementById("about-name");
const aboutRoleEl = document.getElementById("about-role");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

async function checkHealth() {
  statusEl.textContent = "checking...";
  statusEl.classList.remove("ok");

  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    statusEl.textContent = data.status;
    statusEl.classList.add("ok");
  } catch (err) {
    statusEl.textContent = "offline — start the backend with uvicorn";
    console.error(err);
  }
}

async function loadAbout() {
  try {
    const res = await fetch(`${API_BASE}/about`);
    const data = await res.json();
    aboutNameEl.textContent = data.name;
    aboutRoleEl.textContent = data.role;
  } catch (err) {
    aboutNameEl.textContent = "offline";
    aboutRoleEl.textContent = "start the API";
    console.error(err);
  }
}

async function loadTodos() {
  todoList.innerHTML = "";

  try {
    const res = await fetch(`${API_BASE}/todos`);
    const todos = await res.json();

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.textContent = todo.title;
      todoList.appendChild(li);
    });
  } catch (err) {
    const li = document.createElement("li");
    li.textContent = "Could not load todos. Is the API running?";
    todoList.appendChild(li);
    console.error(err);
  }
}

todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = todoInput.value.trim();
  if (!title) return;

  try {
    await fetch(`${API_BASE}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    todoInput.value = "";
    await loadTodos();
  } catch (err) {
    console.error(err);
    alert("Failed to add todo. Check the backend.");
  }
});

checkHealthBtn.addEventListener("click", checkHealth);

loadAbout();
loadTodos();
