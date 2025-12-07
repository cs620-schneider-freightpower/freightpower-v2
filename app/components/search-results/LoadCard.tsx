'use client';
import { Eye, MapPin, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Load } from '../../types/load';

interface LoadCardProps {
  load: Load;
}

export default function LoadCard({ load }: LoadCardProps) {
  const router = useRouter();

  const handleBookNow = () => {
    router.push(`/book/${load.id}`);
  };

  return (
    <div className="bg-white border-b-8 border-gray-200 p-4 m-4">
      <div className="flex gap-4">
        {/* Left Section - Price and Stats */}
        <div className="flex-shrink-0 w-32 relative p-2">
          {/* Badge */}
          {load.badge !== undefined && (
            <div className="absolute -top-2 -left-2 w-0 h-0 border-r-[30px] border-r-transparent border-t-[30px] border-t-red-600">
              <span className="absolute -top-7 left-0.75 text-white text-xs font-bold">{load.badge}</span>
            </div>
          )}
          <div className="text-3xl font-bold text-gray-900 mb-1">
            ${load.price}
          </div>
          
          <div className="text-sm text-gray-600 space-y-0.5">
            <div>{load.distance} miles</div>
            <div>{load.weight.toLocaleString()} lb</div>
          </div>
          
          <div className="mt-3 space-y-1">
            <div className="text-xs text-gray-600">Loaded RPM:</div>
            <div className="text-lg font-semibold text-orange-600">${load.loadedRPM.toFixed(2)}</div>
            
            <div className="text-xs text-gray-600 mt-2">Est Total RPM:</div>
            <div className="text-lg font-semibold text-orange-600">${load.estTotalRPM.toFixed(2)}</div>
          </div>
        </div>

        {/* Right Section - Route Details */}
        <div className="flex-1 relative">
          {/* Eye Icon */}
          <button className="absolute top-0 right-0">
            <Eye className="w-6 h-6 text-gray-600" />
          </button>

          {/* Pickup Location */}
          <div className="mb-4">
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="#ea580c" />
              <div>
                <div className="font-bold text-gray-900">
                  {load.pickup.city}, {load.pickup.state}
                </div>
                <div className="text-sm text-gray-700">
                  {load.pickup.date}, {load.pickup.time}
                  {load.delivery.date && ` - ${load.delivery.date.split(',')[1]}, ${load.delivery.time.split(' ')[1]} ${load.delivery.time.split(' ')[2]}`}
                </div>
                {load.pickup.liveLoad && (
                  <div className="text-sm text-gray-700 mt-0.5">Live Load</div>
                )}
                <div className="text-sm text-gray-600">Empty {load.pickup.emptyMiles} mi</div>
              </div>
            </div>
          </div>

          {/* Delivery Location */}
          <div>
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="#ea580c" />
              <div>
                <div className="font-bold text-gray-900">
                  {load.delivery.city}, {load.delivery.state}
                </div>
                <div className="text-sm text-gray-700">
                  {load.delivery.date}, {load.delivery.time}
                </div>
                {load.delivery.instructions.map((instruction, idx) => (
                  <div key={idx} className="text-sm text-orange-600 font-medium mt-0.5">
                    {instruction}
                  </div>
                ))}
                <div className="text-sm text-gray-600 mt-0.5">Empty {load.delivery.emptyMiles} mi</div>
              </div>
            </div>
          </div>

          {/* Reload Badge */}
          {load.isReload && (
            <div className="flex items-center gap-2 mt-3 ml-5 py-1.5 rounded-full w-fit">
              <span className="bg-orange-500 rounded-full p-1 flex items-center justify-center">
                <RefreshCw className="w-4 h-4 text-white" />
              </span>
              <span className="font-medium text-base text-black">Reload</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 text-lg transition-colors"
      >
        BOOK NOW
      </button>
    </div>
  );
}
