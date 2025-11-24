import { Routes, Route, Navigate } from "react-router-dom";
import Step1Basics from "./pages/Step1Basics";
import Step3Backer from "./pages/Step3Backer";      // second page
import Step2Rewards from "./pages/Step2Rewards";   // third page
import Confirmation from "./pages/Confirmation";
import ResultPage from "./pages/ResultPage";
import Published from "./pages/Step4Config";  // FIXED import

import "bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/step-1" />} />

      {/* Step order */}
      <Route path="/step-1" element={<Step1Basics />} />      {/* Brief */}
      <Route path="/step-2" element={<Step3Backer />} />      {/* Backer */}
      <Route path="/step-3" element={<Step2Rewards />} />     {/* Rewards */}

      {/* Final pages */}
      <Route path="/confirm" element={<Confirmation />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/published" element={<Published />} />
    </Routes>
  );
}
