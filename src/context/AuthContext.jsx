import React, { createContext, useState, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Try to restore a saved session from localStorage
    const [user, setUserState] = useState(() => {
        try {
            const stored = localStorage.getItem('user');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const setUser = (userData) => {
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('user');
        }
        setUserState(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('mockUser'); // cleanup legacy
        setUserState(null);
        window.location.href = '/portal';
    };

    const refreshUser = async () => {
        if (!user || !user.email) return;
        try {
            // Fetch latest user data from backend
            const response = await api.get('accounts/user/', { params: { email: user.email } });
            if (response.data && response.data.user) {
                setUser(response.data.user);
            }
        } catch (err) {
            console.error('Failed to refresh user:', err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, error, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
