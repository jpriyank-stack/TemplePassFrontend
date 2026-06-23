import Header from "./Header";
import Sidebar from "./Sidebar";
import "./DashboardLayout.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Header />

      <Sidebar />

      <main className="dashboard-content">
        <div className="page-container">{children}</div>
      </main>
    </div>
  );
}
