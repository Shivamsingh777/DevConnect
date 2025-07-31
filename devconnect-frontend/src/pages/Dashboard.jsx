import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await API.get("/projects");
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h2 className="text-3xl font-extrabold text-orange-600">Explore Projects</h2>

      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="Search by project or user name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">No projects found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <div
              key={p._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{p.title}</h3>
              <p className="text-gray-600 mb-3">{p.description}</p>
              <p className="text-sm text-gray-500 mb-2">By <span className="font-medium">{p.user.name}</span></p>

              <a
                href={p.link}
                className="text-orange-500 hover:text-orange-600 font-medium inline-block mb-2"
                target="_blank"
                rel="noreferrer"
              >
                🔗 View Project
              </a>

              <div>
                <Link
                  to={`/projects/${p._id}`}
                  className="text-indigo-600 hover:underline text-sm font-semibold"
                >
                  💬 View Details & Comments
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
