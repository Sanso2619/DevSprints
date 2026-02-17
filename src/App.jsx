import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Hackathons from "./pages/Hackathons";
import HackathonDetails from "./pages/HackathonDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/hackathons" element={<Hackathons />} />
      <Route path="/hackathon/:id" element={<HackathonDetails />} />

    </Routes>
  );
}
