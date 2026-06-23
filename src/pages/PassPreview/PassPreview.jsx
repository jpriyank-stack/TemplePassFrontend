import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./PassPreview.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function PassPreview() {
  const location = useLocation();
  const navigate = useNavigate();

  const ticket = location.state?.ticket;

  const [qrImage, setQrImage] = useState(null);

  useEffect(() => {
    const loadQR = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/manager/ticket/qrcode/${ticket.ticket_id}`,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },

            responseType: "blob",
          },
        );

        const imageUrl = URL.createObjectURL(response.data);

        setQrImage(`${imageUrl}`);
      } catch (error) {
        console.log(error);
      }
    };

    if (ticket?.ticket_id) {
      loadQR();
    }
  }, [ticket]);

  if (!ticket) {
    return (
      <div className="no-pass">
        <h2>No Pass Found</h2>

        <button onClick={() => navigate("/manager/create-pass")}>
          Create New Pass
        </button>
      </div>
    );
  }

  return (
    <div className="preview-page">
      <div className="pass-wrapper">
        <div className="temple-header">
          <div className="temple-logo">🛕</div>

          <div>
            <h1>TemplePass</h1>

            <p>VIP / VVIP Darshan Pass</p>
          </div>
        </div>

        <div className="divider"></div>

        <div className="pass-body">
          <div className="qr-section">
            {qrImage && <img src={qrImage} alt="Temple QR" />}

            <p>Scan at Temple Entry</p>
          </div>

          <div className="details">
            <div className="ticket-status">CONFIRMED</div>

            <h2>{ticket.ticket_id}</h2>

            <div className="detail-row">
              <span>Visitor</span>

              <b>{ticket.user_name}</b>
            </div>

            <div className="detail-row">
              <span>Mobile</span>

              <b>{ticket.user_mobile}</b>
            </div>

            <div className="detail-row">
              <span>Persons</span>

              <b>{ticket.total_persons}</b>
            </div>

            <div className="detail-row">
              <span>Visit Date</span>

              <b>{ticket.visit_date}</b>
            </div>

            <div className="detail-row">
              <span>Payment</span>

              <b>₹{ticket.amount}</b>
            </div>

            <div className="detail-row">
              <span>Mode</span>

              <b>{ticket.payment_mode}</b>
            </div>
          </div>
        </div>

        <div className="footer-text">
          🙏 Please carry this pass during Darshan
        </div>
      </div>

      <div className="actions">
        <button className="print-btn" onClick={() => window.print()}>
          🖨 Print Pass
        </button>

        <button
          className="new-btn"
          onClick={() => navigate("/manager/create-ticket")}
        >
          ➕ Create New Pass
        </button>
      </div>
    </div>
  );
}
