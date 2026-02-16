export default function GlassOverlay() {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">

      {/* Main Purple Glow */}
      <div className="absolute top-20 left-24 w-[450px] h-[450px] bg-purple-500/25 rounded-full blur-[200px] animate-float"></div>

      {/* Soft Blue Glow */}
      <div className="absolute bottom-32 right-32 w-[420px] h-[420px] bg-blue-500/20 rounded-full blur-[200px] animate-float delay-2000"></div>

      {/* White Highlight */}
      <div className="absolute top-1/3 right-24 w-[300px] h-[300px] bg-white/10 rounded-full blur-[160px] animate-float delay-4000"></div>

      {/* Center Fog */}
      <div className="absolute top-1/2 left-1/2 w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 bg-indigo-400/10 rounded-full blur-[240px] animate-float delay-3000"></div>

    </div>
  );
}
