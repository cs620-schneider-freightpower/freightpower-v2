"use client";

import { useEffect, useState } from 'react';
import { X, Search, Clock, ChevronRight, Trash2 } from 'lucide-react';
import { useSearchHistory } from '../context/SearchHistoryContext';
import { SearchFilters } from './SearchModal';

interface SearchHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApplySearch: (filters: SearchFilters) => void;
}

export default function SearchHistoryModal({ isOpen, onClose, onApplySearch }: SearchHistoryModalProps) {
    const { searchHistory, removeFromHistory, clearHistory } = useSearchHistory();
    if (!isOpen) return null;

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        // If less than 24h, show relative or time
        if (diff < 24 * 60 * 60 * 1000) {
            if (date.getDate() === now.getDate()) {
                return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
            } else {
                return 'Yesterday';
            }
        }
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    const getSummary = (filters: SearchFilters) => {
        const parts = [];
        if (filters.origin) parts.push(`From ${filters.origin.split(',')[0]}`);
        if (filters.delivery) parts.push(`To ${filters.delivery.split(',')[0]}`);
        if (filters.equipmentType) parts.push(filters.equipmentType);
        if (filters.minRPM) parts.push(`$${filters.minRPM}+`);
        if (filters.pickupDateFrom) parts.push(filters.pickupDateFrom);

        if (parts.length === 0) return 'All Loads';
        return parts.join(' • ');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 animate-fade-in"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl animate-scale-in overflow-hidden flex flex-col max-h-[70vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Recent Searches</h2>
                            <p className="text-xs text-gray-500">Your search activity</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                    {searchHistory.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                                <Search className="w-8 h-8" />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">No History Yet</h3>
                            <p className="text-xs text-gray-500 max-w-[200px] mt-1">
                                Searches you perform will appear here automatically.
                            </p>
                        </div>
                    ) : (
                        searchHistory.map((item) => (
                            <div
                                key={item.id}
                                className="w-full bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group flex items-center gap-3"
                            >
                                <button
                                    onClick={() => {
                                        onApplySearch(item.filters);
                                        onClose();
                                    }}
                                    className="flex-1 min-w-0 text-left flex items-center gap-4"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-semibold text-gray-900 truncate">
                                                {getSummary(item.filters)}
                                            </span>
                                            <span className="text-[10px] text-gray-400 font-medium px-2 py-0.5 bg-gray-50 rounded-full">
                                                {formatTime(item.timestamp)}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500 truncate flex items-center gap-1">
                                            {item.filters.radius > 0 && <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">±{item.filters.radius}mi</span>}
                                            {item.filters.delivery && <span>to {item.filters.delivery}</span>}
                                        </div>
                                    </div>

                                    <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromHistory(item.id);
                                    }}
                                    className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                                    title="Delete search"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {searchHistory.length > 0 && (
                    <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0">
                        <button
                            onClick={() => {
                                if (confirm('Are you sure you want to clear your search history?')) {
                                    clearHistory();
                                }
                            }}
                            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl text-red-600 hover:bg-red-50 text-sm font-semibold transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            Clear History
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
