"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SearchFilters } from '../components/SearchModal';

export interface HistorySearch {
    id: string;
    filters: SearchFilters;
    timestamp: number;
}

interface SearchHistoryContextType {
    searchHistory: HistorySearch[];
    addToHistory: (filters: SearchFilters) => void;
    clearHistory: () => void;
}

const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined);

export function SearchHistoryProvider({ children }: { children: ReactNode }) {
    const [searchHistory, setSearchHistory] = useState<HistorySearch[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('searchHistory');
            if (saved) {
                setSearchHistory(JSON.parse(saved));
            } else {
                // Pre-populate with insightful defaults if empty
                const defaults: HistorySearch[] = [
                    {
                        id: 'hist-default-1',
                        filters: {
                            origin: '',
                            radius: 50,
                            pickupDateFrom: '',
                            pickupDateTo: '',
                            // Actually SearchModal uses city, state strings. Let's use specific cities found in mockLoads
                            // Dallas, TX is a good delivery hub in mock data
                            delivery: 'Dallas, TX'
                        } as any, // casting because some optional fields might be missing in concise literal
                        timestamp: Date.now() - 3600000 // 1 hour ago
                    },
                    {
                        id: 'hist-default-2',
                        filters: {
                            origin: 'San Antonio, TX',
                            radius: 100,
                            pickupDateFrom: '',
                            pickupDateTo: '',
                            delivery: '',
                            equipmentType: 'Reefer'
                        } as any,
                        timestamp: Date.now() - 86400000 // 1 day ago
                    }
                ];
                // Ensure full shape of filters is respected to avoid issues
                const sanitizedDefaults = defaults.map(d => ({
                    ...d,
                    filters: {
                        origin: d.filters.origin || '',
                        radius: d.filters.radius || 50,
                        pickupDateFrom: d.filters.pickupDateFrom || '',
                        pickupDateTo: d.filters.pickupDateTo || '',
                        delivery: d.filters.delivery || '',
                        minRPM: d.filters.minRPM || '',
                        minTripDistance: d.filters.minTripDistance || '',
                        maxTripDistance: d.filters.maxTripDistance || '',
                        maxWeight: d.filters.maxWeight || '',
                        maxDeadhead: d.filters.maxDeadhead || '',
                        equipmentType: d.filters.equipmentType,
                        excludedServices: d.filters.excludedServices || []
                    }
                }));

                setSearchHistory(sanitizedDefaults);
            }
        } catch (e) {
            console.error('Failed to load search history from localStorage:', e);
        } finally {
            setIsInitialized(true);
        }
    }, []);

    // Save to localStorage whenever searchHistory changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
    }, [searchHistory, isInitialized]);

    const addToHistory = (filters: SearchFilters) => {
        // Prevent exact duplicates at the top of the stack
        setSearchHistory(prev => {
            const newEntry: HistorySearch = {
                id: crypto.randomUUID(),
                filters,
                timestamp: Date.now()
            };

            // Allow duplicate logic: if same filter exists, maybe move to top?
            // Let's filter out identical filters first to avoid clutter
            const filtered = prev.filter(item => JSON.stringify(item.filters) !== JSON.stringify(filters));

            // Keep only latest 50
            return [newEntry, ...filtered].slice(0, 50);
        });
    };

    const clearHistory = () => {
        setSearchHistory([]);
    };

    return (
        <SearchHistoryContext.Provider value={{ searchHistory, addToHistory, clearHistory }}>
            {children}
        </SearchHistoryContext.Provider>
    );
}

export function useSearchHistory() {
    const context = useContext(SearchHistoryContext);
    if (context === undefined) {
        throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
    }
    return context;
}
