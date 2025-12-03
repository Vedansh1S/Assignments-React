import { useState } from "react";

export default function App() {
  const [color, setColor] = useState("#ffffff");

  const random = () => "#" + Math.floor(Math.random() * 16777215).toString(16);
  // Creates a random hex color:
  // 1) Math.random() gives 0–1
  // 2) Multiply by 16777215 (max 24-bit color value)
  // 3) Math.floor() removes decimals
  // 4) toString(16) converts the number to hex
  // 5) Add "#" to form a valid CSS color like #a3f91c

  return (
    <div
      style={{
        height: "100vh",
        background: color,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>{color}</h1>
      <button
        onClick={() => setColor(random())}
        style={{
          padding: "10px 20px",
          background: "#000",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Change Color
      </button>
    </div>
  );
}
