import { Link } from "react-router-dom";

import "./Sidebar.css";

export default function Sidebar() {
  const role = localStorage.getItem("userRole");

  const menus = {
    manager: [
      {
        name: "Dashboard",
        icon: "📊",
        path: "/manager/dashboard",
      },

      {
        name: "Create Pass",
        icon: "🎫",
        path: "/manager/create-ticket",
      },

      {
        name: "QR Scanner",
        icon: "📱",
        path: "/manager/scan",
      },

      {
        name: "Pass History",
        icon: "📋",
        path: "/manager/tickets",
      },
    ],
  };

  return (
    <aside className="sidebar">
      <div className="side-title">TemplePass</div>

      <nav>
        {menus[role]?.map((item) => (
          <Link key={item.path} to={item.path} className="side-link">
            <span>{item.icon}</span>

            {item.name}
          </Link>
        ))}
      </nav>

      <div className="side-footer">
        <p>Secure Darshan Management</p>
      </div>
    </aside>
  );
}
