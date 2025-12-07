"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import BottomNav from './search-results/BottomNav';

export default function SearchScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('New');
  const [origin, setOrigin] = useState('BLOOMFIELD, CT');
  const [originRadius, setOriginRadius] = useState(100);
  const [pickupDateFrom, setPickupDateFrom] = useState('Wed Aug 13, 2025');
  const [pickupDateTo, setPickupDateTo] = useState('Sat Aug 16, 2025');
  const [delivery, setDelivery] = useState('Anywhere');

  const handleReset = () => {
    setOrigin('BLOOMFIELD, CT');
    setOriginRadius(100);
    setPickupDateFrom('Wed Aug 13, 2025');
    setPickupDateTo('Sat Aug 16, 2025');
    setDelivery('Anywhere');
  };

  const handleSeeResults = () => {
    router.push('/results');
  };

  return (
    <div className="min-h-screen bg-[#eae6e3]">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b">
        <div className="w-8" /> {/* Spacer */}
        <h1 className="text-xl font-semibold text-[#ff6b35]">Search</h1>
        <button
          type="button"
          className="p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <Bell className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b flex">
        {['New', 'Recent', 'Favorite'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === tab
                ? 'text-black border-b-2 border-[#ff6b35]'
                : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header with Reset */}
          <div className="px-4 py-3 flex items-center justify-between border-b">
            <h2 className="text-lg font-semibold text-black">Pick-up</h2>
            <button
              onClick={handleReset}
              className="text-base font-semibold text-black hover:text-[#ff6b35] active:scale-95 transition-colors active:bg-gray-100 px-2 py-1 rounded cursor-pointer"
              type="button"
            >
              Reset
            </button>
          </div>

          <div className="p-4 space-y-6">
            {/* Origin */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Origin</label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="flex-1 outline-none font-semibold text-black"
                />
              </div>
            </div>

            {/* Origin Radius */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-lg text-gray-500 font-medium">Origin Radius</label>
                <span className="text-sm font-semibold text-black">{originRadius} mi</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setOriginRadius(Math.max(25, originRadius - 25))}
                  className="w-8 h-12 rounded-lg border-2 bg-gray-100 flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5 text-[#ff6b35]" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="range"
                    min="25"
                    max="500"
                    step="25"
                    value={originRadius}
                    onChange={(e) => setOriginRadius(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #ff6b35 0%, #ff6b35 ${((originRadius - 25) / 475) * 100}%, #e5e7eb ${((originRadius - 25) / 475) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-12 h-6 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-xs font-semibold pointer-events-none"
                    style={{ left: `calc(${((originRadius - 25) / 475) * 100}% - 1.5rem)` }}
                  >
                    {originRadius} mi
                  </div>
                </div>
                <button 
                  onClick={() => setOriginRadius(Math.min(500, originRadius + 25))}
                  className="w-8 h-12 rounded-lg border-2 bg-gray-100 flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5 text-[#ff6b35]" />
                </button>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>25</span>
                <span>250</span>
                <span>500</span>
              </div>
            </div>

            {/* Pick-up Date */}
            <div>
              <label className="block text-base font-medium text-gray-500 mb-3">Pick-up Date</label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-base font-semibold text-black mb-1">From Date:</label>
                  <div className="text-sm font-medium text-black">{pickupDateFrom}</div>
                </div>
                <div className="flex-1">
                  <label className="block text-base font-semibold text-right text-black mb-1">To Date:</label>
                  <div className="text-sm font-medium text-right text-black">{pickupDateTo}</div>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className='flex items-center justify-between w-full mr-3'>
                  <h3 className="text-lg font-semibold text-black">Delivery</h3>
                  <p className="text-lg font-semibold text-black">{delivery}</p>
                </div>
                <button className="w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="text-[#ff6b35] text-xl font-semibold">+</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* See Results Button */}
      <div className="fixed bottom-16 left-0 right-0 px-4">
        <button
          onClick={handleSeeResults}
          className="w-full bg-[#ff6b35] text-white py-4 rounded-lg font-semibold text-lg shadow-lg"
        >
          See Results
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 0;
          height: 0;
          background: transparent;
          cursor: pointer;
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 0;
          height: 0;
          background: transparent;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
