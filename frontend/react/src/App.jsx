import { useEffect, useState } from "react";

function App() {
  const [health, setHealth] = useState("checking...");
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setHealth(data.status))
      .catch(() => setHealth("offline — start backend + npm run dev"));

    fetch("/api/todos")
      .then((res) => res.json())
      .then(setTodos)
      .catch(() => setTodos([]));
  }, []);

  async function addTodo(e) {
    e.preventDefault();
    if (!title.trim()) return;

    const res = await fetch("/api/todos", {
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

  return (
    <main className="container">
      <h1>Dev Learning Lab — React</h1>
      <p className="subtitle">API status: {health}</p>

      <section className="card">
        <h2>Learning todos</h2>
        <form onSubmit={addTodo} className="todo-form">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What are you building today?"
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
