import StatsCounter from "./StatsCounter";
import GridBackground from "./GlassOverlay";
import ThreeBackground from "./ThreeBackground";
import GlassOverlay from "./GlassOverlay";

export default function Hero() {
  return (
    <section
      className="
        relative min-h-screen
        flex flex-col justify-center items-center
        text-center
        px-6
        overflow-hidden
        bg-black
        pt-32 pb-32
      "
    >

      {/* Background */}
      <ThreeBackground />
      <GlassOverlay />

      {/* Content */}
      <div className="relative z-20 max-w-5xl w-full">

        <h1 className="text-7xl md:text-9xl font-extrabold text-white mb-10">
          Dev<span className="text-purple-400">Sprints</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-32 leading-relaxed">
          The smart platform for managing hackathons,
          teams, mentors, and judges in real time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-24 gap-y-12 mt-10">


          <StatsCounter title="Teams" end={500} />
          <StatsCounter title="Hackathons" end={50} />
          <StatsCounter title="Judges" end={120} />

        </div>

      </div>
    </section>
  );
}
