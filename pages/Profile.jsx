import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import "./Auth.css";

export default function Profile() {
    const { user, updateUser } = useContext(AuthContext);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [phoneInput, setPhoneInput] = useState('');

    const handleEditClick = () => {
        setPhoneInput(user?.phone || '');
        setIsEditModalOpen(true);
    };

    const handleSavePhone = () => {
        updateUser({ phone: phoneInput });
        setIsEditModalOpen(false);
    };

    return (
        <div className="auth-page">
            <div className="container">
                <div className="profile-header">
                    <h1 className="page-title">My <span className="gradient-text">Profile</span></h1>
                </div>

                {user ? (
                    <div className="card profile-card">
                        <div className="profile-avatar-row">
                            <div className="avatar-placeholder">
                                {user.username?.charAt(0) || 'U'}
                            </div>
                            <div className="profile-main-info">
                                <h3>{user.username}</h3>
                                <p>{user.email}</p>
                            </div>
                        </div>

                        <div className="profile-details-grid">
                            <div className="detail-item">
                                <label>User ID</label>
                                <p>{user.userId != null ? user.userId : '—'}</p>
                            </div>
                            <div className="detail-item">
                                <label>Phone Number</label>
                                <p>{user.phone || 'Not provided'}</p>
                            </div>
                            <div className="detail-item">
                                <label>Member Since</label>
                                <p>March 2024</p>
                            </div>
                        </div>

                        <button className="btn-edit-profile full-width" onClick={handleEditClick}>Edit Profile</button>
                    </div>
                ) : (
                    <div className="card empty-profile-card">
                        <p>Please log in to view your profile.</p>
                        <button className="btn-primary" onClick={() => window.location.href = '/login'}>Go to Login</button>
                    </div>
                )}
            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Edit Profile</h3>
                        </div>
                        <div className="modal-body">
                            <div className="modal-input-group">
                                <label>Phone Number</label>
                                <input 
                                    type="tel" 
                                    value={phoneInput} 
                                    onChange={e => setPhoneInput(e.target.value)} 
                                    placeholder="+1 234 567 890" 
                                    className="edit-input"
                                />
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                            <button className="btn-primary" onClick={handleSavePhone}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
