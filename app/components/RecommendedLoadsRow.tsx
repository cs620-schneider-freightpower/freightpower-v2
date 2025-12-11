"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { Load } from '../types/load';
import OptimizedLoadCard from './OptimizedLoadCard';
import SectionHeader from './SectionHeader';
import { useUser } from '../context/UserContext';

interface RecommendedLoadsRowProps {
    onLoadClick: (load: Load) => void;
    watchedLoadIds: Set<string>;
    onToggleWatch: (load: Load) => void;
}

export default function RecommendedLoadsRow({ onLoadClick, watchedLoadIds, onToggleWatch }: RecommendedLoadsRowProps) {
    const { userId } = useUser();
    const [loads, setLoads] = useState<Load[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchLoads() {
            setIsLoading(true);
            try {
                // Using hardcoded coordinates for Kansas City to ensure we get data for now
                // In a real app, this would come from the user's location or profile
                const response = await fetch(`http://localhost:8000/recommend/${userId}?current_lat=43.0731&current_lon=-89.4012&limit=20`);

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
    }, [userId]);

    if (error) return null; // Hide section on error

    if (isLoading) {
        return (
            <div className="mb-6">
                <SectionHeader
                    title="Recommended for you"
                    subtitle="Loading your personalized loads..."
                    icon={Sparkles}
                    iconColor="text-blue-600"
                    iconBgColor="bg-blue-50"
                />
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
            <SectionHeader
                title="Recommended for you"
                subtitle="Personalized matches based on your profile"
                icon={Sparkles}
                iconColor="text-blue-600"
                iconBgColor="bg-blue-50"
            />

            {/* Horizontal Scroll Container */}
            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 px-4 pb-2">
                    {loads.map((load) => (
                        <OptimizedLoadCard
                            key={load.id}
                            load={load}
                            onClick={() => onLoadClick(load)}
                            isWatched={watchedLoadIds.has(load.id)}
                            onToggleWatch={() => onToggleWatch(load)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
