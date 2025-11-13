# Password Generator

Interactive password generator built with **React** and **Tailwind CSS**.

## Features

- Adjustable length slider from 6 to 20 characters.
- Optional inclusion of numbers and special characters (`@#$&`) with guaranteed presence when selected.
- Fisher-Yates shuffle for stronger randomness across the generated password.
- One-click copy-to-clipboard with visual confirmation.
- Responsive card layout with subtle gradients and shadows.

## Run locally

```bash
cd Password-generator
npm install
npm run dev
```

The dev server defaults to `http://localhost:5173`. Stop other Vite servers first if the port is busy.

## How it works

The generator builds a base alphabet of upper- and lowercase letters, then conditionally adds number and special-character pools. When either option is enabled, at least one character from that pool is inserted before the rest of the password is filled with random characters from the combined pool. A final shuffle prevents predictable placement of required characters, and the result is displayed in a copyable readonly field.
