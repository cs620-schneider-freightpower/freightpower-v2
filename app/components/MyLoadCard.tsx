"use client"
import { Load } from '../types/load';
import { MapPin, Calendar, Clock, DollarSign, Truck, FileText, ChevronRight } from 'lucide-react';

interface MyLoadCardProps {
    load: Load;
    onClick?: () => void;
}

export default function MyLoadCard({ load, onClick }: MyLoadCardProps) {
    // Helper to format large numbers
    const formatWeight = (weight: number) => {
        return `${(weight / 1000).toFixed(1)}k`;
    };

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'assigned': return 'bg-blue-100 text-blue-700';
            case 'in-transit': return 'bg-orange-100 text-orange-700';
            case 'delivered': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusLabel = (status?: string) => {
        switch (status) {
            case 'assigned': return 'Assigned';
            case 'in-transit': return 'In Transit';
            case 'delivered': return 'Delivered';
            default: return 'Unknown';
        }
    };

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all cursor-pointer group"
        >
            {/* Header Row: ID, Status, Rate */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="font-mono text-gray-500 font-medium">#{load.id}</span>
                    {load.status && (
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(load.status)}`}>
                            {getStatusLabel(load.status)}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-1 text-green-700 font-bold bg-green-50 px-3 py-1 rounded-lg">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-lg">{load.price}</span>
                </div>
            </div>

            {/* Main Route Row */}
            <div className="flex flex-col md:flex-row gap-6 mb-5 relative">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-[1.4rem] left-4 right-full w-[2px] bg-gray-200 -z-10 group-hover:bg-orange-200 transition-colors" />

                {/* Pickup */}
                <div className="flex-1 flex gap-3">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 border-2 border-white shadow-sm z-10">
                            <MapPin className="w-4 h-4" />
                        </div>
                        <div className="w-0.5 h-full bg-gray-200 my-1 md:hidden"></div>
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pickup</div>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{load.pickup.city}, {load.pickup.state}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{load.pickup.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{load.pickup.time}</span>
                            </div>
                        </div>
                        {load.pickup.liveLoad && (
                            <span className="inline-block mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                Live Load
                            </span>
                        )}
                    </div>
                </div>

                {/* Arrow (Desktop) */}
                <div className="hidden md:flex items-center justify-center text-gray-300">
                    <ChevronRight className="w-6 h-6" />
                </div>

                {/* Delivery */}
                <div className="flex-1 flex gap-3">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0 border-2 border-white shadow-sm z-10">
                            <MapPin className="w-4 h-4" />
                        </div>
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Delivery</div>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{load.delivery.city}, {load.delivery.state}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{load.delivery.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{load.delivery.time}</span>
                            </div>
                        </div>
                        {load.delivery.instructions.length > 0 && (
                            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                <span>{load.delivery.instructions.length} Notes</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-0.5">Equipment</span>
                    <div className="flex items-center gap-1.5 text-gray-900 font-medium text-sm">
                        <Truck className="w-4 h-4 text-gray-400" />
                        {load.equipmentType || 'Van'}
                    </div>
                </div>

                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-0.5">Weight</span>
                    <span className="text-gray-900 font-medium text-sm">{formatWeight(load.weight)} lbs</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-0.5">Distance</span>
                    <span className="text-gray-900 font-medium text-sm">{load.distance} mi</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-0.5">Stops</span>
                    <span className="text-gray-900 font-medium text-sm">2 Stops</span>
                </div>
            </div>

            {/* Requirements Tags */}
            {load.requirements && load.requirements.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {load.requirements.map(req => (
                        <span key={req} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded border border-gray-100">
                            {req}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
