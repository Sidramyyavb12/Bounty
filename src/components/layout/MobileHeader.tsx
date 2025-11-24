// src/components/layout/MobileHeader.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function MobileHeader({ title = "Bounty" }: { title?: string }) {
  const nav = useNavigate();
  return (
    <header className="app-header">
      <button
        onClick={() => nav(-1)}
        aria-label="Back"
        className="back-btn"
        style={{ background: "rgba(255,255,255,0.08)", border: "none" }}
      >
        <i className="bi bi-arrow-left" style={{ fontSize: 18 }} />
      </button>

      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>{title}</div>
      </div>

      <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <i className="bi bi-three-dots-vertical" style={{ color: "rgba(255,255,255,0.85)" }} />
      </div>
    </header>
  );
}
