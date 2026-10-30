import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  fetchReports,
  updateReportStatus,
  deleteReport
} from '../services/reportService';
import {
  fetchCampaigns,
  updateCampaignStatus
} from '../services/campaignService';
import { VERIFIED_OFFICIAL_CONTACTS } from '../data/officialContacts';
import { Report, ReportStatus, ProblemCategory } from '../types/report';
import { Campaign } from '../types/campaign';
import { CATEGORY_DETAILS } from '../data/tamilNaduDistricts';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Shield,
  Lock,
  LogOut,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  AlertTriangle,
  FileCheck2,
  Calendar,
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user, isAdmin, login, logout, isSupabaseAuth } = useAuth();

  // Login form state
  const [emailInput, setEmailInput] = useState('admin@cleanstreet-tn.org');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Admin Dashboard State
  const [activeTab, setActiveTab] = useState<'reports' | 'campaigns' | 'contacts'>('reports');
  const [reports, setReports] = useState<Report[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  // Status update modal / form
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [newStatus, setNewStatus] = useState<ReportStatus>('Approved for Public Display');
  const [statusNote, setStatusNote] = useState('');
  const [resolutionNote, setResolutionNote] = useState('');
  const [resolutionPhotoUrl, setResolutionPhotoUrl] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [allReports, allCampaigns] = await Promise.all([
        fetchReports(),
        fetchCampaigns()
      ]);
      setReports(allReports);
      setCampaigns(allCampaigns);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const res = await login(emailInput, passwordInput);
      if (!res.success) {
        setLoginError(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleOpenEdit = (report: Report) => {
    setEditingReport(report);
    setNewStatus(report.status);
    setStatusNote(`Status updated by ${user?.email || 'Admin'}`);
    setResolutionNote(report.resolution_note || '');
    setResolutionPhotoUrl(report.resolution_photo_url || '');
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReport) return;
    setIsUpdatingStatus(true);
    try {
      await updateReportStatus(
        editingReport.id,
        newStatus,
        statusNote,
        user?.email || 'Moderator',
        newStatus === 'Resolved' ? resolutionNote : undefined,
        newStatus === 'Resolved' && resolutionPhotoUrl ? resolutionPhotoUrl : undefined
      );
      setEditingReport(null);
      await loadAdminData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDeleteSpam = async (reportId: string) => {
    if (window.confirm('Are you sure you want to delete this report as spam or inappropriate content?')) {
      await deleteReport(reportId);
      await loadAdminData();
    }
  };

  const handleCampaignStatusToggle = async (campId: string, status: 'Upcoming' | 'Completed') => {
    await updateCampaignStatus(campId, status);
    await loadAdminData();
  };

  // 1. UNPROTECTED / LOGIN VIEW
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-md">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-xl font-black text-slate-900">
              CleanStreet TN Moderator Desk
            </h1>
            <p className="text-xs text-slate-500">
              Restricted portal for civic moderators and ward administrators
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Administrator Email</label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-xs"
            >
              {isLoggingIn ? 'Verifying...' : 'Sign In as Administrator'}
            </button>
          </form>

          {/* Demonstration Notice */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-[11px] text-slate-500 space-y-1">
            <span className="font-bold text-slate-700 block">Demo Evaluation Credentials:</span>
            <p>Email: <code className="font-mono text-emerald-800 font-bold">admin@cleanstreet-tn.org</code></p>
            <p>Password: <code className="font-mono text-emerald-800 font-bold">CleanStreetAdmin2026!</code></p>
            <p className="text-[10px] text-slate-400 pt-1">
              In production, this connects to Supabase Auth Row Level Security.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. PROTECTED ADMIN DASHBOARD VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Moderator Session Active
            </span>
            <span className="text-xs text-slate-400 font-mono">{user?.email}</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">
            CleanStreet TN Moderation Console
          </h1>
        </div>

        <button
          onClick={logout}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'reports'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Community Reports ({reports.length})
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'campaigns'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Campaign Moderation ({campaigns.length})
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'contacts'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Verified Helpline Directory
        </button>
      </div>

      {/* TAB 1: REPORTS MODERATION */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">
              Citizen Cleanliness Reports
            </h3>
            <span className="text-xs text-slate-400">Click &quot;Update Status&quot; to review or resolve</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 font-semibold">Reference</th>
                  <th className="px-4 py-3 font-semibold">Title & Description</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Observed</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono font-bold text-emerald-800">
                      {r.reference_code}
                    </td>
                    <td className="px-4 py-3 max-w-sm">
                      <p className="font-bold text-slate-900">{r.title}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{r.description}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <p className="font-semibold text-slate-800">{r.locality}</p>
                      <p className="text-[10px] text-slate-400">{r.local_body}</p>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={r.status} size="sm" />
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-[11px]">
                      {r.observed_at}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(r)}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold rounded-lg text-[11px] transition"
                      >
                        Update Status
                      </button>
                      <button
                        onClick={() => handleDeleteSpam(r.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                        title="Remove Spam"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* EDIT STATUS MODAL */}
      {editingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-800">
                  {editingReport.reference_code}
                </span>
                <h3 className="font-bold text-slate-900 text-base">
                  Update Community Status
                </h3>
              </div>
              <button
                onClick={() => setEditingReport(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStatus} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Select Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ReportStatus)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved for Public Display">Approved for Public Display</option>
                  <option value="Action Reported">Action Reported</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Audit Log / Change Note *</label>
                <input
                  type="text"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  required
                  placeholder="e.g. Cleared by conservancy loader; confirmed by citizen"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {newStatus === 'Resolved' && (
                <div className="space-y-3 p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <span className="font-bold text-emerald-900 block text-[11px] uppercase tracking-wider">
                    Resolution Verification
                  </span>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 block">Resolution Note *</label>
                    <textarea
                      rows={2}
                      value={resolutionNote}
                      onChange={(e) => setResolutionNote(e.target.value)}
                      required
                      placeholder="e.g. Debris and plastic waste cleared by GCC Ward 112 compactor."
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 block">After-Photo Evidence URL (Optional)</label>
                    <input
                      type="url"
                      value={resolutionPhotoUrl}
                      onChange={(e) => setResolutionPhotoUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingReport(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingStatus}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl transition"
                >
                  {isUpdatingStatus ? 'Saving...' : 'Apply Status Change'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: CAMPAIGN MODERATION */}
      {activeTab === 'campaigns' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-base">
            School & Community Campaign Proposals
          </h3>
          <div className="space-y-3">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{camp.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      camp.status === 'Upcoming'
                        ? 'bg-emerald-100 text-emerald-800'
                        : camp.status === 'Pending Approval'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {camp.status}
                    </span>
                  </div>
                  <p className="text-slate-500">
                    Org: <strong>{camp.organizer}</strong> ({camp.organizer_type}) • {camp.locality}, {camp.district} • Date: {camp.event_date}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {camp.status !== 'Upcoming' && (
                    <button
                      onClick={() => handleCampaignStatusToggle(camp.id, 'Upcoming')}
                      className="px-3 py-1.5 bg-emerald-700 text-white font-semibold rounded-xl text-xs hover:bg-emerald-800"
                    >
                      Approve & Publish
                    </button>
                  )}
                  {camp.status === 'Upcoming' && (
                    <button
                      onClick={() => handleCampaignStatusToggle(camp.id, 'Completed')}
                      className="px-3 py-1.5 bg-slate-800 text-white font-semibold rounded-xl text-xs hover:bg-slate-700"
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VERIFIED CONTACTS DIRECTORY */}
      {activeTab === 'contacts' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Verified Official Grievance Routing Directory
              </h3>
              <p className="text-xs text-slate-500">
                Helplines and portals verified against official government gazettes and websites
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {VERIFIED_OFFICIAL_CONTACTS.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{c.authority_name}</h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Verified: {c.verification_date}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Helpline</span>
                    <span className="font-mono font-bold text-slate-800">{c.phone_number || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Official Source</span>
                    <span className="truncate block font-medium text-slate-800">{c.source_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Jurisdiction</span>
                    <span className="font-medium text-slate-800">{c.local_body} ({c.district})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
