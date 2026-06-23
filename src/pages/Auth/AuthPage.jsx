import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AuthPage.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/manager/login`, {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        localStorage.setItem("userRole", "manager");

        localStorage.setItem("userName", response.data.data.name);

        navigate("/manager/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* LEFT */}

        <div className="auth-left">
          <div>
            <div className="logo-box">
              <div className="logo-icon">🛕</div>

              <div>
                <h2 className="brand-title">TemplePass</h2>

                <p className="brand-sub">Manager Portal</p>
              </div>
            </div>

            <h1>
              Manage
              <br />
              <span>Darshan Passes</span>
            </h1>

            <p>
              Create VIP and VVIP entry passes, manage visitor information and
              generate secure QR codes.
            </p>
          </div>

          <div className="feature-list">
            <div className="feature-card">
              🎫
              <h3>Pass Creation</h3>
              <p>Generate visitor entry passes instantly</p>
            </div>

            <div className="feature-card">
              📱
              <h3>QR Verification</h3>
              <p>Secure QR based temple entry</p>
            </div>

            <div className="feature-card">
              🙏
              <h3>Darshan Management</h3>
              <p>Manage VIP & special services</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="auth-right">
          <div className="login-box">
            <div className="profile-icon">🛕</div>

            <h2 className="login-title">Manager Login</h2>

            <p className="login-sub">Access TemplePass management system</p>

            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Address</label>

                <div className="input-box">
                  <span>✉️</span>

                  <input
                    type="email"
                    placeholder="Enter manager email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>

                <div className="input-box">
                  <span>🔐</span>

                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button disabled={loading} className="login-btn">
                {loading ? "Authenticating..." : "Login to TemplePass"}
              </button>
            </form>

            <div className="login-footer">
              <p>Manager access only</p>

              <Link to="/">← Back to Website</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
