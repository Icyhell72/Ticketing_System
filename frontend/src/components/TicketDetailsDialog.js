import React from 'react';
import { X, Download, Calendar, Tag, AlertCircle } from 'lucide-react';
import { StatusBadge, CategoryBadge } from './Badges';

export default function TicketDetailsDialog({ ticket, isOpen, onClose }) {
    if (!isOpen || !ticket) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getAttachmentUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        return `http://127.0.0.1:8000${url}`;
    };
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                onClick={onClose}
            ></div>

            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-gray-100">
                        <div className="flex justify-between items-start">
                            <div className="flex-1 pr-8">
                                <h3 className="text-xl font-semibold leading-6 text-gray-900" id="modal-title">
                                    {ticket.title}
                                </h3>
                                <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                                    <span className="font-mono">#{ticket.id}</span>
                                    <span>•</span>
                                    <span className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {formatDate(ticket.createdAt)}
                                    </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                onClick={onClose}
                            >
                                <span className="sr-only">Close</span>
                                <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white px-4 py-5 sm:p-6 space-y-6">
                        <div className="flex space-x-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Status</label>
                                <StatusBadge status={ticket.status} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Category</label>
                                <CategoryBadge category={ticket.category} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Description</label>
                            <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-wrap leading-relaxed">
                                {ticket.description}
                            </div>
                        </div>
                        {ticket.attachment && (
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Attachment</label>
                                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors group">
                                    <div className="flex items-center space-x-3 truncate">
                                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                            <Tag className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 truncate max-w-[200px] sm:max-w-xs">
                                            {ticket.attachment.split('/').pop()}
                                        </span>
                                    </div>
                                    <a
                                        href={getAttachmentUrl(ticket.attachment)}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                                    >
                                        <Download className="w-4 h-4 mr-1.5" />
                                        Download
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
