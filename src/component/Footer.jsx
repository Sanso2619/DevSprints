export default function Footer() {
  return (
    <footer className="relative bg-black text-white pt-24 pb-10 px-6 overflow-hidden">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Dev<span className="text-purple-400">Sprints</span>
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            The smart platform for managing hackathons,
            teams, mentors, and judges in real time.
          </p>
        </div>

        {/* Platform */}
        <div>
          <h3 className="font-semibold mb-4">Platform</h3>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-purple-400 cursor-pointer">Home</li>
            <li className="hover:text-purple-400 cursor-pointer">Features</li>
            <li className="hover:text-purple-400 cursor-pointer">How It Works</li>
            <li className="hover:text-purple-400 cursor-pointer">Hackathons</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-purple-400 cursor-pointer">Help Center</li>
            <li className="hover:text-purple-400 cursor-pointer">
              Terms of Service
            </li>
            <li className="hover:text-purple-400 cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-purple-400 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Stay Updated */}
        <div className="md:col-span-1 flex justify-center md:justify-end">

          <div
            className=""
          >

            <h3 className="text-xl font-semibold mb-2">
              Never Miss a Hackathon
            </h3>

            <p className="text-gray-400 text-sm mb-5">
              Get updates on upcoming events.
            </p>

            <div
              className="flex w-full overflow-hidden rounded-full
                         border border-purple-500/30 bg-black/40"
            >

              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-2.5
                           outline-none text-sm text-white
                           placeholder-gray-400"
              />

              <button
                className="px-8 min-w-[110px] bg-gradient-to-r
                           from-purple-500 to-pink-500
                           text-white text-sm font-medium
                           hover:opacity-90 transition"
              >
                Subscribe
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto mt-16 border-t border-white/10" />

      {/* Bottom Section */}
      <div
        className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row
                   items-center justify-between text-gray-400 text-sm gap-4"
      >

        <p>© 2026 DevSprints. All rights reserved.</p>

        <div className="flex gap-6">
          <a href="#" className="hover:text-purple-400">GitHub</a>
          <a href="#" className="hover:text-purple-400">LinkedIn</a>
        </div>

      </div>

    </footer>
  );
}
