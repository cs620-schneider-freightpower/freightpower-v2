'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Home, Search, FileText, Settings, MoreHorizontal } from 'lucide-react';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  // Determine if we're in demo or optimized context
  const isDemo = pathname.startsWith('/demo');
  const isOptimized = pathname.startsWith('/optimized');
  
  // Determine base path
  const basePath = isDemo ? '/demo' : isOptimized ? '/optimized' : '';
  
  // Determine which page is active
  const isHomePage = pathname.includes('/home');
  const isSearchPage = !isHomePage && (isDemo || isOptimized);

  const navItems = [
    { icon: Home, label: 'Home', path: `${basePath}/home`, active: isHomePage },
    { icon: Search, label: 'Search', path: basePath, active: isSearchPage },
    { icon: FileText, label: 'My Loads', path: null, active: false },
    { icon: Settings, label: 'Manage', path: null, active: false },
    { icon: MoreHorizontal, label: 'More', path: null, active: false },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => {
                if (item.path) {
                  router.push(item.path);
                }
              }}
              className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer hover:bg-gray-50 rounded transition-colors"
            >
              <Icon 
                className={`w-6 h-6 mb-1 ${
                  item.active ? 'text-orange-600' : 'text-gray-600'
                }`}
              />
              <span 
                className={`text-xs ${
                  item.active ? 'text-orange-600 font-medium' : 'text-gray-600'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
