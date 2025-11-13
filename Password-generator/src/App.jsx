import { useState, useCallback } from "react";

export default function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [number, setNumber] = useState(false);
  const [special, setSpecial] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    setCopied(false);
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbersSet = "0123456789";
    let specialSet = "@#$&";

    let pool = letters;
    if (number) pool += numbersSet;
    if (special) pool += specialSet;

    let result = "";

    if (number) {
      result += numbersSet[Math.floor(Math.random() * numbersSet.length)];
    }

    if (special) {
      result += specialSet[Math.floor(Math.random() * specialSet.length)];
    }

    for (let i = result.length; i < length; i++) {
      const index = Math.floor(Math.random() * pool.length);
      result += pool[index];
    }

    function shuffle(str) {
      let arr = str.split("");

      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
      }

      return arr.join("");
    }

    result = shuffle(result);

    setPassword(result);
  }, [number, special, length]);

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center p-4">
      {/*
        FLEXBOX ALIGNMENT RULES:

        flex-row (default)
          justify-center → horizontal (x-axis)
          items-center   → vertical   (y-axis)

        flex-col
          justify-center → vertical   (y-axis)
          items-center   → horizontal (x-axis)

        justify = main axis
        items   = cross axis
      */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-extrabold font-mono text-center mb-6 text-indigo-600">
          Password Generator
        </h1>

        {/* Length Slider */}
        <div className="items-center mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
          <label className="font-semibold text-xl text-gray-700">
            Length: {length}
          </label>
          <input
            type="range"
            min="6"
            max="20"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-40 accent-indigo-500 mt-3 md:mt-0"
          />
        </div>

        {/* Number Checkbox */}
        <div className="flex items-center gap-3 mb-3">
          <input
            type="checkbox"
            className="h-5 w-5 accent-indigo-600"
            checked={number}
            onChange={() => setNumber(!number)}
          />
          <label className="text-gray-700 font-medium font-mono">
            Include Numbers
          </label>
        </div>

        {/* Special Checkbox */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            className="h-5 w-5 accent-indigo-600"
            checked={special}
            onChange={() => setSpecial(!special)}
          />
          <label className="text-gray-700 font-medium font-mono">
            Include Special Characters
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-indigo-700 transition"
        >
          Generate Password
        </button>

        {password && (
          <p
            onClick={copyPassword}
            className="mt-6 p-4 bg-gray-100 rounded-xl text-center text-xl font-mono tracking-wider shadow-inner break-all cursor-pointer"
          >
            {password}
            <span className="ml-2">📋</span>
          </p>
        )}
        {copied && (
          <p className="text-gray-700 font-medium text-center mt-2">
            Password copied to clipboard!
          </p>
        )}
      </div>
    </div>
  );
}
