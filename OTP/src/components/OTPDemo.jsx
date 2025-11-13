import React, { useRef, useState, useEffect } from "react";

function OTPDemo() {
  const LENGTH = 4;
  const [values, setValues] = useState(
    Array.from({ length: LENGTH }, () => "")
  );
  const inputsRef = useRef([]);
  const [submitted, setSubmitted] = useState(null);

  // When the app mounts (useEffect runs once):This tries to focus the first OTP input (index 0).
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  /*================ focusIndex functioning==================
      On mount, it checks if the first OTP input box exists in the DOM.
      If yes → it focuses on that box.
      If that box already has a value (like if the user pasted earlier or autofill happened) → it selects that value so typing replaces it.
      If the box is empty → it just focuses the cursor there, ready for input. 
    ====================*******************====================*/
  const focusIndex = (i) => {
    const el = inputsRef.current[i];
    if (el) {
      el.focus();
      el.select();
    }
  };

  /* =============== setAtIndex =============================
    Updates a single OTP box safely by creating a new state array
    Safely updates a single OTP box without mutating the existing state.
      - React re-renders only when a new array reference is returned.
      - Used by typing, deleting, and backspacing logic.
  
    
    (React detects re-renders only when a new array reference is set)
    If you did prev[i] = char;, React wouldn’t know that state changed. In JavaScript, arrays and objects are reference types
    React detects state changes by checking if the state reference changed — not by doing a deep content comparison
    React compares:    old state → reference #123    | new state → still reference #123
    
    prev[i] = char mutates — React can miss it.
    const next = [...prev] creates a new reference — React re-renders correctly.
    Backspace also calls this to clear digits.
    ================== ********** ============================*/
  const setAtIndex = (i, char) => {
    setValues((prev) => {
      const next = [...prev]; //This makes a shallow copy of the array.
      next[i] = char;
      return next;
    });
  };

  /*
    handleChange is needed for typing and autofill.
    handleChange → runs when user types or autofill fills input
    Runs when user types or browser autofills an input.
      - Filters non-digit characters.
      - Handles typing one digit or multiple digits (autofill/paste fallback).
    */
  const handleChange = (index, e) => {
    const raw = e.target.value; //raw might contain anything the user typed or pasted — could be numbers, letters, symbols

    /*    
          Keep only digits from user input OR “Find all characters that are not digits (0–9) and remove them.”
          \D = any non-digit, g = global flag to replace all occurrences
          Removes letters, spaces, symbols etc. (e.g. "a1 b2" -> "12")  
      */
    const digits = raw.replace(/\D/g, "");

    if (digits.length === 0) {
      // If the user deleted the input or typed something invalid (like a letter), clear this OTP box.
      setAtIndex(index, "");
      return;
    }

    /* ========= if (digits.length === 1) ============
    1) Update the current OTP box
    → setAtIndex(index, digits)
    (so if you typed “5” in box 1, it becomes "5")

    2) Then move focus to the next box (if not the last one)
    → focusIndex(index + 1)

    3) Then return; — stop here.
    So typing automatically fills one box and jumps ahead
    ============= *********************** =========== */

    // If a single digit → set and move to next
    if (digits.length === 1) {
      setAtIndex(index, digits);
      if (index < LENGTH - 1) focusIndex(index + 1);
      return;
    }

    // Multi-digit case (autofill/paste fallback)
    setValues((prev) => {
      const next = [...prev];
      let j = index;
      for (let k = 0; k < digits.length && j < LENGTH; k++, j++) {
        next[j] = digits[k];
      }
      return next;
    });

    // Focus last filled box
    const nextFocus = Math.min(index + digits.length, LENGTH - 1);
    focusIndex(nextFocus);
  };

  /* 
      a keyboard event → gives e.key
      a click event → gives e.target
      a paste event → gives e.clipboardData
  
      Handles keyboard navigation and deletion:
      - Backspace: clears current box, or moves backward if already empty.
      - Arrow keys: move left/right between boxes.
  
    */
  const handleKeyDown = (index, e) => {
    const key = e.key;

    if (key === "Backspace") {
      if (values[index]) {
        setAtIndex(index, ""); // clear current and stay
        e.preventDefault();
      } else if (index > 0) {
        setAtIndex(index - 1, ""); // clear previous and move back
        focusIndex(index - 1);
        e.preventDefault();
      }
    }

    if (key === "ArrowLeft" && index > 0) {
      focusIndex(index - 1);
      e.preventDefault();
    }

    if (key === "ArrowRight" && index < LENGTH - 1) {
      focusIndex(index + 1);
      e.preventDefault();
    }
  };

  /* ========== handlePaste ===============
    handleChange -Sometimes user might paste too → some browsers trigger onChange after paste.
    handlePaste - Runs only for paste events (when user presses Ctrl + V or right-click → Paste).
    
    preventDefault() stops the browser's built-in paste
    
    so onChange won't fire — only our custom paste logic runs once
    e.preventDefault(); Most important for manual pasting, cancels the defaul paste
  
    Custom paste handler.
      - Stops default browser paste (which dumps all digits into one box).
      - Extracts only numeric characters.
      - Distributes digits across boxes starting from current index.
    ============= ************ =============*/
  const handlePaste = (index, e) => {
    e.preventDefault(); // “Don’t do the normal paste action — I’ll handle it myself.”
    const text = e.clipboardData.getData("text/plain"); // “From the clipboard data, give me the text as plain text.”
    const digits = (text || "").replace(/\D/g, "");
    if (!digits) return;

    /*
        Update OTP state when multiple digits are pasted or autofilled
        - Make a copy of the previous state (prev → next)
        - Starting from current index, fill each input box sequentially with digits[k]
        - Stop if we run out of digits or reach the last box
      */
    setValues((prev) => {
      const next = [...prev];
      let j = index;
      for (let k = 0; k < digits.length && j < LENGTH; k++, j++) {
        next[j] = digits[k];
      }
      return next;
    });

    // Move focus to the box after the last filled one
    // Ensures smooth UX after pasting multiple digits
    const after = Math.min(index + digits.length, LENGTH - 1);
    focusIndex(after);
  };

  /*
        Check if all OTP boxes are filled (each box has exactly one digit)
        Returns true only when every value's length is 1
  
        .every() is a JavaScript array method.
        It checks each element of the array against a condition and returns:
        true → if all elements satisfy the condition
        false → if any one element fails the condition
  */
  const isComplete = values.every((v) => v.length === 1);

  /* 
      Handle OTP form submission
      - preventDefault() stops page reload on form submit
      - if OTP is incomplete, exit early
      - join all input box values into a single string
      - save OTP in state (for demo display or API submission)
    */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isComplete) return;
    const otp = values.join("");
    setSubmitted(otp);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {" "}
        {/* “Make this div full width on small screens,
  but don’t let it grow wider than 448px on large screens.”So on a mobile, it stretches edge-to-edge;
  on desktop, it looks like a neat centered card instead of an overly wide one. */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
            Enter OTP
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter the 4-digit code (you can also paste it here).
          </p>

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-3">
              {values.map((val, i) => (
                <input
                  key={i}
                  // store the input element in the ref array for focus management
                  // inputsRef.current = [inputBox1, inputBox2, inputBox3, inputBox4]
                  // inputsRef.current[1].focus(); // move cursor to 2nd box
                  ref={(el) => {
                    if (el) inputsRef.current[i] = el;
                  }}
                  // using type="text" instead of "number"
                  // because "number" shows up/down arrows, allows e,+,-, and auto-formats (e.g., 0123 -> 123)
                  type="text"
                  // tells mobile browsers: show numeric keypad instead of full keyboard
                  inputMode="numeric"
                  // on iOS Safari and some browsers, opens numeric keypad and validates numeric input
                  pattern="[0-9]*"
                  // enables OTP autofill from SMS (browser auto-suggests code above keyboard)
                  autoComplete="one-time-code"
                  className="h-14 text-center text-2xl font-medium rounded-xl border border-slate-300 
                             focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 bg-white"
                  value={val}
                  onChange={(e) => handleChange(i, e)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={(e) => handlePaste(i, e)}
                  // restricts each input box to a single character
                  maxLength={1}
                />
              ))}
            </div>

            <button
              type="submit"
              className={`w-full h-12 rounded-xl font-semibold shadow transition disabled:opacity-50 disabled:cursor-not-allowed ${
                isComplete
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-200 text-slate-500"
              }`}
              disabled={!isComplete}
            >
              Verify
            </button>
          </form>

          {submitted && (
            <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-3 text-green-700 font-semibold">
              ✅ OTP verified successfully!
            </div>
          )}

          <Tips />
        </div>
      </div>
    </div>
  );
}

function Tips() {
  return (
    <div className="mt-6 text-sm text-slate-600 space-y-2">
      <p>
        Tips: You can type digits normally to auto-advance. Backspace on an
        empty box moves to the previous one. Pasting a 4-digit code fills all
        boxes.
      </p>
    </div>
  );
}

 function SimpleOTP() {
  const LENGTH = 4;
  const [values, setValues] = useState(Array(LENGTH).fill(""));
  const inputsRef = useRef([]);

  // Focus first box when component loads
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // Handle normal typing
  const handleChange = (index, e) => {
    const val = e.target.value;

    // Only allow a single digit (0–9)
    const digit = val.replace(/\D/g, "");

    // Update state
    setValues((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });

    // Move to next input if user typed a digit
    if (digit && index < LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle Backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="flex gap-3 mt-6 justify-center">
      {values.map((val, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          value={val}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          maxLength={1}
          className="w-12 h-12 text-center text-xl border rounded"
        />
      ))}
    </div>
  );
}

export {OTPDemo,SimpleOTP};