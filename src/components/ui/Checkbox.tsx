export default function Checkbox({ label, ...rest }) {
  return (
    <label className="d-flex align-items-center gap-2"><br />
      <input
        type="checkbox"
        {...rest}
        className="form-check-input"
        style={{ width: "18px", height: "18px" }}
      />
      <span style={{ fontSize: "15px", fontWeight: 500 }}>{label}</span>
    </label>
  );
}
