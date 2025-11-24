// src/pages/Published.tsx
import React from "react";
import PageShell from "../components/layout/PageShell";
import done from "../assets/done.gif";

export default function Published() {
  return (
    <PageShell title="Published">
      <div className="card" style={{ textAlign: "center", padding: 28 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800 }}>Bounty published and live on Impact Miner!</h2>
        <img src={done} alt="done" style={{ width: "260px", height: "auto", marginTop: 18 }} />
      </div>
    </PageShell>
  );
}
