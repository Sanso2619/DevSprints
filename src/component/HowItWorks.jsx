export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-[#0F172A]">

      <h2 className="text-4xl font-bold text-center mb-16 text-purple-400">
        How It Works
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 text-center">

        {[
          "Register",
          "Join Team",
          "Build Project",
          "Get Evaluated"
        ].map((step, i) => (

          <div key={i}>

            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-600 flex items-center justify-center font-bold">
              {i + 1}
            </div>

            <h3 className="font-semibold mb-2">
              {step}
            </h3>

            <p className="text-gray-400 text-sm">
              Simple and fast process.
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}
