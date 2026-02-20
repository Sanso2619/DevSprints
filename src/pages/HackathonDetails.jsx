import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import ThreeBackground from "../component/ThreeBackground";
import GlassOverlay from "../component/GlassOverlay";

export default function HackathonDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

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
        bg-black
        text-white
        relative
        overflow-hidden
      "
    >
      {/* Background Elements */}
      <ThreeBackground />
      <GlassOverlay />
      
      {/* Navbar */}
      <Navbar />

      <div 
        className={`
          relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24
          transition-all duration-1000 ease-out
          ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}
        `}
      >

        {/* Back Button */}
        <Link
          to="/hackathons"
          className="group flex items-center text-purple-400 font-bold text-sm tracking-widest uppercase mb-10 hover:text-purple-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Hackathons
        </Link>

        {/* Card */}
        <div
          className="
            bg-[#0a0a0a]/80
            backdrop-blur-xl
            border border-white/10
            rounded-[2.5rem]
            p-10
            shadow-2xl
            relative
            overflow-hidden
          "
        >
          {/* Subtle Top Gradient */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-50"></div>

          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
                {hackathon.title}
              </h1>

              <span
                className={`
                  inline-block
                  px-5 py-1.5
                  rounded-full
                  bg-purple-600/10
                  text-purple-400
                  border border-purple-500/20
                  text-xs font-bold uppercase tracking-widest
                `}
              >
                {hackathon.status}
              </span>
            </div>

            <div className="bg-black/40 border border-white/5 p-6 rounded-3xl flex flex-col justify-center min-w-[200px]">
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Prize Pool</div>
              <div className="text-3xl font-bold text-white">{hackathon.prize}</div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full mr-3"></span>
                  About This Hackathon
                </h2>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {hackathon.description}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></span>
                  Event Timeline
                </h2>
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-gray-400">Submission Date</span>
                     <span className="text-white font-semibold">{hackathon.date}</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="w-1.5 h-6 bg-pink-500 rounded-full mr-3"></span>
                  Technologies
                </h2>
                <div className="flex flex-wrap gap-3">
                  {hackathon.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        px-4 py-2
                        bg-black/60
                        text-gray-300
                        rounded-xl
                        text-xs font-bold uppercase tracking-wider
                        border border-white/5
                        hover:border-purple-500/30 hover:bg-black transition-all
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="w-1.5 h-6 bg-green-500 rounded-full mr-3"></span>
                  Rules & Criteria
                </h2>
                <ul className="text-xs text-gray-500 space-y-2 list-disc pl-5">
                  <li>Minimum team size: 1 member</li>
                  <li>Maximum team size: 4 members</li>
                  <li>Original code developed during event</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Registration Button */}
          <div className="pt-6 border-t border-white/5">
            <button
              onClick={() => {
                const flow =
                  JSON.parse(
                    localStorage.getItem("devsprintsFlow")
                  ) || {};

                if (!flow.registration) {
                  alert("Registrations are currently closed.");
                  return;
                }

                const user = JSON.parse(
                  localStorage.getItem("devsprintsUser")
                );

                // If not logged in
                if (!user || !user.isLoggedIn) {
                  navigate("/login");
                  return;
                }

                // Get previous registrations
                const registered =
                  JSON.parse(
                    localStorage.getItem("devsprintsRegistrations")
                  ) || [];

                // Check duplicate
                const alreadyRegistered = registered.find(
                  (item) =>
                    item.user === user.email &&
                    item.hackathonId === hackathon.id
                );

                if (alreadyRegistered) {
                  navigate(`/submit/${hackathon.id}`);
                  return;
                }

                // Save registration
                registered.push({
                  user: user.email,
                  hackathonId: hackathon.id,
                  title: hackathon.title,
                  status: hackathon.status
                });

                localStorage.setItem(
                  "devsprintsRegistrations",
                  JSON.stringify(registered)
                );


                //  STEP 2: Redirect to submission page
                navigate(`/submit/${hackathon.id}`);

              }}
              className="
                w-full py-5
                bg-purple-600
                hover:bg-purple-500
                rounded-2xl
                font-bold text-sm uppercase tracking-widest
                transition-all duration-300
                shadow-[0_0_30px_rgba(139,92,246,0.3)]
                hover:scale-[1.01] active:scale-95
              "
            >
              Register & Start Building
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
