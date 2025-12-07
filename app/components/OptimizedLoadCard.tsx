"use client"
import { Load } from '../types/load';
import { Heart, MapPin } from 'lucide-react';

interface OptimizedLoadCardProps {
  load: Load;
  onClick?: () => void;
}

export default function OptimizedLoadCard({ load, onClick }: OptimizedLoadCardProps) {
  // Format weight to display as "41.6k lbs"
  const formatWeight = (weight: number) => {
    return `${(weight / 1000).toFixed(1)}k lbs`;
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border-2 border-gray-500/25 p-4 min-w-[280px] flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      {/* Price and Heart */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-black">${load.price}</span>
            <span className="text-gray-500 text-sm font-medium">
              ${load.loadedRPM.toFixed(2)}/mi
            </span>
          </div>
        </div>
        <button 
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      {/* Route */}
      <div className="space-y-2 mb-3">
        {/* Pickup */}
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-semibold text-black text-sm">
              {load.pickup.city}, {load.pickup.state}
            </div>
            <div className="text-gray-500 text-xs">
              {load.pickup.date}, {load.pickup.time}
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-semibold text-black text-sm">
              {load.delivery.city}, {load.delivery.state}
            </div>
            <div className="text-gray-500 text-xs">
              {load.delivery.date}, {load.delivery.time}
            </div>
          </div>
        </div>
      </div>

      {/* Weight info */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
        <div className="w-5 h-5 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
          <div className="w-3 h-2 border-2 border-white rounded-sm"></div>
        </div>
        <span className="text-gray-600 text-sm font-medium">
          {formatWeight(load.weight)}
        </span>
      </div>
    </div>
  );
}
