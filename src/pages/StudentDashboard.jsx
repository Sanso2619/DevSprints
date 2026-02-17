import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function StudentDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("devsprintsUser");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("devsprintsUser"));

  const participationData = [
    { month: "Jan", joined: 1, submitted: 0 },
    { month: "Feb", joined: 2, submitted: 1 },
    { month: "Mar", joined: 3, submitted: 2 },
    { month: "Apr", joined: 3, submitted: 3 },
    { month: "May", joined: 4, submitted: 4 },
    { month: "Jun", joined: 5, submitted: 4 }
  ];

  // Protect Route
  useEffect(() => {
    if (!user || !user.isLoggedIn) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a1a] to-black text-white flex overflow-hidden relative">

      {/* Soft Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.15)_0%,_transparent_50%)]"></div>

      {/* SIDEBAR */}
      <aside className="w-64 bg-black/70 backdrop-blur border-r border-white/10 p-8 hidden md:flex flex-col relative z-10">

        <h2 className="text-2xl font-bold mb-12 tracking-wide">
          <span className="text-white">Dev</span>
          <span className="text-purple-400">Sprints</span>
        </h2>

        {/* NAV */}
        <nav className="flex-1 flex flex-col justify-between text-gray-400 text-sm">

          {/* Top Links */}
          <div className="space-y-5">

            <Link
              to="/dashboard/student"
              className="block px-4 py-2 rounded-lg bg-purple-600/20 text-purple-400"
            >
              Dashboard
            </Link>

            <Link
              to="/hackathons"
              className="block px-4 py-2 rounded-lg hover:bg-white/5 transition"
            >
              Hackathons
            </Link>

            <Link
              to="/profile"
              className="block px-4 py-2 rounded-lg hover:bg-white/5 transition"
            >
              Profile
            </Link>

          </div>

          {/* EXIT (Bottom Fixed) */}
          <div className="pt-6 border-t border-white/10">

            <button
              onClick={handleLogout}
              className="w-full py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
            >
              Exit Panel
            </button>

          </div>

        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 relative z-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-12">

          <div>
            <h1 className="text-3xl font-semibold tracking-wide">
              Student Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {user?.email}
            </p>
          </div>

          <Link
            to="/hackathons"
            className="px-6 py-2 bg-purple-600/80 hover:bg-purple-600 rounded-lg font-medium transition shadow-[0_0_20px_rgba(139,92,246,0.4)]"
          >
            Explore Hackathons
          </Link>

        </div>

        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

          {[
            { label: "Joined Hackathons", value: "3", color: "from-purple-600/30 to-purple-900/10" },
            { label: "Active", value: "1", color: "from-blue-600/30 to-blue-900/10" },
            { label: "Submissions", value: "4", color: "from-pink-600/30 to-pink-900/10" },
            { label: "Certificates", value: "2", color: "from-green-600/30 to-green-900/10" }
          ].map((item) => (

            <div
              key={item.label}
              className={`bg-gradient-to-br ${item.color} backdrop-blur border border-white/10 rounded-xl p-6 hover:-translate-y-1 transition shadow-lg`}
            >
              <p className="text-gray-400 text-sm mb-2">
                {item.label}
              </p>
              <h3 className="text-3xl font-bold">
                {item.value}
              </h3>
            </div>

          ))}

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ANALYTICS PANEL */}
          <div className="lg:col-span-2 bg-black/60 backdrop-blur border border-white/10 rounded-xl p-8 shadow-xl">

            <h2 className="text-xl font-semibold mb-6">
              Participation Overview
            </h2>

            <div className="h-80">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={participationData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                  />

                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#050505",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px"
                    }}
                    labelStyle={{ color: "#fff" }}
                  />

                  <Line
                    type="monotone"
                    dataKey="joined"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />

                  <Line
                    type="monotone"
                    dataKey="submitted"
                    stroke="#EC4899"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* ANNOUNCEMENTS PANEL */}
          <div className="bg-black/60 backdrop-blur border border-white/10 rounded-xl p-8 shadow-xl">

            <h2 className="text-xl font-semibold mb-6">
              Announcements
            </h2>

            <div className="space-y-6 text-sm text-gray-400">

              <div className="border-b border-white/10 pb-4">
                <p className="text-white font-medium mb-1">
                  AI Innovators Deadline Extended
                </p>
                <p>
                  Submission deadline has been extended by 48 hours.
                </p>
              </div>

              <div className="border-b border-white/10 pb-4">
                <p className="text-white font-medium mb-1">
                  Web3 Sprint Mentorship Session
                </p>
                <p>
                  Live mentorship session scheduled for Friday.
                </p>
              </div>

              <div>
                <p className="text-white font-medium mb-1">
                  Platform Update
                </p>
                <p>
                  New submission tracking feature added.
                </p>
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
