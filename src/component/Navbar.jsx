import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function Navbar({
  homeRef,
  hackathonsRef,
  featuresRef,
  howItWorksRef,
  contactRef
}) {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("devsprintsUser")
    );
    setUser(storedUser);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("devsprintsUser");
    setUser(null);
    setShowDropdown(false);
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    if (user.role === "student") return "/dashboard/student";
    if (user.role === "organizer") return "/dashboard/organizer";
    if (user.role === "sponsor") return "/dashboard/sponsor";
    return "/";
  };

  return (
    
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => scrollToSection(homeRef)}
          className="text-2xl font-bold"
        >
          <span className="text-white">Dev</span>
          <span className="text-purple-400">Sprints</span>
        </button>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">

          <button
            onClick={() => scrollToSection(homeRef)}
            className="hover:text-purple-400 transition"
          >
            Home
          </button>

          <Link
            to="/hackathons"
            className="hover:text-purple-400 transition"
          >
            Hackathons
          </Link>

          <button
            onClick={() => scrollToSection(featuresRef)}
            className="hover:text-purple-400 transition"
          >
            Features
          </button>

          <button
            onClick={() => scrollToSection(howItWorksRef)}
            className="hover:text-purple-400 transition"
          >
            How It Works
          </button>

          <button
            onClick={() => scrollToSection(contactRef)}
            className="hover:text-purple-400 transition"
          >
            Contact
          </button>

        </div>

      {/* Auth Buttons / Profile */}
      <div className="flex gap-4 items-center relative">

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center hover:bg-purple-500/30 transition text-purple-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl py-2 z-50 overflow-hidden backdrop-blur-xl">
                <div className="px-4 py-2 border-b border-white/5 mb-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Account</p>
                  <p className="text-sm text-white truncate font-medium">{user.email}</p>
                </div>
                
                <Link
                  to={getDashboardLink()}
                  onClick={() => setShowDropdown(false)}
                  className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition"
                >
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setShowDropdown(false)}
                  className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition"
                >
                  My Profile
                </Link>

                <div className="h-px bg-white/5 my-1"></div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/5 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (

          <>
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="
                px-4 py-2
                bg-purple-500
                text-black
                rounded-lg
                font-semibold
                hover:bg-purple-400
                transition
              "
            >
              Sign Up
            </Link>
          </>
        )}

      </div>



      </div>
    </nav>
  );
}
