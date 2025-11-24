import React from "react";
import { useLocation } from "react-router-dom";

export default function StepProgressNavbar() {
  const location = useLocation();

  // Map each route to a step number
  const currentStep =
    location.pathname === "/step-1"
      ? 1
      : location.pathname === "/step-2"
      ? 2
      : location.pathname === "/step-3"
      ? 3
      : location.pathname === "/confirm"
      ? 4
      : location.pathname === "/result"
      ? 5
      : location.pathname === "/published"
      ? 6
      : 0;

  // Step labels
  const steps = [
    { num: 1, label: "Brief" },
    { num: 2, label: "Backer" },
    { num: 3, label: "Reward" },
    { num: 4, label: "Confirm" },
    { num: 5, label: "Result" },
    { num: 6, label: "Published" },
  ];

  return (
    <div
      className="d-flex justify-content-center align-items-center gap-5 py-3"
      style={{
        background: "#fff",
        borderBottom: "1px solid #E6E6E6",
      }}
    >
      {steps.map((s) => {
        const isCompleted = currentStep > s.num;
        const isActive = currentStep === s.num;

        return (
          <div
            key={s.num}
            className="d-flex flex-column align-items-center"
            style={{ textAlign: "center" }}
          >
            {/* Circle */}
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: isCompleted ? "#E8F3FF" : "#f6f9fc",
                border: isActive ? "3px solid #0A84FF" : "1px solid #D8E6F5",
                color: isActive ? "#0A84FF" : "#8AA6C1",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {isCompleted ? (
                <span className="text-primary" style={{ fontSize: 20 }}>
                  ✓
                </span>
              ) : (
                s.num
              )}
            </div>

            {/* Label */}
            <div
              style={{
                fontSize: 14,
                fontWeight: isActive ? 700 : 500,
                marginTop: 6,
                color: isActive ? "#0A84FF" : "#777",
              }}
            >
              {s.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
