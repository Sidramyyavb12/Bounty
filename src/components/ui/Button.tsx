import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  className?: string;
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: Props) {
  const base =
    "fw-semibold rounded-3 d-inline-flex align-items-center justify-content-center";

  const styles =
    variant === "primary"
      ? "text-white"
      : "text-dark";

  const styleObj =
    variant === "primary"
      ? {
          backgroundColor: "#007BFF",
          height: "44px",
          padding: "0 26px",
          border: "none",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: 500,
          boxShadow: "0px 2px 4px rgba(0,0,0,0.15)",
        }
      : {
          backgroundColor: "#ffffff",
          height: "44px",
          padding: "0 26px",
          borderRadius: "8px",
          border: "1px solid #d1d1d1",
          fontSize: "15px",
          fontWeight: 500,
        };

  return (
    <button
      className={`${base} ${styles} ${className}`}
      style={styleObj}
      {...rest}
    >
      {children}
    </button>
  );
}
