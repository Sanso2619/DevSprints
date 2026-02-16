import { useEffect, useState } from "react";

export default function StatsCounter({ title, end }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += Math.ceil(end / 50);

      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [end]);

  return (
    <div className="text-center">

      <h2 className="text-5xl font-bold text-white">
        {count}+
      </h2>

      <p className="text-gray-400 mt-2">
        {title}
      </p>

    </div>
  );
}
