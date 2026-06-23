import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import "./ManagerPassHistory.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function PassHistory() {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/manager/pass-history`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setHistory(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="history-loading">Loading Pass History...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="history-page">
        {/* Header */}

        <div className="history-header">
          <div>
            <h1>🎫 Pass History</h1>

            <p>Manage generated Temple Darshan passes</p>
          </div>
        </div>

        {/* Summary Cards */}

        <div className="history-summary">
          <div className="history-card">
            <span>🎫</span>

            <div>
              <p>Total Passes</p>

              <h2>{history.summary.total_passes_created}</h2>
            </div>
          </div>

          <div className="history-card">
            <span>✅</span>

            <div>
              <p>Visited</p>

              <h2>{history.summary.total_consumed}</h2>
            </div>
          </div>

          <div className="history-card">
            <span>⏳</span>

            <div>
              <p>Pending</p>

              <h2>{history.summary.total_pending}</h2>
            </div>
          </div>

          <div className="history-card">
            <span>💰</span>

            <div>
              <p>Revenue</p>

              <h2>₹{history.summary.total_revenue}</h2>
            </div>
          </div>
        </div>

        {/* Table */}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>

                <th>Visitor</th>

                <th>Mobile</th>

                <th>Persons</th>

                <th>Amount</th>

                <th>Payment</th>

                <th>Status</th>

                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {history.passes.map((pass) => (
                <tr key={pass.ticket_id}>
                  <td className="ticket-id">{pass.ticket_id}</td>

                  <td>{pass.user_name}</td>

                  <td>{pass.mobile_no}</td>

                  <td>{pass.total_persons}</td>

                  <td>₹{pass.amount}</td>

                  <td>
                    <span className="payment">{pass.payment_mode}</span>
                  </td>

                  <td>
                    <span
                      className={
                        pass.ticket_status === "consumed"
                          ? "status consumed"
                          : "status"
                      }
                    >
                      {pass.ticket_status === "consumed"
                        ? "Visited"
                        : pass.ticket_status}
                    </span>
                  </td>

                  <td>{pass.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
