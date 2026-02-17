import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar({
  homeRef,
  hackathonsRef,
  featuresRef,
  howItWorksRef,
  contactRef
}) {

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };
    const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("devsprintsUser")
    );
    setUser(storedUser);
  }, []);

const navigate = useNavigate();
 
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

          <button
            onClick={() => scrollToSection(hackathonsRef)}
            className="hover:text-purple-400 transition"
          >
            Hackathons
          </button>

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

      {/* Auth Buttons */}
      <div className="flex gap-4 items-center">

        {user ? (

          <button
            onClick={() => {
              localStorage.removeItem("devsprintsUser");
              setUser(null);
              window.location.href = "/";
            }}
            className="text-gray-300 hover:text-red-400 transition"
          >
            Logout
          </button>

        ) : (

          <>
            <a
              href="/login"
              className="text-gray-300 hover:text-white transition"
            >
              Sign In
            </a>

            <a
              href="/signup"
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
            </a>
          </>
        )}

      </div>



      </div>
    </nav>
  );
}
