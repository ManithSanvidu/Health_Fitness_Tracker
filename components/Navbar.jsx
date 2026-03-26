import React, { useContext, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = useMemo(
    () => [
      { to: '/', label: 'Home' },
      { to: '/dashboard', label: 'Dashboard' },
      { to: '/recommend', label: 'Get Recommendations' },
      { to: '/workouts', label: 'Workouts' },
      { to: '/nutrtion', label: 'Nutrition' },
      { to: '/profile', label: 'Profile' },
    ],
    []
  );

  const handleLogout = () => {
      logout();
      setMenuOpen(false);
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
        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="navbar-mobile-actions">
            {user ? (
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            ) : (
              <button className="login-btn" onClick={() => { setMenuOpen(false); navigate('/login'); }}>Login</button>
            )}
          </div>
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
