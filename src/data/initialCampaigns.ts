import { Campaign } from '../types/campaign';

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    title: 'Adyar Riverbank Eco-Volunteer Cleanup Drive',
    description: 'Student-led community drive to clear non-biodegradable plastics and thermocol from the riverbank path before the seasonal rains.',
    locality: 'Kotturpuram',
    district: 'Chennai',
    local_body: 'Greater Chennai Corporation',
    event_date: '2026-02-07',
    organizer: 'Chennai Green Volunteers & Anna University Eco-Club',
    organizer_type: 'College',
    status: 'Upcoming',
    meeting_point: 'Kotturpuram MRTS Bridge Footsteps (North Bank)',
    equipment_provided: ['Heavy Duty Gloves', 'Jute Collection Sacks', 'Face Masks', 'Drinking Water Refills', 'First Aid'],
    contact_email: 'volunteer@cleanstreet-tn.org',
    participants_count: 48,
    created_at: '2026-01-15T10:00:00Z'
  },
  {
    id: 'camp-2',
    title: 'Elliot’s Beach Student Shoreline Cleanliness Action',
    description: 'School eco-club initiative for Class 9-12 students to survey and clean post-dawn microplastics and food wrappers from Besant Nagar beach.',
    locality: 'Besant Nagar',
    district: 'Chennai',
    local_body: 'Greater Chennai Corporation',
    event_date: '2026-02-14',
    organizer: 'South Chennai High School Environmental Consortium',
    organizer_type: 'School',
    status: 'Upcoming',
    meeting_point: 'Schmidt Memorial Promenade Entrance',
    equipment_provided: ['Rubber Gloves', 'Trash Pickers', 'Colored Waste Sorting Bags', 'Sanitizer'],
    contact_email: 'besant-eco@cleanstreet-tn.org',
    participants_count: 65,
    created_at: '2026-01-18T12:00:00Z'
  },
  {
    id: 'camp-3',
    title: 'Anna Nagar Tower Park Perimeter Street Sweep',
    description: 'Joint initiative by the local Residents Welfare Association and NCC cadets to clear sidewalk leaf accumulation and paint waste bin signboards.',
    locality: 'Anna Nagar',
    district: 'Chennai',
    local_body: 'Greater Chennai Corporation',
    event_date: '2026-01-21',
    organizer: 'Anna Nagar West Residents Welfare Association',
    organizer_type: 'Residents Welfare Association',
    status: 'Completed',
    meeting_point: 'Tower Park Gate 2 Main Entrance',
    equipment_provided: ['Brooms', 'Collection Bins', 'Gloves'],
    contact_email: 'rwa.annanagar@example.com',
    participants_count: 38,
    created_at: '2026-01-10T09:00:00Z'
  }
];
