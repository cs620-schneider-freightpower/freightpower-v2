"use client";

import { useState, useMemo } from 'react';
import { X, MapPin, Calendar, Search, ArrowRight, ChevronDown, ChevronUp, SlidersHorizontal, Truck, DollarSign, Route, Scale, ClipboardList, Heart } from 'lucide-react';
import { US_CITIES } from '../data/cities';
import { useSavedSearches } from '../context/SavedSearchesContext';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
    origin: string;
    radius: number;
    pickupDateFrom: string;
    pickupDateTo: string;
    delivery: string;
    minRPM?: string;
    minTripDistance?: string;
    maxTripDistance?: string;
    maxWeight?: string;
    maxDeadhead?: string;
    equipmentType?: 'Van' | 'Reefer' | 'Flatbed';
    excludedServices?: string[];
}

export default function SearchModal({ isOpen, onClose, onSearch }: SearchModalProps) {
    const { saveSearch, isSearchSaved } = useSavedSearches();
    const [origin, setOrigin] = useState('');
    const [radius, setRadius] = useState(50);
    const [showRadiusSlider, setShowRadiusSlider] = useState(false);

    const [pickupDateFrom, setPickupDateFrom] = useState('');
    const [pickupDateTo, setPickupDateTo] = useState('');
    const [delivery, setDelivery] = useState('');

    // Advanced Filters State
    const [minRPM, setMinRPM] = useState('');
    const [minTripDistance, setMinTripDistance] = useState('');
    const [maxTripDistance, setMaxTripDistance] = useState('');
    const [maxWeight, setMaxWeight] = useState('');
    const [maxDeadhead, setMaxDeadhead] = useState('');
    const [equipmentType, setEquipmentType] = useState<'Van' | 'Reefer' | 'Flatbed' | undefined>();
    const [excludedServices, setExcludedServices] = useState<string[]>([]);

    // Filter visibility state (only one active at a time)
    type ActiveFilter = 'dates' | 'equipment' | 'rpm' | 'distance' | 'weight' | 'requirements' | null;
    const [activeFilter, setActiveFilter] = useState<ActiveFilter>(null);

    const toggleFilter = (filter: ActiveFilter) => {
        setActiveFilter(activeFilter === filter ? null : filter);
    };

    if (!isOpen) return null;

    const handleSearch = () => {
        onSearch({
            origin,
            radius,
            pickupDateFrom,
            pickupDateTo,
            delivery,
            minRPM,
            minTripDistance,
            maxTripDistance,
            maxWeight,
            maxDeadhead,
            equipmentType,
            excludedServices
        });
        onClose();
    };

    const hasDateFilter = pickupDateFrom || pickupDateTo;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 pointer-events-auto animate-fade-in"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-xl pointer-events-auto flex flex-col max-h-[90vh] overflow-y-auto animate-slide-up">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Filter Loads</h2>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">

                    {/* Origin Section */}

                    {/* ... (Origin and Radius content implied, skipping to next change block context if needed, but here we focus on the class update above and colors below) ... */}

                    {/* (In future chunks for inputs) */}

                    <div className="space-y-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Origin Location
                        </label>
                        <CityAutocomplete
                            value={origin}
                            onChange={setOrigin}
                            placeholder="City, State or Zip"
                        />

                        {/* Radius Selection */}
                        <div className="space-y-3">
                            <div className="flex items-center flex-wrap gap-2">
                                <div className="text-sm font-medium text-gray-500 mr-1">Radius:</div>
                                {[50, 100, 200].map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => {
                                            setRadius(r);
                                            setShowRadiusSlider(false);
                                        }}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${radius === r && !showRadiusSlider
                                            ? 'bg-[#ff6b35] text-white shadow-sm'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {r} mi
                                    </button>
                                ))}
                                <button
                                    onClick={() => setShowRadiusSlider(!showRadiusSlider)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center ${showRadiusSlider
                                        ? 'bg-[#ff6b35] text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <SlidersHorizontal className="w-3 h-3 mr-1" />
                                    Custom
                                </button>
                            </div>

                            {/* Custom Slider */}
                            {showRadiusSlider && (
                                <div className="pt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                                        <span>0 mi</span>
                                        <span className="font-semibold text-[#ff6b35]">{radius} mi</span>
                                        <span>300 mi</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="300"
                                        step="10"
                                        value={radius}
                                        onChange={(e) => setRadius(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff6b35]"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Delivery Section */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Delivery Location
                        </label>
                        <CityAutocomplete
                            value={delivery}
                            onChange={setDelivery}
                            placeholder="City, State or Zip (Optional)"
                        />
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Filter Chips */}
                    <div>
                        <div className="text-sm font-semibold text-gray-700 mb-3">Optional Filters</div>
                        <div className="flex flex-wrap gap-2">
                            {/* Dates Chip */}
                            <button
                                onClick={() => toggleFilter('dates')}
                                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeFilter === 'dates' || hasDateFilter
                                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <Calendar className="w-4 h-4 mr-2" />
                                Dates
                                {(hasDateFilter && activeFilter !== 'dates') && (
                                    <span className="ml-2 w-2 h-2 rounded-full bg-[#ff6b35]" />
                                )}
                            </button>

                            {/* Equipment Chip */}
                            <button
                                onClick={() => toggleFilter('equipment')}
                                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeFilter === 'equipment' || equipmentType
                                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <Truck className="w-4 h-4 mr-2" />
                                Equipment
                                {(equipmentType && activeFilter !== 'equipment') && (
                                    <span className="ml-2 w-2 h-2 rounded-full bg-[#ff6b35]" />
                                )}
                            </button>

                            {/* RPM Chip */}
                            <button
                                onClick={() => toggleFilter('rpm')}
                                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeFilter === 'rpm' || minRPM
                                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <DollarSign className="w-4 h-4 mr-2" />
                                Rate
                                {(minRPM && activeFilter !== 'rpm') && (
                                    <span className="ml-2 w-2 h-2 rounded-full bg-[#ff6b35]" />
                                )}
                            </button>

                            {/* Distance Chip */}
                            <button
                                onClick={() => toggleFilter('distance')}
                                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeFilter === 'distance' || minTripDistance || maxTripDistance
                                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <Route className="w-4 h-4 mr-2" />
                                Distance
                                {((minTripDistance || maxTripDistance) && activeFilter !== 'distance') && (
                                    <span className="ml-2 w-2 h-2 rounded-full bg-[#ff6b35]" />
                                )}
                            </button>

                            {/* Weight & Deadhead Chip */}
                            <button
                                onClick={() => toggleFilter('weight')}
                                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeFilter === 'weight' || maxWeight || maxDeadhead
                                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <Scale className="w-4 h-4 mr-2" />
                                Specs
                                {((maxWeight || maxDeadhead) && activeFilter !== 'weight') && (
                                    <span className="ml-2 w-2 h-2 rounded-full bg-[#ff6b35]" />
                                )}
                            </button>

                            {/* Service Exclusions Chip */}
                            <button
                                onClick={() => toggleFilter('requirements')}
                                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeFilter === 'requirements' || excludedServices.length > 0
                                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <ClipboardList className="w-4 h-4 mr-2" />
                                Services
                                {(excludedServices.length > 0 && activeFilter !== 'requirements') && (
                                    <span className="ml-2 w-2 h-2 rounded-full bg-[#ff6b35]" />
                                )}
                            </button>
                        </div>

                        {/* Collapsible Date Content */}
                        {activeFilter === 'dates' && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl animate-in fade-in slide-in-from-top-2 duration-200 border border-gray-100">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-sm font-semibold text-gray-900">
                                        Pick-up Date Range
                                    </label>
                                    <button
                                        onClick={() => {
                                            setPickupDateFrom('');
                                            setPickupDateTo('');
                                        }}
                                        className="text-xs text-[#ff6b35] font-medium hover:underline"
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-xs text-gray-500 font-medium">From</span>
                                        </div>
                                        <input
                                            type="date"
                                            value={pickupDateFrom}
                                            onChange={(e) => setPickupDateFrom(e.target.value)}
                                            className="w-full pl-12 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] min-w-0 text-sm placeholder:text-gray-500 font-medium text-gray-900"
                                        />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-xs text-gray-500 font-medium">To</span>
                                        </div>
                                        <input
                                            type="date"
                                            value={pickupDateTo}
                                            onChange={(e) => setPickupDateTo(e.target.value)}
                                            className="w-full pl-8 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] min-w-0 text-sm placeholder:text-gray-500 font-medium text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Collapsible Equipment Content */}
                        {activeFilter === 'equipment' && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl animate-in fade-in slide-in-from-top-2 duration-200 border border-gray-100">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-sm font-semibold text-gray-900">
                                        Equipment Type
                                    </label>
                                    <button
                                        onClick={() => setEquipmentType(undefined)}
                                        className="text-xs text-[#ff6b35] font-medium hover:underline"
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    {(['Van', 'Reefer', 'Flatbed'] as const).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setEquipmentType(equipmentType === type ? undefined : type)}
                                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all border ${equipmentType === type
                                                ? 'bg-[#ff6b35] text-white border-[#ff6b35] shadow-sm'
                                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Collapsible RPM Content */}
                        {activeFilter === 'rpm' && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl animate-in fade-in slide-in-from-top-2 duration-200 border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-semibold text-gray-900">Min Loaded RPM</label>
                                    <button
                                        onClick={() => setMinRPM('')}
                                        className="text-xs text-[#ff6b35] font-medium hover:underline"
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="relative">
                                    <select
                                        value={minRPM}
                                        onChange={(e) => setMinRPM(e.target.value)}
                                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] appearance-none font-medium text-gray-900"
                                    >
                                        <option value="">No Min</option>
                                        <option value="1.50">$1.50 / mi</option>
                                        <option value="2.00">$2.00 / mi</option>
                                        <option value="2.50">$2.50 / mi</option>
                                        <option value="3.00">$3.00 / mi</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                </div>
                            </div>
                        )}

                        {/* Collapsible Distance Content */}
                        {activeFilter === 'distance' && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl animate-in fade-in slide-in-from-top-2 duration-200 border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-semibold text-gray-900">Loaded Distance</label>
                                    <button
                                        onClick={() => {
                                            setMinTripDistance('');
                                            setMaxTripDistance('');
                                        }}
                                        className="text-xs text-[#ff6b35] font-medium hover:underline"
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-xs text-gray-500 font-medium">Min</span>
                                        </div>
                                        <input
                                            type="number"
                                            value={minTripDistance}
                                            onChange={(e) => setMinTripDistance(e.target.value)}
                                            placeholder="0"
                                            className="w-full pl-10 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] placeholder:text-gray-500 font-medium text-gray-900"
                                        />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-xs text-gray-500 font-medium">Max</span>
                                        </div>
                                        <input
                                            type="number"
                                            value={maxTripDistance}
                                            onChange={(e) => setMaxTripDistance(e.target.value)}
                                            placeholder="Any"
                                            className="w-full pl-10 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] placeholder:text-gray-500 font-medium text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Collapsible Specs (Weight/Deadhead) Content */}
                        {activeFilter === 'weight' && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl animate-in fade-in slide-in-from-top-2 duration-200 border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-semibold text-gray-900">Specs</label>
                                    <button
                                        onClick={() => {
                                            setMaxWeight('');
                                            setMaxDeadhead('');
                                        }}
                                        className="text-xs text-[#ff6b35] font-medium hover:underline"
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Max Weight (lbs)</label>
                                        <input
                                            type="number"
                                            value={maxWeight}
                                            onChange={(e) => setMaxWeight(e.target.value)}
                                            placeholder="e.g. 45000"
                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] placeholder:text-gray-500 font-medium text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Max Deadhead (mi)</label>
                                        <input
                                            type="number"
                                            value={maxDeadhead}
                                            onChange={(e) => setMaxDeadhead(e.target.value)}
                                            placeholder="e.g. 100"
                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] placeholder:text-gray-500 font-medium text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Collapsible Requirements Content */}
                        {activeFilter === 'requirements' && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl animate-in fade-in slide-in-from-top-2 duration-200 border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-semibold text-gray-900">Service Exclusions</label>
                                    <button
                                        onClick={() => setExcludedServices([])}
                                        className="text-xs text-[#ff6b35] font-medium hover:underline"
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                    {[
                                        'TWIC', 'Hazmat', 'High Value', 'Stop Off',
                                        'Trailer Shuttle', 'Trailer Spot',
                                        'Customer Live Load', 'Live Load', 'Lumper Load',
                                        'Driver Assist Load', 'Driver Load', 'Pick Up Relay',
                                        'Customer Live Unload', 'Live Unload', 'Lumper Unload',
                                        'Driver Assist Unload', 'Driver Unload', 'Drop Relay'
                                    ].map((service) => (
                                        <label key={service} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={excludedServices.includes(service)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setExcludedServices([...excludedServices, service]);
                                                    } else {
                                                        setExcludedServices(excludedServices.filter(s => s !== service));
                                                    }
                                                }}
                                                className="w-4 h-4 text-[#ff6b35] border-gray-300 rounded focus:ring-[#ff6b35]"
                                            />
                                            <span className="text-xs text-gray-600 truncate" title={service}>{service}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
                    {/* Summary Text */}
                    <div className="mb-3 text-xs text-center text-gray-500 italic">
                        Looking for loads {origin ? `from ${origin.split(',')[0]}` : 'from anywhere'}
                        {radius > 0 && origin ? ` within ${radius}mi` : ''}
                        {delivery ? ` to ${delivery.split(',')[0]}` : ''}
                        {(pickupDateFrom || pickupDateTo) ? ` between ${pickupDateFrom || '...'} and ${pickupDateTo || '...'}` : ''}
                        {minRPM ? ` paying at least $${minRPM}/mi` : ''}
                        {minTripDistance || maxTripDistance ? ` with distance ${minTripDistance || '0'}-${maxTripDistance || 'Any'}mi` : ''}
                        {maxWeight ? ` under ${maxWeight}lbs` : ''}
                        {maxDeadhead ? ` with deadhead < ${maxDeadhead}mi` : ''}
                        {equipmentType ? ` for ${equipmentType}` : ''}
                        {excludedServices.length > 0 ? ` excluding ${excludedServices.join(', ')}` : ''}
                        ...
                    </div>

                    <div className="flex gap-3">
                        {(origin || delivery || pickupDateFrom || pickupDateTo || minRPM || minTripDistance || maxTripDistance || maxWeight || maxDeadhead || equipmentType || excludedServices.length > 0) && (
                            <button
                                onClick={() => {
                                    setOrigin('');
                                    setRadius(50);
                                    setPickupDateFrom('');
                                    setPickupDateTo('');
                                    setDelivery('');
                                    setMinRPM('');
                                    setMinTripDistance('');
                                    setMaxTripDistance('');
                                    setMaxWeight('');
                                    setMaxDeadhead('');
                                    setEquipmentType(undefined);
                                    setExcludedServices([]);
                                    setActiveFilter(null);
                                }}
                                className="flex-none px-4 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-colors"
                            >
                                Clear All
                            </button>
                        )}
                        <button
                            onClick={handleSearch}
                            className="flex-1 flex items-center justify-center space-x-2 bg-[#ff6b35] hover:bg-[#ff8c61] text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98]"
                        >
                            <Search className="w-5 h-5" />
                            <span>Search Loads</span>
                        </button>

                        {(origin || delivery || minRPM || minTripDistance || maxTripDistance || maxWeight || maxDeadhead || equipmentType || excludedServices.length > 0) && (
                            <button
                                onClick={() => {
                                    const currentFilters = {
                                        origin,
                                        radius,
                                        pickupDateFrom,
                                        pickupDateTo,
                                        delivery,
                                        minRPM,
                                        minTripDistance,
                                        maxTripDistance,
                                        maxWeight,
                                        maxDeadhead,
                                        equipmentType,
                                        excludedServices
                                    };

                                    if (isSearchSaved(currentFilters)) {
                                        // If saved, find the ID and remove it (toggle behavior)
                                        // But we need the ID. Helper isSearchSaved only returns boolean. 
                                        // Let's iterate manually or just ignore remove for now?
                                        // Actually better user experience is just to let them "save" and it becomes saved.
                                        // If already saved, maybe nothing happens or we unsave? 
                                        // "favorites it drops the modal. I would prefer if it made the heart filled in with red or something, and then yeah."
                                        // Implies toggle or sticky state.
                                        // Let's just save if not saved. If saved, we can remove it (toggle).
                                        // To enable toggle we need to find the saved search ID.
                                        // Let's assume we can remove by finding matching filter.
                                        // But context only has removeSearch(id).
                                        // I'll stick to save-only for now, but UI shows filled.
                                        saveSearch(currentFilters);
                                    } else {
                                        saveSearch(currentFilters);
                                    }
                                }}
                                className={`flex-none px-4 py-3.5 rounded-xl border transition-colors ${isSearchSaved({
                                    origin,
                                    radius,
                                    pickupDateFrom,
                                    pickupDateTo,
                                    delivery,
                                    minRPM,
                                    minTripDistance,
                                    maxTripDistance,
                                    maxWeight,
                                    maxDeadhead,
                                    equipmentType,
                                    excludedServices
                                })
                                    ? 'bg-red-50 border-red-200 text-red-500'
                                    : 'border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50'
                                    }`}
                                title={isSearchSaved({
                                    origin,
                                    radius,
                                    pickupDateFrom,
                                    pickupDateTo,
                                    delivery,
                                    minRPM,
                                    minTripDistance,
                                    maxTripDistance,
                                    maxWeight,
                                    maxDeadhead,
                                    equipmentType,
                                    excludedServices
                                }) ? "Saved" : "Save this search"}
                            >
                                <Heart className={`w-5 h-5 ${isSearchSaved({
                                    origin,
                                    radius,
                                    pickupDateFrom,
                                    pickupDateTo,
                                    delivery,
                                    minRPM,
                                    minTripDistance,
                                    maxTripDistance,
                                    maxWeight,
                                    maxDeadhead,
                                    equipmentType,
                                    excludedServices
                                }) ? 'fill-current' : ''}`} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function CityAutocomplete({ value, onChange, placeholder }: { value: string, onChange: (val: string) => void, placeholder: string }) {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    // Sync local input value if parent value changes (e.g. Clear All)
    useMemo(() => {
        setInputValue(value);
    }, [value]);

    const handleInput = (val: string) => {
        setInputValue(val);
        // Only update valid state on selection to prevent clearing parent state while typing
        if (val.length > 1) {
            const filtered = US_CITIES.filter(city =>
                city.toLowerCase().includes(val.toLowerCase())
            ).slice(0, 5);
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSelect = (city: string) => {
        setInputValue(city);
        onChange(city);
        setShowSuggestions(false);
    };

    return (
        <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <input
                type="text"
                value={inputValue}
                onChange={(e) => handleInput(e.target.value)}
                onFocus={() => {
                    if (inputValue.length > 1) setShowSuggestions(true);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all placeholder:text-gray-500 text-gray-900 font-medium"
            />
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg max-h-48 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                    {suggestions.map((city) => (
                        <div
                            key={city}
                            className="px-4 py-2 hover:bg-orange-50 cursor-pointer text-gray-900 text-sm font-medium"
                            onClick={() => handleSelect(city)}
                        >
                            {city}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
