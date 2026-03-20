import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
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