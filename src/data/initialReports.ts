import { Report } from '../types/report';

export const INITIAL_DEMO_REPORTS: Report[] = [
  {
    id: 'rep-001',
    reference_code: 'CSTN-2026-000101',
    title: 'Overflowing Municipal Bin on North Usman Road',
    description: 'The green public waste bin near the bus shelter has been overflowing for 2 days. Garbage bags are spilling onto the pedestrian pathway, blocking school pedestrians.',
    category: 'overflowing_bin',
    state: 'Tamil Nadu',
    district: 'Chennai',
    local_body: 'Greater Chennai Corporation',
    city_town: 'Chennai',
    locality: 'T. Nagar',
    street_name: 'North Usman Road',
    landmark: 'Near T. Nagar Bus Terminus & Post Office',
    postal_code: '600017',
    latitude: 13.0418,
    longitude: 80.2341,
    observed_at: '2026-01-20',
    status: 'Approved for Public Display',
    is_public: true,
    reporter_name: 'S. Ramanathan',
    photos: [
      {
        id: 'photo-1',
        report_id: 'rep-001',
        storage_path: 'https://images.unsplash.com/photo-1611288870280-4a8066b72648?auto=format&fit=crop&w=800&q=80',
        photo_type: 'before',
        created_at: '2026-01-20T08:30:00Z'
      }
    ],
    status_history: [
      {
        id: 'hist-1',
        report_id: 'rep-001',
        old_status: null,
        new_status: 'Submitted',
        change_note: 'Initial report submitted via CleanStreet TN',
        changed_by: 'Community Reporter',
        created_at: '2026-01-20T08:30:00Z'
      },
      {
        id: 'hist-2',
        report_id: 'rep-001',
        old_status: 'Submitted',
        new_status: 'Under Review',
        change_note: 'Verified that location coordinates correspond to Zone 10 T. Nagar',
        changed_by: 'Moderator Team',
        created_at: '2026-01-20T10:15:00Z'
      },
      {
        id: 'hist-3',
        report_id: 'rep-001',
        old_status: 'Under Review',
        new_status: 'Approved for Public Display',
        change_note: 'Approved for public map display and official GCC 1913 referral',
        changed_by: 'Moderator Team',
        created_at: '2026-01-20T11:00:00Z'
      }
    ],
    official_complaints: [
      {
        id: 'comp-1',
        report_id: 'rep-001',
        authority_name: 'Greater Chennai Corporation',
        complaint_reference: 'GCC-PGR-2026-88412',
        official_portal_url: 'https://erp.chennaicorporation.gov.in/pgr/',
        verification_status: 'verified_by_user',
        created_at: '2026-01-20T12:00:00Z'
      }
    ],
    created_at: '2026-01-20T08:30:00Z',
    updated_at: '2026-01-20T12:00:00Z',
    reviewed_at: '2026-01-20T11:00:00Z'
  },
  {
    id: 'rep-002',
    reference_code: 'CSTN-2026-000102',
    title: 'Plastic Waste and Packaging Dumped near Buckingham Canal',
    description: 'Commercial packaging plastics and thermocol pieces have been dumped along the canal access road behind Mylapore MRTS station.',
    category: 'waste_near_water_body',
    state: 'Tamil Nadu',
    district: 'Chennai',
    local_body: 'Greater Chennai Corporation',
    city_town: 'Chennai',
    locality: 'Mylapore',
    street_name: 'Canal Bank Road',
    landmark: 'Behind Thirumayilai MRTS Railway Station',
    postal_code: '600004',
    latitude: 13.0336,
    longitude: 80.2678,
    observed_at: '2026-01-22',
    status: 'Action Reported',
    is_public: true,
    photos: [
      {
        id: 'photo-2',
        report_id: 'rep-002',
        storage_path: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80',
        photo_type: 'before',
        created_at: '2026-01-22T09:00:00Z'
      }
    ],
    status_history: [
      {
        id: 'hist-4',
        report_id: 'rep-002',
        old_status: null,
        new_status: 'Submitted',
        change_note: 'Initial report logged by resident',
        changed_by: 'Community Reporter',
        created_at: '2026-01-22T09:00:00Z'
      },
      {
        id: 'hist-5',
        report_id: 'rep-002',
        old_status: 'Submitted',
        new_status: 'Approved for Public Display',
        change_note: 'Approved after photo review',
        changed_by: 'Moderator Team',
        created_at: '2026-01-22T10:30:00Z'
      },
      {
        id: 'hist-6',
        report_id: 'rep-002',
        old_status: 'Approved for Public Display',
        new_status: 'Action Reported',
        change_note: 'Local conservancy supervisor inspected site and scheduled Bobcat loader',
        changed_by: 'Moderator Team',
        created_at: '2026-01-23T14:20:00Z'
      }
    ],
    official_complaints: [
      {
        id: 'comp-2',
        report_id: 'rep-002',
        authority_name: 'Greater Chennai Corporation',
        complaint_reference: 'GCC-2026-9143',
        verification_status: 'verified_by_user',
        created_at: '2026-01-22T11:15:00Z'
      }
    ],
    created_at: '2026-01-22T09:00:00Z',
    updated_at: '2026-01-23T14:20:00Z'
  },
  {
    id: 'rep-003',
    reference_code: 'CSTN-2026-000103',
    title: 'Construction Debris Dumped on Footpath',
    description: 'Broken concrete rubble and ceramic tiles left over from residential remodeling dumped directly on the pedestrian walkway.',
    category: 'construction_demolition',
    state: 'Tamil Nadu',
    district: 'Chennai',
    local_body: 'Greater Chennai Corporation',
    city_town: 'Chennai',
    locality: 'Anna Nagar',
    street_name: '2nd Avenue, Block C',
    landmark: 'Opposite Tower Park Gate 3',
    postal_code: '600040',
    latitude: 13.0850,
    longitude: 80.2101,
    observed_at: '2026-01-18',
    status: 'Resolved',
    is_public: true,
    resolution_note: 'Debris cleared by GCC C&D waste disposal truck following 1913 inspection.',
    resolution_photo_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    photos: [
      {
        id: 'photo-3',
        report_id: 'rep-003',
        storage_path: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
        photo_type: 'before',
        created_at: '2026-01-18T14:00:00Z'
      }
    ],
    status_history: [
      {
        id: 'hist-7',
        report_id: 'rep-003',
        old_status: null,
        new_status: 'Submitted',
        change_note: 'Report submitted',
        changed_by: 'Community Reporter',
        created_at: '2026-01-18T14:00:00Z'
      },
      {
        id: 'hist-8',
        report_id: 'rep-003',
        old_status: 'Submitted',
        new_status: 'Approved for Public Display',
        change_note: 'Public notice approved',
        changed_by: 'Moderator Team',
        created_at: '2026-01-18T16:00:00Z'
      },
      {
        id: 'hist-9',
        report_id: 'rep-003',
        old_status: 'Approved for Public Display',
        new_status: 'Resolved',
        change_note: 'Debris removed; sidewalk restored. Resident confirmed clean status.',
        changed_by: 'Admin / Citizen Verified',
        created_at: '2026-01-20T17:00:00Z'
      }
    ],
    created_at: '2026-01-18T14:00:00Z',
    updated_at: '2026-01-20T17:00:00Z'
  },
  {
    id: 'rep-004',
    reference_code: 'CSTN-2026-000104',
    title: 'Open Leaf and Plastic Burning on Vacant Plot',
    description: 'Dry leaves mixed with polythene packets being burned openly, causing thick irritating smoke across the school zone.',
    category: 'waste_burning',
    state: 'Tamil Nadu',
    district: 'Chennai',
    local_body: 'Greater Chennai Corporation',
    city_town: 'Chennai',
    locality: 'Velachery',
    street_name: 'Gandhi Road',
    landmark: 'Behind Dhandeeswaram Temple Ground',
    postal_code: '600042',
    latitude: 12.9815,
    longitude: 80.2180,
    observed_at: '2026-01-24',
    status: 'Approved for Public Display',
    is_public: true,
    photos: [
      {
        id: 'photo-4',
        report_id: 'rep-004',
        storage_path: 'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?auto=format&fit=crop&w=800&q=80',
        photo_type: 'before',
        created_at: '2026-01-24T07:15:00Z'
      }
    ],
    status_history: [
      {
        id: 'hist-10',
        report_id: 'rep-004',
        old_status: null,
        new_status: 'Submitted',
        change_note: 'Submitted by student eco-club member',
        changed_by: 'Community Reporter',
        created_at: '2026-01-24T07:15:00Z'
      },
      {
        id: 'hist-11',
        report_id: 'rep-004',
        old_status: 'Submitted',
        new_status: 'Approved for Public Display',
        change_note: 'Approved. Flagged as urgent smoke hazard.',
        changed_by: 'Moderator Team',
        created_at: '2026-01-24T08:00:00Z'
      }
    ],
    created_at: '2026-01-24T07:15:00Z',
    updated_at: '2026-01-24T08:00:00Z'
  },
  {
    id: 'rep-005',
    reference_code: 'CSTN-2026-000105',
    title: 'Uncollected Street Garbage Heap on GST Road Corner',
    description: 'Commercial waste from vegetable and food vendors piling up near railway subway entrance. Requires immediate clearance by municipal compactors.',
    category: 'garbage_dumped_street',
    state: 'Tamil Nadu',
    district: 'Chengalpattu',
    local_body: 'Tambaram City Municipal Corporation',
    city_town: 'Tambaram',
    locality: 'Tambaram West',
    street_name: 'GST Road Service Lane',
    landmark: 'Near Tambaram West Railway Station Entry',
    postal_code: '600045',
    latitude: 12.9249,
    longitude: 80.1174,
    observed_at: '2026-01-23',
    status: 'Approved for Public Display',
    is_public: true,
    photos: [
      {
        id: 'photo-5',
        report_id: 'rep-005',
        storage_path: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
        photo_type: 'before',
        created_at: '2026-01-23T11:45:00Z'
      }
    ],
    status_history: [
      {
        id: 'hist-12',
        report_id: 'rep-005',
        old_status: null,
        new_status: 'Submitted',
        change_note: 'Logged under Tambaram Municipal Corporation jurisdiction',
        changed_by: 'Community Reporter',
        created_at: '2026-01-23T11:45:00Z'
      },
      {
        id: 'hist-13',
        report_id: 'rep-005',
        old_status: 'Submitted',
        new_status: 'Approved for Public Display',
        change_note: 'Approved for public map display',
        changed_by: 'Moderator Team',
        created_at: '2026-01-23T13:00:00Z'
      }
    ],
    created_at: '2026-01-23T11:45:00Z',
    updated_at: '2026-01-23T13:00:00Z'
  },
  {
    id: 'rep-006',
    reference_code: 'CSTN-2026-000106',
    title: 'Plastic Bottle Dumping along Elliot’s Beach Promenade',
    description: 'Post-weekend accumulation of PET juice bottles, snack wraps, and broken coconut shells on the sand berms.',
    category: 'plastic_accumulation',
    state: 'Tamil Nadu',
    district: 'Chennai',
    local_body: 'Greater Chennai Corporation',
    city_town: 'Chennai',
    locality: 'Besant Nagar',
    street_name: '6th Avenue Beach Road',
    landmark: 'Opposite Schmidt Memorial',
    postal_code: '600090',
    latitude: 12.9997,
    longitude: 80.2711,
    observed_at: '2026-01-19',
    status: 'Resolved',
    is_public: true,
    resolution_note: 'Urbaser Sumeet beach cleaning team swept promenade and replaced bins.',
    resolution_photo_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    photos: [
      {
        id: 'photo-6',
        report_id: 'rep-006',
        storage_path: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800&q=80',
        photo_type: 'before',
        created_at: '2026-01-19T06:45:00Z'
      }
    ],
    status_history: [
      {
        id: 'hist-14',
        report_id: 'rep-006',
        old_status: null,
        new_status: 'Submitted',
        change_note: 'Submitted',
        changed_by: 'Community Reporter',
        created_at: '2026-01-19T06:45:00Z'
      },
      {
        id: 'hist-15',
        report_id: 'rep-006',
        old_status: 'Submitted',
        new_status: 'Resolved',
        change_note: 'Beach cleaning confirmed resolved by ward supervisor',
        changed_by: 'Admin',
        created_at: '2026-01-21T09:00:00Z'
      }
    ],
    created_at: '2026-01-19T06:45:00Z',
    updated_at: '2026-01-21T09:00:00Z'
  },
  {
    id: 'rep-007',
    reference_code: 'CSTN-2026-000107',
    title: 'Door-to-Door Wet Waste Missed in Residential Colony',
    description: 'Conservancy pushcart has not entered 4th Cross Street for three consecutive days; street corner is seeing loose garbage bag piling.',
    category: 'garbage_not_collected',
    state: 'Tamil Nadu',
    district: 'Chennai',
    local_body: 'Greater Chennai Corporation',
    city_town: 'Chennai',
    locality: 'Royapettah',
    street_name: 'Balaji Nagar 4th Street',
    landmark: 'Behind Royapettah Clock Tower',
    postal_code: '600014',
    latitude: 13.0537,
    longitude: 80.2605,
    observed_at: '2026-01-25',
    status: 'Under Review',
    is_public: true,
    photos: [
      {
        id: 'photo-7',
        report_id: 'rep-007',
        storage_path: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
        photo_type: 'before',
        created_at: '2026-01-25T10:00:00Z'
      }
    ],
    status_history: [
      {
        id: 'hist-16',
        report_id: 'rep-007',
        old_status: null,
        new_status: 'Submitted',
        change_note: 'Report submitted by resident',
        changed_by: 'Community Reporter',
        created_at: '2026-01-25T10:00:00Z'
      },
      {
        id: 'hist-17',
        report_id: 'rep-007',
        old_status: 'Submitted',
        new_status: 'Under Review',
        change_note: 'Verifying with Zone 9 Royapettah unit',
        changed_by: 'Moderator Team',
        created_at: '2026-01-25T11:30:00Z'
      }
    ],
    created_at: '2026-01-25T10:00:00Z',
    updated_at: '2026-01-25T11:30:00Z'
  }
];
