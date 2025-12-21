import { useState, useCallback, memo } from "react";

/* ---------------- Todo Item ---------------- */

const TodoItem = memo(
  ({ todo, onToggle, onRemove, onUpdate, isEditing, setEditingId }) => {
    const [localText, setLocalText] = useState(todo.text);

    const save = () => {
      if (!localText.trim()) return;
      onUpdate(todo.id, localText.trim());
      setEditingId(null);
    };

    const cancel = () => {
      setLocalText(todo.text);
      setEditingId(null);
    };

    return (
      <li
        onClick={() => !isEditing && onToggle(todo.id)}
        className="
          group flex items-center justify-between
          p-3
          bg-white
          border border-slate-200
          rounded-lg
          shadow-sm
          transition-colors
          cursor-pointer
          active:bg-slate-100
          md:hover:bg-slate-50
        "
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Checkbox */}
          <div
            className={`
              w-5 h-5 shrink-0
              rounded-full border
              flex items-center justify-center
              transition-colors
              ${todo.done ? "bg-green-500 border-green-500" : "border-slate-300"}
            `}
          >
            {todo.done && (
              <span className="text-white text-xs">✓</span>
            )}
          </div>

          {/* Text / Input */}
          {isEditing ? (
            <input
              autoFocus
              value={localText}
              onChange={(e) => setLocalText(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onBlur={cancel}
              onKeyDown={(e) => {
                if (e.key === "Enter") save();
                if (e.key === "Escape") cancel();
              }}
              className="
                w-full
                text-sm sm:text-base
                px-2 py-1
                border border-slate-300
                rounded-md
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
              "
            />
          ) : (
            <span
              onDoubleClick={(e) => {
                e.stopPropagation();
                setEditingId(todo.id);
              }}
              className={`
                text-sm sm:text-base
                text-slate-700
                truncate
                ${todo.done ? "line-through text-slate-400" : ""}
              `}
            >
              {todo.text}
            </span>
          )}
        </div>

        {/* Delete */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(todo.id);
          }}
          className="
            p-2
            text-slate-400
            hover:text-red-500
            hover:bg-red-50
            rounded-md
            transition
            md:opacity-0 md:group-hover:opacity-100
          "
          aria-label="Delete todo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </li>
    );
  }
);

/* ---------------- App ---------------- */

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const add = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: text.trim(), done: false },
    ]);
    setText("");
  };

  const toggle = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }, []);

  const remove = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const update = useCallback((id, newText) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      )
    );
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-6">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            My Tasks
          </h1>
          <p className="text-sm text-slate-500">
            Double-click a task to edit
          </p>
        </header>

        {/* Input */}
        <form onSubmit={add} className="flex flex-col sm:flex-row gap-2 mb-5">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="
              w-full px-4 py-3
              border border-slate-300
              rounded-lg
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
            "
          />
          <button
            type="submit"
            className="
              w-full sm:w-auto
              px-5 py-3
              bg-blue-600 text-white font-semibold
              rounded-lg
              hover:bg-blue-700
              active:scale-95
              transition
            "
          >
            Add
          </button>
        </form>

        {/* List */}
        <ul className="space-y-2">
          {todos.length === 0 ? (
            <li className="text-center py-8 text-slate-400 italic text-sm">
              No tasks yet. Add one above!
            </li>
          ) : (
            todos.map((t) => (
              <TodoItem
                key={t.id}
                todo={t}
                onToggle={toggle}
                onRemove={remove}
                onUpdate={update}
                isEditing={editingId === t.id}
                setEditingId={setEditingId}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
