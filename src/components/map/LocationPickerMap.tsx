import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Navigation, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

interface LocationPickerMapProps {
  latitude: number | null;
  longitude: number | null;
  onChange: (lat: number | null, lng: number | null) => void;
}

const DEFAULT_CENTER: [number, number] = [13.0827, 80.2707]; // Chennai Center

const pinIcon = L.divIcon({
  className: 'picker-pin',
  html: `
    <div style="
      background-color: #059669;
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.35);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        transform: rotate(45deg);
      "></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

function MapClickHandler({
  onSelect
}: {
  onSelect: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}

export const LocationPickerMap: React.FC<LocationPickerMapProps> = ({
  latitude,
  longitude,
  onChange
}) => {
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  const handleUseCurrentLocation = () => {
    setGpsError(null);
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your current browser.');
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsLoading(false);
        onChange(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setGpsLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGpsError('Location permission was denied. You can still enter your address manually or click on the map.');
            break;
          case error.POSITION_UNAVAILABLE:
            setGpsError('GPS location signal is currently unavailable. Please click on the map or enter details manually.');
            break;
          case error.TIMEOUT:
            setGpsError('Location request timed out. Please click on the map directly.');
            break;
          default:
            setGpsError('Could not determine current location. Manual address entry is available below.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleClearLocation = () => {
    onChange(null, null);
    setGpsError(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>Pin Location on Map (Optional)</span>
        </label>

        <div className="flex items-center gap-2">
          {latitude !== null && longitude !== null && (
            <button
              type="button"
              onClick={handleClearLocation}
              className="text-[11px] text-slate-500 hover:text-rose-600 font-medium"
            >
              Clear Pin
            </button>
          )}

          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={gpsLoading}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition disabled:opacity-60"
          >
            <Navigation className={`w-3 h-3 ${gpsLoading ? 'animate-spin' : ''}`} />
            <span>{gpsLoading ? 'Locating...' : 'Use My GPS Location'}</span>
          </button>
        </div>
      </div>

      {gpsError && (
        <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>{gpsError}</span>
        </div>
      )}

      {/* Map view container */}
      <div className="relative h-60 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
        <MapContainer
          center={latitude !== null && longitude !== null ? [latitude, longitude] : DEFAULT_CENTER}
          zoom={latitude !== null && longitude !== null ? 15 : 12}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler onSelect={(lat, lng) => onChange(lat, lng)} />

          {latitude !== null && longitude !== null && (
            <Marker position={[latitude, longitude]} icon={pinIcon} />
          )}
        </MapContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500">
        <span>Click on the map above to position the marker.</span>
        {latitude !== null && longitude !== null ? (
          <span className="font-mono text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Lat: {latitude.toFixed(5)}, Lng: {longitude.toFixed(5)}
          </span>
        ) : (
          <span className="text-slate-400">No coordinates selected (Address will be used)</span>
        )}
      </div>
    </div>
  );
};
