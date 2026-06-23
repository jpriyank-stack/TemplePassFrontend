import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const name = localStorage.getItem("userName");
  const role = localStorage.getItem("userRole");

  const logout = () => {
    localStorage.clear();

    navigate("/");
  };

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="temple-logo">🛕</div>

        <div>
          <h2>TemplePass</h2>

          <span>Management Portal</span>
        </div>
      </div>

      <div className="header-right">
        <div className="user-box">
          <div className="avatar">{name?.charAt(0)}</div>

          <div>
            <p>{name}</p>

            <span>{role}</span>
          </div>
        </div>

        <button className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>

        {open && (
          <div className="profile-menu">
            <Link to="/profile">👤 Profile</Link>

            <Link to="/settings">⚙ Settings</Link>

            <button onClick={logout}>🚪 Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}
