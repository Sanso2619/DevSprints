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
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";

export default function StudentDashboard() {

  const navigate = useNavigate();
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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col relative overflow-hidden min-h-screen">
        
        {/* Navbar for Profile on Top Right */}
        <Navbar />

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 p-8 md:p-12 pt-32 relative z-10 overflow-y-auto">
          
          {/* Soft Background Glow */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.15)_0%,_transparent_50%)]"></div>

          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Student Dashboard
              </h1>
              <p className="text-gray-400 text-lg mt-2 font-medium">
                Welcome back, <span className="text-purple-400">{user.email}</span>
              </p>
            </div>

            <Link
              to="/hackathons"
              className="px-8 py-4 bg-purple-600/80 hover:bg-purple-600 rounded-2xl font-bold transition shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105"
            >
              Explore Hackathons
            </Link>
          </div>

          {/* TOP STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Joined Hackathons", value: "3", color: "from-purple-600/30 to-purple-900/10" },
              { label: "Active", value: "1", color: "from-blue-600/30 to-blue-900/10" },
              { label: "Submissions", value: "4", color: "from-pink-600/30 to-pink-900/10" },
              { label: "Certificates", value: "2", color: "from-green-600/30 to-green-900/10" }
            ].map((item) => (
              <div
                key={item.label}
                className={`bg-gradient-to-br ${item.color} backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 shadow-xl group cursor-default`}
              >
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3 group-hover:text-white transition">
                  {item.label}
                </p>
                <h3 className="text-4xl font-black tracking-tight">
                  {item.value}
                </h3>
              </div>
            ))}
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ANALYTICS PANEL */}
            <div className="lg:col-span-2 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
                <h2 className="text-xl font-bold tracking-tight">
                  Participation Overview
                </h2>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={participationData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="month" 
                      stroke="#4B5563" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis 
                      stroke="#4B5563" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#050505",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "16px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                      }}
                      labelStyle={{ color: "#fff", fontWeight: "bold", marginBottom: "4px" }}
                      itemStyle={{ padding: "2px 0" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="joined"
                      stroke="#8B5CF6"
                      strokeWidth={4}
                      dot={{ r: 4, fill: "#8B5CF6", strokeWidth: 0 }}
                      activeDot={{ r: 8, strokeWidth: 0, fill: "#8B5CF6" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="submitted"
                      stroke="#EC4899"
                      strokeWidth={4}
                      dot={{ r: 4, fill: "#EC4899", strokeWidth: 0 }}
                      activeDot={{ r: 8, strokeWidth: 0, fill: "#EC4899" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ANNOUNCEMENTS PANEL */}
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                <h2 className="text-xl font-bold tracking-tight">
                  Latest Updates
                </h2>
              </div>

              <div className="space-y-6">
                {[
                  { 
                    title: "AI Innovators Extended", 
                    desc: "Deadline shifted by 48 hours for final submissions.",
                    tag: "Update",
                    tagCol: "text-blue-400 bg-blue-400/10"
                  },
                  { 
                    title: "Mentorship Session", 
                    desc: "Join us this Friday for a Web3 deep dive.",
                    tag: "Event",
                    tagCol: "text-purple-400 bg-purple-400/10"
                  },
                  { 
                    title: "New Track Added", 
                    desc: "Sponsors added a new GreenTech prize track.",
                    tag: "New",
                    tagCol: "text-green-400 bg-green-400/10"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="group cursor-pointer hover:bg-white/5 p-4 -mx-4 rounded-2xl transition-all">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${item.tagCol}`}>
                      {item.tag}
                    </span>
                    <p className="text-white font-bold mt-3 mb-1 group-hover:text-purple-400 transition">
                      {item.title}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
