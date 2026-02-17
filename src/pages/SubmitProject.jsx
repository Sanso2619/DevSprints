import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SubmitProject() {

  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("devsprintsUser")
  );

  const [form, setForm] = useState({
    title: "",
    github: "",
    demo: "",
    description: ""
  });

  // Protect Route
  useEffect(() => {
    if (!user || !user.isLoggedIn) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissions =
      JSON.parse(
        localStorage.getItem("devsprintsSubmissions")
      ) || [];

    submissions.push({
      user: user.email,
      hackathonId: Number(id),
      ...form,
      status: "Submitted",
      date: new Date().toISOString()
    });

    localStorage.setItem(
      "devsprintsSubmissions",
      JSON.stringify(submissions)
    );

    alert("Project submitted successfully!");

    navigate("/dashboard/student");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/10 to-black text-white flex items-center justify-center px-6 py-24">

      <div className="w-full max-w-2xl bg-black/70 backdrop-blur border border-white/10 rounded-xl p-8 shadow-xl">

        <h1 className="text-2xl font-semibold mb-6">
          Submit Project
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="text-sm text-gray-400">
              Project Title
            </label>

            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              GitHub Repository
            </label>

            <input
              type="url"
              name="github"
              value={form.github}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              Demo / Drive Link
            </label>

            <input
              type="url"
              name="demo"
              value={form.demo}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              Description
            </label>

            <textarea
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600/80 hover:bg-purple-600 rounded-lg font-medium transition shadow-[0_0_15px_rgba(139,92,246,0.4)]"
          >
            Submit Project
          </button>

        </form>

      </div>

    </div>
  );
}
