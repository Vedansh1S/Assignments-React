import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(false);

  return (
    <div
      style={{
        height: "100vh",
        background: dark ? "#111" : "#eee",
        color: dark ? "#fff" : "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <h1>{count}</h1>
      <div>
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <button onClick={() => setDark(!dark)}>Toggle Theme</button>
    </div>
  );
}
