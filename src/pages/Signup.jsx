import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // For now just redirect to login
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-6xl bg-[#050505] rounded-2xl overflow-hidden shadow-2xl border border-white/10 grid grid-cols-1 md:grid-cols-2">

        {/* LEFT - FORM */}
        <div className="p-10 flex flex-col justify-center">

          <h1 className="text-3xl font-bold mb-6">
            <span className="text-white">Dev</span>
            <span className="text-purple-400">Sprints</span>
          </h1>

          <h2 className="text-2xl font-semibold mb-2 text-white">
            Create Account 
          </h2>

          <p className="text-gray-400 mb-8">
            Join the future of hackathons
          </p>

          <form onSubmit={handleSignup} className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-400">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white placeholder-gray-500 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white placeholder-gray-500 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-400">Password</label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                onFocus={() => setIsPasswordFocus(true)}
                onBlur={() => setIsPasswordFocus(false)}
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white placeholder-gray-500 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="text-sm text-gray-400">Register As</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="student">Student</option>
                <option value="organizer">Organizer</option>
                <option value="sponsor">Sponsor</option>
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-purple-500 text-black font-semibold rounded-lg hover:bg-purple-400 transition shadow-[0_0_20px_rgba(139,92,246,0.6)]"
            >
              Sign Up
            </button>

          </form>

          <p className="text-gray-400 mt-6 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:underline">
              Sign In
            </Link>
          </p>

        </div>

        {/* RIGHT - ULTRA FUTURISTIC PANEL */}
        <div className="hidden md:flex items-center justify-center relative bg-black overflow-hidden">

          {/* Nebula Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.25)_0%,_transparent_65%)]"></div>

          {/* Moving Scan Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(139,92,246,0.08)_50%,transparent_100%)] animate-scan"></div>

          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>

          {/* Rotating Rings */}
          <div className="absolute w-[380px] h-[380px] border border-purple-500/30 rounded-full animate-spin-slow"></div>
          <div className="absolute w-[300px] h-[300px] border border-purple-500/20 rounded-full animate-spin-reverse"></div>

          {/* AI Core */}
          <div
            className={`relative transition-all duration-700 ${
              isPasswordFocus
                ? "scale-110 rotate-12"
                : "scale-100 rotate-0"
            }`}
          >

            {/* Head */}
            <div className="w-48 h-48 bg-[#0f0f0f] rounded-3xl border border-purple-500/50 flex items-center justify-center shadow-[0_0_60px_rgba(139,92,246,0.6)] backdrop-blur">

              <div className="flex gap-10">

                <div
                  className={`w-7 h-7 rounded-full transition-all duration-300 ${
                    isPasswordFocus
                      ? "bg-gray-700"
                      : "bg-purple-400 shadow-[0_0_25px_rgba(139,92,246,1)] animate-eye"
                  }`}
                ></div>

                <div
                  className={`w-7 h-7 rounded-full transition-all duration-300 ${
                    isPasswordFocus
                      ? "bg-gray-700"
                      : "bg-purple-400 shadow-[0_0_25px_rgba(139,92,246,1)] animate-eye"
                  }`}
                ></div>

              </div>
            </div>

            {/* Energy Body */}
            <div className="w-64 h-48 bg-[#0a0a0a] mt-8 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden">

              <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(139,92,246,0.2)_0%,transparent_70%)] animate-pulse"></div>

              <div
                className={`w-20 h-20 rounded-full transition-all duration-500 ${
                  isPasswordFocus
                    ? "bg-purple-600 shadow-[0_0_50px_rgba(139,92,246,1)] animate-core"
                    : "bg-gray-700"
                }`}
              ></div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
