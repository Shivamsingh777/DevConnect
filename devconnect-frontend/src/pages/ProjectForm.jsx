import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function ProjectForm() {
  const [form, setForm] = useState({ title: "", description: "", link: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/projects", form);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-6 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h2 className="text-3xl font-bold text-orange-600">Post a New Project</h2>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
        <input
          type="text"
          placeholder="Project Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
        <textarea
          placeholder="Describe your project..."
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Project Link</label>
        <input
          type="url"
          placeholder="https://github.com/yourproject"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition"
      >
        Create Project
      </button>
    </form>
  );
}
