"use client"
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2 } from 'lucide-react';
import OptimizedLoadCard from './components/OptimizedLoadCard';
import LoadDetailsModal from './components/LoadDetailsModal';
import BottomNav from './components/search-results/BottomNav';
import { mockLoads } from './data/mockLoads';
import { Load } from './types/load';
import { useNatNal } from './context/NatNalContext';

export default function Optimized() {
  const router = useRouter();
  const { natNalData } = useNatNal();

  console.log('🔷 Search page component rendered');
  console.log('🔷 NAT/NAL data from context:', natNalData);

  const [searchInput, setSearchInput] = useState('');
  const [aiLoads, setAiLoads] = useState<Load[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedDestination, setSearchedDestination] = useState('');
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Split loads into different sections
  const loadsNearYou = mockLoads.slice(2, 6); // Oakland, SF, Modesto, Fresno
  const californiaToTexas = mockLoads.filter(load =>
    load.pickup.state === 'CA' && load.delivery.state === 'TX'
  ).slice(0, 4);

  // Filter loads based on NAT/NAL
  const natNalLoads = useMemo(() => {
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

  const handleSearch = async () => {
    if (!searchInput.trim()) return;

    setIsLoading(true);
    setError(null);
    setAiLoads([]); // Clear previous results
    setSearchedDestination(searchInput.trim());

    try {
      const response = await fetch('/api/generate-loads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destination: searchInput.trim() }),
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
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
    // alert('Load booked!')
    window.location.href = `/book/${loadId}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Search Bar - Fixed at top */}
      <div className="sticky top-0 z-20 bg-white px-4 pt-4 mb-2 border-b border-gray-100">
        <div className="flex items-center bg-gray-200 rounded-lg px-4 py-3">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Enter City, State (e.g. Chicago, IL)"
            className="flex-1 bg-transparent text-base outline-none text-gray-700 placeholder-gray-400"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          {isLoading && <Loader2 className="w-5 h-5 text-orange-500 animate-spin ml-2" />}
        </div>
        {error && (
          <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
            {error}
          </div>
        )}
      </div>

      {/* Main Content - with bottom padding for nav */}
      <div className="">
        {/* AI Generated Loads Section */}
        {aiLoads.length > 0 && (
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
        {natNalData && natNalLoads.length > 0 && (
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
                  />
                ))}
              </div>
            </div>
          </div>
        )}

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
