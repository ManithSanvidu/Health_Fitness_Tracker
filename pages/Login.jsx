import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../config/api';
import "./Auth.css";

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);
        try {
            const response = await fetch(apiUrl("/api/auth/login"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), password })
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) throw new Error(data?.message || `Login failed (${response.status})`);

            const displayName = data?.username || (data?.email ? data.email.split("@")[0] : "User");

            if (data?.sessionId) localStorage.setItem("sessionId", data.sessionId);
            if (data?.email) localStorage.setItem("email", data.email);
            if (displayName) localStorage.setItem("username", displayName);
            if (data?.userId != null) localStorage.setItem("userId", String(data.userId));

            login({
                email: data?.email,
                username: displayName,
                sessionId: data?.sessionId,
                userId: data?.userId
            });

            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            setError(error?.message || "Login failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="card auth-card">
                <div className="auth-header">
                    <h2 className="gradient-text">Welcome Back</h2>
                    <p>Log in to continue your fitness journey</p>
                </div>
                <form className="auth-form" onSubmit={handleSubmit}>
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
                            placeholder="Your password"
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    {error ? <div className="auth-error" role="alert">{error}</div> : null}
                    <button className="btn-primary auth-submit" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="auth-footer">
                    <p>
                        New here? <Link className="auth-link" to="/register">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}