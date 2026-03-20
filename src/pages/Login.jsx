import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./Auth.css";

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLoginSuccess = async (credentialResponse) => {
        try {
            const response = await fetch("http://localhost:8081/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: credentialResponse.credential
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText || `Login failed (${response.status})`);
            }

            const data = await response.json();

            const displayName = data.username || (data.email && data.email.split("@")[0]) || "User";

            localStorage.setItem("sessionId", data.sessionId);
            localStorage.setItem("email", data.email);
            localStorage.setItem("username", displayName);
            if (data.userId != null) {
                localStorage.setItem("userId", String(data.userId));
            }

            login({
                email: data.email,
                username: displayName,
                sessionId: data.sessionId,
                userId: data.userId
            });
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            alert(error.message || "Login failed. Is the backend running on port 8081?");
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
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div>
                <div className="auth-footer">
                    <p>By continuing, you agree to our Terms of Service</p>
                </div>
            </div>
        </div>
    );
}