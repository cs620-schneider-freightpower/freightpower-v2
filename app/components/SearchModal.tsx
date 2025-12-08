"use client";

import { useState } from 'react';
import { X, MapPin, Calendar, Search, ArrowRight } from 'lucide-react';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
    origin: string;
    radius: number;
    pickupDateFrom: string;
    pickupDateTo: string;
    delivery: string;
}

export default function SearchModal({ isOpen, onClose, onSearch }: SearchModalProps) {
    const [origin, setOrigin] = useState('');
    const [radius, setRadius] = useState(50);
    const [pickupDateFrom, setPickupDateFrom] = useState('');
    const [pickupDateTo, setPickupDateTo] = useState('');
    const [delivery, setDelivery] = useState('');

    if (!isOpen) return null;

    const handleSearch = () => {
        onSearch({
            origin,
            radius,
            pickupDateFrom,
            pickupDateTo,
            delivery
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 pointer-events-auto transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-xl pointer-events-auto flex flex-col max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Filter Loads</h2>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">

                    {/* Origin Section */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Origin Location
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    placeholder="City, State or Zip"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-semibold text-gray-700">Origin Radius</label>
                                <span className="text-sm font-medium text-[#ff6b35] bg-orange-50 px-2 py-0.5 rounded-md">
                                    {radius} miles
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="200"
                                step="10"
                                value={radius}
                                onChange={(e) => setRadius(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff6b35]"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>0 mi</span>
                                <span>200 mi</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Date Section */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            Pick-up Date Range
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-xs text-gray-500 font-medium">From</span>
                                </div>
                                <input
                                    type="date"
                                    value={pickupDateFrom}
                                    onChange={(e) => setPickupDateFrom(e.target.value)}
                                    className="w-full pl-12 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] min-w-0 text-sm"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-xs text-gray-500 font-medium">To</span>
                                </div>
                                <input
                                    type="date"
                                    value={pickupDateTo}
                                    onChange={(e) => setPickupDateTo(e.target.value)}
                                    className="w-full pl-8 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] min-w-0 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Delivery Section */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Delivery Location
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={delivery}
                                onChange={(e) => setDelivery(e.target.value)}
                                placeholder="City, State or Zip (Optional)"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
                    <button
                        onClick={handleSearch}
                        className="w-full flex items-center justify-center space-x-2 bg-[#ff6b35] hover:bg-[#ff8c61] text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98]"
                    >
                        <Search className="w-5 h-5" />
                        <span>Search Loads</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
