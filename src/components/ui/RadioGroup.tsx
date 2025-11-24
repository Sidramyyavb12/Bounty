import React from "react";

export default function RadioGroup({ options, value, onChange }) {
  return (
    <div className="d-flex gap-4 flex-wrap">
      {options.map((o) => (
        <label key={o.value} className="d-flex align-items-center gap-2">
          <input
            type="radio"
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            className="form-check-input"
            style={{ width: "18px", height: "18px" }}
          />
          <span style={{ fontSize: "15px", fontWeight: 500 }}>{o.label}</span>
        </label>
      ))}
    </div>
  );
}
