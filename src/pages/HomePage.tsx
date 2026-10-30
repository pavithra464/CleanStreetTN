import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { fetchReports, getDashboardStatistics, DashboardStats } from '../services/reportService';
import { Report } from '../types/report';
import { CATEGORY_DETAILS } from '../data/tamilNaduDistricts';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  PlusCircle,
  MapPin,
  Building2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Recycle,
  Layers,
  ChevronRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentReports, setRecentReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [dashboardStats, reportsList] = await Promise.all([
          getDashboardStatistics(),
          fetchReports({ publicOnly: true })
        ]);
        setStats(dashboardStats);
        setRecentReports(reportsList.slice(0, 4));
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();

    const handleDataChange = () => {
      loadHomeData();
    };
    window.addEventListener('cleanstreet_reports_changed', handleDataChange);
    return () => window.removeEventListener('cleanstreet_reports_changed', handleDataChange);
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-forest-50 via-white to-slate-50 pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-200/60">
        {/* Subtle decorative leaf backdrop */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-forest-100/30 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Greater Chennai & Tamil Nadu Community Initiative</span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight">
              {t('hero.title')}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              {t('hero.subtitle')}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/report"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-900/10 hover:shadow-lg transition transform active:scale-95"
              >
                <PlusCircle className="w-5 h-5" />
                <span>{t('hero.btn.report')}</span>
              </Link>

              <Link
                to="/map"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm rounded-xl shadow-xs hover:border-slate-400 transition"
              >
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span>{t('hero.btn.map')}</span>
              </Link>
            </div>

            {/* Verified Grievance Pills */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
              <span className="text-slate-400">Direct Official Helpline Access:</span>
              <a
                href="tel:1913"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-emerald-700 hover:border-emerald-300 transition font-medium"
              >
                <PhoneCall className="w-3 h-3 text-emerald-600" />
                <span>GCC: <strong>1913</strong> (Chennai)</span>
              </a>
              <a
                href="tel:1100"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-emerald-700 hover:border-emerald-300 transition font-medium"
              >
                <PhoneCall className="w-3 h-3 text-emerald-600" />
                <span>TN CM Helpline: <strong>1100</strong> (All Tamil Nadu)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOUR CORE FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <Link
            to="/report"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                <PlusCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition">
                {t('feature.1.title')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('feature.1.desc')}
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-emerald-700">
              <span>Submit Report</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 2 */}
          <Link
            to="/map"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-700 transition">
                {t('feature.2.title')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('feature.2.desc')}
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-sky-700">
              <span>View Interactive Map</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 3 */}
          <Link
            to="/track"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-700 transition">
                {t('feature.3.title')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('feature.3.desc')}
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-indigo-700">
              <span>Official Channels</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 4 */}
          <Link
            to="/learn"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-700 transition">
                {t('feature.4.title')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('feature.4.desc')}
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-amber-700">
              <span>Learn & Take Quiz</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>
      </section>

      {/* HOW THE PLATFORM WORKS (5 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              Transparent Community Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t('how.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {t('how.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Step 1 */}
            <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-500/30">
                1
              </div>
              <h4 className="font-bold text-white text-sm">
                {t('how.step1.title')}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('how.step1.desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-500/30">
                2
              </div>
              <h4 className="font-bold text-white text-sm">
                {t('how.step2.title')}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('how.step2.desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-500/30">
                3
              </div>
              <h4 className="font-bold text-white text-sm">
                {t('how.step3.title')}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('how.step3.desc')}
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-500/30">
                4
              </div>
              <h4 className="font-bold text-white text-sm">
                {t('how.step4.title')}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('how.step4.desc')}
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-500/30">
                5
              </div>
              <h4 className="font-bold text-white text-sm">
                {t('how.step5.title')}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('how.step5.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE STORED STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Community Reporting Statistics
            </h2>
            <p className="text-xs text-slate-500">
              Live counts calculated strictly from active reports in the database
            </p>
          </div>

          <Link
            to="/dashboard"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Open Complete Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block font-medium">Total Community Reports</span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 mt-1 block">
                {stats.total}
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">Submitted by residents</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-amber-700 block font-medium">Under Review</span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-amber-700 mt-1 block">
                {stats.underReview}
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">Being verified by moderators</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-emerald-700 block font-medium">Marked Resolved</span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-700 mt-1 block">
                {stats.resolved}
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">Confirmed with after-photos</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-forest-700 block font-medium">Areas with Issues</span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-forest-800 mt-1 block">
                {stats.distinctLocalities}
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">Across Tamil Nadu</span>
            </div>
          </div>
        )}
      </section>

      {/* RECENT PUBLIC COMMUNITY REPORTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Recent Community Reports
            </h2>
            <p className="text-xs text-slate-500">
              Recent civic concerns logged by citizens and school environmental clubs
            </p>
          </div>
          <Link
            to="/map"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Reports</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentReports.map((report) => {
            const photo = report.photos && report.photos.length > 0 ? report.photos[0] : null;
            return (
              <div
                key={report.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {report.reference_code}
                    </span>
                    <StatusBadge status={report.status} size="sm" />
                  </div>

                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm hover:text-emerald-700 transition line-clamp-2">
                    <Link to={`/report/${report.id}`}>{report.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {report.description}
                  </p>
                </div>

                {photo && (
                  <div className="h-28 w-full rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={photo.storage_path}
                      alt={report.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{report.locality}</span>
                  </span>
                  <Link
                    to={`/report/${report.id}`}
                    className="font-semibold text-emerald-700 hover:text-emerald-900"
                  >
                    View
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED: RESPONSIBLE WASTE DISPOSAL IN TAMIL NADU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-50 to-forest-100 border border-emerald-200 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-200/70 text-emerald-900 rounded-full text-xs font-bold">
              <Recycle className="w-4 h-4 text-emerald-800" />
              <span>Meendum Manjappai & Circular Economy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-forest-950">
              Responsible Waste Disposal in Chennai & Tamil Nadu
            </h2>
            <p className="text-xs sm:text-sm text-forest-900/80 leading-relaxed">
              Tamil Nadu generates over 15,000 tonnes of municipal solid waste every single day. By separating wet kitchen waste from clean dry recyclables at home, we divert up to 80% of waste away from Kodungaiyur and Perungudi dumpsites.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                <span>Explore Segregation Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/campaigns"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-forest-900 border border-forest-300 font-bold text-xs rounded-xl transition"
              >
                <span>Join a School Drive</span>
              </Link>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-emerald-200/80 shadow-xs max-w-sm w-full space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-emerald-800">
              Household Golden Rules
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">✓</span>
                <span><strong>Green Bin:</strong> Daily vegetable peels, leftovers, tea leaves (100% biodegradable).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">✓</span>
                <span><strong>Blue Bin:</strong> Dry paper, milk packets rinsed and dried, cardboard boxes.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">✕</span>
                <span><strong>Zero Burning:</strong> Never burn garden leaves or plastic in open streets.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
