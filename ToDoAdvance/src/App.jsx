import { useState, useCallback, useEffect, useMemo, useRef } from "react";

/* ---------------- Icons (Inline for portability) ---------------- */
const IconCheck = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const IconX = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
const IconEdit = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);
const IconTrash = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);
const IconPlus = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

/* ---------------- Todo Item Component ---------------- */

const TodoItem = ({
  todo,
  onToggle,
  onRemove,
  onUpdate,
  isEditing,
  setEditingId,
}) => {
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  // Sync state when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setEditText(todo.text);
      // Small delay to ensure render happens before focus
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isEditing, todo.text]);

  const handleSave = () => {
    if (!editText.trim()) return;
    onUpdate(todo.id, editText.trim());
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText(todo.text);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <li
      className={`
        group flex flex-col sm:flex-row sm:items-center justify-between gap-3
        p-4 mb-3
        bg-white
        border
        rounded-xl
        shadow-sm hover:shadow-md
        transition-all duration-200
        ${
          isEditing
            ? "border-blue-500 ring-1 ring-blue-500"
            : "border-slate-200 hover:border-blue-200"
        }
      `}
    >
      {isEditing ? (
        /* --- EDIT MODE --- */
        <div className="flex flex-1 items-center gap-2 w-full">
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
          <div className="flex items-center gap-1">
            <button
              onClick={handleSave}
              className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
              title="Save"
            >
              <IconCheck className="w-5 h-5" />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-colors"
              title="Cancel"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        /* --- VIEW MODE --- */
        <>
          <div
            onClick={() => onToggle(todo.id)}
            className="flex items-center gap-4 flex-1 cursor-pointer min-w-0"
          >
            {/* Custom Checkbox */}
            <div
              className={`
                w-6 h-6 flex-shrink-0
                rounded-full border-2
                flex items-center justify-center
                transition-all duration-200
                ${
                  todo.done
                    ? "bg-blue-500 border-blue-500 scale-100"
                    : "border-slate-300 hover:border-blue-400 bg-transparent"
                }
              `}
            >
              <IconCheck
                className={`w-3.5 h-3.5 text-white transition-transform ${
                  todo.done ? "scale-100" : "scale-0"
                }`}
              />
            </div>

            {/* Todo Text */}
            <span
              className={`
                text-base font-medium truncate w-full select-none transition-colors duration-200
                ${
                  todo.done
                    ? "text-slate-400 line-through decoration-slate-400"
                    : "text-slate-700"
                }
              `}
            >
              {todo.text}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 pl-10 sm:pl-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setEditingId(todo.id)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit Task"
            >
              <IconEdit className="w-5 h-5" />
            </button>
            <button
              onClick={() => onRemove(todo.id)}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Task"
            >
              <IconTrash className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

/* ---------------- App Component ---------------- */

export default function App() {
  // Load from local storage or default to empty
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("react-todos-v2");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [editingId, setEditingId] = useState(null);

  // Save to local storage whenever todos change
  useEffect(() => {
    localStorage.setItem("react-todos-v2", JSON.stringify(todos));
  }, [todos]);

  const add = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos((prev) => [
      { id: Date.now(), text: text.trim(), done: false },
      ...prev,
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

  const update = useCallback((id, newText) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  }, []);

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.done));
  };

  // Derived state for stats
  const completedCount = todos.filter((t) => t.done).length;
  const totalCount = todos.length;
  const progress =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // Derived state for filtering
  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.done);
    if (filter === "completed") return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-8 px-4 font-sans text-slate-800">
      <div className="max-w-xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center sm:text-left sm:flex sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Tasks
            </h1>
            <p className="text-slate-500 mt-1">
              Keep track of your daily goals
            </p>
          </div>

          {/* Progress Circle/Bar */}
          <div className="mt-4 sm:mt-0 flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Progress
              </span>
              <span className="font-bold text-blue-600">
                {completedCount} / {totalCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border-4 border-slate-100 flex items-center justify-center relative overflow-hidden">
              <div
                className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-500 ease-out"
                style={{ height: `${progress}%` }}
              />
              <span className="relative z-10 text-[10px] font-bold text-slate-700 mix-blend-multiply">
                {progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Input Area */}
          <form
            onSubmit={add}
            className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50"
          >
            <div className="relative">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task..."
                className="
                  w-full pl-4 pr-14 py-4
                  bg-white
                  border-0
                  rounded-xl
                  shadow-sm
                  text-lg
                  placeholder:text-slate-400
                  focus:ring-2 focus:ring-blue-500 focus:outline-none
                  transition-all
                "
              />
              <button
                type="submit"
                disabled={!text.trim()}
                className="
                  absolute right-2 top-2 bottom-2
                  aspect-square
                  bg-blue-600 disabled:bg-slate-300
                  text-white
                  rounded-lg
                  hover:bg-blue-700
                  active:scale-95
                  transition-all
                  flex items-center justify-center
                "
              >
                <IconPlus className="w-6 h-6" />
              </button>
            </div>
          </form>

          {/* Filter Tabs */}
          {todos.length > 0 && (
            <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-100 text-sm overflow-x-auto">
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                {["all", "active", "completed"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`
                      px-3 py-1.5 rounded-md capitalize font-medium transition-all
                      ${
                        filter === f
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }
                    `}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-slate-400 hover:text-red-500 text-xs font-medium transition-colors"
                >
                  Clear Completed
                </button>
              )}
            </div>
          )}

          {/* List Area */}
          <div className="p-4 sm:p-6 bg-slate-50/30 min-h-[300px]">
            <ul className="space-y-1">
              {todos.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-center opacity-60">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                    <IconCheck className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">No tasks found</p>
                  <p className="text-slate-400 text-sm">
                    Add one to get started!
                  </p>
                </div>
              ) : filteredTodos.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  No {filter} tasks.
                </div>
              ) : (
                filteredTodos.map((t) => (
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

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs mt-8">
          Tip: Press{" "}
          <kbd className="font-mono bg-white px-1 py-0.5 rounded border border-slate-300 text-slate-500">
            Enter
          </kbd>{" "}
          to save changes.
        </p>
      </div>
    </div>
  );
}