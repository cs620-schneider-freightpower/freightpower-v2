"use client"
import { Load } from '../types/load';
import { X, MapPin, Calendar, Clock, Weight, TrendingUp, Navigation } from 'lucide-react';

interface LoadDetailsModalProps {
  load: Load | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (loadId: string) => void;
}

export default function LoadDetailsModal({ load, isOpen, onClose, onBook }: LoadDetailsModalProps) {
  if (!isOpen || !load) return null;

  const formatWeight = (weight: number) => {
    return `${(weight / 1000).toFixed(1)}k lbs`;
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBook = () => {
    onBook(load.id);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-black">Load Details</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Price Section */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl p-6 text-white">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold">${load.price}</span>
              <span className="text-xl opacity-90">${load.loadedRPM.toFixed(2)}/mi</span>
            </div>
            <div className="flex items-center gap-4 text-sm opacity-90">
              <div className="flex items-center gap-1">
                <Navigation className="w-4 h-4" />
                <span>{load.distance} mi</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>Est. Total: ${load.estTotalRPM.toFixed(2)}/mi</span>
              </div>
            </div>
            {load.badge && (
              <div className="mt-3 inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {load.badge}
              </div>
            )}
          </div>

          {/* Route Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-black">Route Information</h3>
            
            {/* Pickup */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-green-500 rounded-full p-2">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-500 mb-1">PICKUP</div>
                  <div className="text-lg font-bold text-black">
                    {load.pickup.city}, {load.pickup.state}
                  </div>
                  {load.pickup.address && (
                    <div className="text-sm text-gray-600 mt-1">{load.pickup.address}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{load.pickup.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{load.pickup.time}</span>
                </div>
              </div>
              {load.pickup.liveLoad && (
                <div className="mt-2 inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  Live Load
                </div>
              )}
              {load.pickup.emptyMiles > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  Empty miles: {load.pickup.emptyMiles} mi
                </div>
              )}
            </div>

            {/* Delivery */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-red-500 rounded-full p-2">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-500 mb-1">DELIVERY</div>
                  <div className="text-lg font-bold text-black">
                    {load.delivery.city}, {load.delivery.state}
                  </div>
                  {load.delivery.address && (
                    <div className="text-sm text-gray-600 mt-1">{load.delivery.address}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{load.delivery.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{load.delivery.time}</span>
                </div>
              </div>
              {load.delivery.emptyMiles > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  Empty miles: {load.delivery.emptyMiles} mi
                </div>
              )}
              {load.delivery.instructions.length > 0 && (
                <div className="mt-3">
                  <div className="text-sm font-semibold text-gray-700 mb-1">Instructions:</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {load.delivery.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Load Details */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-black">Load Details</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Weight className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Weight</div>
                  <div className="font-semibold text-black">{formatWeight(load.weight)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Navigation className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Distance</div>
                  <div className="font-semibold text-black">{load.distance} miles</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Rate per Mile (Loaded)</div>
                  <div className="font-semibold text-black">${load.loadedRPM.toFixed(2)}/mi</div>
                </div>
              </div>
              {load.isReload && (
                <div className="mt-2 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Reload Available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer with Book Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <button
            onClick={handleBook}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

