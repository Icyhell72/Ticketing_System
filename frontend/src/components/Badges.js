import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export const StatusBadge = ({ status }) => {
    const statusConfig = {
        'New': { color: 'bg-blue-100 text-blue-800', icon: Clock },
        'Under Review': { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
        'Resolved': { color: 'bg-green-100 text-green-800', icon: CheckCircle }
    };

    const config = statusConfig[status] || statusConfig['New'];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
            <Icon className="w-3 h-3 mr-1" />
            {status}
        </span>
    );
};

export const CategoryBadge = ({ category }) => {
    const colors = {
        'Technical': 'bg-purple-100 text-purple-800',
        'Financial': 'bg-green-100 text-green-800',
        'Product': 'bg-orange-100 text-orange-800'
    };

    return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${colors[category] || 'bg-gray-100 text-gray-800'}`}>
            {category}
        </span>
    );
};
