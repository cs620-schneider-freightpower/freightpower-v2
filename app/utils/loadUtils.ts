import { Load } from '../types/load';
import { mockLoads } from '../data/mockLoads';
import { madisonLoads } from '../data/madisonLoads';

export type LoadSource = 'mock' | 'madison' | 'backend';

/**
 * Identifies the data source of a load based on its ID pattern.
 * - IDs starting with "mad-" are from madisonLoads
 * - Numeric-only IDs are from mockLoads
 * - All other IDs are assumed to be from the backend API
 */
export function identifyLoadSource(id: string): LoadSource {
    if (id.startsWith('mad-')) return 'madison';
    if (/^\d+$/.test(id)) return 'mock';
    return 'backend';
}

/**
 * Finds a load by ID from local data sources (mockLoads and madisonLoads).
 * Returns null if not found (e.g., backend-only loads).
 */
export function findLoadById(id: string): Load | null {
    const source = identifyLoadSource(id);

    if (source === 'madison') {
        return madisonLoads.find(load => load.id === id) || null;
    }

    if (source === 'mock') {
        return mockLoads.find(load => load.id === id) || null;
    }

    // Backend loads are not available locally
    return null;
}

/**
 * Gets all local loads combined from both data sources.
 */
export function getAllLocalLoads(): Load[] {
    return [...mockLoads, ...madisonLoads];
}
