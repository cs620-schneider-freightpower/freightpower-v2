"use client"
import React, { useState } from 'react';
import { mockLoads } from '../data/mockLoads';
import MyLoadCard from '../components/MyLoadCard';
import LoadDetailsModal from '../components/LoadDetailsModal';
import BottomNav from '../components/search-results/BottomNav';
import { Search } from 'lucide-react';
import { useBookedLoads } from '../context/BookedLoadsContext';
import { Load } from '../types/load';

type TabType = 'assigned' | 'in-transit' | 'delivered';

export default function MyLoadsPage() {
    const [activeTab, setActiveTab] = useState<TabType>('assigned');
    const [selectedLoadId, setSelectedLoadId] = useState<string | null>(null);
    const { bookedLoads } = useBookedLoads();

    // Filter loads based on status
    // Note: in a real app, this would be an API call
    const mockAssignedLoads = mockLoads.filter(l => l.status === 'assigned');
    const inTransitLoads = mockLoads.filter(l => l.status === 'in-transit');
    const deliveredLoads = mockLoads.filter(l => l.status === 'delivered');

    // Prepend booked loads to assigned list (filter out any duplicates)
    const bookedIds = new Set(bookedLoads.map(l => l.id));
    const filteredMockAssigned = mockAssignedLoads.filter(l => !bookedIds.has(l.id));
    const assignedLoads: Load[] = [...bookedLoads, ...filteredMockAssigned];

    const getLoadsForTab = () => {
        switch (activeTab) {
            case 'assigned': return assignedLoads;
            case 'in-transit': return inTransitLoads;
            case 'delivered': return deliveredLoads;
            default: return [];
        }
    };

    const loads = getLoadsForTab();
    // Look in all sources for selected load
    const allLoads = [...bookedLoads, ...mockLoads];
    const selectedLoad = allLoads.find(l => l.id === selectedLoadId) || null;

    return (
        <div className="min-h-screen bg-gray-50 pb-20 md:pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Loads</h1>
                        <p className="text-gray-500 mt-1">Manage and track your assigned freight.</p>
                    </div>

                    {/* Search bar placeholder - visual only for now as requested */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search internal load ID..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black placeholder-gray-400"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                        onClick={() => setActiveTab('assigned')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'assigned'
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        Driver Assigned
                        <span className={`px-1.5 py-0.5 rounded text-xs ${activeTab === 'assigned' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                            }`}>
                            {assignedLoads.length}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab('in-transit')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'in-transit'
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        In-Transit
                        <span className={`px-1.5 py-0.5 rounded text-xs ${activeTab === 'in-transit' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                            }`}>
                            {inTransitLoads.length}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab('delivered')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'delivered'
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        Delivered
                        <span className={`px-1.5 py-0.5 rounded text-xs ${activeTab === 'delivered' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                            }`}>
                            {deliveredLoads.length}
                        </span>
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    {loads.length > 0 ? (
                        loads.map(load => (
                            <MyLoadCard
                                key={load.id}
                                load={load}
                                onClick={() => setSelectedLoadId(load.id)}
                            />
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No loads found</h3>
                            <p className="text-gray-500 max-w-sm mx-auto mt-1">
                                You don't have any loads in the "{activeTab}" bucket at the moment.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <LoadDetailsModal
                load={selectedLoad}
                isOpen={!!selectedLoadId}
                onClose={() => setSelectedLoadId(null)}
                onBook={() => { }} // Booking not primary action here, likely just robust detail view
            />
            <BottomNav />
        </div>
    );
}
