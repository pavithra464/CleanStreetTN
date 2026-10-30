import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchReportByReference } from '../services/reportService';
import { Report } from '../types/report';
import { StatusBadge } from '../components/common/StatusBadge';
import { Search, ArrowRight, AlertCircle, CheckCircle2, MapPin, Calendar, Clock } from 'lucide-react';

export const TrackPage: React.FC = () => {
  const navigate = useNavigate();
  const [referenceInput, setReferenceInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [foundReport, setFoundReport] = useState<Report | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceInput.trim()) return;

    setIsSearching(true);
    setSearchError(null);
    setFoundReport(null);

    try {
      const report = await fetchReportByReference(referenceInput.trim());
      if (report) {
        setFoundReport(report);
      } else {
        setSearchError(`No community report found with reference code "${referenceInput.trim().toUpperCase()}". Please verify the code format (e.g. CSTN-2026-000101).`);
      }
    } catch (err: any) {
      setSearchError(err.message || 'Error searching for report.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleQuickFill = (code: string) => {
    setReferenceInput(code);
    fetchReportByReference(code).then((r) => {
      if (r) setFoundReport(r);
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Track Your Community Report
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Enter your unique CleanStreet tracking reference (e.g. CSTN-2026-000101) to view status updates, moderator notes, and municipal resolution details.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={referenceInput}
              onChange={(e) => setReferenceInput(e.target.value.toUpperCase())}
              placeholder="Enter reference code (e.g. CSTN-2026-000101)"
              className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm font-mono border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden uppercase"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching || !referenceInput.trim()}
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-xs flex items-center justify-center gap-2"
          >
            <span>{isSearching ? 'Searching...' : 'Track Status'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick sample chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
          <span>Sample References to Try:</span>
          <button
            type="button"
            onClick={() => handleQuickFill('CSTN-2026-000101')}
            className="font-mono bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-[11px] text-slate-700 font-semibold"
          >
            CSTN-2026-000101
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('CSTN-2026-000103')}
            className="font-mono bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-[11px] text-slate-700 font-semibold"
          >
            CSTN-2026-000103
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('CSTN-2026-000106')}
            className="font-mono bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-[11px] text-slate-700 font-semibold"
          >
            CSTN-2026-000106
          </button>
        </div>
      </div>

      {/* Error Message */}
      {searchError && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <span>{searchError}</span>
        </div>
      )}

      {/* Result Card */}
      {foundReport && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-5 animate-in fade-in duration-150">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                {foundReport.reference_code}
              </span>
              <h3 className="font-bold text-lg text-slate-900 mt-2">
                {foundReport.title}
              </h3>
            </div>
            <StatusBadge status={foundReport.status} size="md" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <span className="text-slate-400 block font-medium">Location</span>
              <span className="font-semibold text-slate-800 truncate block">
                {foundReport.locality}, {foundReport.district}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Urban Local Body</span>
              <span className="font-semibold text-slate-800">{foundReport.local_body}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Observed On</span>
              <span className="font-semibold text-slate-800">{foundReport.observed_at}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {foundReport.description}
          </p>

          {foundReport.resolution_note && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-950">
              <span className="font-bold block text-emerald-800">Resolution Note:</span>
              <p className="mt-0.5">{foundReport.resolution_note}</p>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => navigate(`/report/${foundReport.id}`)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              <span>View Full Report & Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
