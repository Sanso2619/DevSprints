import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  // Login using FETCH
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    console.log("Sending Login Request...");
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Check if server sent JSON
      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Server did not return JSON");
      }

      console.log("Server Status:", res.status);
      console.log("Server Response:", data);

      // If backend error
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save user
      localStorage.setItem(
        "devsprintsUser",
        JSON.stringify({
          ...data,
          role,
          isLoggedIn: true,
        })
      );

      // Redirect
      if (role === "student") navigate("/dashboard/student");
      if (role === "organizer") navigate("/dashboard/organizer");
      if (role === "sponsor") navigate("/dashboard/sponsor");

    } catch (error) {
      console.error("Login Error:", error);
      alert("Login Failed: " + error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-6xl bg-[#050505] rounded-2xl overflow-hidden shadow-2xl border border-white/10 grid grid-cols-1 md:grid-cols-2">

        {/* LEFT */}
        <div className="p-10 flex flex-col justify-center">

          <h1 className="text-3xl font-bold mb-6">
            <span className="text-white">Dev</span>
            <span className="text-purple-400">Sprints</span>
          </h1>

          <h2 className="text-2xl font-semibold mb-2 text-white">
            Welcome Back
          </h2>

          <p className="text-gray-400 mb-8">
            Login to continue your journey
          </p>

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
                className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
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
                className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="text-sm text-gray-400">Login As</label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
              >
                <option value="student">Student</option>
                <option value="organizer">Organizer</option>
                <option value="sponsor">Sponsor</option>
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-500 text-black font-semibold rounded-lg hover:bg-purple-400 disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center justify-center bg-black"></div>

      </div>

    </div>
  );
}