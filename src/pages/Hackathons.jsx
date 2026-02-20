import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import ThreeBackground from "../component/ThreeBackground";
import GlassOverlay from "../component/GlassOverlay";
import Sidebar from "../component/Sidebar";

export default function Hackathons() {

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setShow(true);
    const storedUser = JSON.parse(localStorage.getItem("devsprintsUser"));
    setUser(storedUser);
  }, []);

  const hackathons = [
    {
      id: 1,
      title: "AI Innovators Challenge",
      prize: "₹50,000",
      date: "Mar 2026",
      status: "live",
      tags: ["AI", "ML"]
    },
    {
      id: 2,
      title: "Web3 Sprint",
      prize: "₹30,000",
      date: "Apr 2026",
      status: "upcoming",
      tags: ["Blockchain", "Web3"]
    },
    {
      id: 3,
      title: "GreenTech Hack",
      prize: "₹25,000",
      date: "Jan 2026",
      status: "ended",
      tags: ["Climate", "IoT"]
    },
    {
      id: 4,
      title: "FinTech Buildathon",
      prize: "₹40,000",
      date: "May 2026",
      status: "live",
      tags: ["Finance", "API"]
    }
  ];

  const filteredHackathons = hackathons.filter((hack) => {
    const matchesSearch =
      hack.title.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || hack.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar for logged in users */}
      {user && user.isLoggedIn && <Sidebar />}

      <div className="flex-1 relative overflow-hidden flex flex-col min-h-screen">
        {/* Background elements */}
        <ThreeBackground />
        <GlassOverlay />
        
        {/* Navbar */}
        <Navbar />

        <div 
          className={`
            relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full
            transition-all duration-1000 ease-out
            ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}
          `}
        >

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
               Explore Hackathons
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
              Discover live, upcoming, and past hackathons.
              Compete, collaborate, and win exciting prizes.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            {/* Search */}
            <input
              type="text"
              placeholder="Search hackathons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                flex-1 px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur border border-white/10 rounded-2xl
                focus:outline-none focus:border-purple-500 transition-all hover:scale-[1.01] focus:scale-[1.01]
              "
            />

            {/* Filters */}
            <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              {["all", "live", "upcoming", "ended"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`
                    px-8 py-4 rounded-2xl capitalize
                    transition border whitespace-nowrap font-medium
                    ${
                      filter === type
                        ? "bg-purple-600 text-white border-purple-600 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                        : "bg-[#0a0a0a]/80 backdrop-blur border-white/10 text-gray-400 hover:border-purple-500/50"
                    }
                  `}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHackathons.map((hack) => (
              <div
                key={hack.id}
                className="
                  bg-[#0a0a0a]/80
                  backdrop-blur-xl
                  border border-white/10
                  rounded-3xl
                  p-8
                  hover:border-purple-500/50
                  hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]
                  transition-all duration-300
                  group
                  relative
                  overflow-hidden
                  flex flex-col
                "
              >
                {/* Card Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                {/* Status */}
                <div className="mb-6">
                  <span
                    className={`
                      px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest
                      ${
                        hack.status === "live"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : hack.status === "upcoming"
                          ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                          : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                      }
                    `}
                  >
                    {hack.status}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  {hack.title}
                </h2>

                {/* Meta Info */}
                <div className="space-y-2 mb-8 flex-1">
                  <div className="flex items-center text-gray-400 text-sm gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {hack.date}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm gap-2 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Prize Pool: <span className="text-white">{hack.prize}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {hack.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        px-4 py-1 text-[10px] rounded-lg
                        bg-white/5 text-gray-300 border border-white/5
                        font-bold uppercase tracking-wider
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <Link
                  to={`/hackathon/${hack.id}`}
                  className="
                    block text-center
                    py-4 rounded-2xl
                    bg-purple-600/10
                    text-purple-400
                    hover:bg-purple-600
                    hover:text-white
                    transition-all duration-300
                    font-bold text-sm tracking-wide
                    border border-purple-500/20
                    group-hover:border-purple-500/50
                    shadow-lg
                  "
                >
                  View Details
                </Link>

              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredHackathons.length === 0 && (
            <p className="text-center text-gray-500 mt-20 text-lg">
              No hackathons found matching your criteria.
            </p>
          )}

        </div>
      </div>
    </div>
  );
}
