import { LucideIcon } from 'lucide-react';
import React from 'react';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    icon?: LucideIcon;
    iconColor?: string; // e.g., "text-blue-600"
    iconBgColor?: string; // e.g., "bg-blue-50"
    actionLabel?: string;
    onAction?: () => void;
    className?: string; // Allow extra styling if needed
}

export default function SectionHeader({
    title,
    subtitle,
    icon: Icon,
    iconColor = "text-[#ff6b35]",
    iconBgColor = "bg-orange-50",
    actionLabel,
    onAction,
    className = ""
}: SectionHeaderProps) {
    return (
        <div className={`flex items-end justify-between px-4 mb-4 ${className}`}>
            <div className="flex items-center gap-3">
                {Icon && (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBgColor}`}>
                        <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                )}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 leading-none mb-1">{title}</h2>
                    {subtitle && (
                        <p className="text-sm font-medium text-gray-500">{subtitle}</p>
                    )}
                </div>
            </div>

            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="text-sm font-semibold text-[#ff6b35] hover:text-orange-700 hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
