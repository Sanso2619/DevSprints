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
  
  // ✅ Switch from localStorage to sessionStorage and use State
  const [user, setUser] = useState(null);

  const participationData = [
    { month: "Jan", joined: 1, submitted: 0 },
    { month: "Feb", joined: 2, submitted: 1 },
    { month: "Mar", joined: 3, submitted: 2 },
    { month: "Apr", joined: 3, submitted: 3 },
    { month: "May", joined: 4, submitted: 4 },
    { month: "Jun", joined: 5, submitted: 4 }
  ];

  // ✅ Protect Route & Load Session Data safely
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

  // ✅ Prevents rendering the dashboard before the user data is loaded
  if (!user) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col relative overflow-hidden min-h-screen">
        
        {/* Navbar for Profile on Top Right */}
        <Navbar />

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-8 pt-24 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-10">
            
            <header>
              <h1 className="text-5xl font-extrabold tracking-tight">Dashboard</h1>
              <p className="text-gray-400 text-lg mt-2 font-medium">
                Welcome back, <span className="text-purple-400">{user.name}</span>
              </p>
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#050505] border border-white/10 p-6 rounded-3xl">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Active Level</p>
                <h3 className="text-4xl font-black mt-2 text-purple-400">{user.level}</h3>
              </div>
              <div className="bg-[#050505] border border-white/10 p-6 rounded-3xl">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Hackathons Joined</p>
                <h3 className="text-4xl font-black mt-2">12</h3>
              </div>
              <div className="bg-[#050505] border border-white/10 p-6 rounded-3xl">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Submissions</p>
                <h3 className="text-4xl font-black mt-2">08</h3>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column (Spans 2) */}
              <div className="lg:col-span-2 space-y-8">
                {/* Graph */}
                <div className="bg-[#050505] border border-white/10 p-8 rounded-3xl">
                  <h3 className="text-xl font-bold mb-6">Activity Overview</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={participationData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="month" stroke="#666" tick={{ fill: "#666" }} />
                        <YAxis stroke="#666" tick={{ fill: "#666" }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                          itemStyle={{ color: "#fff" }}
                        />
                        <Line type="monotone" dataKey="joined" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="submitted" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="bg-[#050505] border border-white/10 p-8 rounded-3xl">
                <h3 className="text-xl font-bold mb-6">Recent Updates</h3>
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
          </div>
        </main>
      </div>
    </div>
  );
}