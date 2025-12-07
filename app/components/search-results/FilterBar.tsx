"use client"
import { useState } from "react";
export default function FilterBar() {

  const [isStandardOnly, setIsStandardOnly] = useState(false);
  return (
    <div className="px-4 py-3 space-y-2">
      <div className="flex items-center justify-between text-xs text-gray-700">
        <span className="bg-[#f3efee]">Origin: <span className="font-medium bg-[#f3efee]">Green Bay, WI</span></span>
        <span className="bg-[#f3efee]">Origin Radius: <span className="font-medium bg-[#f3efee]">250 mi</span></span>
        <span className="bg-[#f3efee]">Pick-up Date: <span className="font-medium bg-[#f3efee]">Aug...</span></span>
      </div>
      

      <div className="flex items-center justify-end gap-2">
        <span className="text-sm text-gray-700">Standard Network Only</span>
        <button
          type="button"
          className="relative inline-block w-11 h-6 focus:outline-none"
          aria-pressed={isStandardOnly}
          onClick={() => setIsStandardOnly((prev) => !prev)}
        >
          <div
            className={`w-11 h-6 rounded-full transition-colors duration-200 ${
              isStandardOnly ? "bg-orange-500" : "bg-gray-400"
            }`}
          ></div>
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
              isStandardOnly ? "translate-x-5" : ""
            }`}
          ></div>
        </button>
      </div>
    </div>
  );
}
