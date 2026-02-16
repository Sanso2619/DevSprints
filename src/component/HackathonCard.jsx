export default function HackathonCard({
  image,
  title,
  mode,
  price,
  location,
}) {
    // Registration deadline
    const deadline = new Date("2026-02-28"); // Change date anytime
    const today = new Date();

    // Calculate days left
    const daysLeft = Math.max(
    0,
    Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
);

  return (
    <div
      className="
        group relative w-[300px]
        rounded-3xl overflow-hidden
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-xl
        transition-all duration-500
        hover:scale-[1.04]
        hover:border-purple-500/40
      "
    >
      {/* IMAGE */}
      <div className="relative h-[220px] w-full overflow-hidden">

        <img
          src={image}
          alt={title}
          className="
            w-full h-full object-cover
            brightness-75 contrast-110
            transition-all duration-700
            group-hover:scale-110
          "
        />

        {/* Purple Overlay */}
        <div className="
          absolute inset-0
          bg-gradient-to-t
          from-black/90 via-purple-900/40 to-transparent
        " />
      </div>

      {/* CONTENT */}
      <div className="relative p-6 text-white">

        <h3 className="text-xl font-semibold mb-1">
          {title}
        </h3>

        <p className="text-sm text-gray-400 mb-4">
          {mode}
        </p>

        <div className="flex justify-between items-center mb-5 text-sm">


        <p className={`font-semibold flex items-center gap-1 ${
                daysLeft <= 3 ? "text-red-400" : "text-pink-400"
        }`}
        >
          <span className="text-white">{daysLeft} Days Left</span>
        </p>



          <span className="text-gray-400">
            {location}
          </span>

        </div>

        {/* SIGNUP MATCH BUTTON */}
        <button
          className="
            w-full py-2.5 rounded-xl
            bg-gradient-to-r from-purple-500 to-purple-700
            text-white font-semibold
            transition-all duration-300
            hover:shadow-lg hover:shadow-purple-500/40
            hover:scale-[1.02]
          "
        >
          Join Hackathon
        </button>

      </div>

      {/* Subtle Glow */}
      <div className="
        absolute inset-0 rounded-3xl
        opacity-0 group-hover:opacity-100
        transition duration-500
        bg-gradient-to-r
        from-purple-500/10 via-purple-400/5 to-transparent
        pointer-events-none
      " />
    </div>
  );
}
