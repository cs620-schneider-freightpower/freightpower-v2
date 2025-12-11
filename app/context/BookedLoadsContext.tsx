"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Load } from '../types/load';

export interface BookedLoad extends Load {
    bookingId: string;
    bookedAt: string;
}

interface BookedLoadsContextType {
    bookedLoads: BookedLoad[];
    bookLoad: (load: Load, bookingId: string) => void;
    isBooked: (loadId: string) => boolean;
    getBookingId: (loadId: string) => string | null;
}

const BookedLoadsContext = createContext<BookedLoadsContextType | undefined>(undefined);

export function BookedLoadsProvider({ children }: { children: ReactNode }) {
    const [bookedLoads, setBookedLoads] = useState<BookedLoad[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('bookedLoads');
            if (saved) {
                const parsed = JSON.parse(saved);
                setBookedLoads(parsed);
            }
        } catch (e) {
            console.error('Failed to load booked loads from localStorage:', e);
        } finally {
            setIsInitialized(true);
        }
    }, []);

    // Save to localStorage whenever bookedLoads changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('bookedLoads', JSON.stringify(bookedLoads));
        }
    }, [bookedLoads, isInitialized]);

    const bookLoad = (load: Load, bookingId: string) => {
        setBookedLoads(prev => {
            // Don't add if already booked
            if (prev.some(l => l.id === load.id)) {
                return prev;
            }

            const bookedLoad: BookedLoad = {
                ...load,
                status: 'assigned', // Newly booked loads are assigned
                bookingId,
                bookedAt: new Date().toISOString(),
            };

            // Add to the beginning so it appears at top
            return [bookedLoad, ...prev];
        });
    };

    const isBooked = (loadId: string) => {
        return bookedLoads.some(l => l.id === loadId);
    };

    const getBookingId = (loadId: string) => {
        const load = bookedLoads.find(l => l.id === loadId);
        return load?.bookingId || null;
    };

    return (
        <BookedLoadsContext.Provider value={{ bookedLoads, bookLoad, isBooked, getBookingId }}>
            {children}
        </BookedLoadsContext.Provider>
    );
}

export function useBookedLoads() {
    const context = useContext(BookedLoadsContext);
    if (context === undefined) {
        throw new Error('useBookedLoads must be used within a BookedLoadsProvider');
    }
    return context;
}
