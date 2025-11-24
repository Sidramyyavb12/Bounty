import React from "react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  icon?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export default function Select({ label, icon, options, error, ...rest }: Props) {
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

        <select
          {...rest}
          className="form-select"
          style={{
            height: "54px",
            borderRadius: "14px",
            paddingLeft: icon ? "44px" : "16px",
            background: "#FAFAFA",
            fontSize: "17px",
            fontWeight: 600,
            border: "1px solid #D6D6D6",
          }}
        >
          {options.map((o) => (
            <option value={o.value} key={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
          {error}
        </div>
      )}
    </div>
  );
}
