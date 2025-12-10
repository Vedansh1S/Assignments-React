import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? themes.dark : themes.light;

  return (
    <div style={{ ...styles.container, background: theme.background, color: theme.text }}>
      {/* Main Card */}
      <div style={{ ...styles.card, background: theme.cardBg, boxShadow: theme.shadow }}>
        
        {/* Header / Title */}
        <p style={{ ...styles.label, color: theme.subText }}>CURRENT COUNT</p>
        <h1 style={styles.counter}>{count}</h1>

        {/* Counter Controls */}
        <div style={styles.buttonGroup}>
          <Button 
            onClick={() => setCount(count - 1)} 
            theme={theme} 
            label="-" 
          />
          <Button 
            onClick={() => setCount(count + 1)} 
            theme={theme} 
            label="+" 
            isPrimary 
          />
        </div>
      </div>

      {/* Theme Toggle (Floating) */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{ ...styles.toggleBtn, color: theme.subText, borderColor: theme.border }}
      >
        {isDarkMode ? "Switch to Light Mode ☀️" : "Switch to Dark Mode 🌙"}
      </button>
    </div>
  );
}

// --- Reusable Button Component ---
function Button({ onClick, label, theme, isPrimary }) {
  const [hover, setHover] = useState(false);

  const baseStyle = {
    ...styles.button,
    background: isPrimary ? theme.primary : theme.buttonBg,
    color: isPrimary ? "#fff" : theme.text,
    transform: hover ? "translateY(-2px)" : "translateY(0)",
    boxShadow: hover ? theme.shadowHover : "none",
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={baseStyle}
    >
      {label}
    </button>
  );
}

// --- Design System & Styles ---

const themes = {
  light: {
    background: "#f0f2f5",
    cardBg: "#ffffff",
    text: "#1a1a1a",
    subText: "#65676b",
    primary: "#007AFF", // iOS Blue
    buttonBg: "#f0f2f5",
    border: "#ddd",
    shadow: "0 4px 12px rgba(0,0,0,0.08)",
    shadowHover: "0 6px 16px rgba(0,122,255,0.25)",
  },
  dark: {
    background: "#121212",
    cardBg: "#1e1e1e",
    text: "#e4e6eb",
    subText: "#b0b3b8",
    primary: "#4B9CFF", // Lighter Blue for dark mode
    buttonBg: "#2c2c2c",
    border: "#333",
    shadow: "0 4px 12px rgba(0,0,0,0.4)",
    shadowHover: "0 6px 16px rgba(75,156,255,0.25)",
  },
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    transition: "background 0.3s ease, color 0.3s ease",
  },
  card: {
    padding: "40px 60px",
    borderRadius: "24px",
    textAlign: "center",
    transition: "background 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  label: {
    margin: 0,
    fontSize: "0.85rem",
    letterSpacing: "2px",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  counter: {
    fontSize: "5rem",
    margin: "0",
    fontWeight: "800",
    fontVariantNumeric: "tabular-nums", // Prevents jitter when numbers change width
    lineHeight: 1,
  },
  buttonGroup: {
    display: "flex",
    gap: "16px",
    marginTop: "10px",
  },
  button: {
    border: "none",
    padding: "12px 24px",
    fontSize: "1.5rem",
    borderRadius: "12px",
    cursor: "pointer",
    minWidth: "60px",
    transition: "all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleBtn: {
    marginTop: "30px",
    background: "transparent",
    border: "1px solid",
    padding: "10px 20px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "all 0.3s ease",
    opacity: 0.8,
  },
};