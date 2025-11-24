import React, { useEffect } from "react";

export default function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onClose && onClose(), 3500);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  const bg = type === "error" ? "#ff4d4f" : type === "success" ? "#4caf50" : "#333";

  return (
    <div style={{
      position: "fixed",
      right: 20,
      top: 20,
      background: bg,
      color: "#fff",
      padding: "10px 14px",
      borderRadius: 10,
      boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
      zIndex: 9999,
      fontWeight: 600
    }}>
      {message}
    </div>
  );
}
