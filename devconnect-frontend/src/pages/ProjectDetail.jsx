import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [comment, setComment] = useState("");

  const fetchProject = async () => {
    const res = await API.get(`/projects`);
    const selected = res.data.find(p => p._id === id);
    setProject(selected);
  };

  const submitComment = async (e) => {
    e.preventDefault();
    await API.post(`/projects/${id}/comment`, { text: comment });
    setComment("");
    fetchProject(); // refresh comments
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (!project) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-orange-600">{project.title}</h2>
        <p className="text-gray-700">{project.description}</p>
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Visit Project
        </a>
        <p className="text-sm text-gray-400">By: {project.user.name}</p>
      </div>

      <form onSubmit={submitComment} className="space-y-3">
        <label className="block text-sm font-medium text-gray-600">Add a comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Submit Comment
        </button>
      </form>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Comments</h3>
        {project.comments.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No comments yet.</p>
        ) : (
          project.comments.map((c, i) => (
            <div key={i} className="p-3 bg-gray-100 rounded border border-gray-200">
              <p className="text-gray-700">{c.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
