import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreatePass.css";

import DashboardLayout from "../../components/DashboardLayout";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ManagerCreatePass() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile_no: "",
    total_no_of_persons: "",
    visit_date: "",
    amount: "",
    payment_mode: "cash",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const createPass = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const userResponse = await axios.post(
        `${API_BASE_URL}/manager/create-user`,

        {
          name: form.name,

          mobile_no: form.mobile_no,

          total_no_of_persons: form.total_no_of_persons,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const userId = userResponse.data.data.user.id;

      const ticketResponse = await axios.post(
        `${API_BASE_URL}/manager/generate-user-ticket`,

        {
          user_id: userId,

          visit_date: form.visit_date,

          amount: form.amount,

          payment_mode: form.payment_mode,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const ticket = ticketResponse.data.data.ticket;

      // clear form

      setForm({
        name: "",
        mobile_no: "",
        total_no_of_persons: "",
        visit_date: "",
        amount: "",
        payment_mode: "cash",
      });

      // move to preview page

      navigate(`/manager/pass-preview/${ticket.ticket_id}`, {
        state: {
          ticket,
        },
      });
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="create-pass-page">
        <div className="page-title">
          <h1>🎫 Create Temple Pass</h1>

          <p>Generate VIP / VVIP Darshan QR Pass</p>
        </div>

        <div className="form-card">
          <h2>Visitor Details</h2>

          <form onSubmit={createPass}>
            <div className="form-row">
              <label>Visitor Name</label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter visitor name"
                required
              />
            </div>

            <div className="form-row">
              <label>Mobile Number</label>

              <input
                name="mobile_no"
                value={form.mobile_no}
                onChange={handleChange}
                placeholder="9876543210"
                required
              />
            </div>

            <div className="form-row">
              <label>Total Persons</label>

              <input
                type="number"
                name="total_no_of_persons"
                min="1"
                value={form.total_no_of_persons}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label>Visit Date</label>

              <input
                type="date"
                name="visit_date"
                value={form.visit_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label>Amount</label>

              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="₹ Amount"
                required
              />
            </div>

            <div className="form-row">
              <label>Payment Mode</label>

              <select
                name="payment_mode"
                value={form.payment_mode}
                onChange={handleChange}
              >
                <option value="cash">Cash</option>

                <option value="online">Online</option>
              </select>
            </div>

            <button className="generate-btn" disabled={loading}>
              {loading ? "Generating..." : "Generate QR Pass"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
