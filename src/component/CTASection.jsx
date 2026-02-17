import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function CTASection() {

  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
        }
      },
      { threshold: 0.6 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black py-10 flex justify-center"
    >
      <div
        className={`transition-all duration-700 ease-out ${
          show
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-6 scale-95"
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-6">

          {/* Primary CTA */}
          <Link
            to="/hackathons"
            className="
              px-8 py-4
              bg-purple-600/80
              text-white
              font-semibold
              rounded-xl
              hover:bg-purple-600
              transition
              shadow-[0_0_20px_rgba(139,92,246,0.4)]
              backdrop-blur
            "
          >
            Explore Hackathons
          </Link>

          {/* Secondary CTA */}
          <Link
            to="/signup"
            className="
              px-8 py-4
              border border-purple-500/50
              text-purple-300
              rounded-xl
              hover:bg-purple-500/10
              hover:text-white
              transition
              backdrop-blur
            "
          >
            Get Started
          </Link>

        </div>
      </div>
    </section>
  );
}
