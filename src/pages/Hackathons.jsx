import { useState } from "react";
import { Link } from "react-router-dom";

export default function Hackathons() {

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

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
    <div
      className="
        min-h-screen
        text-white
        px-6 py-24
        bg-gradient-to-br
        from-black
        via-purple-900/20
        to-black
        relative
        overflow-hidden
      "
    >

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.15)_0%,_transparent_60%)]"></div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto mb-12">

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
           Explore Hackathons
        </h1>

        <p className="text-gray-400 max-w-2xl">
          Discover live, upcoming, and past hackathons.
          Compete, collaborate, and win exciting prizes.
        </p>

      </div>

      {/* Controls */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-6 mb-12">

        {/* Search */}
        <input
          type="text"
          placeholder="Search hackathons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            flex-1 px-4 py-3 bg-[#0a0a0a] text-white
            border border-white/10 rounded-lg
            focus:outline-none focus:border-purple-500
          "
        />

        {/* Filters */}
        <div className="flex gap-3">

          {["all", "live", "upcoming", "ended"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`
                px-5 py-2 rounded-lg capitalize
                transition border
                ${
                  filter === type
                    ? "bg-purple-600 text-white border-purple-600"
                    : "border-white/10 text-gray-400 hover:border-purple-500"
                }
              `}
            >
              {type}
            </button>
          ))}

        </div>

      </div>

      {/* Grid */}
      <div className="relative z-10 max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredHackathons.map((hack) => (

          <div
            key={hack.id}
            className="
              bg-[#0a0a0a]/80
              backdrop-blur
              border border-white/10
              rounded-xl
              p-6
              hover:border-purple-500
              transition
            "
          >

            {/* Status */}
            <div className="mb-3">
              <span
                className={`
                  px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    hack.status === "live"
                      ? "bg-green-500/20 text-green-400"
                      : hack.status === "upcoming"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-gray-500/20 text-gray-400"
                  }
                `}
              >
                {hack.status.toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold mb-2">
              {hack.title}
            </h2>

            {/* Meta */}
            <p className="text-gray-400 text-sm mb-2">
               {hack.date}
            </p>

            <p className="text-gray-400 text-sm mb-4">
               Prize: {hack.prize}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {hack.tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    px-3 py-1 text-xs rounded-full
                    bg-purple-500/10 text-purple-300
                  "
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action */}
            <Link
              to={`/hackathon/${hack.id}`}
              className="
                block text-center
                py-2 rounded-lg
                bg-purple-600/80
                hover:bg-purple-600
                transition
                font-semibold
              "
            >
              View Details
            </Link>

          </div>
        ))}

      </div>

      {/* Empty State */}
      {filteredHackathons.length === 0 && (
        <p className="relative z-10 text-center text-gray-500 mt-20">
          No hackathons found 
        </p>
      )}

    </div>
  );
}
