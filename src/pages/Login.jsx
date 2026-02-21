import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // React Router navigation
  const navigate = useNavigate();

  // ---------------- STATE ----------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---------------- LOGIN FUNCTION ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      // 1. Check if the response is successful (status 200-299)
      // 2. Check if data exists (since your backend doesn't send a "success" key)
      if (res.ok && data.id) {
        // ✅ Store data using the keys from your JSON response
        sessionStorage.setItem("userId", data.id);
        sessionStorage.setItem("userName", data.name);
        sessionStorage.setItem("userEmail", data.email);
        sessionStorage.setItem("userLevel", data.level); // Extra: storing the level

        navigate("/dashboard");
      } else if (res.UNAUTHORIZED) {
        // Fallback for failed login
        alert(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Cannot connect to server");
    }

    setLoading(false);
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      {/* Main Card */}
      <div className="w-full max-w-6xl bg-[#050505] rounded-2xl overflow-hidden shadow-2xl border border-white/10 grid grid-cols-1 md:grid-cols-2">
        {/* LEFT - FORM */}
        <div className="p-10 flex flex-col justify-center">
          {/* Logo */}
          <h1 className="text-3xl font-bold mb-6">
            <span className="text-white">Dev</span>
            <span className="text-purple-400">Sprints</span>
          </h1>

          <h2 className="text-2xl font-semibold mb-2 text-white">
            Welcome Back
          </h2>

          <p className="text-gray-400 mb-8">Login to continue your journey</p>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white placeholder-gray-500 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-400">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocus(true)}
                onBlur={() => setIsPasswordFocus(false)}
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white placeholder-gray-500 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="text-sm text-gray-400">Login As</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="student">Student</option>
                <option value="organizer">Organizer</option>
                <option value="sponsor">Sponsor</option>
              </select>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-500 text-black font-semibold rounded-lg hover:bg-purple-400 transition shadow-[0_0_20px_rgba(139,92,246,0.6)] disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-gray-400 mt-6 text-sm text-center">
            New here?{" "}
            <a href="/signup" className="text-purple-400 hover:underline">
              Create account
            </a>
          </p>
        </div>

        {/* RIGHT - FUTURISTIC PANEL */}
        <div className="hidden md:flex items-center justify-center relative bg-black overflow-hidden">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.15)_0%,_transparent_70%)]"></div>

          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

          {/* Hologram Ring */}
          <div className="absolute w-80 h-80 border border-purple-500/40 rounded-full animate-spin-slow"></div>

          {/* Robot Core */}
          <div
            className={
              "relative transition-all duration-500 " +
              (isPasswordFocus ? "scale-105 rotate-6" : "rotate-0")
            }
          >
            {/* Head */}
            <div className="w-44 h-44 bg-[#0f0f0f] rounded-2xl border border-purple-500/40 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.4)]">
              {/* Eyes */}
              <div className="flex gap-8">
                <div
                  className={
                    "w-6 h-6 rounded-full transition-all duration-300 " +
                    (isPasswordFocus
                      ? "bg-gray-600"
                      : "bg-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.8)]")
                  }
                ></div>
                <div
                  className={
                    "w-6 h-6 rounded-full transition-all duration-300 " +
                    (isPasswordFocus
                      ? "bg-gray-600"
                      : "bg-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.8)]")
                  }
                ></div>
              </div>
            </div>

            {/* Energy Core */}
            <div className="w-56 h-44 bg-[#0a0a0a] mt-6 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div
                className={
                  "w-16 h-16 rounded-full transition-all duration-500 " +
                  (isPasswordFocus
                    ? "bg-purple-500 animate-pulse shadow-[0_0_40px_rgba(139,92,246,0.9)]"
                    : "bg-gray-700")
                }
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
