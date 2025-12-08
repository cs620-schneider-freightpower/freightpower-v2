"use client"
import { useState, useEffect } from 'react';
import { Bell, Search, Loader2, ExternalLink, MessageSquare, Settings, Bot, HelpCircle, MapPin, LifeBuoy, Sun, Users, CircleParking, Clock, Star } from 'lucide-react';
import BottomNav from './search-results/BottomNav';
import { useNatNal } from '../context/NatNalContext';
import { useWatchedLoads } from '../context/WatchedLoadsContext';
import { Load } from '../types/load';
import LoadDetailsModal from './LoadDetailsModal';
import RecommendedLoadsRow from './RecommendedLoadsRow';
import OptimizedLoadCard from './OptimizedLoadCard';

// Mock news data (Schneider News)
const mockNews = [
  {
    id: '1',
    title: 'New Routes Added for Q4',
    description: 'FreightPower has added 50+ new routes across the Midwest region. Check out the latest opportunities.',
    date: 'Nov 1, 2025',
    category: 'Routes'
  },
  {
    id: '2',
    title: 'Holiday Season Rate Increases',
    description: 'Peak season is here! Rates are up 15% on average for cross-country loads.',
    date: 'Oct 30, 2025',
    category: 'Rates'
  },
  {
    id: '3',
    title: 'Driver Safety Tips for Winter',
    description: 'As winter approaches, review these essential safety guidelines for driving in snow and ice.',
    date: 'Oct 28, 2025',
    category: 'Safety'
  },
  {
    id: '4',
    title: 'New ELD Compliance Updates',
    description: 'Important changes to ELD regulations take effect December 1st. Make sure you\'re prepared.',
    date: 'Oct 25, 2025',
    category: 'Compliance'
  },
  {
    id: '5',
    title: 'Fuel Prices Drop 10%',
    description: 'Good news for owner-operators: fuel prices have dropped significantly this week across major corridors.',
    date: 'Oct 23, 2025',
    category: 'Fuel'
  }
];

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  url?: string;
  image?: string;
  author?: string;
}

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('News');
  const [activeNewsTab, setActiveNewsTab] = useState<'Live News' | 'Schneider News'>('Live News');
  const [searchInput, setSearchInput] = useState('');
  const { watchedLoads, toggleWatch } = useWatchedLoads();
  const { natNalData, setNatNalData } = useNatNal();
  const [isEditing, setIsEditing] = useState(!natNalData);
  const [liveNews, setLiveNews] = useState<NewsArticle[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);

  // Modal state
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Form state
  const [formDate, setFormDate] = useState('');
  const [formTime, setFormTime] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formState, setFormState] = useState('');

  const handleNatNalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formDate && formTime && formCity && formState) {
      const newData = {
        date: formDate,
        time: formTime,
        city: formCity,
        state: formState
      };
      console.log('💾 Saving NAT/NAL data to context:', newData);
      setNatNalData(newData);
      console.log('✅ NAT/NAL data saved!');
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    if (natNalData) {
      setFormDate(natNalData.date);
      setFormTime(natNalData.time);
      setFormCity(natNalData.city);
      setFormState(natNalData.state);
    }
    setIsEditing(true);
  };

  const handleClear = () => {
    setNatNalData(null);
    setFormDate('');
    setFormTime('');
    setFormCity('');
    setFormState('');
    setIsEditing(true);
  };

  // Quick select functions
  const setQuickDate = (daysToAdd: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    const formattedDate = date.toISOString().split('T')[0];
    setFormDate(formattedDate);
  };

  const setQuickTime = (hours: number) => {
    const timeString = hours.toString().padStart(2, '0') + ':00';
    setFormTime(timeString);
  };

  // Fetch live news when the Live News tab is active
  useEffect(() => {
    if (activeTab === 'News' && activeNewsTab === 'Live News' && liveNews.length === 0 && !isLoadingNews) {
      setIsLoadingNews(true);
      setNewsError(null);

      fetch('/api/news')
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch news');
          }
          return res.json();
        })
        .then((data) => {
          setLiveNews(data.news || []);
        })
        .catch((err) => {
          console.error('Error fetching live news:', err);
          setNewsError('Failed to load live news. Please try again later.');
        })
        .finally(() => {
          setIsLoadingNews(false);
        });
    }
  }, [activeTab, activeNewsTab, liveNews.length, isLoadingNews]);

  return (
    <div className="min-h-screen bg-white">
      {/* Quick Actions Grid (The "More" Menu) */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-4">
        <div className="grid grid-cols-4 gap-y-4 gap-x-2">
          {[
            { icon: MessageSquare, label: "Feedback" },
            { icon: Settings, label: "Preferences" },
            { icon: Bot, label: "Assistant" },
            { icon: HelpCircle, label: "Support" },
            { icon: MapPin, label: "Facilities" },
            { icon: LifeBuoy, label: "ServiceNow" }, // Proxy for ServiceNow
            { icon: Users, label: "Teams" },
            { icon: CircleParking, label: "Parking" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center justify-start gap-2 group"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 group-hover:scale-105 group-hover:border-[#ff6b35] transition-all">
                <item.icon className="w-5 h-5 text-gray-700 group-hover:text-[#ff6b35]" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b flex sticky top-0 z-10 shadow-sm">
        {['News', 'NAT / NAL', 'Watched'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-center font-medium text-sm transition-colors relative ${activeTab === tab
              ? 'text-[#ff6b35] font-bold'
              : 'text-gray-500 hover:text-gray-700'
              }`}
            type="button"
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff6b35]" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white pb-24">
        {activeTab === 'News' && (
          <div>
            {/* News Sub-tabs */}
            <div className="bg-gray-50/50 border-b flex px-2 pt-2">
              {['Live News', 'Schneider News'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveNewsTab(tab as 'Live News' | 'Schneider News')}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors mr-1 ${activeNewsTab === tab
                    ? 'bg-white text-[#ff6b35] border-t border-x border-gray-200 shadow-[0_-1px_2px_rgba(0,0,0,0.02)] relative top-[1px]'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Live News Content */}
            {activeNewsTab === 'Live News' && (
              <div className="px-4 py-4 space-y-4">
                {isLoadingNews && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-[#ff6b35] animate-spin mr-2" />
                    <span className="text-gray-600">Loading live news...</span>
                  </div>
                )}

                {newsError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                    {newsError}
                  </div>
                )}

                {!isLoadingNews && !newsError && liveNews.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No news available at this time.
                  </div>
                )}

                {!isLoadingNews && !newsError && liveNews.map((news) => (
                  <div
                    key={news.id}
                    className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[10px] font-bold tracking-wider text-[#ff6b35] bg-orange-50 px-2 py-1 rounded-full uppercase">
                        {news.category}
                      </span>
                      <span className="text-xs text-gray-400">{news.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-2 leading-tight">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
                      {news.description}
                    </p>
                    {news.url && (
                      <a
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#ff6b35] hover:text-orange-600 font-bold uppercase tracking-wide"
                      >
                        Read Article <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Schneider News Content */}
            {activeNewsTab === 'Schneider News' && (
              <div className="px-4 py-4 space-y-4">
                {mockNews.map((news) => (
                  <div
                    key={news.id}
                    className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[10px] font-bold tracking-wider text-[#ff6b35] bg-orange-50 px-2 py-1 rounded-full uppercase">
                        {news.category}
                      </span>
                      <span className="text-xs text-gray-400">{news.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-2 leading-tight">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {news.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'NAT / NAL' && (
          <div className="px-4 py-6">
            {natNalData && !isEditing ? (
              // Display saved NAT/NAL info
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 opacity-50 z-0" />

                <h3 className="text-lg font-bold text-gray-900 mb-6 relative z-10 flex items-center">
                  <div className="w-1 h-6 bg-[#ff6b35] rounded-full mr-3" />
                  Current Status
                </h3>

                <div className="space-y-6 mb-8 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#ff6b35]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Time</p>
                      <p className="text-lg font-bold text-gray-900">
                        {new Date(natNalData.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                        <span className="text-gray-400 font-normal mx-2">at</span>
                        {natNalData.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#ff6b35]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Location</p>
                      <p className="text-lg font-bold text-gray-900">
                        {natNalData.city}, {natNalData.state}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 relative z-10">
                  <button
                    onClick={handleEdit}
                    className="flex-1 bg-[#ff6b35] text-white py-2.5 rounded-lg font-semibold hover:bg-[#ff8c61] transition-colors shadow-sm text-sm"
                    type="button"
                  >
                    Edit Status
                  </button>
                  <button
                    onClick={handleClear}
                    className="flex-1 bg-white text-gray-600 py-2.5 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                    type="button"
                  >
                    Clear
                  </button>
                </div>
              </div>
            ) : (
              // Show form
              <div className="max-w-md mx-auto">
                <div className="mb-8 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-[#ff6b35]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Set Availability</h3>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto">
                    Update your location and time to get the best load matches
                  </p>
                </div>

                <form onSubmit={handleNatNalSubmit} className="space-y-6">
                  {/* Next Available Time Section */}
                  <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center text-sm border-b border-gray-100 pb-3">
                      <Clock className="w-4 h-4 text-[#ff6b35] mr-2" />
                      NEXT AVAILABLE TIME
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 ml-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={formDate}
                          onChange={(e) => setFormDate(e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-gray-900 font-medium"
                          required
                        />
                        <div className="flex gap-2 mt-3">
                          <button
                            type="button"
                            onClick={() => setQuickDate(7)}
                            className="flex-1 text-xs py-2 px-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors font-medium"
                          >
                            +1 Week
                          </button>
                          <button
                            type="button"
                            onClick={() => setQuickDate(30)}
                            className="flex-1 text-xs py-2 px-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors font-medium"
                          >
                            +1 Month
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 ml-1">
                          Time
                        </label>
                        <input
                          type="time"
                          value={formTime}
                          onChange={(e) => setFormTime(e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-gray-900 font-medium"
                          required
                        />
                        <div className="grid grid-cols-4 gap-2 mt-3">
                          {[0, 6, 12, 18].map(hour => (
                            <button
                              key={hour}
                              type="button"
                              onClick={() => setQuickTime(hour)}
                              className="text-xs py-2 px-1 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors font-medium"
                            >
                              {hour === 0 ? '12 AM' : hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Available Location Section */}
                  <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center text-sm border-b border-gray-100 pb-3">
                      <MapPin className="w-4 h-4 text-[#ff6b35] mr-2" />
                      NEXT AVAILABLE LOCATION
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 ml-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={formCity}
                          onChange={(e) => setFormCity(e.target.value)}
                          placeholder="Madison"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-gray-900 font-medium"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 ml-1">
                          State
                        </label>
                        <input
                          type="text"
                          value={formState}
                          onChange={(e) => setFormState(e.target.value.toUpperCase())}
                          placeholder="WI"
                          maxLength={2}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent uppercase text-gray-900 font-medium"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ff6b35] text-white py-4 rounded-xl font-bold text-base hover:bg-[#ff8c61] transition-all shadow-lg shadow-orange-200 mt-4"
                  >
                    Update Loads
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {activeTab === 'Watched' && (
          <div className="px-4 py-4 space-y-4">
            {watchedLoads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-gray-300 fill-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No watched loads</h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  Tap the heart icon on any load to save it here for quick access later.
                </p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="mt-6 text-[#ff6b35] font-medium text-sm hover:underline"
                >
                  Browse Loads
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {watchedLoads.map(load => (
                  <OptimizedLoadCard
                    key={load.id}
                    load={load}
                    isWatched={true}
                    onToggleWatch={() => toggleWatch(load)}
                    onClick={() => handleLoadClick(load)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

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

