import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrganizerDashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("devsprintsUser"));

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {

    if (!user || user.role !== "organizer") {
      navigate("/login");
    }

    const data =
      JSON.parse(
        localStorage.getItem("devsprintsSubmissions")
      ) || [];

    setSubmissions(data);

  }, [navigate, user]);

  /* Metrics */
  const totalSubmissions = submissions.length;
  const participants = new Set(submissions.map(s => s.user)).size;
  const activeEvents = new Set(submissions.map(s => s.hackathonId)).size;

  /* Logout */
  const handleLogout = () => {
    localStorage.removeItem("devsprintsUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a1a] to-black text-white flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-black/80 backdrop-blur border-r border-white/10 hidden md:flex flex-col">

        <div className="p-6 text-xl font-bold border-b border-white/10">
          Dev<span className="text-purple-400">Sprints</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 text-gray-400">

          {[
            "Dashboard",
            "Hackathons",
            "Submissions",
            "Participants",
            "Judges",
            "Analytics",
            "Settings"
          ].map((item) => (

            <div
              key={item}
              className="px-4 py-2 rounded-lg hover:bg-purple-500/10 hover:text-purple-300 transition cursor-pointer"
            >
              {item}
            </div>

          ))}

        </nav>

        {/* EXIT */}
        <div className="p-4 border-t border-white/10">

          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
          >
            Exit Panel
          </button>

        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8 relative overflow-y-auto">

        {/* GLOW */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.15)_0%,_transparent_60%)]"></div>

        <div className="relative z-10">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-10">

            <div>
              <h1 className="text-3xl font-semibold">
                Organizer Dashboard
              </h1>

              <p className="text-gray-400 text-sm mt-1">
                Event monitoring and management
              </p>
            </div>

            <div className="flex gap-4 items-center">

              <input
                placeholder="Search..."
                className="px-4 py-2 bg-black/60 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-purple-500"
              />

              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center font-semibold">
                O
              </div>

            </div>

          </div>

          {/* METRICS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

            <MetricCard
              title="Total Submissions"
              value={totalSubmissions}
              color="purple"
            />

            <MetricCard
              title="Participants"
              value={participants}
              color="blue"
            />

            <MetricCard
              title="Active Hackathons"
              value={activeEvents}
              color="green"
            />

            <MetricCard
              title="Completion Rate"
              value="87%"
              color="pink"
            />

          </div>

          {/* ANALYTICS */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">

            {/* PARTICIPATION */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">

              <h2 className="text-lg font-semibold mb-6">
                Participation Overview
              </h2>

              <div className="space-y-4">

                <OverviewItem label="Registered Users" value={participants} />
                <OverviewItem label="Submitted Projects" value={totalSubmissions} />
                <OverviewItem label="Active Hackathons" value={activeEvents} />
                <OverviewItem label="Pending Reviews" value={Math.max(0, totalSubmissions - 2)} />

              </div>

            </div>

            {/* PROGRESS */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">

              <h2 className="text-lg font-semibold mb-6">
                Submission Progress
              </h2>

              <div className="space-y-5">

                <Progress label="AI Innovators" value={80} />
                <Progress label="Web3 Sprint" value={65} />
                <Progress label="FinTech Buildathon" value={90} />

              </div>

            </div>

          </div>

          {/* RECENT SUBMISSIONS */}
          <div className="bg-black/70 backdrop-blur border border-white/10 rounded-xl shadow-xl overflow-hidden">

            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">

              <h2 className="text-lg font-semibold">
                Recent Submissions
              </h2>

              <span className="text-sm text-gray-400">
                {submissions.length} records
              </span>

            </div>

            {submissions.length === 0 ? (

              <div className="p-10 text-center text-gray-500">
                No submissions yet
              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full text-sm">

                  <thead className="text-gray-400 border-b border-white/10">

                    <tr>
                      <th className="px-6 py-4 text-left">Student</th>
                      <th className="px-6 py-4 text-left">Hackathon</th>
                      <th className="px-6 py-4 text-left">Project</th>
                      <th className="px-6 py-4 text-left">GitHub</th>
                      <th className="px-6 py-4 text-left">Demo</th>
                      <th className="px-6 py-4 text-left">Status</th>
                    </tr>

                  </thead>

                  <tbody>

                    {submissions.map((item, i) => (

                      <tr
                        key={i}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >

                        <td className="px-6 py-4">
                          {item.user}
                        </td>

                        <td className="px-6 py-4">
                          #{item.hackathonId}
                        </td>

                        <td className="px-6 py-4 font-medium">
                          {item.title}
                        </td>

                        <td className="px-6 py-4">
                          <a
                            href={item.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-purple-400 hover:underline"
                          >
                            View
                          </a>
                        </td>

                        <td className="px-6 py-4">
                          <a
                            href={item.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="text-purple-400 hover:underline"
                          >
                            View
                          </a>
                        </td>

                        <td className="px-6 py-4 text-green-400">
                          Approved
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function MetricCard({ title, value, color }) {

  const colors = {
    purple: "from-purple-600/40 to-purple-900/10",
    blue: "from-blue-600/40 to-blue-900/10",
    green: "from-emerald-600/40 to-emerald-900/10",
    pink: "from-pink-600/40 to-pink-900/10"
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} backdrop-blur border border-white/10 rounded-xl p-5 shadow-lg`}>

      <p className="text-sm text-gray-400 mb-1">
        {title}
      </p>

      <h3 className="text-3xl font-bold">
        {value}
      </h3>

    </div>
  );
}

function Progress({ label, value }) {
  return (
    <div>

      <div className="flex justify-between text-sm mb-1">

        <span className="text-gray-400">
          {label}
        </span>

        <span className="text-purple-400">
          {value}%
        </span>

      </div>

      <div className="h-2 bg-black/40 rounded-full overflow-hidden">

        <div
          style={{ width: `${value}%` }}
          className="h-full bg-purple-500 rounded-full transition-all"
        ></div>

      </div>

    </div>
  );
}

function OverviewItem({ label, value }) {
  return (
    <div className="flex justify-between items-center bg-black/40 border border-white/5 rounded-lg px-4 py-3">

      <span className="text-gray-400 text-sm">
        {label}
      </span>

      <span className="text-lg font-semibold text-purple-400">
        {value}
      </span>

    </div>
  );
}
