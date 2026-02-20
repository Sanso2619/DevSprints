import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("devsprintsUser"));
    setUser(storedUser);
  }, []);

  const handleExit = () => {
    navigate("/");
  };

  if (!user) return null;

  const studentLinks = [
    { name: "Dashboard", path: "/dashboard/student" },
    { name: "Hackathons", path: "/hackathons" },
    { name: "Profile", path: "/profile" },
  ];

  const organizerLinks = [
    { name: "Dashboard", path: "/dashboard/organizer" },
    { name: "Hackathons", path: "/hackathons" },
    { name: "Submissions", path: "#" },
    { name: "Participants", path: "#" },
    { name: "Judges", path: "#" },
  ];

  const sponsorLinks = [
    { name: "Dashboard", path: "/dashboard/sponsor" },
    { name: "Hackathons", path: "/hackathons" },
    { name: "Analytics", path: "#" },
    { name: "Teams", path: "#" },
  ];

  const getLinks = () => {
    if (user.role === "student") return studentLinks;
    if (user.role === "organizer") return organizerLinks;
    if (user.role === "sponsor") return sponsorLinks;
    return [];
  };

  const links = getLinks();

  return (
    <aside className="w-64 bg-black/70 backdrop-blur border-r border-white/10 p-8 hidden md:flex flex-col h-screen sticky top-0 z-40">
      <div className="mb-12 tracking-wide">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-white">Dev</span>
          <span className="text-purple-400">Sprints</span>
        </Link>
      </div>

      {/* NAV */}
      <nav className="flex-1 flex flex-col justify-between text-gray-400 text-sm">
        {/* Top Links */}
        <div className="space-y-4">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-4 py-2.5 rounded-xl transition-all duration-300 ${
                location.pathname === link.path
                  ? "bg-purple-600/20 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                  : "hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* EXIT (Bottom Fixed) */}
        <div className="pt-6 border-t border-white/10">
          <button
            onClick={handleExit}
            className="w-full py-2.5 bg-purple-500/10 text-purple-400 rounded-xl hover:bg-purple-500/20 transition-all duration-300 font-semibold border border-purple-500/10"
          >
            Exit Panel
          </button>
        </div>
      </nav>
    </aside>
  );
}
