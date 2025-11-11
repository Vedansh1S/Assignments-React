# React OTP Input Component

A modern, production-ready OTP (One-Time Password) input component built with React and Tailwind CSS. This component provides a seamless user experience with mobile-friendly features, keyboard navigation, and SMS autofill support.

## Features

- ✅ **Auto-focus & Auto-jump** — Automatically moves focus to the next input box as you type
- ✅ **Smart Backspace Navigation** — Clears current input or moves backward if already empty
- ✅ **Paste Support** — Intelligently splits pasted digits across all input boxes
- ✅ **Mobile-Optimized** — Numeric keypad on mobile devices with SMS OTP autofill support
- ✅ **Fully Accessible** — Keyboard navigation (arrow keys) and screen reader support
- ✅ **Clean UI** — Modern, responsive design built with Tailwind CSS
- ✅ **Type-safe Input** — Filters non-numeric characters automatically

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Vedansh1S/React-OTP-Magic
cd React-OTP
```

2. Navigate to the project directory:

```bash
cd OTP
```

3. Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).



## Usage

The OTP component is located in `src/components/OTPDemo.jsx`. It's a fully functional demo that you can:

1. **Type digits** — Each digit automatically advances to the next box
2. **Paste codes** — Paste a multi-digit code and it will be distributed across boxes
3. **Use backspace** — Clears current box or moves to previous if empty
4. **Navigate with arrows** — Use left/right arrow keys to move between inputs
5. **Mobile autofill** — On mobile devices, SMS OTP codes can be autofilled automatically

### Component Structure

```
React-OTP/
├── OTP/
│   ├── src/
│   │   ├── components/
│   │   │   └── OTPDemo.jsx    # Main OTP component
│   │   ├── App.jsx             # App entry point
│   │   ├── main.jsx            # React root
│   │   └── index.css           # Global styles
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Tech Stack

- **React 19** — UI library and component logic
- **Tailwind CSS 4** — Utility-first CSS framework for styling
- **Vite** — Fast build tool and development server
- **ESLint** — Code linting and quality checks

## Key Implementation Details

### Input Handling

- Uses `type="text"` with `inputMode="numeric"` for better mobile UX (avoids number input quirks)
- `autoComplete="one-time-code"` enables SMS autofill on mobile browsers
- `pattern="[0-9]*"` ensures numeric keypad on iOS Safari

### State Management

- Uses React hooks (`useState`, `useRef`, `useEffect`) for state and DOM references
- Immutable state updates ensure proper React re-renders

### Accessibility

- Full keyboard navigation support
- Screen reader friendly
- Focus management for better UX

## Mobile Features

The component is optimized for mobile devices:

- Shows numeric keypad instead of full keyboard
- Supports SMS OTP autofill (iOS Safari, Chrome on Android)
- Touch-friendly input boxes with proper sizing

## Demo

The component includes a live demo with:

- 4-digit OTP input
- Real-time validation
- Submit button (enabled only when all digits are entered)
- Success message on verification

## Notes

- The component is currently configured for 4-digit OTP codes (configurable via `LENGTH` constant)
- All non-numeric characters are automatically filtered
- Paste events are handled separately to prevent duplicate processing

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## License

This project is open source and available for use.

---

Built with ❤️ using React and Tailwind CSS
