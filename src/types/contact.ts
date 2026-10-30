import { ProblemCategory } from './report';

export interface OfficialContact {
  id: string;
  authority_name: string;
  tamil_authority_name?: string;
  state: string;
  district: string; // 'Chennai' or 'ALL' or specific district
  local_body: string; // 'Greater Chennai Corporation' or 'ALL' or specific local body
  applicable_categories: ProblemCategory[] | 'ALL';
  phone_number?: string;
  portal_url?: string;
  source_url: string;
  source_name: string;
  verification_date: string;
  verification_status: 'verified' | 'unverified';
  instructions: string;
  tamil_instructions?: string;
  call_button_label?: string;
  portal_button_label?: string;
}

export interface RoutingMatch {
  matchedContact?: OfficialContact;
  stateGrievanceContact: OfficialContact;
  isLocalBodyVerified: boolean;
  notes: string;
}
