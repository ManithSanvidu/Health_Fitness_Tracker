import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [stats, setStats] = useState({ caloriesConsumed: 0, caloriesBurned: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const email = user?.email || localStorage.getItem("email");
            if (email) {
                try {
                    const response = await fetch(`http://localhost:8081/api/users/stats?email=${email}`);
                    if (response.ok) {
                        const data = await response.json();
                        setStats({
                            caloriesConsumed: data.caloriesConsumed || 0,
                            caloriesBurned: data.caloriesBurned || 0
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchStats();
    }, [user]);

    return (
        <div className="dashboard-page">
            <div className="container">
                <div className="dashboard-header">
                    <h1 className="page-title">
                        Welcome back, <span className="gradient-text">{user?.username || user?.email || 'Guest'}!</span>
                    </h1>
                    <p className="page-subtitle">Here's your fitness overview for today.</p>
                </div>

                <div className="dashboard-grid">
                    <div className="card analytics-card">
                        <h3>Workout Activity</h3>
                        <div className="placeholder-chart">
                            <svg width="100%" height="200" viewBox="0 0 400 200">
                                <path d="M0 150 Q 50 130, 100 140 T 200 80 T 300 110 T 400 50" fill="none" stroke="#8B5CF6" strokeWidth="4" />
                                <rect x="0" y="190" width="400" height="10" fill="#f3f4f6" />
                            </svg>
                        </div>
                    </div>

                    <div className="card summary-card">
                        <h3>Quick Stats</h3>
                        <div className="stats-list">
                            <div className="stat-row">
                                <span>Calories Consumed</span>
                                <strong>{stats.caloriesConsumed} kcal</strong>
                            </div>
                            <div className="stat-row">
                                <span>Calories Burned</span>
                                <strong>{stats.caloriesBurned} kcal</strong>
                            </div>
                            <div className="stat-row">
                                <span>Net Calories</span>
                                <strong>{stats.caloriesConsumed - stats.caloriesBurned} kcal</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-header">
                    <h2>Recent Workout Plans</h2>
                </div>

                <div className="dashboard-workouts">
                    <div className="card workout-card-horizontal">
                        <img
                            src='https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=200'
                            alt="Full Body Workout"
                            className="horizontal-card-image"
                        />
                        <div className="horizontal-card-content">
                            <h3>Full Body Workout</h3>
                            <p>45 min | 300-400 kcal</p>
                            <ul className="exercise-list-tags">
                                <li>Push-ups</li>
                                <li>Squats</li>
                                <li>Lunges</li>
                                <li>Planks</li>
                            </ul>
                        </div>
                        <button className="btn-secondary" onClick={() => navigate("/workouts")}>Start</button>
                    </div>
                </div>
            </div>
        </div>
    );
}