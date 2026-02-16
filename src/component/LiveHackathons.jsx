import HackathonCard from "./HackathonCard";

export default function LiveHackathons() {
  const hackathons = [
    {
      id: 1,
      title: "Web3 Build India",
      mode: "Online • PAN India",
      price: 1200,
      location: "Virtual",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692",
    },
    {
      id: 2,
      title: "AI Bharat Challenge",
      mode: "Hybrid • 48 Hours",
      price: 1800,
      location: "Bangalore",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
    {
      id: 3,
      title: "Startup CodeSprint",
      mode: "Offline • Team",
      price: 2000,
      location: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    },
  ];

  return (
    <section className="py-28 bg-black relative overflow-hidden">

      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.12),transparent_60%)]" />

      <div className="relative text-center mb-20">

        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Live Hackathons 
        </h2>

        <p className="text-gray-400 max-w-xl mx-auto">
          Build real projects. Compete nationally. Win big.
        </p>

      </div>

      <div className="relative flex flex-wrap justify-center gap-20 px-6">

        {hackathons.map((hack) => (
          <HackathonCard
            key={hack.id}
            image={hack.image}
            title={hack.title}
            mode={hack.mode}
            price={hack.price}
            location={hack.location}
          />
        ))}

      </div>

    </section>
  );
}
