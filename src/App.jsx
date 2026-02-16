import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Navbar from "./component/Navbar";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<LandingPage />} />

        {/* Temporary routes */}
        <Route path="/features" element={<LandingPage />} />
        <Route path="/how-it-works" element={<LandingPage />} />
        <Route path="/hackathons" element={<LandingPage />} />
        <Route path="/contact" element={<LandingPage />} />
        <Route path="/login" element={<LandingPage />} />
        <Route path="/signup" element={<LandingPage />} />
      </Routes>
    </>
  );
}
