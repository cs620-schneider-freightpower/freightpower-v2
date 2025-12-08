"use client";

import { useState } from 'react';
import { X, Search, Trash2, Clock, ChevronRight } from 'lucide-react';
import { useSavedSearches, SavedSearch } from '../context/SavedSearchesContext';
import { SearchFilters } from './SearchModal';

interface SavedSearchesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApplySearch: (filters: SearchFilters) => void;
}

export default function SavedSearchesModal({ isOpen, onClose, onApplySearch }: SavedSearchesModalProps) {
    const { savedSearches, removeSearch } = useSavedSearches();

    if (!isOpen) return null;

    const handleApply = (search: SavedSearch) => {
        onApplySearch(search.filters);
        onClose();
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 animate-fade-in"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl animate-scale-in overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Saved Searches</h2>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 max-h-[60vh] overflow-y-auto">
                    {savedSearches.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p className="font-medium">No saved searches</p>
                            <p className="text-sm mt-1">
                                Save your frequent searches<br />to access them quickly here.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {savedSearches.map((search) => (
                                <div
                                    key={search.id}
                                    className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div
                                            className="flex-1 cursor-pointer"
                                            onClick={() => handleApply(search)}
                                        >
                                            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#ff6b35] transition-colors">
                                                {search.name}
                                            </h3>
                                            <div className="flex items-center text-xs text-gray-500 mb-2">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {formatDate(search.createdAt)}
                                            </div>

                                            {/* Filters Summary Tag */}
                                            <div className="flex flex-wrap gap-1">
                                                {search.filters.equipmentType && (
                                                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-medium">
                                                        {search.filters.equipmentType}
                                                    </span>
                                                )}
                                                {search.filters.minRPM && (
                                                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-medium">
                                                        Min ${search.filters.minRPM}
                                                    </span>
                                                )}
                                                {search.filters.maxWeight && (
                                                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-medium">
                                                        {search.filters.maxWeight} lbs
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeSearch(search.id);
                                            }}
                                            className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                                            title="Remove saved search"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
