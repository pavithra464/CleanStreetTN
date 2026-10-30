import React, { useState } from 'react';
import { Info, Database, X } from 'lucide-react';

export const DemoDataBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2 text-xs transition">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">
            <Database className="w-3 h-3" /> Demo Mode
          </span>
          <span className="text-amber-800">
            Currently displaying sample community data for Tamil Nadu. Persistent local storage is active. To connect to a live Supabase PostgreSQL backend, provide valid environment credentials.
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-amber-700 hover:text-amber-950 p-1 rounded-md"
          title="Dismiss notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
