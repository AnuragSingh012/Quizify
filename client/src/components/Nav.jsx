import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Nav = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleCreateClick = (event) => {
    if (!auth.isLoggedIn) {
      event.preventDefault();
      toast.error("You need to be logged in to create a quiz");
      navigate("/login");
    }
  };

  return (
    <header className="px-10 py-6 w-full">
      <nav className="flex justify-between items-center">
        <Link to="/">
          <h1 className="text-3xl font-bold text-blue-700">Quizify</h1>
        </Link>
        <div>
          {auth?.isLoggedIn ? (
            <div className="flex gap-2 justify-center items-center">
              <Link
                className="px-4 py-2 bg-blue-600  rounded-lg text-white font-semibold"
                to="/create"
              >
                Create
              </Link>
              <Link
                className="px-4 py-2 bg-black rounded-lg text-white font-semibold"
                to="/"
                onClick={auth.logout}
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="flex gap-2 justify-center items-center">
              <Link
                className="px-4 py-2 bg-black rounded-lg text-white font-semibold"
                to="/create"
                onClick={handleCreateClick}
              >
                Create
              </Link>
              <Link
                className="px-4 py-2 bg-blue-600  rounded-lg text-white font-semibold"
                to="/login"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
