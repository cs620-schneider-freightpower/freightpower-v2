"use client"
import { useState, useEffect } from 'react';
import { Bell, Search, Loader2, ExternalLink } from 'lucide-react';
import BottomNav from './search-results/BottomNav';
import { useNatNal } from '../context/NatNalContext';

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
  const { natNalData, setNatNalData } = useNatNal();
  const [isEditing, setIsEditing] = useState(!natNalData);
  const [liveNews, setLiveNews] = useState<NewsArticle[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);
  
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
      {/* Header */}
      <div className="bg-[#ff6b35] px-4 py-4 flex items-center justify-between">
        <div className="w-8" /> {/* Spacer for centering */}
        <h1 className="text-xl font-semibold text-white">Home</h1>
        <button
          type="button"
          className="p-1 rounded-full hover:bg-orange-600 transition-colors cursor-pointer"
        >
          <Bell className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 pt-4 pb-3 bg-white">
        <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 border border-gray-200">
          <Search className="w-5 h-5 text-[#ff6b35] mr-3" />
          <input
            type="text"
            placeholder="Search by Load #"
            className="flex-1 bg-transparent text-base outline-none text-gray-700 placeholder-gray-400"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b flex">
        {['News', 'NAT / NAL', 'Watched'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === tab
                ? 'text-black border-b-2 border-[#ff6b35]'
                : 'text-gray-500'
            }`}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white pb-20">
        {activeTab === 'News' && (
          <div>
            {/* News Sub-tabs */}
            <div className="bg-white border-b flex">
              {['Live News', 'Schneider News'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveNewsTab(tab as 'Live News' | 'Schneider News')}
                  className={`flex-1 py-3 text-center font-medium transition-colors ${
                    activeNewsTab === tab
                      ? 'text-black border-b-2 border-[#ff6b35]'
                      : 'text-gray-500'
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
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-semibold text-[#ff6b35] bg-orange-50 px-2 py-1 rounded">
                        {news.category}
                      </span>
                      <span className="text-xs text-gray-500">{news.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {news.description}
                    </p>
                    {news.url && (
                      <a
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#ff6b35] hover:text-orange-600 font-medium"
                      >
                        Read more <ExternalLink className="w-3 h-3" />
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
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-semibold text-[#ff6b35] bg-orange-50 px-2 py-1 rounded">
                        {news.category}
                      </span>
                      <span className="text-xs text-gray-500">{news.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {news.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'NAT / NAL' && (
          <div className="px-4 py-4">
            {natNalData && !isEditing ? (
              // Display saved NAT/NAL info
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your NAT/NAL</h3>
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Next Available Time</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(natNalData.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })} at {natNalData.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Next Available Location</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {natNalData.city}, {natNalData.state}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleEdit}
                    className="flex-1 bg-[#ff6b35] text-white py-3 rounded-lg font-semibold hover:bg-[#ff8c61] transition-colors"
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleClear}
                    className="flex-1 bg-white text-gray-700 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
                    type="button"
                  >
                    Clear
                  </button>
                </div>
              </div>
            ) : (
              // Show form
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Set Your NAT/NAL</h3>
                  <p className="text-sm text-gray-600">
                    Enter your Next Available Time and Next Available Location to get personalized load recommendations
                  </p>
                </div>
                
                <form onSubmit={handleNatNalSubmit} className="space-y-4">
                  {/* Next Available Time Section */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-[#ff6b35] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
                      Next Available Time
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={formDate}
                          onChange={(e) => setFormDate(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-black"
                          required
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => setQuickDate(7)}
                            className="flex-1 text-xs py-1.5 px-2 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors font-medium"
                          >
                            +1 Week
                          </button>
                          <button
                            type="button"
                            onClick={() => setQuickDate(30)}
                            className="flex-1 text-xs py-1.5 px-2 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors font-medium"
                          >
                            +1 Month
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Time
                        </label>
                        <input
                          type="time"
                          value={formTime}
                          onChange={(e) => setFormTime(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-black"
                          required
                        />
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => setQuickTime(0)}
                            className="text-xs py-1.5 px-2 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors font-medium"
                          >
                            12 AM
                          </button>
                          <button
                            type="button"
                            onClick={() => setQuickTime(6)}
                            className="text-xs py-1.5 px-2 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors font-medium"
                          >
                            6 AM
                          </button>
                          <button
                            type="button"
                            onClick={() => setQuickTime(12)}
                            className="text-xs py-1.5 px-2 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors font-medium"
                          >
                            12 PM
                          </button>
                          <button
                            type="button"
                            onClick={() => setQuickTime(18)}
                            className="text-xs py-1.5 px-2 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors font-medium"
                          >
                            6 PM
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Available Location Section */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-[#ff6b35] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
                      Next Available Location
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={formCity}
                          onChange={(e) => setFormCity(e.target.value)}
                          placeholder="e.g. Madison"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          value={formState}
                          onChange={(e) => setFormState(e.target.value.toUpperCase())}
                          placeholder="e.g. WI"
                          maxLength={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent uppercase text-black"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ff6b35] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#ff8c61] transition-colors shadow-md"
                  >
                    Save NAT/NAL
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'Watched' && (
          <div className="px-4 py-4">
            <p className="text-gray-500 text-center">No watched loads yet</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

