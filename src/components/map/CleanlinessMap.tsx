import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Report, ProblemCategory } from '../../types/report';
import { CATEGORY_DETAILS, TAMIL_NADU_DISTRICTS } from '../../data/tamilNaduDistricts';
import { StatusBadge } from '../common/StatusBadge';
import { useLanguage } from '../../context/LanguageContext';
import {
  Filter,
  List,
  Map as MapIcon,
  Search,
  ExternalLink,
  Calendar,
  MapPin,
  AlertCircle
} from 'lucide-react';

interface CleanlinessMapProps {
  reports: Report[];
  initialCategory?: string;
  initialDistrict?: string;
}

// Center of Tamil Nadu / Chennai focus
const CHENNAI_COORDS: [number, number] = [13.0827, 80.2707];

function MapBoundsAdjuster({ markers }: { markers: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(([lat, lng]) => [lat, lng]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [markers, map]);
  return null;
}

export const CleanlinessMap: React.FC<CleanlinessMapProps> = ({
  reports,
  initialCategory,
  initialDistrict
}) => {
  const { language, t } = useLanguage();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrict || 'ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter reports
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      // Must be public
      if (!r.is_public) return false;

      // Category filter
      if (selectedCategory !== 'ALL' && r.category !== selectedCategory) {
        return false;
      }
      // District filter
      if (selectedDistrict !== 'ALL' && r.district !== selectedDistrict) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'ALL' && r.status !== selectedStatus) {
        return false;
      }
      // Search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTitle = r.title.toLowerCase().includes(q);
        const matchLocality = r.locality.toLowerCase().includes(q);
        const matchRef = r.reference_code.toLowerCase().includes(q);
        if (!matchTitle && !matchLocality && !matchRef) return false;
      }
      return true;
    });
  }, [reports, selectedCategory, selectedDistrict, selectedStatus, searchTerm]);

  // Valid coordinates for map
  const mappableReports = useMemo(() => {
    return filteredReports.filter((r) => r.latitude !== null && r.longitude !== null);
  }, [filteredReports]);

  const markerPoints: [number, number][] = useMemo(() => {
    return mappableReports.map((r) => [r.latitude!, r.longitude!]);
  }, [mappableReports]);

  // Create custom marker icons based on category color
  const createCategoryIcon = (category: ProblemCategory) => {
    const detail = CATEGORY_DETAILS[category] || CATEGORY_DETAILS.other;
    return L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div style="
          background-color: ${detail.color};
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
          font-size: 11px;
        ">
          ●
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14]
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reports by locality, title, or CSTN code..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                viewMode === 'map'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map View</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                viewMode === 'list'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          {/* Category Filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              Problem Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="ALL">All Categories ({reports.length})</option>
              {Object.entries(CATEGORY_DETAILS).map(([key, cat]) => (
                <option key={key} value={key}>
                  {language === 'ta' ? cat.tamilLabel : cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              District
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="ALL">All Districts</option>
              {Object.keys(TAMIL_NADU_DISTRICTS).map((d) => (
                <option key={d} value={d}>
                  {language === 'ta' ? TAMIL_NADU_DISTRICTS[d].tamilName : d}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              Community Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="ALL">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved for Public Display">Approved for Public Display</option>
              <option value="Action Reported">Action Reported</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between text-xs text-slate-700 pt-2 border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-900">{filteredReports.length}</strong> reports
            {viewMode === 'map' && ` (${mappableReports.length} plotted on map)`}
          </span>
          {(selectedCategory !== 'ALL' || selectedDistrict !== 'ALL' || selectedStatus !== 'ALL' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedDistrict('ALL');
                setSelectedStatus('ALL');
                setSearchTerm('');
              }}
              className="text-emerald-700 hover:text-emerald-900 font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* MAP VIEW */}
      {viewMode === 'map' && (
        <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[540px]">
          <MapContainer
            center={CHENNAI_COORDS}
            zoom={12}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {markerPoints.length > 0 && <MapBoundsAdjuster markers={markerPoints} />}

            {mappableReports.map((report) => (
              <Marker
                key={report.id}
                position={[report.latitude!, report.longitude!]}
                icon={createCategoryIcon(report.category)}
              >
                <Popup>
                  <div className="p-3 max-w-xs space-y-2 text-slate-800">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5">
                      <span className="font-mono text-[10px] font-bold text-slate-500">
                        {report.reference_code}
                      </span>
                      <StatusBadge status={report.status} size="sm" />
                    </div>

                    <h4 className="font-bold text-xs text-slate-900 leading-snug">
                      {report.title}
                    </h4>

                    <div className="text-[11px] text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{report.locality}, {report.district}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {report.description}
                    </p>

                    <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">
                        {report.observed_at}
                      </span>
                      <Link
                        to={`/report/${report.id}`}
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredReports.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="font-bold text-slate-800 text-sm">No reports match your filters</h4>
              <p className="text-xs text-slate-500">Try adjusting your category, district, or search keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReports.map((report) => {
                const cat = CATEGORY_DETAILS[report.category] || CATEGORY_DETAILS.other;
                const photo = report.photos && report.photos.length > 0 ? report.photos[0] : null;

                return (
                  <div
                    key={report.id}
                    className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {report.reference_code}
                        </span>
                        <StatusBadge status={report.status} size="sm" />
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition">
                        <Link to={`/report/${report.id}`}>{report.title}</Link>
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {report.description}
                      </p>
                    </div>

                    {photo && (
                      <div className="h-32 w-full rounded-xl overflow-hidden bg-slate-100">
                        <img
                          src={photo.storage_path}
                          alt={report.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{report.locality}, {report.district}</span>
                      </span>

                      <Link
                        to={`/report/${report.id}`}
                        className="font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                      >
                        <span>View Report</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
