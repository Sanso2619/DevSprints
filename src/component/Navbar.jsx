export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-purple-400">
          DevSprints
        </h1>

        {/* Links */}
        <ul className="hidden md:flex gap-8 text-gray-300">
          <li className="hover:text-purple-400 cursor-pointer">Home</li>
          <li className="hover:text-purple-400 cursor-pointer">Features</li>
          <li className="hover:text-purple-400 cursor-pointer">How It Works</li>
          <li className="hover:text-purple-400 cursor-pointer">Contact</li>
        </ul>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="text-gray-300 hover:text-white">
            Sign In
          </button>

          <button className="px-4 py-2 bg-purple-500 text-black rounded-lg font-semibold hover:bg-purple-400">
            Sign Up
          </button>
        </div>

      </div>
    </nav>
  );
}
