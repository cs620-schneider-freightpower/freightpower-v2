"use client";

import { useState, useEffect } from 'react';
import { Load } from '../types/load';
import OptimizedLoadCard from './OptimizedLoadCard';

interface RecommendedLoadsRowProps {
    onLoadClick: (load: Load) => void;
}

export default function RecommendedLoadsRow({ onLoadClick }: RecommendedLoadsRowProps) {
    const [loads, setLoads] = useState<Load[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchLoads() {
            try {
                // Using hardcoded coordinates for Kansas City to ensure we get data for now
                // In a real app, this would come from the user's location or profile
                const response = await fetch('http://localhost:8000/recommend/1450181150?current_lat=39.0997&current_lon=-94.5786');

                if (!response.ok) {
                    throw new Error('Failed to fetch recommendations');
                }

                const data = await response.json();

                if (data.recommendations && Array.isArray(data.recommendations)) {
                    // Backend returns 'load_id' and 'revenue_per_mile' which we need to map to our frontend Load type
                    const mappedLoads = data.recommendations.map((rec: any) => ({
                        ...rec,
                        id: rec.id || rec.load_id,
                        loadedRPM: rec.loadedRPM || rec.revenue_per_mile || 0,
                        estTotalRPM: rec.estTotalRPM || rec.revenue_per_mile || 0,
                        pickup: {
                            ...rec.pickup,
                            emptyMiles: rec.pickup?.emptyMiles || 0,
                        },
                        delivery: {
                            ...rec.delivery,
                            emptyMiles: rec.delivery?.emptyMiles || 0,
                            instructions: rec.delivery?.instructions || [],
                        },
                    }));
                    setLoads(mappedLoads);
                } else {
                    console.warn("Unexpected data format:", data);
                    setLoads([]);
                }

            } catch (err) {
                console.error("Error fetching recommended loads:", err);
                setError('Failed to load recommendations');
            } finally {
                setIsLoading(false);
            }
        }

        fetchLoads();
    }, []);

    if (error) return null; // Hide section on error

    if (isLoading) {
        return (
            <div className="mb-6">
                <div className="relative overflow-hidden w-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 mb-4">
                    <div className="relative z-10">
                        <h2 className="text-2xl text-white font-bold mb-0">Recommended for you</h2>
                        <p className="text-base text-white opacity-90">Loading your personalized loads...</p>
                    </div>
                </div>
                <div className="flex gap-3 px-4 pb-2 overflow-x-hidden">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex-shrink-0 w-[280px] h-[200px] bg-gray-100 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (loads.length === 0) return null;

    return (
        <div className="mb-6">
            <div className="relative overflow-hidden w-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 mb-4">
                <div className="relative z-10">
                    <h2 className="text-2xl text-white font-bold mb-0">Recommended for you</h2>
                    <p className="text-base text-white opacity-90">
                        Personalized matches based on your profile
                    </p>
                </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 px-4 pb-2">
                    {loads.map((load) => (
                        <OptimizedLoadCard
                            key={load.id}
                            load={load}
                            onClick={() => onLoadClick(load)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
