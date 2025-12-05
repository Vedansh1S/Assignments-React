import { useState, useCallback, memo } from "react";

const TodoItem = memo(({ todo, onToggle, onRemove }) => {
  return (
    <li
      onClick={() => onToggle(todo.id)}
      style={{
        cursor: "pointer",
        textDecoration: todo.done ? "line-through" : "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
      }}
    >
      <span>{todo.text}</span>
      <button
        onClick={(e) => {
          e.stopPropagation(); 
          onRemove(todo.id);
        }}
        aria-label="Delete todo"
        style={{ marginLeft: 10 }}
      >
        X
      </button>
    </li>
  );
});

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  // 3. Prevent function recreation on every render
  const add = (e) => {
    e.preventDefault(); // Prevent form refresh
    if (!text.trim()) return;
    
    // 4. Use functional update for safer state handling
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: text.trim(), done: false },
    ]);
    setText("");
  };

  const toggle = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const remove = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      {/* 5. Wrap in form to enable "Enter" key submission */}
      <form onSubmit={add} style={{ marginBottom: 20 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          style={{ marginRight: 8 }}
        />
        <button type="submit">Add</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            onToggle={toggle}
            onRemove={remove}
          />
        ))}
      </ul>
    </div>
  );
}