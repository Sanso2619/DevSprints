import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("devsprintsUser");

    if (!user) {
      navigate("/login");
      return;
    }

    const parsed = JSON.parse(user);

    if (!parsed.isLoggedIn) {
      navigate("/login");
      return;
    }

    if (parsed.role === "student") {
      navigate("/dashboard/student");
    } else {
      navigate("/login");
    }

  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Redirecting...
    </div>
  );
}