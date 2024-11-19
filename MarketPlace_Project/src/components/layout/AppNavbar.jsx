import { Link, useNavigate } from "react-router-dom";
import "../layoutStyles/AppNavbar.css"; 

const AppNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const userJson = localStorage.getItem("user");
  let user;

  try {
    user = userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error("Error parsing user JSON:", error);
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-links">
          <li>
            <Link to="/" className="nav-link" state={{ hello: "Hello, world!" }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="nav-link">
              Products
            </Link>
          </li>
          <li>
            <Link to="/orders" className="nav-link">
              Orders
            </Link>
          </li>
          {user?.role === "admin" && (
            <li>
              <Link to="/users" className="nav-link">
                Users
              </Link>
            </li>
          )}
        </ul>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AppNavbar;
