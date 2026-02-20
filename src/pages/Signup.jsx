import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import ThreeBackground from "../component/ThreeBackground";
import GlassOverlay from "../component/GlassOverlay";

export default function Signup() {
  const navigate = useNavigate();

  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

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

  const handleSocialLogin = (provider) => {
    // Mock social login/signup
    const user = {
      email: `${provider.toLowerCase()}-user@example.com`,
      role: form.role,
      isLoggedIn: true,
      provider: provider
    };

    localStorage.setItem("devsprintsUser", JSON.stringify(user));

    // Redirect based on role
    if (form.role === "student") navigate("/dashboard/student");
    if (form.role === "organizer") navigate("/dashboard/organizer");
    if (form.role === "sponsor") navigate("/dashboard/sponsor");
  };


  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Background elements */}
      <ThreeBackground />
      <GlassOverlay />
      
      {/* Navbar */}
      <Navbar />

      <div className="flex items-center justify-center min-h-screen px-6 pt-20 relative z-20">

        {/* Main Card with Entry Transition */}
        <div 
          className={`
            w-full max-w-6xl 
            bg-[#050505]/80 backdrop-blur-sm 
            rounded-2xl overflow-hidden 
            shadow-2xl border border-white/10 
            grid grid-cols-1 md:grid-cols-2
            transition-all duration-1000 ease-out
            ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}
          `}
        >

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
                <label className="text-sm text-gray-400 ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full mt-1 px-5 py-3.5 bg-[#0a0a0a] text-white placeholder-gray-500 border border-white/10 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-400 ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full mt-1 px-5 py-3.5 bg-[#0a0a0a] text-white placeholder-gray-500 border border-white/10 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02]"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-400 ml-1">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setIsPasswordFocus(true)}
                  onBlur={() => setIsPasswordFocus(false)}
                  placeholder="••••••••"
                  className="w-full mt-1 px-5 py-3.5 bg-[#0a0a0a] text-white placeholder-gray-500 border border-white/10 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02]"
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-sm text-gray-400 ml-1">Register As</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full mt-1 px-5 py-3.5 bg-[#0a0a0a] text-white border border-white/10 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02]"
                >
                  <option value="student">Student</option>
                  <option value="organizer">Organizer</option>
                  <option value="sponsor">Sponsor</option>
                </select>
              </div>

              {/* Social Login */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/5"></div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Or continue with</span>
                  <div className="h-px flex-1 bg-white/5"></div>
                </div>

                <div className="flex justify-center gap-10">
                  {/* Google */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("Google")}
                    className="transition-all duration-300 transform hover:scale-125 group"
                    title="Sign up with Google"
                  >
                                      <svg className="w-10 h-10 transition-all group-hover:drop-shadow-[0_0_15px_rgba(66,133,244,0.5)]" viewBox="0 0 48 48">
                                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"/>
                                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                                      </svg>
                    
                  </button>

                  {/* GitHub */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("GitHub")}
                    className="transition-all duration-300 transform hover:scale-125 group"
                    title="Sign up with GitHub"
                  >
                    <svg className="w-8 h-8 text-white transition-all group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  </button>
                </div>
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
          <div className="hidden md:flex items-center justify-center relative bg-black/40 overflow-hidden">

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

    </div>
  );
}
