import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user info from localStorage first
        const email = localStorage.getItem("email");
        const sessionId = localStorage.getItem("sessionId");
        const username = localStorage.getItem("username");
        const userId = localStorage.getItem("userId");
        const phone = localStorage.getItem("phone");

        if (email) {
            setUser({
                email,
                username: username || email.split("@")[0],
                sessionId,
                userId: userId ? Number(userId) : undefined,
                phone: phone || null
            });
        }

        // Fetch latest user info from backend
        fetch(`${process.env.REACT_APP_API_URL}/api/user/${email}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    // Update user state with backend data
                    setUser(prev => ({
                        ...prev,
                        ...data
                    }));

                    // Optionally sync backend data to localStorage
                    if (data.phone) localStorage.setItem("phone", data.phone);
                }
            })
            .catch(err => console.error("Failed to fetch user data:", err));

    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("email");
        localStorage.removeItem("sessionId");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        localStorage.removeItem("phone");
    };

    const updateUser = (updates) => {
        if (user) {
            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
            if (updates.phone !== undefined) {
                if (updates.phone) localStorage.setItem("phone", updates.phone);
                else localStorage.removeItem("phone");
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};