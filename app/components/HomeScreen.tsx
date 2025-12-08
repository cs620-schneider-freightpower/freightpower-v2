"use client"
import { useState, useEffect } from 'react';
import { Bell, Search, Loader2, ExternalLink, MessageSquare, Settings, Bot, HelpCircle, MapPin, LifeBuoy, Sun, Users, CircleParking, Star, Check } from 'lucide-react';
import BottomNav from './search-results/BottomNav';
import { useNatNal } from '../context/NatNalContext';
import { useWatchedLoads } from '../context/WatchedLoadsContext';
import { useUser, DEMO_USER_IDS } from '../context/UserContext';
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
  const { userId, setUserId } = useUser();
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
        {['News', 'Watched Loads', 'Demo'].map((tab) => (
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

        {activeTab === 'Watched Loads' && (
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

        {activeTab === 'Demo' && (
          <div className="px-4 py-4 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#ff6b35]" />
                  Demo Configuration
                </h2>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-500 mb-4">
                  Select the active user ID to simulate different recommendation profiles.
                  This will update the "Recommended for you" section on the Home page.
                </p>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Active User ID
                  </label>

                  <div className="grid grid-cols-1 gap-2">
                    {DEMO_USER_IDS.map((id) => (
                      <button
                        key={id}
                        onClick={() => setUserId(id)}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-all ${userId === id
                          ? 'bg-orange-50 border-[#ff6b35] shadow-sm'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        <span className={`font-medium ${userId === id ? 'text-[#ff6b35]' : 'text-gray-700'}`}>
                          User {id}
                        </span>
                        {userId === id && (
                          <Check className="w-5 h-5 text-[#ff6b35]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-center text-gray-400">
                    Current Active ID: <span className="font-mono">{userId}</span>
                  </p>
                </div>
              </div>
            </div>
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

