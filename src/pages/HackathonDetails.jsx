import { useParams, Link } from "react-router-dom";

export default function HackathonDetails() {

  const { id } = useParams();

  // Dummy Data (Same as Hackathons Page)
  const hackathons = [
    {
      id: 1,
      title: "AI Innovators Challenge",
      prize: "₹50,000",
      date: "March 2026",
      status: "Live",
      description:
        "Build cutting-edge AI solutions that solve real-world problems. Open to developers of all levels.",
      tags: ["AI", "ML", "Innovation"]
    },
    {
      id: 2,
      title: "Web3 Sprint",
      prize: "₹30,000",
      date: "April 2026",
      status: "Upcoming",
      description:
        "Explore decentralized applications, smart contracts, and blockchain innovation.",
      tags: ["Blockchain", "Web3"]
    },
    {
      id: 3,
      title: "GreenTech Hack",
      prize: "₹25,000",
      date: "January 2026",
      status: "Ended",
      description:
        "Solve sustainability and climate challenges using modern IoT and AI solutions.",
      tags: ["Climate", "IoT"]
    },
    {
      id: 4,
      title: "FinTech Buildathon",
      prize: "₹40,000",
      date: "May 2026",
      status: "Live",
      description:
        "Build next-generation financial products using APIs, AI, and secure payment systems.",
      tags: ["Finance", "API"]
    }
  ];

  const hackathon = hackathons.find(
    (hack) => hack.id === Number(id)
  );

  // If Not Found
  if (!hackathon) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Hackathon not found 
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-black
        via-purple-900/20
        to-black
        text-white
        px-6 py-24
        relative
      "
    >

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.15)_0%,_transparent_60%)]"></div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Back */}
        <Link
          to="/hackathons"
          className="text-purple-400 hover:underline mb-8 inline-block"
        >
          ← Back to Hackathons
        </Link>

        {/* Card */}
        <div
          className="
            bg-[#0a0a0a]/80
            backdrop-blur
            border border-white/10
            rounded-2xl
            p-10
            shadow-xl
          "
        >

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {hackathon.title}
          </h1>

          {/* Status */}
          <span
            className="
              inline-block
              px-4 py-1
              rounded-full
              bg-purple-600/20
              text-purple-300
              text-sm
              mb-6
            "
          >
            {hackathon.status}
          </span>

          {/* Info */}
          <div className="grid md:grid-cols-2 gap-4 text-gray-300 mb-8">

            <p>Date: {hackathon.date}</p>
            <p>Prize: {hackathon.prize}</p>

          </div>

          {/* Description */}
          <div className="mb-8">

            <h2 className="text-2xl font-semibold mb-3">
              About This Hackathon
            </h2>

            <p className="text-gray-400 leading-relaxed">
              {hackathon.description}
            </p>

          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-10">

            {hackathon.tags.map((tag) => (
              <span
                key={tag}
                className="
                  px-3 py-1
                  bg-purple-500/10
                  text-purple-300
                  rounded-full
                  text-sm
                "
              >
                #{tag}
              </span>
            ))}

          </div>

          {/* Register */}
          <div className="text-center">

            <button
              className="
                px-10 py-4
                bg-purple-600/80
                hover:bg-purple-600
                rounded-xl
                font-semibold
                transition
                shadow-[0_0_20px_rgba(139,92,246,0.4)]
              "
            >
               Register Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
