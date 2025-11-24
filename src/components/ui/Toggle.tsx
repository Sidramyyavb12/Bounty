export default function Toggle({ checked, onChange, label }) {
  return (
    <div className="d-flex align-items-center gap-3">
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: "44px",
          height: "24px",
          borderRadius: "12px",
          background: checked ? "orange" : "#CFCFCF",
          position: "relative",
          cursor: "pointer",
          transition: "0.2s",
        }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            background: "#fff",
            borderRadius: "50%",
            position: "absolute",
            top: "2px",
            left: checked ? "22px" : "2px",
            transition: "0.2s",
            boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
          }}
        />
      </div>

      <span style={{ fontSize: "15px", fontWeight: 500 }}>{label}</span>
    </div>
  );
}
