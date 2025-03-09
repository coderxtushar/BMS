import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "./Login.css";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Attempting login with:", { email }); // Debug log
      const data = await loginUser(email, password);
      console.log("Login successful:", data); // Debug log

      // Store token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);
      setIsAuthenticated(true);
      navigate("/busyard");
    } catch (err) {
      console.error("Login error:", err); // Debug log
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Sign in to your account</h2>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            <span>{loading ? "Signing in..." : "Login"}</span>
          </button>

          <p>
            <a href="/register">Don't have an account? Register</a>
          </p>
        </form>
      </div>

      <div className="footer">
        ©2025 Invertis University, Invertis Village, Bareilly-Lucknow National
        Highway, NH-24, Bareilly-243123, Uttar Pradesh
      </div>
    </div>
  );
}

export default Login;