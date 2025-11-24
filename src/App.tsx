import { Routes, Route, Navigate } from "react-router-dom";
import Step1Basics from "./pages/Step1Basics";
import Step2Rewards from "./pages/Step2Rewards";
import Step3Backer from "./pages/Step3Backer";
import Step4Config from "./pages/Step4Config";
import Step5Criteria from "./pages/Step5Criteria";
import Step6Microtasks from "./pages/Step6Microtasks";
import Confirmation from "./pages/Confirmation";
import ResultPage from "./pages/ResultPage";
import "bootstrap-icons/font/bootstrap-icons.css";


export default function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/step-1" />} />
      <Route path="/step-1" element={<Step1Basics />} />
      <Route path="/step-2" element={<Step2Rewards />} />
      <Route path="/step-3" element={<Step3Backer />} />
      <Route path="/step-4" element={<Step4Config />} />
      <Route path="/step-5" element={<Step5Criteria />} />
      <Route path="/step-6" element={<Step6Microtasks />} />
      <Route path="/confirm" element={<Confirmation />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}
