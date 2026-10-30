export interface Campaign {
  id: string;
  title: string;
  description: string;
  locality: string;
  district: string;
  local_body: string;
  event_date: string;
  organizer: string;
  organizer_type: 'School' | 'College' | 'Residents Welfare Association' | 'Youth Club' | 'Environmental NGO';
  status: 'Upcoming' | 'Completed' | 'Pending Approval';
  meeting_point: string;
  equipment_provided: string[];
  contact_email?: string;
  participants_count: number;
  created_at: string;
}

export interface CampaignProposal {
  title: string;
  description: string;
  locality: string;
  district: string;
  local_body: string;
  event_date: string;
  organizer: string;
  organizer_type: string;
  meeting_point: string;
  contact_email: string;
  contact_phone: string;
  equipment_needed: string;
}
