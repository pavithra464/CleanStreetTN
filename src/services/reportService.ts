import { Report, ReportFormData, ReportStatus, ProblemCategory, ReportStatusHistory } from '../types/report';
import { INITIAL_DEMO_REPORTS } from '../data/initialReports';
import { supabase, isSupabaseConfigured } from './supabase';

const LOCAL_STORAGE_KEY = 'cleanstreet_reports_v1';
const LOCAL_STORAGE_INIT_KEY = 'cleanstreet_reports_initialized';

// Helper to initialize local storage
function getStoredReports(): Report[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      // First load: seed with initial demo reports
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REPORTS));
      localStorage.setItem(LOCAL_STORAGE_INIT_KEY, 'demo');
      return INITIAL_DEMO_REPORTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Error reading from localStorage:', err);
    return INITIAL_DEMO_REPORTS;
  }
}

function saveStoredReports(reports: Report[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reports));
    window.dispatchEvent(new Event('cleanstreet_reports_changed'));
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
}

export function isDemoMode(): boolean {
  return !isSupabaseConfigured();
}

/**
 * Generates a unique, standardized CleanStreet reference code: CSTN-2026-XXXXXX
 */
export function generateReferenceCode(existingReports: Report[]): string {
  const currentYear = new Date().getFullYear();
  const prefix = `CSTN-${currentYear}-`;

  // Find the highest sequence number for this year
  let maxSeq = 100;
  for (const r of existingReports) {
    if (r.reference_code && r.reference_code.startsWith(prefix)) {
      const parts = r.reference_code.split('-');
      if (parts.length === 3) {
        const num = parseInt(parts[2], 10);
        if (!isNaN(num) && num > maxSeq) {
          maxSeq = num;
        }
      }
    }
  }

  const nextSeq = (maxSeq + 1).toString().padStart(6, '0');
  return `${prefix}${nextSeq}`;
}

export async function fetchReports(filters?: {
  category?: string;
  district?: string;
  localBody?: string;
  status?: string;
  search?: string;
  publicOnly?: boolean;
}): Promise<Report[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      let query = supabase.from('reports').select(`
        *,
        photos:report_photos(*),
        status_history:report_status_history(*),
        official_complaints:official_complaint_references(*)
      `);

      if (filters?.publicOnly) {
        query = query.eq('is_public', true);
      }
      if (filters?.category && filters.category !== 'ALL') {
        query = query.eq('category', filters.category);
      }
      if (filters?.district && filters.district !== 'ALL') {
        query = query.eq('district', filters.district);
      }
      if (filters?.localBody && filters.localBody !== 'ALL') {
        query = query.eq('local_body', filters.localBody);
      }
      if (filters?.status && filters.status !== 'ALL') {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return (data as Report[]) || [];
    } catch (err) {
      console.warn('Supabase query failed, falling back to local store:', err);
    }
  }

  // Fallback to local storage
  let reports = getStoredReports();

  if (filters?.publicOnly) {
    reports = reports.filter((r) => r.is_public);
  }
  if (filters?.category && filters.category !== 'ALL') {
    reports = reports.filter((r) => r.category === filters.category);
  }
  if (filters?.district && filters.district !== 'ALL') {
    reports = reports.filter((r) => r.district === filters.district);
  }
  if (filters?.localBody && filters.localBody !== 'ALL') {
    reports = reports.filter((r) => r.local_body === filters.localBody);
  }
  if (filters?.status && filters.status !== 'ALL') {
    reports = reports.filter((r) => r.status === filters.status);
  }
  if (filters?.search && filters.search.trim().length > 0) {
    const q = filters.search.toLowerCase().trim();
    reports = reports.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.locality.toLowerCase().includes(q) ||
        r.reference_code.toLowerCase().includes(q)
    );
  }

  return reports.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function fetchReportByReference(referenceCode: string): Promise<Report | null> {
  const cleanCode = referenceCode.trim().toUpperCase();

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select(`
          *,
          photos:report_photos(*),
          status_history:report_status_history(*),
          official_complaints:official_complaint_references(*)
        `)
        .eq('reference_code', cleanCode)
        .single();

      if (!error && data) return data as Report;
    } catch (err) {
      console.warn('Supabase fetch by reference error:', err);
    }
  }

  const reports = getStoredReports();
  const match = reports.find((r) => r.reference_code.toUpperCase() === cleanCode);
  return match || null;
}

export async function createReport(
  formData: ReportFormData,
  photoUploads: { dataUrl: string; type: 'before' }[]
): Promise<Report> {
  const existing = getStoredReports();
  const referenceCode = generateReferenceCode(existing);
  const now = new Date().toISOString();
  const newId = 'rep-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);

  const initialHistory: ReportStatusHistory = {
    id: 'hist-' + Date.now(),
    report_id: newId,
    old_status: null,
    new_status: 'Submitted',
    change_note: 'Initial report submitted via CleanStreet TN',
    changed_by: formData.reporter_name?.trim() ? formData.reporter_name.trim() : 'Anonymous Reporter',
    created_at: now
  };

  const newReport: Report = {
    id: newId,
    reference_code: referenceCode,
    title: formData.title.trim(),
    description: formData.description.trim(),
    category: formData.category,
    state: formData.state,
    district: formData.district,
    local_body: formData.local_body,
    city_town: formData.city_town?.trim() || undefined,
    locality: formData.locality.trim(),
    street_name: formData.street_name?.trim() || undefined,
    landmark: formData.landmark?.trim() || undefined,
    postal_code: formData.postal_code?.trim() || undefined,
    latitude: formData.latitude,
    longitude: formData.longitude,
    observed_at: formData.observed_at || now.slice(0, 10),
    status: 'Submitted',
    is_public: true, // Visible for community transparency
    reporter_name: formData.reporter_name?.trim() || undefined,
    reporter_contact: formData.reporter_contact?.trim() || undefined,
    photos: photoUploads.map((p, idx) => ({
      id: `photo-${Date.now()}-${idx}`,
      report_id: newId,
      storage_path: p.dataUrl,
      photo_type: p.type,
      created_at: now
    })),
    status_history: [initialHistory],
    official_complaints: [],
    created_at: now,
    updated_at: now
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .insert([{
          reference_code: newReport.reference_code,
          title: newReport.title,
          description: newReport.description,
          category: newReport.category,
          state: newReport.state,
          district: newReport.district,
          local_body: newReport.local_body,
          city_town: newReport.city_town,
          locality: newReport.locality,
          street_name: newReport.street_name,
          landmark: newReport.landmark,
          postal_code: newReport.postal_code,
          latitude: newReport.latitude,
          longitude: newReport.longitude,
          observed_at: newReport.observed_at,
          status: newReport.status,
          is_public: newReport.is_public,
          reporter_name: newReport.reporter_name,
          reporter_contact: newReport.reporter_contact
        }])
        .select()
        .single();

      if (!error && data) {
        newReport.id = data.id;
      }
    } catch (err) {
      console.warn('Failed to insert report into Supabase, saving locally:', err);
    }
  }

  // Always update local cache
  existing.unshift(newReport);
  saveStoredReports(existing);

  return newReport;
}

export async function updateReportStatus(
  reportId: string,
  newStatus: ReportStatus,
  changeNote: string,
  changedBy: string,
  resolutionNote?: string,
  resolutionPhotoUrl?: string
): Promise<Report> {
  const reports = getStoredReports();
  const index = reports.findIndex((r) => r.id === reportId);
  if (index === -1) {
    throw new Error('Report not found');
  }

  const current = reports[index];
  const now = new Date().toISOString();

  const newHistory: ReportStatusHistory = {
    id: 'hist-' + Date.now(),
    report_id: reportId,
    old_status: current.status,
    new_status: newStatus,
    change_note: changeNote,
    changed_by: changedBy,
    created_at: now
  };

  const updated: Report = {
    ...current,
    status: newStatus,
    updated_at: now,
    reviewed_at: current.reviewed_at || now,
    resolution_note: resolutionNote || current.resolution_note,
    resolution_photo_url: resolutionPhotoUrl || current.resolution_photo_url,
    status_history: [...(current.status_history || []), newHistory]
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase
        .from('reports')
        .update({
          status: newStatus,
          updated_at: now,
          reviewed_at: updated.reviewed_at,
          resolution_note: updated.resolution_note,
          resolution_photo_url: updated.resolution_photo_url
        })
        .eq('id', reportId);

      await supabase.from('report_status_history').insert([{
        report_id: reportId,
        old_status: current.status,
        new_status: newStatus,
        change_note: changeNote,
        changed_by: changedBy
      }]);
    } catch (err) {
      console.warn('Supabase update failed, using local update:', err);
    }
  }

  reports[index] = updated;
  saveStoredReports(reports);
  return updated;
}

export async function addOfficialComplaintReference(
  reportId: string,
  authorityName: string,
  complaintReference: string,
  portalUrl?: string
): Promise<Report> {
  const reports = getStoredReports();
  const index = reports.findIndex((r) => r.id === reportId);
  if (index === -1) throw new Error('Report not found');

  const current = reports[index];
  const now = new Date().toISOString();

  const newRef = {
    id: 'ref-' + Date.now(),
    report_id: reportId,
    authority_name: authorityName,
    complaint_reference: complaintReference.trim(),
    official_portal_url: portalUrl,
    verification_status: 'verified_by_user' as const,
    created_at: now
  };

  const updated: Report = {
    ...current,
    official_complaints: [...(current.official_complaints || []), newRef],
    updated_at: now
  };

  reports[index] = updated;
  saveStoredReports(reports);
  return updated;
}

export async function deleteReport(reportId: string): Promise<boolean> {
  const reports = getStoredReports();
  const filtered = reports.filter((r) => r.id !== reportId);
  if (filtered.length === reports.length) return false;

  saveStoredReports(filtered);
  return true;
}

export interface DashboardStats {
  total: number;
  underReview: number;
  approved: number;
  resolved: number;
  actionReported: number;
  distinctLocalities: number;
  categoryDistribution: { category: ProblemCategory; count: number; label: string }[];
  statusDistribution: { status: ReportStatus; count: number }[];
  districtDistribution: { district: string; count: number }[];
  isDemo: boolean;
}

export async function getDashboardStatistics(): Promise<DashboardStats> {
  const reports = await fetchReports();
  const isDemo = isDemoMode();

  let underReview = 0;
  let approved = 0;
  let resolved = 0;
  let actionReported = 0;

  const catCounts: Record<string, number> = {};
  const distCounts: Record<string, number> = {};
  const localitiesSet = new Set<string>();

  for (const r of reports) {
    if (r.status === 'Under Review' || r.status === 'Submitted') underReview++;
    if (r.status === 'Approved for Public Display') approved++;
    if (r.status === 'Action Reported') actionReported++;
    if (r.status === 'Resolved') resolved++;

    catCounts[r.category] = (catCounts[r.category] || 0) + 1;
    distCounts[r.district] = (distCounts[r.district] || 0) + 1;
    if (r.locality) localitiesSet.add(r.locality.toLowerCase().trim());
  }

  const categoryDistribution = Object.entries(catCounts).map(([cat, count]) => ({
    category: cat as ProblemCategory,
    count,
    label: cat
  }));

  const statusDistribution: { status: ReportStatus; count: number }[] = [
    { status: 'Submitted', count: reports.filter((r) => r.status === 'Submitted').length },
    { status: 'Under Review', count: reports.filter((r) => r.status === 'Under Review').length },
    { status: 'Approved for Public Display', count: approved },
    { status: 'Action Reported', count: actionReported },
    { status: 'Resolved', count: resolved }
  ];

  const districtDistribution = Object.entries(distCounts).map(([district, count]) => ({
    district,
    count
  }));

  return {
    total: reports.length,
    underReview,
    approved,
    resolved,
    actionReported,
    distinctLocalities: localitiesSet.size,
    categoryDistribution,
    statusDistribution,
    districtDistribution,
    isDemo
  };
}
