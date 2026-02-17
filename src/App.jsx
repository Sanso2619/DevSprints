import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Hackathons from "./pages/Hackathons";
import HackathonDetails from "./pages/HackathonDetails";
import StudentDashboard from "./pages/StudentDashboard";
import SubmitProject from "./pages/SubmitProject";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import SponsorDashboard from "./pages/SponsorDashboard";

if (!localStorage.getItem("devsprintsFlow")) {
  localStorage.setItem(
    "devsprintsFlow",
    JSON.stringify({
      registration: true,
      submission: true
    })
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/hackathons" element={<Hackathons />} />
      <Route path="/hackathon/:id" element={<HackathonDetails />} />
      <Route path="/dashboard/student" element={<StudentDashboard />} />
      <Route path="/submit/:id" element={<SubmitProject />} />
      <Route path="/dashboard/organizer" element={<OrganizerDashboard />} />
      <Route path="/dashboard/sponsor" element={<SponsorDashboard />} />


    </Routes>
  );
}