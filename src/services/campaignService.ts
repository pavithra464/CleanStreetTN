import { Campaign, CampaignProposal } from '../types/campaign';
import { INITIAL_CAMPAIGNS } from '../data/initialCampaigns';
import { isSupabaseConfigured, supabase } from './supabase';

const CAMPAIGNS_STORAGE_KEY = 'cleanstreet_campaigns_v1';

function getStoredCampaigns(): Campaign[] {
  try {
    const raw = localStorage.getItem(CAMPAIGNS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(INITIAL_CAMPAIGNS));
      return INITIAL_CAMPAIGNS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Error reading campaigns from localStorage:', err);
    return INITIAL_CAMPAIGNS;
  }
}

function saveStoredCampaigns(campaigns: Campaign[]): void {
  try {
    localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(campaigns));
    window.dispatchEvent(new Event('cleanstreet_campaigns_changed'));
  } catch (err) {
    console.error('Error saving campaigns:', err);
  }
}

export async function fetchCampaigns(): Promise<Campaign[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('event_date', { ascending: true });
      if (!error && data) return data as Campaign[];
    } catch (err) {
      console.warn('Supabase campaign fetch failed:', err);
    }
  }

  return getStoredCampaigns();
}

export async function proposeCampaign(proposal: CampaignProposal): Promise<Campaign> {
  const existing = getStoredCampaigns();
  const newCampaign: Campaign = {
    id: 'camp-' + Date.now(),
    title: proposal.title.trim(),
    description: proposal.description.trim(),
    locality: proposal.locality.trim(),
    district: proposal.district,
    local_body: proposal.local_body,
    event_date: proposal.event_date,
    organizer: proposal.organizer.trim(),
    organizer_type: (proposal.organizer_type as any) || 'School',
    status: 'Pending Approval', // Strictly requires administrator moderation before publishing
    meeting_point: proposal.meeting_point.trim(),
    equipment_provided: proposal.equipment_needed
      ? proposal.equipment_needed.split(',').map((s) => s.trim())
      : ['Gloves', 'Bags'],
    contact_email: proposal.contact_email.trim(),
    participants_count: 1,
    created_at: new Date().toISOString()
  };

  existing.push(newCampaign);
  saveStoredCampaigns(existing);
  return newCampaign;
}

export async function updateCampaignStatus(
  campaignId: string,
  newStatus: 'Upcoming' | 'Completed' | 'Pending Approval'
): Promise<Campaign> {
  const campaigns = getStoredCampaigns();
  const index = campaigns.findIndex((c) => c.id === campaignId);
  if (index === -1) throw new Error('Campaign not found');

  campaigns[index].status = newStatus;
  saveStoredCampaigns(campaigns);
  return campaigns[index];
}
