import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { registerUser } from "../services/api";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Attempting to register with:", { email, password, studentId, courseName });
      const response = await registerUser(email, password, studentId, courseName);
      console.log("Registration response:", response);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Create an Account</h2>

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
            placeholder="Password (minimum 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            <LogIn size={20} />
            <span>{loading ? "Registering..." : "Register"}</span>
          </button>

          <p>
            <a href="/login">Already have an account? Sign in</a>
          </p>
        </form>
      </div>

      <div className="footer">
        ©2025 Invertis University, Bareilly-Lucknow National
        Highway, NH-24, Bareilly-243123, Uttar Pradesh
      </div>
    </div>
  );
}

export default Register;