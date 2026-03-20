import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
      logout();
      navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#8B5CF6"/>
            <path d="M7 12L10 9L12 11L14 7L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="logo-text">FitLife</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/recommend" className="nav-link">Get Recommendations</Link>
          <Link to="/workouts" className="nav-link">Workouts</Link>
          <Link to="/nutrtion" className="nav-link">Nutrition</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </div>
        {user ? (
            <div className="user-profile">
                <div className="avatar">{(user.username || user.email || "?").charAt(0).toUpperCase()}</div>
                <span className="username">{user.username || user.email}</span>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
