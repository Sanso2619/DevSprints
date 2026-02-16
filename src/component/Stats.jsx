import { useEffect, useRef, useState } from "react";

function Counter({ end, label, delay }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Detect when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate count
  useEffect(() => {
    if (!visible) return;

    let start = 0;
    const duration = 1500;
    const step = Math.ceil(end / (duration / 16));

    const timer = setInterval(() => {
      start += step;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [visible, end]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={`transition-all duration-1000 transform
      ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      <h2 className="text-5xl font-bold text-white">
        {count}+
      </h2>

      <p className="text-gray-400 mt-2">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-8 text-center">

      <Counter end={500} label="Teams" delay={0} />
      <Counter end={50} label="Hackathons" delay={0.2} />
      <Counter end={120} label="Judges" delay={0.4} />

    </div>
  );
}
