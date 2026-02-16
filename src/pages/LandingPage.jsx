import Navbar from "../component/Navbar";
import Hero from "../component/Hero";
import LiveHackathons from "../component/LiveHackathons";
import Features from "../component/Features";
import HowItWorks from "../component/HowItWorks";
import Footer from "../component/Footer";

export default function LandingPage() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">

      <Navbar />

      <Hero />

      <LiveHackathons />

      <Features />

      <HowItWorks />

      <Footer />

    </div>
  );
}
