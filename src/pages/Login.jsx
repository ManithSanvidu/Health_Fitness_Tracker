import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./Auth.css";

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const API_URL = (process.env.REACT_APP_API_URL || "").replace(/\/+$/, "");

    const handleLoginSuccess = async (credentialResponse) => {
        try {
            if (!credentialResponse?.credential) {
                throw new Error("Invalid Google response");
            }

            if (!API_URL) {
                throw new Error("API URL not configured");
            }

            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    token: credentialResponse.credential
                })
            });

            let data;
            const text = await response.text();

            try {
                data = text ? JSON.parse(text) : {};
            } catch {
                throw new Error("Invalid server response");
            }

            if (!response.ok) {
                throw new Error(data?.message || `Login failed (${response.status})`);
            }

            const displayName =
                data?.username ||
                (data?.email ? data.email.split("@")[0] : "User");

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
            alert(error?.message || "Login failed");
        }
    };

    return (
        <div className="auth-page">
            <div className="card auth-card">
                <div className="auth-header">
                    <h2 className="gradient-text">Welcome Back</h2>
                    <p>Log in to continue your fitness journey</p>
                </div>
                <div className="login-wrapper">
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={() => alert("Google Login Failed")}
                        useOneTap
                    />
                </div>
                <div className="auth-footer">
                    <p>By continuing, you agree to our Terms of Service</p>
                </div>
            </div>
        </div>
    );
}