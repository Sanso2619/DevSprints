import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  
  const [user, setUser] = useState(null);

  const participationData = [
    { month: "Jan", joined: 1, submitted: 0 },
    { month: "Feb", joined: 2, submitted: 1 },
    { month: "Mar", joined: 3, submitted: 2 },
    { month: "Apr", joined: 3, submitted: 3 },
    { month: "May", joined: 4, submitted: 4 },
    { month: "Jun", joined: 5, submitted: 4 }
  ];

  useEffect(() => {
    const savedUser = sessionStorage.getItem("devsprintsUser");
    
    if (!savedUser) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(savedUser);
      if (!parsedUser.isLoggedIn) {
        navigate("/login");
      } else {
        setUser(parsedUser);
      }
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col relative overflow-hidden min-h-screen">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8 pt-24 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-10">
            
            {/* HEADER */}
            <header>
              <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Dashboard
              </h1>
              <p className="text-gray-400 text-lg mt-2 font-medium">
                Welcome back,{" "}
                <button
  onClick={() => navigate("/profile")}
  className="text-purple-400 font-bold drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] hover:underline hover:text-purple-300 transition"
>
  {user.name}
</button>
              </p>
            </header>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-[#050505]/80 backdrop-blur-xl border border-purple-500/20 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(139,92,246,0.3)]">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                  Active Level
                </p>
                <h3 className="text-4xl font-black mt-2 text-purple-400">
                  {user.level}
                </h3>
              </div>

              <div className="bg-[#050505]/80 backdrop-blur-xl border border-purple-500/20 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(139,92,246,0.3)]">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                  Hackathons Joined
                </p>
                <h3 className="text-4xl font-black mt-2">12</h3>
              </div>

              <div className="bg-[#050505]/80 backdrop-blur-xl border border-purple-500/20 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(139,92,246,0.3)]">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                  Submissions
                </p>
                <h3 className="text-4xl font-black mt-2">08</h3>
              </div>

            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* GRAPH */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-[#050505]/80 backdrop-blur-xl border border-purple-500/20 p-8 rounded-3xl transition-all duration-300 hover:shadow-[0_15px_40px_rgba(139,92,246,0.25)]">
                  <h3 className="text-xl font-bold mb-6 text-purple-300">
                    Activity Overview
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={participationData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="month" stroke="#888" tick={{ fill: "#aaa" }} />
                        <YAxis stroke="#888" tick={{ fill: "#aaa" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0a0a0a",
                            border: "1px solid rgba(139,92,246,0.4)",
                            borderRadius: "12px"
                          }}
                          itemStyle={{ color: "#fff" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="joined"
                          stroke="#8b5cf6"
                          strokeWidth={3}
                          dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="submitted"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* RECENT UPDATES */}
              <div className="bg-[#050505]/80 backdrop-blur-xl border border-purple-500/20 p-8 rounded-3xl transition-all duration-300 hover:shadow-[0_15px_40px_rgba(139,92,246,0.25)]">
                <h3 className="text-xl font-bold mb-6 text-purple-300">
                  Recent Updates
                </h3>
                <div className="space-y-6">
                  {[
                    { 
                      title: "Submission Extended", 
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
                    <div
                      key={idx}
                      className="group cursor-pointer p-4 -mx-4 rounded-2xl transition-all duration-300 hover:bg-purple-500/10 hover:border hover:border-purple-400/30"
                    >
                      <span
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${item.tagCol}`}
                      >
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
          </div>
        </main>
      </div>
    </div>
  );
}