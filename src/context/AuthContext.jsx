import React, { createContext, useState, useContext } from 'react';
import { MOCK_USER } from '../mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Try to restore a saved mock session from localStorage; fall back to null
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem('mockUser');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });
    const [loading] = useState(false);
    const [error] = useState(null);

    const login = (userData) => {
        const u = userData || MOCK_USER;
        localStorage.setItem('mockUser', JSON.stringify(u));
        localStorage.setItem('token', 'mock-token-frontend-only');
        setUser(u);
    };

    const logout = () => {
        localStorage.removeItem('mockUser');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/portal';
    };

    const refreshUser = () => {
        // No-op in frontend-only mode
    };

    return (
        <AuthContext.Provider value={{ user, setUser: login, loading, error, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
