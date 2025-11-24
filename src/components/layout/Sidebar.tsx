import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const steps = [
  { id: 1, title: "Brief", to: "/step-1" },
  { id: 2, title: "Backer", to: "/step-2" },
  { id: 3, title: "Rewards", to: "/step-3" },
];

export function SidebarContent() {
  return (
    <div className="px-3 py-3">
      <h6
        className="text-uppercase text-muted mb-4"
        style={{
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.8px",
        }}
      >
        Bounty Steps
      </h6>

      <nav className="nav flex-column">
        {steps.map((s) => (
          <NavLink
            key={s.id}
            to={s.to}
            className={({ isActive }) =>
              `nav-link d-flex align-items-center py-2 mb-1 ${
                isActive ? "text-primary fw-bold" : "text-muted"
              }`
            }
            style={{
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            <span
              className="badge bg-light text-primary me-3"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
              }}
            >
              {s.id}
            </span>
            {s.title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="d-md-none bg-light border-bottom"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 3000,
          display: "flex",
          alignItems: "center",
          padding: "10px 15px",
        }}
      >
        <button
          className="btn p-0"
          onClick={() => setOpen(true)}
          style={{ fontSize: "26px" }}
        >
          ☰
        </button>

        <h5 className="ms-3 m-0 fw-bold">Menu</h5>
      </div>

      <div
        className={`mobile-sidebar-overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`mobile-sidebar ${open ? "open" : ""} d-md-none bg-light`}
        style={{
          width: "260px",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 2000,
          transition: "transform .3s ease",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          borderRight: "1px solid #ddd",
        }}
      >
        <div className="p-3 border-bottom d-flex justify-content-between">
          <h5 className="fw-bold">Menu</h5>
          <button className="btn" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <SidebarContent />
      </aside>

      <aside className="d-none d-md-block" style={{ width: 260 }}>
        <div className="border-end h-100 bg-light">
          <SidebarContent />
        </div>
      </aside>

      <style>{`
        .mobile-sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,0.3);
          z-index: 1500;
          opacity: 0;
          pointer-events: none;
          transition: opacity .3s ease;
        }
        .mobile-sidebar-overlay.show {
          opacity: 1;
          pointer-events: all;
        }
      `}</style>
    </>
  );
}
