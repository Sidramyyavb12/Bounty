import React from "react";
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
  return (
    <aside className="d-none d-md-block" style={{ width: 260 }}>
      <div className="border-end h-100 bg-light">
        <SidebarContent />
      </div>
    </aside>
  );
}
