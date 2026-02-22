import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import ThreeBackground from "../component/ThreeBackground";
import GlassOverlay from "../component/GlassOverlay";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {

    // ✅ FIX: Use sessionStorage instead of localStorage
    const storedUser = JSON.parse(sessionStorage.getItem("devsprintsUser"));

    if (!storedUser || !storedUser.isLoggedIn) {
      navigate("/login");
    } else {
      setUser(storedUser);
      setShow(true);
    }
  }, [navigate]);

  const handleSave = (e) => {
    e.preventDefault();

    // ✅ FIX: Save to sessionStorage
    sessionStorage.setItem("devsprintsUser", JSON.stringify(user));

    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Background Elements */}
      <ThreeBackground />
      <GlassOverlay />
      
      {/* Navbar */}
      <Navbar />

      <div className="flex items-center justify-center min-h-screen px-6 pt-28 pb-12 relative z-20">
        
        {/* Profile Card */}
        <div 
          className={`
            w-full max-w-4xl 
            bg-[#050505]/80 backdrop-blur-xl 
            rounded-3xl overflow-hidden 
            shadow-[0_0_50px_rgba(139,92,246,0.15)] border border-white/10 
            transition-all duration-1000 ease-out
            ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}
          `}
        >

          {/* Header */}
          <div className="h-32 bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-purple-900/40 relative">
            <div className="absolute -bottom-16 left-10">
              <div className="w-32 h-32 rounded-2xl bg-[#0a0a0a] border-4 border-[#050505] shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-20 px-10 pb-10">

            <div className="flex justify-between items-start mb-10">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                  {user.name || "User Profile"}
                </h1>
                <p className="text-purple-400 font-medium uppercase text-xs tracking-[0.2em]">
                  {user.role} Member
                </p>
              </div>
              
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-2.5 rounded-xl border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all text-sm font-semibold"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Account Info */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">
                  Account Details
                </h3>
                
                <div className="space-y-4">

                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-gray-500 cursor-not-allowed text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block ml-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={user.name || ""}
                      onChange={(e) => setUser({...user, name: e.target.value})}
                      placeholder="Enter your name"
                      className={`w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-white text-sm focus:outline-none transition-all ${
                        isEditing ? "focus:border-purple-500 hover:scale-[1.01]" : "opacity-70"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block ml-1">
                      Platform Role
                    </label>
                    <div className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-purple-400/70 text-sm capitalize">
                      {user.role}
                    </div>
                  </div>
                  <div>
  <label className="text-xs text-gray-400 mb-1.5 block ml-1">
    Team Name
  </label>
  <input
    type="text"
    disabled={!isEditing}
    value={user.teamName || "CodeStorm"}
    onChange={(e) => setUser({ ...user, teamName: e.target.value })}
    className={`w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-white text-sm focus:outline-none transition-all ${
      isEditing ? "focus:border-purple-500 hover:scale-[1.01]" : "opacity-70"
    }`}
  />
</div>

<div>
  <label className="text-xs text-gray-400 mb-1.5 block ml-1">
    Team ID
  </label>
  <input
    type="text"
    disabled
    value={user.teamId || "TEAM-1024"}
    className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-purple-400/70 text-sm cursor-not-allowed"
  />
</div>

                </div>
              </div>

              {/* Activity */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">
                  Activity Overview
                </h3>
                
                <div className="grid grid-cols-2 gap-4">

                  <div className="p-5 bg-black/40 border border-white/5 rounded-2xl hover:border-purple-500/20 transition group">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 group-hover:text-purple-400 transition">
                      Hackathons
                    </p>
                    <p className="text-2xl font-bold">12</p>
                  </div>

                  <div className="p-5 bg-black/40 border border-white/5 rounded-2xl hover:border-blue-500/20 transition group">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 group-hover:text-blue-400 transition">
                      Projects
                    </p>
                    <p className="text-2xl font-bold">08</p>
                  </div>

                  <div className="p-5 bg-black/40 border border-white/5 rounded-2xl hover:border-pink-500/20 transition group">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 group-hover:text-pink-400 transition">
                      Rank
                    </p>
                    <p className="text-2xl font-bold">Top 5%</p>
                  </div>

                  <div className="p-5 bg-black/40 border border-white/5 rounded-2xl hover:border-green-500/20 transition group">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 group-hover:text-green-400 transition">
                      Skills
                    </p>
                    <p className="text-2xl font-bold">React, 3JS</p>
                  </div>

                </div>

                <div className="pt-4">
                  <p className="text-xs text-gray-500 leading-relaxed italic">
                    Member since March 2026. Your activity is tracked to provide better recommendations.
                  </p>
                </div>
              </div>

              {isEditing && (
                <div className="md:col-span-2 pt-6 flex justify-end">
                  <button
                    type="submit"
                    className="px-10 py-3.5 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                  >
                    Save Profile Changes
                  </button>
                </div>
              )}

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}