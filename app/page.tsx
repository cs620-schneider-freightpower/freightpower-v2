"use client"
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2 } from 'lucide-react';
import OptimizedLoadCard from './components/OptimizedLoadCard';
import LoadDetailsModal from './components/LoadDetailsModal';
import BottomNav from './components/search-results/BottomNav';
import RecommendedLoadsRow from './components/RecommendedLoadsRow';
import { mockLoads } from './data/mockLoads';
import { Load } from './types/load';
import { useNatNal } from './context/NatNalContext';

import { useWatchedLoads } from './context/WatchedLoadsContext';

import SearchModal, { SearchFilters } from './components/SearchModal';

// ... existing imports ...

export default function Optimized() {
  const router = useRouter();
  const { natNalData } = useNatNal();
  const { watchedLoads, toggleWatch, isWatched } = useWatchedLoads();

  console.log('🔷 Search page component rendered');
  console.log('🔷 NAT/NAL data from context:', natNalData);

  const [searchInput, setSearchInput] = useState('');
  const [aiLoads, setAiLoads] = useState<Load[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedDestination, setSearchedDestination] = useState('');
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [filteredLoads, setFilteredLoads] = useState<Load[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // Split loads into different sections
  const loadsNearYou = mockLoads.slice(2, 6); // Oakland, SF, Modesto, Fresno
  const californiaToTexas = mockLoads.filter(load =>
    load.pickup.state === 'CA' && load.delivery.state === 'TX'
  ).slice(0, 4);

  // Filter loads based on NAT/NAL
  const natNalLoads = useMemo(() => {
    // ... existing memo logic ...
    console.log('🔍 Filtering loads with NAT/NAL data:', natNalData);

    if (!natNalData) {
      console.log('❌ No NAT/NAL data, returning empty array');
      return [];
    }

    const filtered = mockLoads.filter(load => {
      // Match location: same city OR same state
      const cityMatch = load.pickup.city.toLowerCase() === natNalData.city.toLowerCase();
      const stateMatch = load.pickup.state === natNalData.state;
      const locationMatch = (cityMatch && stateMatch) || stateMatch;

      console.log(`Load ${load.id}: ${load.pickup.city}, ${load.pickup.state} - Match: ${locationMatch}`);

      // For simplicity, just filter by location
      // In a real app, you'd also compare dates
      return locationMatch;
    }).slice(0, 4); // Limit to 4 loads

    console.log('✅ Found', filtered.length, 'matching loads');
    return filtered;
  }, [natNalData]);

  // OLD handleSearch function kept for reference if needed, but not triggered by modal yet
  const handleAiSearch = async (destination: string) => {
    if (!destination.trim()) return;

    setIsLoading(true);
    setError(null);
    setAiLoads([]); // Clear previous results
    setSearchedDestination(destination.trim());

    try {
      const response = await fetch('/api/generate-loads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destination: destination.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate loads');
      }

      setAiLoads(data.loads);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate loads');
      console.error('Error generating loads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchFilters = (filters: SearchFilters) => {
    console.log('Applying filters:', filters);
    setIsFiltering(true);

    const results = mockLoads.filter(load => {
      let matches = true;

      // Filter by Origin
      if (filters.origin) {
        const originTerm = filters.origin.toLowerCase();
        const cityMatch = load.pickup.city.toLowerCase().includes(originTerm);
        const stateMatch = load.pickup.state.toLowerCase().includes(originTerm);
        // Also check address if available, though UI mainly asks for City/State
        const addressMatch = load.pickup.address?.toLowerCase().includes(originTerm);

        matches = matches && (cityMatch || stateMatch || !!addressMatch);
      }

      // Filter by Delivery
      if (filters.delivery) {
        const deliveryTerm = filters.delivery.toLowerCase();
        const cityMatch = load.delivery.city.toLowerCase().includes(deliveryTerm);
        const stateMatch = load.delivery.state.toLowerCase().includes(deliveryTerm);

        matches = matches && (cityMatch || stateMatch);
      }

      // Filter by Date Range
      // Server data format: "Dec 17 2025"
      if (filters.pickupDateFrom || filters.pickupDateTo) {
        const loadDate = new Date(load.pickup.date);

        if (filters.pickupDateFrom) {
          const fromDate = new Date(filters.pickupDateFrom);
          // Set to start of day for accurate comparison
          fromDate.setHours(0, 0, 0, 0);
          if (loadDate < fromDate) matches = false;
        }

        if (filters.pickupDateTo) {
          const toDate = new Date(filters.pickupDateTo);
          // Set to end of day
          toDate.setHours(23, 59, 59, 999);
          if (loadDate > toDate) matches = false;
        }
      }

      // Filter by Min RPM
      if (filters.minRPM) {
        if (load.loadedRPM < parseFloat(filters.minRPM)) {
          matches = false;
        }
      }

      // Filter by Trip Distance
      if (filters.minTripDistance) {
        if (load.distance < parseFloat(filters.minTripDistance)) {
          matches = false;
        }
      }
      if (filters.maxTripDistance) {
        if (load.distance > parseFloat(filters.maxTripDistance)) {
          matches = false;
        }
      }

      // Filter by Max Weight
      if (filters.maxWeight) {
        if (load.weight > parseFloat(filters.maxWeight)) {
          matches = false;
        }
      }

      // Filter by Max Deadhead (Empty Miles at Pickup)
      if (filters.maxDeadhead) {
        if (load.pickup.emptyMiles > parseFloat(filters.maxDeadhead)) {
          matches = false;
        }
      }

      // Filter by Equipment Type
      if (filters.equipmentType) {
        if (load.equipmentType !== filters.equipmentType) {
          matches = false;
        }
      }

      // Filter by Service Exclusions
      // If a service is "excluded" (checked), we filter OUT loads that require it.
      if (filters.excludedServices && filters.excludedServices.length > 0) {
        const hasExcludedRequirement = filters.excludedServices.some(service =>
          load.requirements?.includes(service)
        );
        if (hasExcludedRequirement) {
          matches = false;
        }
      }

      return matches;
    });

    setFilteredLoads(results);

    // Scroll to top to see results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyElementDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Legacy behavior
    }
  };

  const handleLoadClick = (load: Load) => {
    setSelectedLoad(load);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLoad(null);
  };

  const handleBookLoad = (loadId: string) => {
    // Navigate to the booking page
    window.location.href = `/book/${loadId}`;
  };

  // Add function to clear search
  const clearSearch = () => {
    setIsFiltering(false);
    setFilteredLoads([]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Search Bar - Fixed at top */}
      <div className="sticky top-0 z-20 bg-white px-4 pt-4 mb-2 border-b border-gray-100">
        <div
          className="flex items-center bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
          onClick={() => setIsSearchModalOpen(true)}
        >
          <Search className="w-5 h-5 text-[#ff6b35] mr-3" />
          <div className="flex-1">
            <div className="text-gray-900 font-medium">Where to?</div>
          </div>
          {isFiltering && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearSearch();
              }}
              className="text-xs font-semibold text-gray-500 hover:text-gray-900 bg-white px-2 py-1 rounded border border-gray-200"
            >
              Clear
            </button>
          )}
        </div>
        {error && (
          <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
            {error}
          </div>
        )}
      </div>

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={handleSearchFilters}
      />

      {/* Main Content - with bottom padding for nav */}
      <div className="">

        {/* Filtered Results Section */}
        {isFiltering && (
          <div className="mb-6">
            <div className="relative overflow-hidden w-full bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-3 mb-4">
              <div className="relative z-10">
                <h2 className="text-2xl text-white font-bold mb-0">Search Results</h2>
                <p className="text-base text-white">{filteredLoads.length} loads found</p>
              </div>
            </div>

            {filteredLoads.length === 0 ? (
              <div className="text-center py-8 px-4 text-gray-500">
                No loads found matching your criteria. Try adjusting your filters.
              </div>
            ) : (
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 px-4 pb-2">
                  {filteredLoads.map((load) => (
                    <OptimizedLoadCard
                      key={load.id}
                      load={load}
                      onClick={() => handleLoadClick(load)}
                      isWatched={isWatched(load.id)}
                      onToggleWatch={() => toggleWatch(load)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI Generated Loads Section */}
        {aiLoads.length > 0 && !isFiltering && (
          <div className="mb-6">
            <div className="relative overflow-hidden w-full bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-3 mb-4">
              <div className="relative z-10">
                <h2 className="text-2xl text-white font-bold mb-0">Madison, WI to {searchedDestination}</h2>
                {/* <p className="text-base text-white">AI-generated loads • {aiLoads.length} available</p> */}
              </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 px-4 pb-2">
                {aiLoads.map((load) => (
                  <OptimizedLoadCard
                    key={load.id}
                    load={load}
                    onClick={() => handleLoadClick(load)}
                    isWatched={isWatched(load.id)}
                    onToggleWatch={() => toggleWatch(load)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="mb-6">
            <div className="relative overflow-hidden w-full bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-3 mb-4">
              <div className="relative z-10">
                <h2 className="text-2xl text-white font-bold mb-0 flex items-center">
                  Fetching loads
                  <span className="ml-1 animate-pulse inline-block" style={{ letterSpacing: "2px" }}>
                    ...
                  </span>
                </h2>
                {/* <p className="text-base text-white">Please wait while AI creates your loads</p> */}
              </div>
            </div>

            <div className="flex gap-3 px-4 pb-2 overflow-x-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-shrink-0 w-[280px] h-[200px] bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        )}

        {/* NAT/NAL Based Loads Section */}
        {natNalData && natNalLoads.length > 0 && !isFiltering && (
          <div className="mb-6">
            <div className="relative overflow-hidden w-full bg-gradient-to-r from-purple-500 to-purple-400 px-4 py-3 mb-4">
              <div className="relative z-10">
                <h2 className="text-2xl text-white font-bold mb-0">Based on your NAT/NAL</h2>
                <p className="text-base text-white">
                  Available from {natNalData.city}, {natNalData.state} • {new Date(natNalData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 px-4 pb-2">
                {natNalLoads.map((load) => (
                  <OptimizedLoadCard
                    key={load.id}
                    load={load}
                    onClick={() => handleLoadClick(load)}
                    isWatched={isWatched(load.id)}
                    onToggleWatch={() => toggleWatch(load)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Backend Recommended Loads Section */}
        <RecommendedLoadsRow
          onLoadClick={handleLoadClick}
          watchedLoadIds={new Set(watchedLoads.map(l => l.id))}
          onToggleWatch={toggleWatch}
        />

        {/* Loads for you Banner */}
        <div className="mb-4">
          <div className="relative overflow-hidden w-full bg-orange-300/90 px-4 py-2">
            <div className="relative z-10">
              <h2 className="text-2xl text-white font-bold mb-0">Loads for you</h2>
              <p className="text-base text-white ">Based on your recent activities</p>
            </div>
          </div>
        </div>

        {/* Loads near you Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h3 className="text-xl font-bold text-black">Loads near you</h3>
            <button
              onClick={() => router.push('/all-loads')}
              className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              See all
            </button>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 px-4 pb-2">
              {loadsNearYou.map((load) => (
                <OptimizedLoadCard
                  key={load.id}
                  load={load}
                  onClick={() => handleLoadClick(load)}
                  isWatched={isWatched(load.id)}
                  onToggleWatch={() => toggleWatch(load)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* California to Texas Route Section */}
        {californiaToTexas.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between px-4 mb-3">
              <h3
                className="text-xl font-bold text-black truncate"
                style={{ maxWidth: '220px', minWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                title={`${californiaToTexas[0].pickup.city}, ${californiaToTexas[0].pickup.state} to ${californiaToTexas[0].delivery.city}, ${californiaToTexas[0].delivery.state}`}
              >
                {californiaToTexas[0].pickup.city}, {californiaToTexas[0].pickup.state} to{' '}
                {californiaToTexas[0].delivery.city}, {californiaToTexas[0].delivery.state}
              </h3>
              <button
                onClick={() => router.push('/all-loads')}
                className="text-base font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                See all
              </button>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 px-4 pb-2">
                {californiaToTexas.map((load) => (
                  <OptimizedLoadCard
                    key={load.id}
                    load={load}
                    onClick={() => handleLoadClick(load)}
                    isWatched={isWatched(load.id)}
                    onToggleWatch={() => toggleWatch(load)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Load Details Modal */}
      <LoadDetailsModal
        load={selectedLoad}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onBook={handleBookLoad}
      />
    </div>
  );
}
