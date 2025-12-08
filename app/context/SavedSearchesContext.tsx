"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SearchFilters } from '../components/SearchModal';

export interface SavedSearch {
    id: string;
    name: string;
    filters: SearchFilters;
    createdAt: number;
}

interface SavedSearchesContextType {
    savedSearches: SavedSearch[];
    saveSearch: (filters: SearchFilters, name?: string) => void;
    removeSearch: (id: string) => void;
    isSearchSaved: (filters: SearchFilters) => boolean;
}

const SavedSearchesContext = createContext<SavedSearchesContextType | undefined>(undefined);

export function SavedSearchesProvider({ children }: { children: ReactNode }) {
    const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('savedSearches');
            if (saved) {
                setSavedSearches(JSON.parse(saved));
            } else {
                // Pre-populate with defaults if empty
                const defaults: SavedSearch[] = [
                    {
                        id: 'default-1',
                        name: 'Florida Inbound',
                        filters: {
                            origin: '',
                            radius: 50,
                            pickupDateFrom: '',
                            pickupDateTo: '',
                            delivery: 'Tampa, FL', // Matches Load 11 directly or near logic
                            minRPM: '',
                            minTripDistance: '',
                            maxTripDistance: '',
                            maxWeight: '',
                            maxDeadhead: '',
                            equipmentType: undefined,
                            excludedServices: []
                        },
                        createdAt: Date.now()
                    },
                    {
                        id: 'default-2',
                        name: 'Chicago Outbound',
                        filters: {
                            origin: 'Joliet, IL', // Matches Load 4 directly
                            radius: 100,
                            pickupDateFrom: '',
                            pickupDateTo: '',
                            delivery: '',
                            minRPM: '',
                            minTripDistance: '',
                            maxTripDistance: '',
                            maxWeight: '',
                            maxDeadhead: '',
                            equipmentType: 'Van',
                            excludedServices: []
                        },
                        createdAt: Date.now()
                    }
                ];
                setSavedSearches(defaults);
            }
        } catch (e) {
            console.error('Failed to load saved searches from localStorage:', e);
        } finally {
            setIsInitialized(true);
        }
    }, []);

    // Save to localStorage whenever savedSearches changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
        }
    }, [savedSearches, isInitialized]);

    const isSearchSaved = (filters: SearchFilters) => {
        return savedSearches.some(s => {
            // Compare essential fields for equality
            // We use JSON.stringify for deep comparison of the filters object
            // This assumes key order is consistent, which it usually is when created from the same object literal structure
            // Ideally we'd do a deep equal, but this suffices for the modal's "exact match" check
            return JSON.stringify(s.filters) === JSON.stringify(filters);
        });
    };

    const saveSearch = (filters: SearchFilters, customName?: string) => {
        // Prevent duplicates
        if (isSearchSaved(filters)) return;

        // Generate a default name if not provided
        let name = customName || 'Saved Search';
        if (!customName) {
            if (filters.origin && filters.delivery) {
                name = `${filters.origin.split(',')[0]} to ${filters.delivery.split(',')[0]}`;
            } else if (filters.origin) {
                name = `From ${filters.origin.split(',')[0]}`;
            } else if (filters.delivery) {
                name = `To ${filters.delivery.split(',')[0]}`;
            } else if (filters.minRPM) {
                name = `High Paying ($${filters.minRPM}+)`;
            }
        }

        const newSearch: SavedSearch = {
            id: crypto.randomUUID(),
            name,
            filters,
            createdAt: Date.now()
        };

        setSavedSearches(prev => [newSearch, ...prev]);
    };

    const removeSearch = (id: string) => {
        setSavedSearches(prev => prev.filter(s => s.id !== id));
    };

    return (
        <SavedSearchesContext.Provider value={{ savedSearches, saveSearch, removeSearch, isSearchSaved }}>
            {children}
        </SavedSearchesContext.Provider>
    );
}

export function useSavedSearches() {
    const context = useContext(SavedSearchesContext);
    if (context === undefined) {
        throw new Error('useSavedSearches must be used within a SavedSearchesProvider');
    }
    return context;
}
