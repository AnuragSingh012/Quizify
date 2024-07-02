import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
  const auth = useAuth();
  return (
    <header className="px-10 py-6 w-full">
      <nav className="flex justify-between items-center">
        <Link to="/">
          <img src="" alt="logo" />
        </Link>
        <div>
          {auth?.isLoggedIn ? (
            <>
              <Link to="/" onClick={auth.logout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
