'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Home, Search, FileText, MapPin, MoreHorizontal } from 'lucide-react';

export default function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();

    // Determine if we're in demo or optimized context
    const isDemo = pathname.startsWith('/demo');
    const isOptimized = pathname.startsWith('/optimized');

    // Determine base path
    const basePath = isDemo ? '/demo' : isOptimized ? '/optimized' : '';

    // Determine which page is active
    const isMorePage = pathname.includes('/more');
    const isNatNalPage = pathname.includes('/nat-nal');
    // Home page is now the root / search page
    const isHomePage = !isMorePage && !isNatNalPage && !pathname.includes('/my-loads') && (isDemo || isOptimized || pathname === '/');

    const navItems = [
        { icon: Home, label: 'Home', path: basePath || '/', active: isHomePage },
        { icon: FileText, label: 'My Loads', path: '/my-loads', active: pathname.startsWith('/my-loads') },
        { icon: MapPin, label: 'NAT / NAL', path: `${basePath}/nat-nal`, active: isNatNalPage },
        { icon: MoreHorizontal, label: 'More', path: `${basePath}/more`, active: isMorePage },
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
                                className={`w-6 h-6 mb-1 ${item.active ? 'text-orange-600' : 'text-gray-600'
                                    }`}
                            />
                            <span
                                className={`text-xs ${item.active ? 'text-orange-600 font-medium' : 'text-gray-600'
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

