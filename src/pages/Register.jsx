import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { apiUrl } from "../config/api";
import "./Auth.css";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await fetch(apiUrl("/api/auth/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (response.status === 405) {
          throw new Error(
            "Auth API is not reachable (405). Configure REACT_APP_API_URL to your backend service URL."
          );
        }
        const reason = data?.message || data?.error || `Registration failed (${response.status})`;
        throw new Error(reason);
      }

      const displayName = data?.username || (data?.email ? data.email.split("@")[0] : "User");
      if (data?.sessionId) localStorage.setItem("sessionId", data.sessionId);
      if (data?.email) localStorage.setItem("email", data.email);
      if (displayName) localStorage.setItem("username", displayName);
      if (data?.userId != null) localStorage.setItem("userId", String(data.userId));

      login({
        email: data?.email,
        username: displayName,
        sessionId: data?.sessionId,
        userId: data?.userId,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Register error:", err);
      setError(err?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <div className="auth-header">
          <h2 className="gradient-text">Create Account</h2>
          <p>Start your fitness journey in minutes</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Username</label>
            <input
              className="auth-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your name"
              autoComplete="username"
              required
            />
          </div>
          <div className="auth-field">
            <label>Email</label>
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              autoComplete="new-password"
              required
            />
          </div>
          {error ? (
            <div className="auth-error" role="alert">
              {error}
            </div>
          ) : null}
          <button className="btn-primary auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link className="auth-link" to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

