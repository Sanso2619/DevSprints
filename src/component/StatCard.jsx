export default function StatCard({ title, label, percent }) {
  return (
    <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-md p-6 rounded-2xl shadow-lg">
      <h3 className="text-3xl font-bold mb-1 text-purple-200">
        {title}
      </h3>

      <p className="text-gray-400 mb-2">
        {label}
      </p>

      <span className="text-green-400 text-sm">
        {percent}
      </span>

      <div className="mt-4 flex gap-2">
        {[3, 5, 2, 6, 4].map((h, i) => (
          <div
            key={i}
            className="w-4 bg-purple-500/50 rounded"
            style={{ height: `${h * 10}px` }}
          />
        ))}
      </div>
    </div>
  );
}
