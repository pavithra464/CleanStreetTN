import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'w-9 h-9', showText = true }) => {
  return (
    <div className="flex items-center gap-2.5">
      {/* Leaf and Street Icon */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-forest-800 text-white shadow-md shadow-emerald-900/10 ${className}`}>
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4/5 h-4/5">
          {/* Leaf contour */}
          <path
            d="M8 28C8 17 14 7 28 6C28 19 22 29 11 29H8Z"
            fill="currentColor"
            fillOpacity="0.9"
          />
          {/* Central curving road inside the leaf */}
          <path
            d="M10 28C14 24 18 19 23 11"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Dashed lane marking */}
          <path
            d="M10 28C14 24 18 19 23 11"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray="2 3"
          />
          {/* Small sprouting side leaf */}
          <path
            d="M20 18C23 17 26 18 27 21C24 22 21 21 20 18Z"
            fill="#a7f3d0"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span className="font-extrabold text-lg text-slate-900 tracking-tight">CleanStreet</span>
            <span className="font-extrabold text-lg text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded-md text-xs tracking-wider">TN</span>
          </div>
          <span className="text-[10px] text-slate-700 font-semibold uppercase tracking-wider mt-0.5">Tamil Nadu Cleanliness Platform</span>
        </div>
      )}
    </div>
  );
};
