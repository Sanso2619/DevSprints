export default function Features() {
  const features = [
    {
      title: "Live Progress Tracking",
      desc: "Monitor hackathon stages, submissions, and team performance in real time."
    },
    {
      title: "Mentor Support",
      desc: "Connect participants with industry mentors for instant guidance and feedback."
    },
    {
      title: "Judge Calling System",
      desc: "Enable seamless evaluation through structured judge scheduling and scoring."
    },
    {
      title: "Team Collaboration",
      desc: "Facilitate smooth communication with built-in chat and task coordination."
    },
    {
      title: "Real-Time Announcements",
      desc: "Broadcast important updates, deadlines, and results instantly."
    },
    {
      title: "Sponsor Dashboard",
      desc: "Provide sponsors with analytics, branding tools, and engagement insights."
    }
  ];

  return (
    <section className="py-28 px-6 relative">

      {/* Section Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-white">
        Platform Features
      </h2>

      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-20">
        Everything you need to organize, manage, and scale hackathons with ease.
      </p>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {features.map((item, i) => (

          <div
            key={i}
            className="
              group
              relative
              p-8
              rounded-2xl
              bg-gradient-to-br from-[#0B0F1A] to-[#111827]
              border border-white/10
              backdrop-blur-xl
              transition-all duration-500
              hover:scale-[1.03]
              hover:border-purple-500/40
              hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]
            "
          >

            {/* Subtle Glow Layer */}
            <div className="
              absolute inset-0 rounded-2xl opacity-0
              group-hover:opacity-100
              transition duration-500
              bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10
            " />

            {/* Content */}
            <div className="relative z-10">

              <h3 className="font-semibold text-xl mb-4 text-white tracking-wide">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}
