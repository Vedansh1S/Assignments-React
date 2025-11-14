import { useState, useRef, useEffect } from "react";

export default function ParagraphGenerator() {
  const [count, setCount] = useState("10");
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
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
    inputRef.current?.select();
  }, []);

  const generate = (count) => {
    setCopied(false);
    const num = parseInt(count);
    if (!num || num < 1) {
      setText("Please enter a valid number.");
      return;
    }

    let result = [];
    for (let i = 0; i < num; i++) {
      const random = Math.floor(Math.random() * words.length);
      result.push(words[random]);
    }

    setText(result.join(" ") + ".");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      setCount(value);
      generate(value);
      inputRef.current?.select();
    }
  };

  const handleCopy = async () => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (error) {
      console.log("Copy failed:", error);
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

        <div className="flex justify-between">
          <button
            onClick={() => generate(count)}
            className="bg-red-300 text-white px-4 py-2 rounded-2xl hover:bg-red-400"
          >
            Generate
          </button>

          {/* COPY BUTTON */}
          <button
            onClick={handleCopy}
            className="bg-green-400 text-white px-4 py-2 rounded-2xl hover:bg-green-500"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <p className="text-gray-800 mt-3 leading-relaxed wrap-break-word">
          {text}
        </p>
      </div>
    </div>
  );
}
