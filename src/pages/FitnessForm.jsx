import React, { useState } from "react";
import axios from "axios";
import "./FitnessForm.css";

export default function FitnessForm() {
    const [form, setForm] = useState({
        age: "",
        gender: "",
        weight: "",
        height: "",
        activityLevel: ""
    });
    const [recommendation, setRecommendation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const submitForm = async () => {
        if (!form.age || !form.gender || !form.weight || !form.height || !form.activityLevel) {
            alert("Please fill all fields");
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post(
                "http://localhost:8081/api/recommend",
                {
                    age: form.age,
                    gender: form.gender,
                    weight: form.weight,
                    height: form.height,
                    activity: form.activityLevel
                }
            );

            const payload = res.data;
            const text = typeof payload === "string" ? payload : (payload.result || payload.error || JSON.stringify(payload));
            setRecommendation(text);
        } catch (error) {
            console.error(error);
            const msg =
                error.response?.data?.error ||
                (typeof error.response?.data === "string" ? error.response.data : null) ||
                error.message ||
                "Something went wrong. Is the backend running on port 8081?";
            alert(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-page">
            <div className="container">
                <div className="form-header">
                    <h1 className="form-title">
                        Get Your Personalized <span className="gradient-text">Fitness Plan</span>
                    </h1>
                    <p className="form-subtitle">AI-powered recommendations based on your unique profile</p>
                </div>

                <div className="form-content">
                    <div className="card form-card">
                        <div className="card-header">
                            <h3>Your Information</h3>
                            <p>Fill in your details to get personalized recommendations</p>
                        </div>

                        <div className="form-group">
                            <label>Age</label>
                            <input
                                type="number"
                                value={form.age}
                                onChange={(e) => setForm({ ...form, age: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <select
                                value={form.gender}
                                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Weight (kg)</label>
                                <input
                                    type="number"
                                    value={form.weight}
                                    onChange={(e) => setForm({ ...form, weight: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Height (cm)</label>
                                <input
                                    type="number"
                                    value={form.height}
                                    onChange={(e) => setForm({ ...form, height: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Activity Level</label>
                            <select
                                value={form.activityLevel}
                                onChange={(e) => setForm({ ...form, activityLevel: e.target.value })}
                            >
                                <option value="">Select activity level</option>
                                <option value="sedentary">Sedentary</option>
                                <option value="light">Light</option>
                                <option value="moderate">Moderate</option>
                                <option value="active">Active</option>
                                <option value="very-active">Very Active</option>
                            </select>
                        </div>

                        <button className="btn-primary full-width" onClick={submitForm} disabled={isLoading}>
                            {isLoading ? "Generating..." : "Get Recommendations"}
                        </button>
                    </div>

                    {/* Right column: Recommendations or Empty State */}
                    {recommendation ? (
                        <div className="card recommendations-card">
                            <div className="card-header recommendations-header">
                                <span className="sparkle-icon">✨</span>
                                <h3>Your Personalized Plan</h3>
                                <p>AI-generated fitness and nutrition advice</p>
                            </div>
                            <div className="recommendations-content">
                                {recommendation.split('\n').map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="form-preview">
                            <div className="empty-state">
                                <div className="empty-icon-wrapper">
                                    📋
                                </div>
                                <p>Submit your information to generate a personalized fitness and nutrition plan.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}