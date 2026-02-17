import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SponsorDashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("devsprintsUser"));

  const handleLogout = () => {
    localStorage.removeItem("devsprintsUser");
    navigate("/login");
  };

  useEffect(() => {
    if (!user || !user.isLoggedIn || user.role !== "sponsor") {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a1a] to-black text-white p-10 relative">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.15)_0%,_transparent_50%)]"></div>

      <div className="relative z-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-12">

          <div>
            <h1 className="text-3xl font-semibold tracking-wide">
              Sponsor Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Campaign and brand analytics
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center font-semibold">
              S
            </div>

            <button
              onClick={handleLogout}
              className="
                px-4 py-2
                bg-red-500/20
                text-red-400
                rounded-lg
                transition-all duration-300
                hover:bg-red-500/30
                hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]
                active:scale-95
              "
            >
              Exit
            </button>

          </div>

        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

          {[
            { label: "Sponsored Events", value: "3", color: "from-purple-600/30 to-purple-900/10" },
            { label: "Total Reach", value: "48K", color: "from-blue-600/30 to-blue-900/10" },
            { label: "Leads Generated", value: "620", color: "from-green-600/30 to-green-900/10" },
            { label: "Brand Score", value: "92%", color: "from-pink-600/30 to-pink-900/10" }
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

        {/* Middle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          {/* Campaign Performance */}
          <div className="bg-black/60 backdrop-blur border border-white/10 rounded-xl p-8 shadow-xl">

            <h2 className="text-xl font-semibold mb-6">
              Campaign Performance
            </h2>

            <div className="space-y-5">

              {[
                { title: "FinTech Buildathon", stats: "Views: 21K | Clicks: 3.1K" },
                { title: "AI Innovators", stats: "Views: 14K | Clicks: 2.2K" },
                { title: "Web3 Sprint", stats: "Views: 13K | Clicks: 1.8K" }
              ].map((item) => (

                <div
                  key={item.title}
                  className="
                    bg-white/5
                    border border-white/10
                    rounded-lg
                    p-5
                    flex justify-between items-center
                    hover:bg-white/10
                    transition-all duration-300
                    cursor-pointer
                  "
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-400 text-sm">{item.stats}</p>
                  </div>

                  <span className="text-purple-400 text-sm">
                    Active
                  </span>
                </div>

              ))}

            </div>

          </div>

          {/* Top Sponsored Teams */}
          <div className="bg-black/60 backdrop-blur border border-white/10 rounded-xl p-8 shadow-xl">

            <h2 className="text-xl font-semibold mb-6">
              Top Sponsored Teams
            </h2>

            <div className="space-y-5">

              {[
                { name: "CodeStorm", score: "96%" },
                { name: "AlgoMasters", score: "94%" },
                { name: "NeuroTech", score: "91%" }
              ].map((team) => (

                <div
                  key={team.name}
                  className="
                    bg-white/5
                    border border-white/10
                    rounded-lg
                    p-5
                    flex justify-between items-center
                    hover:bg-white/10
                    transition-all duration-300
                    cursor-pointer
                  "
                >
                  <p>{team.name}</p>
                  <p className="text-green-400 font-semibold">
                    {team.score}
                  </p>
                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Reports Section */}
        <div className="bg-black/60 backdrop-blur border border-white/10 rounded-xl p-8 shadow-xl">

          <h2 className="text-xl font-semibold mb-2">
            Reports & Insights
          </h2>

          <p className="text-gray-400 text-sm mb-6">
            Download detailed campaign and engagement reports
          </p>

          <div className="flex gap-4">

            {/* Download PDF */}
            <button
              onClick={() => alert("Downloading PDF...")}
              className="
                px-6 py-3
                bg-purple-600/80
                rounded-lg
                font-medium
                cursor-pointer
                transition-all duration-300
                hover:bg-purple-600
                hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]
                hover:scale-105
                active:scale-95
              "
            >
              Download PDF
            </button>

            {/* Export CSV */}
            <button
              onClick={() => alert("Exporting CSV...")}
              className="
                px-6 py-3
                bg-white/5
                rounded-lg
                font-medium
                cursor-pointer
                transition-all duration-300
                hover:bg-white/10
                hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
                hover:scale-105
                active:scale-95
              "
            >
              Export CSV
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
