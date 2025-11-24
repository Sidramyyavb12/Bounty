import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string; // pass bootstrap icon class
}

export default function Input({ label, error, icon, ...props }: Props) {
  return (
    <div className="mb-3 w-100">
      {label && (
        <label className="form-label fw-bold" style={{ fontSize: "18px" }}>
          {label}
        </label>
      )}

      <div className="position-relative">
        {icon && (
          <i
            className={`bi ${icon}`}
            style={{
              position: "absolute",
              top: "50%",
              left: "14px",
              transform: "translateY(-50%)",
              fontSize: "18px",
              color: "#777",
            }}
          />
        )}

        <input
          {...props}
          className="form-control"
          style={{
            height: "54px",
            borderRadius: "14px",
            paddingLeft: icon ? "44px" : "16px",
            background: "#FAFAFA",
            fontSize: "17px",
            fontWeight: 600,
            border: "1px solid #D6D6D6",
          }}
        />
      </div>

      {error && (
        <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
          {error}
        </div>
      )}
    </div>
  );
}
