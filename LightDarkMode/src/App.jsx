import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      className={`h-screen flex flex-col justify-center items-center font-sans transition-colors duration-300
      ${isDarkMode ? "bg-[#121212] text-[#e4e6eb]" : "bg-[#f0f2f5] text-[#1a1a1a]"}`}
    >
      {/* Main Card */}
      <div
        className={`flex flex-col items-center text-center gap-5 px-14 py-10 rounded-3xl transition-all duration-300
        ${isDarkMode ? "bg-[#1e1e1e] shadow-[0_4px_12px_rgba(0,0,0,0.4)]" : "bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)]"}`}
      >
        {/* Label */}
        <p
          className={`text-xs tracking-widest font-semibold uppercase 
          ${isDarkMode ? "text-[#b0b3b8]" : "text-[#65676b]"}`}
        >
          Current Count
        </p>

        {/* Counter */}
        <h1 className="text-[5rem] font-extrabold leading-none tabular-nums">
          {count}
        </h1>

        {/* Buttons */}
        <div className="flex gap-4 mt-2">
          <CounterButton
            label="-"
            isPrimary={false}
            isDark={isDarkMode}
            onClick={() => setCount(count - 1)}
          />
          <CounterButton
            label="+"
            isPrimary={true}
            isDark={isDarkMode}
            onClick={() => setCount(count + 1)}
          />
        </div>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`mt-8 border px-5 py-2 rounded-xl opacity-80 cursor-pointer text-sm transition-all duration-300
        ${isDarkMode ? "text-[#b0b3b8] border-[#333]" : "text-[#65676b] border-[#ddd]"}`}
      >
        {isDarkMode ? "Switch to Light Mode ☀️" : "Switch to Dark Mode 🌙"}
      </button>
    </div>
  );
}

// --- Reusable Button Component ---
function CounterButton({ label, onClick, isPrimary, isDark }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 min-w-[60px] text-2xl rounded-xl transition-all duration-200 
        flex items-center justify-center cursor-pointer
        ${isPrimary
          ? isDark
            ? "bg-[#4B9CFF] text-white shadow hover:shadow-[0_6px_16px_rgba(75,156,255,0.25)] hover:-translate-y-1"
            : "bg-[#007AFF] text-white shadow hover:shadow-[0_6px_16px_rgba(0,122,255,0.25)] hover:-translate-y-1"
          : isDark
            ? "bg-[#2c2c2c] text-[#e4e6eb] hover:shadow-[0_6px_16px_rgba(75,156,255,0.25)] hover:-translate-y-1"
            : "bg-[#f0f2f5] text-[#1a1a1a] hover:shadow-[0_6px_16px_rgba(75,156,255,0.25)] hover:-translate-y-1"
        }
      `}
    >
      {label}
    </button>
  );
}
