'use client';

import { ArrowLeft, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <button 
        onClick={() => router.push('/')}
        className="p-2 -ml-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-gray-900" />
      </button>
      
      <h1 className="text-xl font-semibold text-orange-600">Search Results</h1>
      
      <button 
        onClick={() => {}}
        className="p-2 -mr-2 flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded transition-colors"
      >
        <Pencil className="w-5 h-5 text-gray-900" />
        <span className="text-base font-normal text-gray-900">Edit</span>
      </button>
    </div>
  );
}
