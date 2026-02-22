import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";

export default function OrganizerDashboard() {

  const navigate = useNavigate();

  // ✅ FIX: Use sessionStorage instead of localStorage
  const user = JSON.parse(sessionStorage.getItem("devsprintsUser"));

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "organizer") {
      navigate("/login");
    }

    // ✅ FIX: Use sessionStorage for submissions (optional but consistent)
    const data =
      JSON.parse(
        sessionStorage.getItem("devsprintsSubmissions")
      ) || [];

    setSubmissions(data);

  }, [navigate, user]);

  /* Metrics */
  const totalSubmissions = submissions.length;
  const participants = new Set(submissions.map(s => s.user)).size;
  const activeEvents = new Set(submissions.map(s => s.hackathonId)).size;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col relative overflow-hidden min-h-screen">
        
        {/* Navbar for Profile on Top Right */}
        <Navbar />

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 p-8 md:p-12 pt-32 relative z-10 overflow-y-auto">
          
          {/* Soft Background Glow */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.15)_0%,_transparent_60%)]"></div>

          <div className="relative z-10">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">
                  Organizer Dashboard
                </h1>
                <p className="text-gray-400 text-lg mt-2 font-medium">
                  Managing <span className="text-purple-400">{activeEvents}</span> active hackathons
                </p>
              </div>

              <div className="flex gap-4">
                <input
                  placeholder="Search submissions..."
                  className="px-6 py-3 bg-[#0a0a0a]/80 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-purple-500 w-64 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                title="Active Events"
                value={activeEvents}
                color="green"
              />
              <MetricCard
                title="Avg. Score"
                value="8.4"
                color="pink"
              />
            </div>

            {/* ANALYTICS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-xl font-bold mb-8 flex items-center">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full mr-3"></span>
                  Participation Overview
                </h2>
                <div className="space-y-4">
                  <OverviewItem label="Registered Users" value={participants} />
                  <OverviewItem label="Submitted Projects" value={totalSubmissions} />
                  <OverviewItem label="Active Hackathons" value={activeEvents} />
                  <OverviewItem label="Pending Reviews" value={Math.max(0, totalSubmissions - 2)} />
                </div>
              </div>

              <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-xl font-bold mb-8 flex items-center">
                  <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></span>
                  Submission Progress
                </h2>
                <div className="space-y-6">
                  <Progress label="AI Innovators" value={80} />
                  <Progress label="Web3 Sprint" value={65} />
                  <Progress label="FinTech Buildathon" value={90} />
                </div>
              </div>
            </div>

            {/* RECENT SUBMISSIONS */}
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden">
              <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h2 className="text-xl font-bold tracking-tight">
                  Recent Submissions
                </h2>
                <span className="px-4 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-bold uppercase tracking-widest">
                  {submissions.length} Records
                </span>
              </div>

              {submissions.length === 0 ? (
                <div className="p-20 text-center text-gray-500 font-medium">
                  No submissions recorded yet for the current events.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-gray-500 border-b border-white/5 bg-black/20">
                      <tr>
                        <th className="px-8 py-5 text-left font-bold uppercase tracking-wider text-[10px]">Student</th>
                        <th className="px-8 py-5 text-left font-bold uppercase tracking-wider text-[10px]">Hackathon</th>
                        <th className="px-8 py-5 text-left font-bold uppercase tracking-wider text-[10px]">Project</th>
                        <th className="px-8 py-5 text-left font-bold uppercase tracking-wider text-[10px]">Links</th>
                        <th className="px-8 py-5 text-left font-bold uppercase tracking-wider text-[10px]">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {submissions.map((item, i) => (
                        <tr key={i} className="group hover:bg-white/5 transition-all">
                          <td className="px-8 py-6 font-medium text-white">{item.user}</td>
                          <td className="px-8 py-6 text-gray-400">#{item.hackathonId}</td>
                          <td className="px-8 py-6 font-bold text-purple-400">{item.title}</td>
                          <td className="px-8 py-6">
                            <div className="flex gap-4">
                              <a href={item.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">Repo</a>
                              <a href={item.demo} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">Demo</a>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-[10px] font-bold uppercase">Approved</span>
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
    </div>
  );
}

/* ================= COMPONENTS ================= */

function MetricCard({ title, value, color }) {
  const colors = {
    purple: "from-purple-600/40 to-purple-900/10 hover:border-purple-500/50",
    blue: "from-blue-600/40 to-blue-900/10 hover:border-blue-500/50",
    green: "from-emerald-600/40 to-emerald-900/10 hover:border-emerald-500/50",
    pink: "from-pink-600/40 to-pink-900/10 hover:border-pink-500/50"
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl transition-all hover:-translate-y-1`}>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">
        {title}
      </p>
      <h3 className="text-4xl font-black text-white">
        {value}
      </h3>
    </div>
  );
}

function Progress({ label, value }) {
  return (
    <div className="group">
      <div className="flex justify-between text-sm mb-3">
        <span className="text-gray-400 group-hover:text-white transition">{label}</span>
        <span className="text-purple-400 font-bold">{value}%</span>
      </div>
      <div className="h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
        <div
          style={{ width: `${value}%` }}
          className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(139,92,246,0.5)]"
        ></div>
      </div>
    </div>
  );
}

function OverviewItem({ label, value }) {
  return (
    <div className="flex justify-between items-center bg-black/40 border border-white/5 rounded-2xl px-6 py-4 hover:border-white/10 transition-colors">
      <span className="text-gray-400 text-sm font-medium">{label}</span>
      <span className="text-xl font-black text-purple-400">{value}</span>
    </div>
  );
}