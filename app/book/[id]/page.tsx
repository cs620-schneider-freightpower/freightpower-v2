"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Truck, MapPin, DollarSign, Weight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Load } from '../../types/load';
import { identifyLoadSource, findLoadById, LoadSource } from '../../utils/loadUtils';
import { useBookedLoads } from '../../context/BookedLoadsContext';

type BookingState = 'loading' | 'ready' | 'confirming' | 'success' | 'error';

interface BookingPageProps {
    params: Promise<{ id: string }>;
}

export default function BookingPage({ params }: BookingPageProps) {
    const router = useRouter();
    const { bookLoad } = useBookedLoads();
    const [loadId, setLoadId] = useState<string>('');
    const [load, setLoad] = useState<Load | null>(null);
    const [source, setSource] = useState<LoadSource | null>(null);
    const [state, setState] = useState<BookingState>('loading');
    const [bookingId, setBookingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Unwrap params and fetch load data
    useEffect(() => {
        async function init() {
            const { id } = await params;
            setLoadId(id);

            const loadSource = identifyLoadSource(id);
            setSource(loadSource);

            if (loadSource === 'mock' || loadSource === 'madison') {
                // Local data - fetch from memory
                const foundLoad = findLoadById(id);
                if (foundLoad) {
                    setLoad(foundLoad);
                    setState('ready');
                } else {
                    setError(`Load with ID "${id}" not found`);
                    setState('error');
                }
            } else {
                // Backend load - fetch from API
                try {
                    const response = await fetch(`http://localhost:8000/load/${id}`);
                    if (!response.ok) {
                        throw new Error('Load not found');
                    }
                    const data = await response.json();
                    setLoad(data);
                    setState('ready');
                } catch {
                    // For demo purposes, show a placeholder for backend loads
                    setError(`Backend load "${id}" - API endpoint not implemented yet`);
                    setState('error');
                }
            }
        }
        init();
    }, [params]);

    const handleConfirmBooking = async () => {
        setState('confirming');

        try {
            if (source === 'mock' || source === 'madison') {
                // Mock/Madison: Simulate instant success with delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                const generatedBookingId = `BK-${loadId}-${Date.now().toString(36).toUpperCase()}`;
                setBookingId(generatedBookingId);
                // Add to booked loads context
                if (load) {
                    bookLoad(load, generatedBookingId);
                }
                setState('success');
            } else {
                // Backend: Call the booking API
                const response = await fetch('/api/book', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ loadId }),
                });

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(data.error || 'Booking failed');
                }

                setBookingId(data.bookingId);
                // Add to booked loads context
                if (load) {
                    bookLoad(load, data.bookingId);
                }
                setState('success');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Booking failed');
            setState('error');
        }
    };

    const formatWeight = (weight: number) => `${(weight / 1000).toFixed(1)}k lbs`;

    // Loading state
    if (state === 'loading') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading load details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (state === 'error') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Error</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => router.back()}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-xl transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Success state
    if (state === 'success') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
                    <p className="text-gray-600 mb-2">Your load has been successfully booked.</p>
                    <p className="text-sm text-gray-500 mb-6">
                        Booking ID: <span className="font-mono font-semibold text-gray-700">{bookingId}</span>
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={() => router.push('/my-loads')}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                        >
                            View My Loads
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-xl transition-colors"
                        >
                            Find More Loads
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Ready state - show booking form
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Confirm Booking</h1>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                {/* Data Source Badge */}
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${source === 'backend'
                        ? 'bg-blue-100 text-blue-700'
                        : source === 'madison'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                        {source === 'backend' ? 'Live Load' : source === 'madison' ? 'Madison Area' : 'Available Load'}
                    </span>
                    <span className="text-sm text-gray-500">ID: {loadId}</span>
                </div>

                {/* Load Summary Card */}
                {load && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Price Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-6 text-white">
                            <div className="flex items-center gap-2 mb-1">
                                <DollarSign className="w-6 h-6" />
                                <span className="text-3xl font-bold">${load.price}</span>
                            </div>
                            <p className="text-orange-100">
                                ${load.loadedRPM.toFixed(2)}/mi • {load.distance} miles
                            </p>
                        </div>

                        {/* Route Info */}
                        <div className="p-6 space-y-4">
                            {/* Pickup */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase">Pickup</p>
                                    <p className="font-bold text-gray-900">{load.pickup.city}, {load.pickup.state}</p>
                                    <p className="text-sm text-gray-600">{load.pickup.date} • {load.pickup.time}</p>
                                </div>
                            </div>

                            {/* Delivery */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase">Delivery</p>
                                    <p className="font-bold text-gray-900">{load.delivery.city}, {load.delivery.state}</p>
                                    <p className="text-sm text-gray-600">{load.delivery.date} • {load.delivery.time}</p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <Weight className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-700">{formatWeight(load.weight)}</span>
                                </div>
                                {load.equipmentType && (
                                    <div className="flex items-center gap-2">
                                        <Truck className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-700">{load.equipmentType}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Confirm Button */}
                <button
                    onClick={handleConfirmBooking}
                    disabled={state === 'confirming'}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
                >
                    {state === 'confirming' ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Confirm Booking'
                    )}
                </button>

                <p className="text-center text-sm text-gray-500">
                    By confirming, you agree to the load terms and conditions.
                </p>
            </div>
        </div>
    );
}
