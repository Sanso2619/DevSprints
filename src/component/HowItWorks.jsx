export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Register",
      desc: "Sign up and create your profile in minutes.",
    },
    {
      id: "02",
      title: "Form or Join a Team",
      desc: "Create your own team or join existing ones.",
    },
    {
      id: "03",
      title: "Build & Submit",
      desc: "Develop your solution and submit on time.",
    },
    {
      id: "04",
      title: "Get Evaluated",
      desc: "Judges review projects and announce results.",
    },
  ];

  return (
    <section className="relative py-28 px-6 text-white">

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-white">
        How It Works
      </h2>

      {/* Steps */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {steps.map((step, i) => (
          <div
            key={i}
            className="relative bg-black/60 backdrop-blur-xl
                       border border-purple-500/25
                       rounded-2xl p-8 text-center
                       transition-all duration-300
                       hover:border-purple-400/60
                       hover:-translate-y-2"
          >

            {/* Number Circle */}
            <div
              className="mx-auto mb-6 w-16 h-16 flex items-center justify-center
                         rounded-full
                         bg-gradient-to-r from-purple-500 to-fuchsia-500
                         text-white font-bold text-lg"
            >
              {step.id}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-3 text-white">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">
              {step.desc}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
}
