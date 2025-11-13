import { useState, useRef, useEffect } from "react";

export default function ParagraphGenerator() {
  const [count, setCount] = useState("");
  const [text, setText] = useState("");
  const inputRef = useRef();

  const words = [
    "react",
    "tailwind",
    "javascript",
    "frontend",
    "developer",
    "code",
    "design",
    "component",
    "state",
    "logic",
    "api",
    "layout",
    "theme",
    "ui",
    "input",
    "button",
    "library",
    "hooks",
    "build",
    "app",
  ];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const generate = (count) => {
    const num = parseInt(count);
    if (!num || num < 1) return "";

    let result = [];
    for (let i = 0; i < num; i++) {
      const random = Math.floor(Math.random() * words.length);
      result.push(words[random]);
    }

    const paragraph = result.join(" ") + ".";

    setText(paragraph);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      setCount(value);
      generate(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">Paragraph Generator</h1>

      <div className="bg-white p-6 rounded-3xl shadow w-full max-w-md flex flex-col gap-4">
        <input
          type="number"
          value={count}
          ref={inputRef}
          onChange={(e) => setCount(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Enter number of words"
          className="border px-4 py-2 rounded-2xl focus:outline-none focus:ring focus:ring-blue-400"
        />

        <button
          onClick={() => {
            generate(count);
          }}
          className="bg-red-300 text-white p-2 rounded-2xl hover:bg-red-400"
        >
          Generate
        </button>

        <p className="text-gray-800 mt-3 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
