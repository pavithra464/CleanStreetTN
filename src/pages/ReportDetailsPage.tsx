import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  fetchReports,
  fetchReportByReference,
  addOfficialComplaintReference
} from '../services/reportService';
import { Report } from '../types/report';
import { CATEGORY_DETAILS } from '../data/tamilNaduDistricts';
import { StatusBadge } from '../components/common/StatusBadge';
import { OfficialRoutingCard } from '../components/routing/OfficialRoutingCard';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  Calendar,
  Clock,
  ArrowLeft,
  FileCheck2,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  Building,
  Image as ImageIcon
} from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

const detailPinIcon = L.divIcon({
  className: 'detail-pin',
  html: `
    <div style="
      background-color: #059669;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
    ">
      📍
    </div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

export const ReportDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReport = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      // Check if id looks like reference code or internal id
      let data: Report | null = null;
      if (id.startsWith('CSTN-')) {
        data = await fetchReportByReference(id);
      } else {
        const all = await fetchReports();
        data = all.find((r) => r.id === id || r.reference_code.toUpperCase() === id.toUpperCase()) || null;
      }

      if (!data) {
        setError(`No community report found matching "${id}". Please verify the reference code.`);
      } else {
        setReport(data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load report details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, [id]);

  const handleSaveOfficialRef = async (ref: string, auth: string) => {
    if (!report) return;
    const updated = await addOfficialComplaintReference(report.id, auth, ref);
    setReport(updated);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500">Loading report details...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 bg-rose-100 text-rose-700 rounded-2xl flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Report Not Found</h2>
        <p className="text-xs text-slate-500">{error}</p>
        <div className="pt-2">
          <Link
            to="/track"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Search Another Reference</span>
          </Link>
        </div>
      </div>
    );
  }

  const categoryDetail = CATEGORY_DETAILS[report.category] || CATEGORY_DETAILS.other;
  const beforePhotos = report.photos?.filter((p) => p.photo_type === 'before') || [];
  const afterPhotos = report.photos?.filter((p) => p.photo_type === 'after') || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/map"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cleanliness Map</span>
        </Link>

        <span className="font-mono text-xs font-extrabold text-emerald-800 bg-emerald-100/70 border border-emerald-300 px-3 py-1 rounded-xl">
          {report.reference_code}
        </span>
      </div>

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${categoryDetail.badgeClass}`}>
              {language === 'ta' ? categoryDetail.tamilLabel : categoryDetail.label}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {report.title}
            </h1>
          </div>

          <div>
            <StatusBadge status={report.status} size="lg" />
          </div>
        </div>

        {/* Location & Metadata Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Urban Local Body</span>
            <span className="font-semibold text-slate-800">{report.local_body}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">District & State</span>
            <span className="font-semibold text-slate-800">{report.district}, {report.state}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Locality / Landmark</span>
            <span className="font-semibold text-slate-800 truncate block">
              {report.locality} {report.landmark ? `(${report.landmark})` : ''}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Observed On</span>
            <span className="font-semibold text-slate-800">{report.observed_at}</span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400">
            Problem Description
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {report.description}
          </p>
        </div>

        {/* Resolution Note if Resolved */}
        {report.status === 'Resolved' && report.resolution_note && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              <span>Confirmed Resolution Note</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
              {report.resolution_note}
            </p>
          </div>
        )}

        {/* Photo Gallery: Before & After */}
        {(beforePhotos.length > 0 || afterPhotos.length > 0 || report.resolution_photo_url) && (
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-slate-500" />
              <span>Photographic Evidence</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {beforePhotos.map((photo, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">
                    Before / Issue Observation
                  </span>
                  <div className="h-48 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img src={photo.storage_path} alt="Report evidence" className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}

              {report.resolution_photo_url && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-700">
                    After / Cleared Site
                  </span>
                  <div className="h-48 rounded-2xl overflow-hidden border border-emerald-300 bg-emerald-50">
                    <img src={report.resolution_photo_url} alt="Resolution evidence" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Map View if Coordinates are present */}
        {report.latitude !== null && report.longitude !== null && (
          <div className="space-y-2 pt-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span>Mapped Geographic Location</span>
            </h3>

            <div className="h-56 rounded-2xl overflow-hidden border border-slate-200">
              <MapContainer
                center={[report.latitude, report.longitude]}
                zoom={15}
                scrollWheelZoom={false}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[report.latitude, report.longitude]} icon={detailPinIcon} />
              </MapContainer>
            </div>
          </div>
        )}
      </div>

      {/* Official Complaint References Linked */}
      {report.official_complaints && report.official_complaints.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-slate-900 text-sm">
              Linked Official Government Dockets
            </h3>
          </div>
          <div className="space-y-2">
            {report.official_complaints.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-900">{c.authority_name}</span>
                  <span className="text-[11px] text-slate-500 block">
                    Linked on {c.created_at.slice(0, 10)}
                  </span>
                </div>
                <span className="font-mono font-bold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-300">
                  {c.complaint_reference}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Community Status History Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-700" />
          <span>Status Lifecycle History</span>
        </h3>

        <div className="border-l-2 border-slate-200 ml-3 pl-5 space-y-6">
          {report.status_history && report.status_history.length > 0 ? (
            report.status_history.map((hist, idx) => (
              <div key={idx} className="relative space-y-1">
                <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-200" />
                <div className="flex items-center gap-2">
                  <StatusBadge status={hist.new_status} size="sm" />
                  <span className="text-[11px] text-slate-400">
                    {new Date(hist.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium">
                  {hist.change_note}
                </p>
                <span className="text-[10px] text-slate-400 block">
                  Logged by: {hist.changed_by}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500">Initial submission record created.</p>
          )}
        </div>
      </div>

      {/* Official Complaint Routing Engine */}
      <OfficialRoutingCard
        state={report.state}
        district={report.district}
        localBody={report.local_body}
        category={report.category}
        reportId={report.id}
        onSaveOfficialReference={handleSaveOfficialRef}
      />
    </div>
  );
};
