import React, { useState } from "react";
import "./WorkoutPlans.css";

export default function WorkoutPlans() {
    const [activeTab, setActiveTab] = useState("Strength Training");
    const [cart, setCart] = useState([]);

    const stats = [
        { label: "Total Workouts", value: "50+", icon: "⚡" },
        { label: "Avg Duration", value: "45 min", icon: "🕒" },
        { label: "Success Rate", value: "95%", icon: "↗️" },
        { label: "Calories Burned", value: "400+", icon: "🔥" },
    ];

    const categories = ["Strength Training", "Cardio", "Flexibility & Yoga"];

    const workouts = [
        {
            title: "Full Body Workout",
            duration: "45 min",
            calories: 350,
            level: "Beginner",
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400",
            category: "Strength Training"
        },
        {
            title: "Upper Body Focus",
            duration: "60 min",
            calories: 450,
            level: "Intermediate",
            image: "https://images.unsplash.com/photo-1758521959675-5874879f3977?q=80&w=1332&auto=format&fit=crop",
            category: "Strength Training"
        },
        {
            title: "Lower Body Power",
            duration: "60 min",
            calories: 550,
            level: "Advanced",
            image: "https://images.unsplash.com/photo-1764426445448-95103b0024a6?q=80&w=1167&auto=format&fit=crop",
            category: "Strength Training"
        },
        {
            title: "HIIT Cardio Blast",
            duration: "30 min",
            calories: 400,
            level: "Intermediate",
            image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=400",
            category: "Cardio"
        },
        {
            title: "Running Endurance",
            duration: "40 min",
            calories: 380,
            level: "Beginner",
            image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&q=80&w=400",
            category: "Cardio"
        },
        {
            title: "Cycling Power Ride",
            duration: "50 min",
            calories: 420,
            level: "Advanced",
            image: "https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&q=80&w=400",
            category: "Cardio"
        },
        {
            title: "Morning Yoga Flow",
            duration: "35 min",
            calories: 180,
            level: "Beginner",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400",
            category: "Flexibility & Yoga"
        },
        {
            title: "Deep Stretch Session",
            duration: "30 min",
            calories: 150,
            level: "Beginner",
            image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&q=80&w=400",
            category: "Flexibility & Yoga"
        },
        {
            title: "Power Yoga",
            duration: "45 min",
            calories: 250,
            level: "Intermediate",
            image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=400",
            category: "Flexibility & Yoga"
        }
    ];

    const addWorkouts = (workout) => {
        setCart((prev) => [...prev, workout]);
    };

    const totalCalories = cart.reduce((sum, w) => sum + (w.calories || 0), 0);

    const submitWorkouts = async () => {
        if (cart.length === 0) {
            alert("Cart is empty");
            return;
        }
        try {
            const { apiUrl } = await import("../config/api");

            const response = await fetch(apiUrl("/api/workouts/add"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: localStorage.getItem("email"),
                    calories: totalCalories
                })
            });

            if (response.ok) {
                alert("Workouts submitted successfully!");
                setCart([]);
            } else {
                alert("Failed to submit workouts");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to submit workouts");
        }
    };

    return (
        <div className="workout-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">
                        Workout <span className="gradient-text">Plans</span>
                    </h1>
                    <p className="page-subtitle">Choose from our AI-optimized workout routines designed to help you achieve your fitness goals</p>
                </div>

                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="card stat-card">
                            <div className="stat-icon-wrapper">{stat.icon}</div>
                            <div className="stat-details">
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart">
                    <h3>Workout Cart</h3>
                    {cart.map((workout, index) => (
                        <p key={index}>{workout.name} - {workout.calories} kcal</p>
                    ))}
                    <p>Total: {totalCalories} kcal</p>
                    <button onClick={submitWorkouts}>Submit</button>
                </div>

                <div className="tabs-container">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`tab-btn ${activeTab === cat ? "active" : ""}`}
                            onClick={() => setActiveTab(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="workouts-grid">
                    {workouts
                        .filter((workout) => workout.category === activeTab)
                        .map((workout, index) => (
                            <div key={index} className="card workout-card">
                                <div className="workout-image-container">
                                    <img src={workout.image} alt={workout.title} className="workout-image" />
                                    <span className={`level-badge ${workout.level.toLowerCase().replace(/\s+/g, '-')}`}>
                                        {workout.level}
                                    </span>
                                </div>

                                <div className="workout-info">
                                    <h3 className="workout-title">{workout.title}</h3>

                                    <div className="workout-meta">
                                        <span>🕒 {workout.duration}</span>
                                        <span>🔥 {workout.calories} kcal</span>
                                    </div>

                                    <button
                                        className="add-workout-btn"
                                        onClick={() =>
                                            addWorkouts({
                                                name: workout.title,
                                                calories: workout.calories
                                            })
                                        }
                                    >
                                        + Add Workout
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}