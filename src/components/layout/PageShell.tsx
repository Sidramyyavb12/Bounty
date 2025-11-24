import React from "react";
import Sidebar from "./Sidebar";
import StepProgressNavbar from "./Navbar";

export default function PageShell({ children }) {
  return (
    <>
    <StepProgressNavbar currentStep={4} />
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f6f6f6" }}>
       

      <Sidebar />

      <div className="flex-grow-1 p-4">
        {children}
      </div>
    </div>
    </>
  );
}
