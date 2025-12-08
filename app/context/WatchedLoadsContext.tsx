"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Load } from '../types/load';

interface WatchedLoadsContextType {
    watchedLoads: Load[];
    toggleWatch: (load: Load) => void;
    isWatched: (loadId: string) => boolean;
}

const WatchedLoadsContext = createContext<WatchedLoadsContextType | undefined>(undefined);

export function WatchedLoadsProvider({ children }: { children: ReactNode }) {
    const [watchedLoads, setWatchedLoads] = useState<Load[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('watchedLoads');
            if (saved) {
                setWatchedLoads(JSON.parse(saved));
            }
        } catch (e) {
            console.error('Failed to load watched loads from localStorage:', e);
        } finally {
            setIsInitialized(true);
        }
    }, []);

    // Save to localStorage whenever watchedLoads changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('watchedLoads', JSON.stringify(watchedLoads));
        }
    }, [watchedLoads, isInitialized]);

    const toggleWatch = (load: Load) => {
        setWatchedLoads(prev => {
            const isWatched = prev.some(l => l.id === load.id);
            if (isWatched) {
                return prev.filter(l => l.id !== load.id);
            } else {
                return [...prev, load];
            }
        });
    };

    const isWatched = (loadId: string) => {
        return watchedLoads.some(l => l.id === loadId);
    };

    return (
        <WatchedLoadsContext.Provider value={{ watchedLoads, toggleWatch, isWatched }}>
            {children}
        </WatchedLoadsContext.Provider>
    );
}

export function useWatchedLoads() {
    const context = useContext(WatchedLoadsContext);
    if (context === undefined) {
        throw new Error('useWatchedLoads must be used within a WatchedLoadsProvider');
    }
    return context;
}
