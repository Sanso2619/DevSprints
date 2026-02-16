export default function Features() {
  return (
    <section className="py-24 px-6">

      <h2 className="text-4xl font-bold text-center mb-16 text-purple-400">
        Features
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {[
          "Live Progress Tracking",
          "Mentor Support",
          "Judge Calling System",
          "Team Chat",
          "Real-Time Announcements",
          "Sponsor Dashboard"
        ].map((item, i) => (

          <div
            key={i}
            className="bg-[#0F172A] p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400 transition"
          >
            <h3 className="font-semibold mb-2">
              {item}
            </h3>

            <p className="text-gray-400 text-sm">
              Manage everything smoothly
              in one platform.
            </p>
          </div>

        ))}

      </div>

    </section>
  );
}
