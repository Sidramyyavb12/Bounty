// src/pages/Published.tsx
import React from "react";
import PageShell from "../components/layout/PageShell";
import done from "../assets/done.gif";

export default function Published() {
  return (
    <PageShell>
      <div
        className="container d-flex flex-column align-items-center justify-content-center"
        style={{
          minHeight: "70vh",
          textAlign: "center",
          paddingTop: "40px",
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E5E5E5",
          padding: "40px",
        }}
      >
        {/* Heading */}
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#000",
            marginBottom: "30px",
          }}
        >
          Bounty is published and live on Impact Miner!
        </h1>

        {/* GIF */}
        <img
          src={done}
          alt="Celebration"
          style={{
            width: "500px",
            height: "auto",
            marginTop: "10px",
          }}
        />
      </div>
    </PageShell>
  );
}
