import React, { useEffect, useState } from 'react';
import { getDashboardStatistics, fetchReports, DashboardStats } from '../services/reportService';
import { Report } from '../types/report';
import { StatsOverview } from '../components/dashboard/StatsOverview';
import { CategoryChart } from '../components/dashboard/CategoryChart';
import { StatusChart } from '../components/dashboard/StatusChart';
import { DistrictChart } from '../components/dashboard/DistrictChart';
import { StatusBadge } from '../components/common/StatusBadge';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  PieChart,
  MapPin,
  FileText,
  Database,
  ArrowRight,
  TrendingUp,
  Download
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [dStats, allReports] = await Promise.all([
          getDashboardStatistics(),
          fetchReports()
        ]);
        setStats(dStats);
        setReports(allReports);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();

    const handleUpdate = () => loadStats();
    window.addEventListener('cleanstreet_reports_changed', handleUpdate);
    return () => window.removeEventListener('cleanstreet_reports_changed', handleUpdate);
  }, []);

  const exportCSV = () => {
    if (reports.length === 0) return;
    const headers = ['Reference Code', 'Title', 'Category', 'District', 'Local Body', 'Locality', 'Status', 'Date Observed'];
    const rows = reports.map((r) => [
      r.reference_code,
      `"${r.title.replace(/"/g, '""')}"`,
      r.category,
      r.district,
      r.local_body,
      `"${r.locality.replace(/"/g, '""')}"`,
      r.status,
      r.observed_at
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cleanstreet_reports_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500">Calculating real community analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" />
              <span>Civic Transparency & Analytics</span>
            </span>
            {stats?.isDemo && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                <Database className="w-3 h-3" /> Demo Data
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Community Cleanliness Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Transparent counts, problem distribution, and progress across Tamil Nadu municipalities.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-xl shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <Link
            to="/report"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl shadow-xs transition"
          >
            <span>Report Issue</span>
          </Link>
        </div>
      </div>

      {/* STATS OVERVIEW CARDS */}
      {stats && <StatsOverview stats={stats} />}

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Problem Category Breakdown
              </h3>
              <p className="text-[11px] text-slate-500">
                Relative frequency of issues reported by communities
              </p>
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          {stats && <CategoryChart data={stats.categoryDistribution} />}
        </div>

        {/* Status Distribution Donut Chart */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Community Status Lifecycle
            </h3>
            <p className="text-[11px] text-slate-500">
              Distribution across review and resolution stages
            </p>
          </div>
          {stats && <StatusChart data={stats.statusDistribution} />}
        </div>
      </div>

      {/* DISTRICT BREAKDOWN */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            Geographic Distribution by District
          </h3>
          <p className="text-[11px] text-slate-500">
            Total complaints logged across Tamil Nadu districts
          </p>
        </div>
        {stats && <DistrictChart data={stats.districtDistribution} />}
      </div>

      {/* RECENT COMMUNITY REPORTS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Latest Community Submissions
            </h3>
            <p className="text-[11px] text-slate-500">
              Recent reports tracked on the platform
            </p>
          </div>
          <span className="text-xs text-slate-400">Total: {reports.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 font-semibold">Reference</th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Local Body</th>
                <th className="px-4 py-3 font-semibold">District</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Observed</th>
                <th className="px-4 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.slice(0, 8).map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-4 py-3 font-mono font-bold text-emerald-800">
                    {r.reference_code}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900 max-w-xs truncate">
                    {r.title}
                  </td>
                  <td className="px-4 py-3 text-slate-600 truncate">
                    {r.local_body}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {r.district}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {r.observed_at}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/report/${r.id}`}
                      className="text-emerald-700 hover:text-emerald-900 font-semibold inline-flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
