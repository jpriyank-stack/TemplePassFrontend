import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <nav
      style={{
        padding: "10px 20px",
        borderBottom: "1px solid #ccc",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          TemplePass
        </Link>

        <div style={{ display: "flex", gap: "20px" }}>
          {!token ? (
            <>
              <Link to="/admin-login" style={{ textDecoration: "none" }}>
                Admin
              </Link>
              <Link to="/manager-login" style={{ textDecoration: "none" }}>
                Manager
              </Link>
              <Link to="/user-login" style={{ textDecoration: "none" }}>
                User
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "red",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
