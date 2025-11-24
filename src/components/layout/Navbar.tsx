import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
  currentStep: number; // 1–6
  totalSteps?: number;
};

export default function StepProgressNavbar({ currentStep, totalSteps = 6 }: Props) {
  return (
    <div
      className="d-flex justify-content-center align-items-center gap-3 py-3"
      style={{
        background: "#fff",
        borderBottom: "1px solid #E6E6E6",
      }}
    >
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <div
            key={step}
            className="d-flex align-items-center justify-content-center"
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: isCompleted ? "#E8F3FF" : "#f6f9fc88",
              border: isActive ? "3px solid #0A84FF" : "1px solid #D8E6F5",
              color: isActive ? "#0A84FF" : "#8AA6C1",
              fontWeight: 600,
              fontSize: 18,
              transition: "0.2s",
            }}
          >
            {isCompleted ? (
              <span className="text-primary" style={{ fontSize: 20 }}>✓</span>
            ) : (
              step
            )}
          </div>
        );
      })}
    </div>
  );
}
