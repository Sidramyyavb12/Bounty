import React from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  icon?: string;
}

export default function Textarea({ label, error, icon, ...props }: Props) {
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
              top: "8px",
              left: "15px",
              fontSize: "18px",
              color: "#777",
            }}
          />
        )}

        <textarea
          {...props}
          className="form-control"
          style={{
            minHeight: "150px",
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
