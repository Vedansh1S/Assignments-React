# Color Flipper

A simple React application that generates random hex colors and displays them as the background. Click the button to instantly change the background color to a new random value.

## Features

- Random hex color generation
- Real-time background color updates
- Displays the current hex color code
- Clean and minimal UI

## Getting Started

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## How It Works

The app uses React's `useState` hook to manage the current color state. When the "Change Color" button is clicked, it generates a random hex color by:

1. Generating a random number between 0 and 16777215 (max 24-bit color value)
2. Converting it to hexadecimal
3. Formatting it as a CSS color code (e.g., `#a3f91c`)
