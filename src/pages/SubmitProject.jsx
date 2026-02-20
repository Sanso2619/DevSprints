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

  /* Protect Route */
  useEffect(() => {
    if (!user || !user.isLoggedIn || user.role !== "student") {
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

    /* Check Event Flow */
    const flow =
      JSON.parse(
        localStorage.getItem("devsprintsFlow")
      ) || {};

    if (!flow.submission) {
      alert("Submissions are currently closed.");
      return;
    }

    /* Get Existing Submissions */
    const submissions =
      JSON.parse(
        localStorage.getItem("devsprintsSubmissions")
      ) || [];

    /* Prevent Multiple Submissions */
    const alreadySubmitted = submissions.find(
      (s) =>
        s.user === user.email &&
        s.hackathonId === Number(id)
    );

    if (alreadySubmitted) {
      alert("You have already submitted for this hackathon.");
      return;
    }

    /* Create Submission */
    const newSubmission = {
      id: Date.now(),
      user: user.email,
      hackathonId: Number(id),

      title: form.title,
      github: form.github,
      demo: form.demo,
      description: form.description,

      status: "Pending",
      score: null,
      feedback: "",

      date: new Date().toISOString()
    };

    submissions.push(newSubmission);

    /* Save */
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

        {/* Header */}
        <h1 className="text-2xl font-semibold mb-2">
          Submit Project
        </h1>

        <p className="text-sm text-gray-400 mb-6">
          Hackathon ID: {id}
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Title */}
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
              placeholder="Enter project name"
              className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* GitHub */}
          <div>
            <label className="text-sm text-gray-400">
              GitHub Repository
            </label>

            <input
              type="url"
              name="github"
              required
              value={form.github}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Demo */}
          <div>
            <label className="text-sm text-gray-400">
              Demo / Drive Link
            </label>

            <input
              type="url"
              name="demo"
              value={form.demo}
              onChange={handleChange}
              placeholder="https://demo-link.com"
              className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-400">
              Description
            </label>

            <textarea
              name="description"
              rows="4"
              required
              value={form.description}
              onChange={handleChange}
              placeholder="Explain your project idea..."
              className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] text-white border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="
              w-full py-3
              bg-purple-600/80
              hover:bg-purple-600
              rounded-lg
              font-medium
              transition
              shadow-[0_0_15px_rgba(139,92,246,0.4)]
              active:scale-95
            "
          >
            Submit Project
          </button>

        </form>

      </div>

    </div>
  );
}
