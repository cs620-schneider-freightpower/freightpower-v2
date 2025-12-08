'use client';

import { useState } from 'react';
import { useNatNal } from '../context/NatNalContext';
import { MapPin, Clock } from 'lucide-react';
import BottomNav from '../components/search-results/BottomNav';

export default function NatNalPage() {
    const { natNalData, setNatNalData } = useNatNal();
    const [isEditing, setIsEditing] = useState(!natNalData);

    // Form state
    // Initialize with existing data if available, otherwise empty strings
    const [formDate, setFormDate] = useState(natNalData?.date || '');
    const [formTime, setFormTime] = useState(natNalData?.time || '');
    const [formCity, setFormCity] = useState(natNalData?.city || '');
    const [formState, setFormState] = useState(natNalData?.state || '');

    const handleNatNalSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formDate && formTime && formCity && formState) {
            const newData = {
                date: formDate,
                time: formTime,
                city: formCity,
                state: formState
            };

            setNatNalData(newData);
            setIsEditing(false);
        }
    };

    const handleEdit = () => {
        if (natNalData) {
            setFormDate(natNalData.date);
            setFormTime(natNalData.time);
            setFormCity(natNalData.city);
            setFormState(natNalData.state);
        }
        setIsEditing(true);
    };

    const handleClear = () => {
        setNatNalData(null);
        setFormDate('');
        setFormTime('');
        setFormCity('');
        setFormState('');
        setIsEditing(true);
    };

    // Quick select functions
    const setQuickDate = (daysToAdd: number) => {
        const date = new Date();
        date.setDate(date.getDate() + daysToAdd);
        const formattedDate = date.toISOString().split('T')[0];
        setFormDate(formattedDate);
    };

    const setQuickTime = (hours: number) => {
        const timeString = hours.toString().padStart(2, '0') + ':00';
        setFormTime(timeString);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-[#ff6b35] px-4 py-4 flex items-center justify-between shadow-md">
                <div className="w-8" /> {/* Spacer for centering */}
                <h1 className="text-xl font-bold text-white tracking-wide">NAT / NAL</h1>
                <div className="w-8" />
            </div>

            <div className="px-4 py-6 pb-24">
                {natNalData && !isEditing ? (
                    // Display saved NAT/NAL info
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 opacity-50 z-0" />

                        <h3 className="text-lg font-bold text-gray-900 mb-6 relative z-10 flex items-center">
                            <div className="w-1 h-6 bg-[#ff6b35] rounded-full mr-3" />
                            Current Status
                        </h3>

                        <div className="space-y-6 mb-8 relative z-10">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-5 h-5 text-[#ff6b35]" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Time</p>
                                    <p className="text-lg font-bold text-gray-900">
                                        {new Date(natNalData.date).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                        <span className="text-gray-400 font-normal mx-2">at</span>
                                        {natNalData.time}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-[#ff6b35]" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Location</p>
                                    <p className="text-lg font-bold text-gray-900">
                                        {natNalData.city}, {natNalData.state}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 relative z-10">
                            <button
                                onClick={handleEdit}
                                className="flex-1 bg-[#ff6b35] text-white py-2.5 rounded-lg font-semibold hover:bg-[#ff8c61] transition-colors shadow-sm text-sm"
                                type="button"
                            >
                                Edit Status
                            </button>
                            <button
                                onClick={handleClear}
                                className="flex-1 bg-white text-gray-600 py-2.5 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                                type="button"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                ) : (
                    // Show form
                    <div className="max-w-md mx-auto">
                        <div className="mb-8 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-8 h-8 text-[#ff6b35]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Set Availability</h3>
                            <p className="text-sm text-gray-500 max-w-xs mx-auto">
                                Update your location and time to get the best load matches
                            </p>
                        </div>

                        <form onSubmit={handleNatNalSubmit} className="space-y-6">
                            {/* Next Available Time Section */}
                            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                                <h4 className="font-bold text-gray-900 mb-4 flex items-center text-sm border-b border-gray-100 pb-3">
                                    <Clock className="w-4 h-4 text-[#ff6b35] mr-2" />
                                    NEXT AVAILABLE TIME
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 ml-1">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            value={formDate}
                                            onChange={(e) => setFormDate(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-gray-900 font-medium"
                                            required
                                        />
                                        <div className="flex gap-2 mt-3">
                                            <button
                                                type="button"
                                                onClick={() => setQuickDate(7)}
                                                className="flex-1 text-xs py-2 px-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors font-medium"
                                            >
                                                +1 Week
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setQuickDate(30)}
                                                className="flex-1 text-xs py-2 px-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors font-medium"
                                            >
                                                +1 Month
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 ml-1">
                                            Time
                                        </label>
                                        <input
                                            type="time"
                                            value={formTime}
                                            onChange={(e) => setFormTime(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-gray-900 font-medium"
                                            required
                                        />
                                        <div className="grid grid-cols-4 gap-2 mt-3">
                                            {[0, 6, 12, 18].map(hour => (
                                                <button
                                                    key={hour}
                                                    type="button"
                                                    onClick={() => setQuickTime(hour)}
                                                    className="text-xs py-2 px-1 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors font-medium"
                                                >
                                                    {hour === 0 ? '12 AM' : hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Next Available Location Section */}
                            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                                <h4 className="font-bold text-gray-900 mb-4 flex items-center text-sm border-b border-gray-100 pb-3">
                                    <MapPin className="w-4 h-4 text-[#ff6b35] mr-2" />
                                    NEXT AVAILABLE LOCATION
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 ml-1">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            value={formCity}
                                            onChange={(e) => setFormCity(e.target.value)}
                                            placeholder="Madison"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-gray-900 font-medium"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 ml-1">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            value={formState}
                                            onChange={(e) => setFormState(e.target.value.toUpperCase())}
                                            placeholder="WI"
                                            maxLength={2}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent uppercase text-gray-900 font-medium"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#ff6b35] text-white py-4 rounded-xl font-bold text-base hover:bg-[#ff8c61] transition-all shadow-lg shadow-orange-200 mt-4"
                            >
                                Update Loads
                            </button>
                        </form>
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
}
