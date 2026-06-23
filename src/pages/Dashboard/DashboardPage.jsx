import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import "./DashboardPage.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/manager/dashboard-stats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setStats(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="dashboard-loading">Loading Dashboard...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        {/* Header */}

        <div className="dashboard-top">
          <div>
            <h1>Welcome Back 🙏</h1>

            <p>
              {stats?.dateTime?.date} | {stats?.dateTime?.time}
            </p>
          </div>

          <div className="temple-badge">🛕 TemplePass Manager</div>
        </div>

        {/* Cards */}

        <div className="stats-grid">
          <div className="stat-card">
            <span>🎫</span>

            <div>
              <p>Total Generated</p>
              <h2>{stats?.summary?.totalGenerated}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>✅</span>

            <div>
              <p>Consumed</p>

              <h2>{stats?.summary?.totalConsumed}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>⏳</span>

            <div>
              <p>Pending</p>

              <h2>{stats?.summary?.totalPending}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>💰</span>

            <div>
              <p>Revenue</p>

              <h2>₹{stats?.summary?.totalRevenue}</h2>
            </div>
          </div>
        </div>

        {/* Payment */}

        <div className="dashboard-section">
          <h2>Payment Overview</h2>

          <div className="payment-grid">
            <div>
              <h3>Cash</h3>

              <p>Tickets : {stats?.paymentBreakdown?.cash?.tickets}</p>

              <strong>₹{stats?.paymentBreakdown?.cash?.revenue}</strong>
            </div>

            <div>
              <h3>Online</h3>

              <p>Tickets : {stats?.paymentBreakdown?.online?.tickets}</p>

              <strong>₹{stats?.paymentBreakdown?.online?.revenue}</strong>
            </div>
          </div>
        </div>

        {/* Conversion */}

        <div className="conversion-box">
          <h2>Conversion Rate</h2>

          <div className="rate">{stats?.conversion?.conversionRate}</div>
        </div>

        {/* Quick Actions */}

        <div className="quick-actions">
          <button>🎫 Create Pass</button>

          <button>📱 Scan QR</button>

          <button>📊 Reports</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
