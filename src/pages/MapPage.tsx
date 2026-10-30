import React, { useEffect, useState } from 'react';
import { fetchReports } from '../services/reportService';
import { Report } from '../types/report';
import { CleanlinessMap } from '../components/map/CleanlinessMap';
import { MapPin, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MapPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchReports({ publicOnly: true });
        setReports(data);
      } catch (err) {
        console.error('Failed to load map reports:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener('cleanstreet_reports_changed', handleUpdate);
    return () => window.removeEventListener('cleanstreet_reports_changed', handleUpdate);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Interactive GIS Explorer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Tamil Nadu Cleanliness Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Discover community reported waste hotspots, overflowing bins, and resolved cleanups across Tamil Nadu.
          </p>
        </div>

        <Link
          to="/report"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-xs transition self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report New Problem</span>
        </Link>
      </div>

      {loading ? (
        <div className="h-96 bg-white rounded-3xl border border-slate-200 flex flex-col items-center justify-center space-y-3">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500">Loading map markers and reports...</p>
        </div>
      ) : (
        <CleanlinessMap reports={reports} />
      )}
    </div>
  );
};
