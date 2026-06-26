import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🧭</span>
        <span className="navbar-title">EPITA Career Compass</span>
      </div>
      <button className="navbar-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
