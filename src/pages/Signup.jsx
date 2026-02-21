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

  // ---------------- FORM ----------------
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  // ---------------- HANDLE INPUT ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------- HANDLE SIGNUP ----------------
  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {

        // ✅ Save user session
        sessionStorage.setItem("userId", JSON.stringify(data.id));
        sessionStorage.setItem("userName", JSON.stringify(data.name));
        sessionStorage.setItem("userEmail", JSON.stringify(data.email));


        navigate("/dashboard");

      } else {
        alert(data.detail || "Signup failed");
      }

    } catch (error) {
      console.error(error);
      alert("Backend not running!");
    }
  };

  // ---------------- SOCIAL LOGIN ----------------
  const handleSocialLogin = (provider) => {

    const user = {
      email: `${provider.toLowerCase()}-user@example.com`,
      role: form.role,
      isLoggedIn: true,
      provider,
    };

    sessionStorage.setItem("user", JSON.stringify(user));

    if (form.role === "student") navigate("/dashboard/student");
    if (form.role === "organizer") navigate("/dashboard/organizer");
    if (form.role === "sponsor") navigate("/dashboard/sponsor");
  };

  // ====================================================
  // ======================= UI =========================
  // ====================================================

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background */}
      <ThreeBackground />
      <GlassOverlay />

      {/* Navbar */}
      <Navbar />

      <div className="flex items-center justify-center min-h-screen px-6 pt-20 relative z-20">

        {/* Main Card */}
        <div
          className={`
            w-full max-w-6xl
            bg-[#050505]/80 backdrop-blur-sm
            rounded-2xl overflow-hidden
            shadow-2xl border border-white/10
            grid grid-cols-1 md:grid-cols-2
            transition-all duration-1000 ease-out
            ${
              show
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-95"
            }
          `}
        >

          {/* ================= LEFT FORM ================= */}
          <div className="p-10 flex flex-col justify-center">

            <h1 className="text-3xl font-bold mb-6">
              <span className="text-white">Dev</span>
              <span className="text-purple-400">Sprints</span>
            </h1>

            <h2 className="text-2xl font-semibold mb-2">
              Create Account
            </h2>

            <p className="text-gray-400 mb-8">
              Join the future of hackathons
            </p>

            <form onSubmit={handleSignup} className="space-y-5">

              {/* Name */}
              <div>
                <label className="text-sm text-gray-400 ml-1">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full mt-1 px-5 py-3.5 bg-[#0a0a0a] text-white border border-white/10 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-400 ml-1">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full mt-1 px-5 py-3.5 bg-[#0a0a0a] text-white border border-white/10 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-400 ml-1">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setIsPasswordFocus(true)}
                  onBlur={() => setIsPasswordFocus(false)}
                  placeholder="••••••••"
                  className="w-full mt-1 px-5 py-3.5 bg-[#0a0a0a] text-white border border-white/10 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-sm text-gray-400 ml-1">
                  Register As
                </label>

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full mt-1 px-5 py-3.5 bg-[#0a0a0a] text-white border border-white/10 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                >
                  <option value="student">Student</option>
                  <option value="organizer">Organizer</option>
                  <option value="sponsor">Sponsor</option>
                </select>
              </div>

              {/* Social */}
              <div className="space-y-4 pt-4">

                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/5"></div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Or continue with
                  </span>
                  <div className="h-px flex-1 bg-white/5"></div>
                </div>

                <div className="flex justify-center gap-10">

                  <button
                    type="button"
                    onClick={() => handleSocialLogin("Google")}
                    className="transition-all hover:scale-125"
                  >
                    Google
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin("GitHub")}
                    className="transition-all hover:scale-125"
                  >
                    GitHub
                  </button>

                </div>
              </div>

              {/* Submit */}
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

          {/* ================= RIGHT ROBOT PANEL ================= */}
          <div className="hidden md:flex items-center justify-center relative bg-black/40 overflow-hidden">

            {/* Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.25)_0%,_transparent_65%)]"></div>

            {/* Scan */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(139,92,246,0.08)_50%,transparent_100%)] animate-scan"></div>

            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>

            {/* Rings */}
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
              <div className="w-48 h-48 bg-[#0f0f0f] rounded-3xl border border-purple-500/50 flex items-center justify-center shadow-[0_0_60px_rgba(139,92,246,0.6)]">

                <div className="flex gap-10">

                  <div
                    className={`w-7 h-7 rounded-full ${
                      isPasswordFocus
                        ? "bg-gray-700"
                        : "bg-purple-400 animate-eye shadow-lg"
                    }`}
                  ></div>

                  <div
                    className={`w-7 h-7 rounded-full ${
                      isPasswordFocus
                        ? "bg-gray-700"
                        : "bg-purple-400 animate-eye shadow-lg"
                    }`}
                  ></div>

                </div>
              </div>

              {/* Body */}
              <div className="w-64 h-48 bg-[#0a0a0a] mt-8 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden">

                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(139,92,246,0.2)_0%,transparent_70%)] animate-pulse"></div>

                <div
                  className={`w-20 h-20 rounded-full ${
                    isPasswordFocus
                      ? "bg-purple-600 animate-core shadow-xl"
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