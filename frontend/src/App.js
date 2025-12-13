import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTicket from './pages/CreateTicket';
import ChatWidget from './components/ChatWidget';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { getToken } = useAuth();
  return getToken() ? children : <Navigate to="/login" />;
};


function App() {
  return (
    <Router>
      <AuthProvider>
        <ChatWidget />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateTicket />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;