import { useEffect, useState } from "react";
import API from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await API.get("/user/me");
      setUser(res.data);
      setBio(res.data.bio || "");
    };
    fetchUser();
  }, []);

  const updateProfile = async () => {
    const res = await API.put("/user/update", { name: user.name, bio });
    setUser(res.data);
  };

  if (!user) return <p className="text-center text-gray-500 mt-10">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h2 className="text-3xl font-bold text-orange-600">My Profile</h2>

      <div className="space-y-2">
        <p>
          <span className="font-semibold text-gray-700">Name:</span>{" "}
          <span className="text-gray-800">{user.name}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">Email:</span>{" "}
          <span className="text-gray-800">{user.email}</span>
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Bio</label>
        <textarea
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself..."
        />
      </div>

      <button
        onClick={updateProfile}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition"
      >
        Update Profile
      </button>
    </div>
  );
}
