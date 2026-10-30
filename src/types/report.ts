export type ProblemCategory =
  | 'garbage_dumped_street'
  | 'overflowing_bin'
  | 'garbage_not_collected'
  | 'plastic_accumulation'
  | 'construction_demolition'
  | 'waste_near_water_body'
  | 'waste_burning'
  | 'improperly_segregated'
  | 'other';

export type ReportStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Approved for Public Display'
  | 'Action Reported'
  | 'Resolved'
  | 'Rejected';

export interface ReportPhoto {
  id: string;
  report_id: string;
  storage_path: string;
  photo_type: 'before' | 'after';
  created_at: string;
}

export interface ReportStatusHistory {
  id: string;
  report_id: string;
  old_status: ReportStatus | null;
  new_status: ReportStatus;
  change_note: string;
  changed_by: string;
  created_at: string;
}

export interface OfficialComplaintReference {
  id: string;
  report_id: string;
  authority_name: string;
  complaint_reference: string;
  official_portal_url?: string;
  verification_status: 'unverified' | 'verified_by_user' | 'confirmed_by_admin';
  created_at: string;
}

export interface Report {
  id: string;
  reference_code: string;
  title: string;
  description: string;
  category: ProblemCategory;
  state: string;
  district: string;
  local_body: string;
  city_town?: string;
  locality: string;
  street_name?: string;
  landmark?: string;
  postal_code?: string;
  latitude: number | null;
  longitude: number | null;
  observed_at: string;
  status: ReportStatus;
  is_public: boolean;
  reporter_name?: string;
  reporter_contact?: string; // Stored privately, never shown publicly
  resolution_note?: string;
  resolution_photo_url?: string;
  photos: ReportPhoto[];
  status_history?: ReportStatusHistory[];
  official_complaints?: OfficialComplaintReference[];
  created_at: string;
  updated_at: string;
  reviewed_at?: string;
}

export interface ReportFormData {
  title: string;
  description: string;
  category: ProblemCategory;
  state: string;
  district: string;
  local_body: string;
  city_town: string;
  locality: string;
  street_name: string;
  landmark: string;
  postal_code: string;
  latitude: number | null;
  longitude: number | null;
  observed_at: string;
  reporter_name?: string;
  reporter_contact?: string;
  privacy_consent: boolean;
}
