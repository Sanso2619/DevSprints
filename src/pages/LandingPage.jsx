import { useRef } from "react";
import Navbar from "../component/Navbar";

import Hero from "../component/Hero";
import LiveHackathons from "../component/LiveHackathons";
import Features from "../component/Features";
import HowItWorks from "../component/HowItWorks";
import Footer from "../component/Footer";

export default function LandingPage() {

  // Refs for sections
  const homeRef = useRef(null);
  const hackathonsRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div className="bg-black text-white min-h-screen">

      {/* Navbar gets refs */}
      <Navbar
        homeRef={homeRef}
        hackathonsRef={hackathonsRef}
        featuresRef={featuresRef}
        howItWorksRef={howItWorksRef}
        contactRef={contactRef}
      />

      {/* Sections */}

      <section ref={homeRef}>
        <Hero />
      </section>

      <section ref={hackathonsRef}>
        <LiveHackathons />
      </section>

      <section ref={featuresRef}>
        <Features />
      </section>

      <section ref={howItWorksRef}>
        <HowItWorks />
      </section>

      <section ref={contactRef}>
        <Footer />
      </section>

    </div>
  );
}
