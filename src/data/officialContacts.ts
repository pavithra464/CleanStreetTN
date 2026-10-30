import { OfficialContact, RoutingMatch } from '../types/contact';
import { ProblemCategory } from '../types/report';

export const VERIFIED_OFFICIAL_CONTACTS: OfficialContact[] = [
  {
    id: 'gcc-chennai',
    authority_name: 'Greater Chennai Corporation (GCC)',
    tamil_authority_name: 'பெருநகர சென்னை மாநகராட்சி',
    state: 'Tamil Nadu',
    district: 'Chennai',
    local_body: 'Greater Chennai Corporation',
    applicable_categories: 'ALL',
    phone_number: '1913',
    portal_url: 'https://erp.chennaicorporation.gov.in/pgr/',
    source_url: 'https://chennaicorporation.gov.in/gcc/complaints/',
    source_name: 'GCC Official Grievance Redressal Portal',
    verification_date: '2026-01-15',
    verification_status: 'verified',
    instructions: 'GCC handles civic grievances within Chennai Corporation limits (Zones 1-15). Dial 1913 toll-free from any phone or register directly on the GCC Public Grievance Redressal Portal to obtain an official GCC complaint number.',
    tamil_instructions: 'சென்னை மாநகராட்சி எல்லைக்குட்பட்ட (மண்டலம் 1-15) தூய்மை பிரச்சனைகளுக்கு 1913 என்ற கட்டணமில்லா எண்ணை அழைக்கலாம் அல்லது GCC இணையதளத்தில் புகார் பதிவு செய்யலாம்.',
    call_button_label: 'Call GCC — 1913',
    portal_button_label: 'Register Official GCC Complaint'
  },
  {
    id: 'tambaram-corporation',
    authority_name: 'Tambaram City Municipal Corporation',
    tamil_authority_name: 'தாம்பரம் மாநகராட்சி',
    state: 'Tamil Nadu',
    district: 'Chengalpattu',
    local_body: 'Tambaram City Municipal Corporation',
    applicable_categories: 'ALL',
    phone_number: '18004251600',
    portal_url: 'https://tnurbanepay.tn.gov.in/',
    source_url: 'https://cma.tn.gov.in/',
    source_name: 'Directorate of Municipal Administration, Tamil Nadu',
    verification_date: '2026-01-15',
    verification_status: 'verified',
    instructions: 'Tambaram City Municipal Corporation covers Tambaram, Chromepet, Pallavaram, Pammal, and Anakaputhur. Complaints can be filed via the TN Urban E-Pay citizen grievance portal or toll-free 1800 425 1600.',
    tamil_instructions: 'தாம்பரம் மாநகராட்சிக்குட்பட்ட பகுதிகளுக்கு 1800 425 1600 என்ற கட்டணமில்லா எண்ணை அழைக்கலாம் அல்லது TN Urban E-Pay தளத்தில் பதிவு செய்யலாம்.',
    call_button_label: 'Call Tambaram Helpline',
    portal_button_label: 'Open TN Urban E-Pay Portal'
  },
  {
    id: 'coimbatore-corporation',
    authority_name: 'Coimbatore City Municipal Corporation (CCMC)',
    tamil_authority_name: 'கோயம்புத்தூர் மாநகராட்சி',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    local_body: 'Coimbatore City Municipal Corporation',
    applicable_categories: 'ALL',
    phone_number: '8190000200',
    portal_url: 'https://www.ccmc.gov.in/',
    source_url: 'https://www.ccmc.gov.in/ccmc/index.php/contact-us',
    source_name: 'CCMC Official Website',
    verification_date: '2026-01-15',
    verification_status: 'verified',
    instructions: 'Coimbatore Corporation operates a dedicated citizen grievance WhatsApp and helpline number 8190000200 and an official online grievance tracking portal.',
    tamil_instructions: 'கோயம்புத்தூர் மாநகராட்சி எல்லைக்குள் உள்ள புகார்களுக்கு 8190000200 என்ற எண்ணில் தொடர்பு கொள்ளலாம்.',
    call_button_label: 'Call CCMC Grievance Cell',
    portal_button_label: 'Open CCMC Grievance Portal'
  },
  {
    id: 'madurai-corporation',
    authority_name: 'Madurai City Municipal Corporation',
    tamil_authority_name: 'மதுரை மாநகராட்சி',
    state: 'Tamil Nadu',
    district: 'Madurai',
    local_body: 'Madurai City Municipal Corporation',
    applicable_categories: 'ALL',
    phone_number: '8428424242',
    portal_url: 'https://maduraicorporation.co.in/',
    source_url: 'https://maduraicorporation.co.in/grievance/',
    source_name: 'Madurai Corporation Grievance Portal',
    verification_date: '2026-01-15',
    verification_status: 'verified',
    instructions: 'Madurai Corporation citizen grievance helpline is active at 8428424242 for sanitation, street garbage, and solid waste grievances.',
    tamil_instructions: 'மதுரை மாநகராட்சி தூய்மைப் புகார்களுக்கு 8428424242 என்ற எண்ணில் தொடர்பு கொள்ளலாம்.',
    call_button_label: 'Call Madurai Grievance Desk',
    portal_button_label: 'Open Madurai Grievance Portal'
  },
  {
    id: 'tn-cm-helpline',
    authority_name: "Tamil Nadu Chief Minister's Helpline / Mudhalvarin Mugavari",
    tamil_authority_name: 'முதல்வரின் முகவரி / தமிழ்நாடு முதலமைச்சர் உதவி மையம்',
    state: 'Tamil Nadu',
    district: 'ALL',
    local_body: 'ALL',
    applicable_categories: 'ALL',
    phone_number: '1100',
    portal_url: 'https://cmhelpline.tnega.org/portal/en/home',
    source_url: 'https://cmhelpline.tnega.org/portal/en/kb/articles/tamil-nadu-cm-helpline-faqs',
    source_name: 'TNeGA Official Mudhalvarin Mugavari Knowledge Base',
    verification_date: '2026-01-15',
    verification_status: 'verified',
    instructions: 'Mudhalvarin Mugavari (1100) is the official unified public grievance helpline for the Government of Tamil Nadu. It accepts civic grievances and escalates them to the concerned District Collectorate or Municipal Commissioner.',
    tamil_instructions: 'முதல்வரின் முகவரி (1100) என்பது தமிழ்நாடு அரசின் ஒருங்கிணைந்த மக்கள் குறைதீர்க்கும் தளமாகும். இங்கு பதிவு செய்யப்படும் புகார்கள் சம்பந்தப்பட்ட நகராட்சி அல்லது மாவட்ட ஆட்சியருக்கு அனுப்பப்படும்.',
    call_button_label: 'Call Tamil Nadu Helpline — 1100',
    portal_button_label: 'Open Tamil Nadu Grievance Portal'
  }
];

export const STATE_GRIEVANCE_BACKUP: OfficialContact = VERIFIED_OFFICIAL_CONTACTS.find(
  (c) => c.id === 'tn-cm-helpline'
)!;

/**
 * Official Complaint Routing Engine
 * Decision rules:
 * 1. Prioritizes specific local body match over generic 'ALL' state-wide entries.
 * 2. Matches against verified local contacts database.
 * 3. Never falsely routes non-GCC reports to GCC.
 * 4. Distinguishes verified vs unverified local contacts.
 * 5. Always provides the State CM Helpline (1100) as verified alternative.
 */
export function routeOfficialComplaint(params: {
  state: string;
  district: string;
  localBody: string;
  category: ProblemCategory;
}): RoutingMatch {
  const { state, district, localBody, category } = params;

  // 1. Search for specific local body match first (excluding generic 'ALL')
  const matchedContact = VERIFIED_OFFICIAL_CONTACTS.find((contact) => {
    if (contact.local_body === 'ALL') return false;
    if (contact.local_body.toLowerCase() !== localBody.toLowerCase()) {
      return false;
    }
    if (contact.district !== 'ALL' && contact.district.toLowerCase() !== district.toLowerCase()) {
      return false;
    }
    if (contact.state.toLowerCase() !== state.toLowerCase()) {
      return false;
    }
    if (contact.applicable_categories !== 'ALL') {
      if (!contact.applicable_categories.includes(category)) {
        return false;
      }
    }
    return true;
  });

  const isLocalBodyVerified = !!matchedContact;

  let notes = '';
  if (localBody.toLowerCase().includes('greater chennai')) {
    notes = 'Greater Chennai Corporation (GCC) is the designated urban local body for this location. Verified 1913 helpline and ERP portal are available.';
  } else if (isLocalBodyVerified) {
    notes = `Verified local complaint channels are available for ${localBody}.`;
  } else {
    notes = `Local complaint contact details for "${localBody}" have not yet been independently verified through an official government circular. Please use the Tamil Nadu Chief Minister's Helpline (1100) or browse the Directorate of Municipal Administration portal.`;
  }

  return {
    matchedContact: isLocalBodyVerified ? matchedContact : undefined,
    stateGrievanceContact: STATE_GRIEVANCE_BACKUP,
    isLocalBodyVerified,
    notes
  };
}
