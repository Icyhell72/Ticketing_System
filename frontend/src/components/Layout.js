import React from 'react';
import { LogOut, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-green-500 to-teal-600 w-10 h-10 rounded-lg flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">Ticketing System</h1>
                            <p className="text-sm text-gray-600">
                                {user?.username} {isAdmin() && '(Admin)'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {children}
            </div>
        </div>
    );
}
