import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);
const API_URL = 'http://127.0.0.1:8000/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData, accessToken, refreshToken) => {
        localStorage.setItem('access_token', accessToken);
        if (refreshToken) {
            localStorage.setItem('refresh_token', refreshToken);
        }
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    const getToken = () => localStorage.getItem('access_token');
    // ALLOW 'Admin' username to be admin for testing purposes
    const isAdmin = () => !!user?.is_staff || user?.username === 'Admin';

    useEffect(() => {
        const initAuth = async () => {
            const token = getToken();
            if (token && !user) {
                try {
                    const response = await fetch(`${API_URL}/user/`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    } else {
                        // If token is invalid/expired, logout
                        if (response.status === 401) logout();
                    }
                } catch (error) {
                    console.error('Failed to restore session:', error);
                }
            }
        };

        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, getToken, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
