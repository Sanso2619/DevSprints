import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";

export default function SponsorDashboard() {

  const navigate = useNavigate();

  // ✅ FIX: Use sessionStorage instead of localStorage
  const user = JSON.parse(sessionStorage.getItem("devsprintsUser"));

  useEffect(() => {
    if (!user || !user.isLoggedIn || user.role !== "sponsor") {
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
          
          {/* Background Glow */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.15)_0%,_transparent_50%)]"></div>

          <div className="relative z-10">

            {/* Header */}
            <div className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-white">
                  Sponsor Dashboard
                </h1>
                <p className="text-gray-400 text-lg mt-2 font-medium">
                  Brand impact and engagement analytics
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center font-black text-purple-400 text-xl shadow-lg shadow-purple-500/10">
                S
              </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { label: "Sponsored Events", value: "3", color: "from-purple-600/30 to-purple-900/10" },
                { label: "Total Reach", value: "48K", color: "from-blue-600/30 to-blue-900/10" },
                { label: "Leads Generated", value: "620", color: "from-green-600/30 to-green-900/10" },
                { label: "Brand Score", value: "92%", color: "from-pink-600/30 to-pink-900/10" }
              ].map((item) => (
                <div
                  key={item.label}
                  className={`bg-gradient-to-br ${item.color} backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300 shadow-xl`}
                >
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                    {item.label}
                  </p>
                  <h3 className="text-4xl font-black text-white">
                    {item.value}
                  </h3>
                </div>
              ))}
            </div>

            {/* Middle Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

              {/* Campaign Performance */}
              <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-xl font-bold mb-8 flex items-center">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full mr-3"></span>
                  Campaign Performance
                </h2>

                <div className="space-y-4">
                  {[
                    { title: "FinTech Buildathon", stats: "Views: 21K | Clicks: 3.1K" },
                    { title: "AI Innovators", stats: "Views: 14K | Clicks: 2.2K" },
                    { title: "Web3 Sprint", stats: "Views: 13K | Clicks: 1.8K" }
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="bg-white/5 border border-white/5 rounded-2xl p-6 flex justify-between items-center hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group"
                    >
                      <div>
                        <p className="font-bold text-white group-hover:text-purple-400 transition">
                          {item.title}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          {item.stats}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase rounded-lg border border-green-500/20">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Sponsored Teams */}
              <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-xl font-bold mb-8 flex items-center">
                  <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></span>
                  Top Sponsored Teams
                </h2>

                <div className="space-y-4">
                  {[
                    { name: "CodeStorm", score: "96%" },
                    { name: "AlgoMasters", score: "94%" },
                    { name: "NeuroTech", score: "91%" }
                  ].map((team) => (
                    <div
                      key={team.name}
                      className="bg-white/5 border border-white/5 rounded-2xl p-6 flex justify-between items-center hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                    >
                      <p className="font-bold text-white group-hover:text-blue-400 transition">
                        {team.name}
                      </p>
                      <p className="text-green-400 font-black text-lg">
                        {team.score}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Reports Section */}
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">
                Reports & Insights
              </h2>
              <p className="text-gray-500 text-sm mb-10 font-medium">
                Download high-fidelity campaign and engagement analytics
              </p>

              <div className="flex flex-wrap gap-6">
                <button
                  onClick={() => alert("Downloading PDF...")}
                  className="px-10 py-4 bg-purple-600/80 hover:bg-purple-600 rounded-2xl font-bold text-sm uppercase tracking-widest cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105 active:scale-95"
                >
                  Download PDF
                </button>

                <button
                  onClick={() => alert("Exporting CSV...")}
                  className="px-10 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold text-sm uppercase tracking-widest cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Export CSV
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}