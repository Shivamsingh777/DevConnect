import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!getToken();

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <nav className="p-4 h-20 bg-gray-200 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg text-orange-700">DevConnect</Link>
      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/new">Post Project</Link>
            <button onClick={logout} className="text-red-500">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
