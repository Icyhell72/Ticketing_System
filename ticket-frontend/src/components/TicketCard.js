import React from 'react';
import { StatusBadge, CategoryBadge } from './Badges';
import { useAuth } from '../context/AuthContext';

export default function TicketCard({ ticket, onStatusUpdate }) {
    const { isAdmin } = useAuth();
    const statuses = ['New', 'Under Review', 'Resolved'];

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{ticket.title}</h3>
                        <CategoryBadge category={ticket.category} />
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{ticket.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>#{ticket.id}</span>
                        <span>•</span>
                        <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="ml-4">
                    <StatusBadge status={ticket.status} />
                </div>
            </div>

            {isAdmin() && (
                <div className="border-t pt-4 flex flex-wrap gap-2">
                    {statuses.map(status => (
                        <button
                            key={status}
                            onClick={() => onStatusUpdate(ticket.id, status)}
                            className={`px-3 py-1 rounded-lg text-sm transition border ${ticket.status === status
                                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium'
                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                            disabled={ticket.status === status}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
