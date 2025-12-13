import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Plus, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import TicketCard from '../components/TicketCard';

const API_URL = 'http://127.0.0.1:8000/api';

export default function Dashboard() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({ category: '', status: '', search: '' });
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const { getToken, isAdmin } = useAuth();
    const navigate = useNavigate();

    const fetchTickets = useCallback(async (urlOverride = null) => {
        setLoading(true);
        setError('');

        try {
            let url = urlOverride;
            if (!url) {
                url = `${API_URL}/tickets/`;
                const params = new URLSearchParams();

                if (filters.category) params.append('category', filters.category);
                if (filters.status) params.append('status', filters.status);
                if (filters.search) params.append('search', filters.search);

                if (params.toString()) url += `?${params.toString()}`;
            }

            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.results) {
                    setTickets(data.results);
                    setNextPage(data.next);
                    setPrevPage(data.previous);
                } else {
                    setTickets(data);
                    setNextPage(null);
                    setPrevPage(null);
                }
            } else {
                if (response.status === 401) {
                    navigate('/login');
                }
                setError('Failed to fetch tickets. Status: ' + response.status);
            }
        } catch (err) {
            setError('Connection error: ' + err.message);
        } finally {
            setLoading(false);
        }
    }, [filters, getToken, navigate]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const handleStatusUpdate = async (ticketId, newStatus) => {
        try {
            const response = await fetch(`${API_URL}/tickets/${ticketId}/status/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                fetchTickets();
            } else {
                setError('Failed to update status');
            }
        } catch (err) {
            setError('Connection error');
        }
    };

    return (
        <Layout>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-4 flex-1">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search tickets..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            />
                        </div>

                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        >
                            <option value="">All Categories</option>
                            <option value="Technical">Technical</option>
                            <option value="Financial">Financial</option>
                            <option value="Product">Product</option>
                        </select>

                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        >
                            <option value="">All Status</option>
                            <option value="New">New</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>

                    {!isAdmin() && (
                        <Link
                            to="/create"
                            className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            <Plus className="w-4 h-4" />
                            <span>New Ticket</span>
                        </Link>
                    )}
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {loading && (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading tickets...</p>
                </div>
            )}

            {!loading && (
                <div className="space-y-4">

                    {tickets.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No tickets found</h3>
                            <p className="text-gray-600">
                                {!isAdmin() ? 'Create your first ticket to get started!' : 'No tickets match your filters.'}
                            </p>
                        </div>
                    ) : (
                        <>
                            {tickets.map((ticket) => (
                                <TicketCard
                                    key={ticket.id}
                                    ticket={ticket}
                                    onStatusUpdate={handleStatusUpdate}
                                />
                            ))}

                            {/* Pagination Controls */}
                            <div className="flex justify-between items-center mt-6">
                                <button
                                    onClick={() => fetchTickets(prevPage)}
                                    disabled={!prevPage}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${prevPage
                                        ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => fetchTickets(nextPage)}
                                    disabled={!nextPage}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${nextPage
                                        ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </Layout>
    );
}
