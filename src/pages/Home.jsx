import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    
    return (
        <div className="home-container">
            <div className="container hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Transform Your <br />
                        <span className="gradient-text">Health & Fitness</span>
                    </h1>
                    <p className="hero-description">
                        AI-powered recommendations for personalized workout plans,
                        nutrition guidance, and health monitoring. Start your journey to a healthier you today.
                    </p>
                
                    <div className="hero-actions">
                        <button className="btn-primary" onClick={()=>navigate("/Login")}>Get Started</button>
                        <button className="btn-secondary" onClick={()=>navigate("/Dashboard")}>View Dashboard</button>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="image-wrapper">
                        <img
                            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop"
                            alt="Fitness Training"
                            className="hero-image"
                        />
                        <div className="stat-card floating">
                            <div className="stat-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#10B981" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="stat-info">
                                <span className="stat-value">2,500</span>
                                <span className="stat-label">Calories Burned</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <h3 className="stat-number">10K+</h3>
                            <p className="stat-desc">Active Users</p>
                        </div>
                        <div className="stat-item">
                            <h3 className="stat-number">50K+</h3>
                            <p className="stat-desc">Workouts Created</p>
                        </div>
                        <div className="stat-item">
                            <h3 className="stat-number">95%</h3>
                            <p className="stat-desc">Success Rate</p>
                        </div>
                        <div className="stat-item">
                            <h3 className="stat-number">12 lbs</h3>
                            <p className="stat-desc">Avg. Weight Loss</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="features-section">
                <div className="container">
                    <h2 className="section-title">Everything You Need to Succeed</h2>
                    <p className="section-subtitle">Your health and fitness goals</p>
                    
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Personalized Goals</h3>
                            <p>AI-powered recommendations tailored to your fitness level and objectives</p>
                        </div>
                        
                        <div className="feature-card">
                            <h3>Track Progress</h3>
                            <p>Monitor your journey with detailed analytics and insights</p>
                        </div>
                        
                        <div className="feature-card">
                            <h3>Smart AI</h3>
                            <p>Machine learning models predict calorie needs and optimize workout plans</p>
                        </div>
                        
                        <div className="feature-card">
                            <h3>Health Monitoring</h3>
                            <p>Track vital health metrics and disease risk assessments</p>
                        </div>
                        
                        <div className="feature-card">
                            <h3>Nutrition Plans</h3>
                            <p>Custom meal plans and dietary recommendations</p>
                        </div>
                        
                        <div className="feature-card">
                            <h3>Workout Library</h3>
                            <p>Extensive collection of exercises for all fitness levels</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="how-it-works-section">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <p className="section-subtitle">Simple steps to start your fitness journey</p>
                    
                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">01</div>
                            <h3>Sign Up</h3>
                            <p>Create your account with Google in seconds</p>
                        </div>
                        
                        <div className="step-card">
                            <div className="step-number">02</div>
                            <h3>Get Analyzed</h3>
                            <p>Our AI analyzes your data and creates personalized plans</p>
                        </div>
                        
                        <div className="step-card">
                            <div className="step-number">03</div>
                            <h3>Start Training</h3>
                            <p>Follow your custom workout and nutrition plans</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cta-section">
                <div className="container">
                    <h2 className="cta-title">Ready to Transform Your Life?</h2>
                    <p className="cta-text">Join thousands of users who have achieved their fitness goals with FitLife</p>
                    <button className="btn-primary btn-large" onClick={()=>navigate("/Login")}>Get Started for Free</button>
                </div>
            </div>
        </div>
    );
}