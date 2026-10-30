import { ProblemCategory } from '../types/report';

export interface LocalBodyOption {
  name: string;
  type: 'Corporation' | 'Municipality' | 'Town Panchayat';
  isGCC: boolean;
}

export interface DistrictData {
  name: string;
  tamilName: string;
  localBodies: LocalBodyOption[];
  commonLocalities?: string[];
}

export const TAMIL_NADU_DISTRICTS: Record<string, DistrictData> = {
  Chennai: {
    name: 'Chennai',
    tamilName: 'சென்னை',
    localBodies: [
      { name: 'Greater Chennai Corporation', type: 'Corporation', isGCC: true },
    ],
    commonLocalities: [
      'Adyar', 'Alwarpet', 'Ambattur', 'Anna Nagar', 'Ashok Nagar', 'Besant Nagar',
      'Chetpet', 'Choolaimedu', 'Egmore', 'George Town', 'Gopalapuram', 'Guindy',
      'Kilpauk', 'Kodambakkam', 'Kolathur', 'Korattur', 'Kotturpuram', 'Koyambedu',
      'Madipakkam', 'Mandaveli', 'Mogappair', 'Mylapore', 'Nandanam', 'Nanganallur',
      'Nungambakkam', 'Perambur', 'Purasawalkam', 'RA Puram', 'Royapettah', 'Royapuram',
      'Saidapet', 'Saligramam', 'Santhome', 'Sholinganallur', 'T. Nagar', 'Teynampet',
      'Thiruvanmiyur', 'Thoraipakkam', 'Tondiarpet', 'Triplicane', 'Valasaravakkam',
      'Velachery', 'Vadapalani', 'Villivakkam', 'Washermanpet'
    ]
  },
  Chengalpattu: {
    name: 'Chengalpattu',
    tamilName: 'செங்கல்பட்டு',
    localBodies: [
      { name: 'Tambaram City Municipal Corporation', type: 'Corporation', isGCC: false },
      { name: 'Chengalpattu Municipality', type: 'Municipality', isGCC: false },
      { name: 'Maraimalai Nagar Municipality', type: 'Municipality', isGCC: false },
      { name: 'Nandivaram-Guduvancheri Municipality', type: 'Municipality', isGCC: false }
    ],
    commonLocalities: ['Tambaram', 'Chromepet', 'Pallavaram', 'Guduvancheri', 'Kelambakkam', 'Mahabalipuram', 'Singaperumal Koil']
  },
  Tiruvallur: {
    name: 'Tiruvallur',
    tamilName: 'திருவள்ளூர்',
    localBodies: [
      { name: 'Avadi City Municipal Corporation', type: 'Corporation', isGCC: false },
      { name: 'Tiruvallur Municipality', type: 'Municipality', isGCC: false },
      { name: 'Poonamallee Municipality', type: 'Municipality', isGCC: false },
      { name: 'Thiruverkadu Municipality', type: 'Municipality', isGCC: false }
    ],
    commonLocalities: ['Avadi', 'Poonamallee', 'Thiruverkadu', 'Pattabiram', 'Ambattur Industrial Estate', 'Tiruningravur']
  },
  Kanchipuram: {
    name: 'Kanchipuram',
    tamilName: 'காஞ்சிபுரம்',
    localBodies: [
      { name: 'Kanchipuram City Municipal Corporation', type: 'Corporation', isGCC: false },
      { name: 'Kundrathur Municipality', type: 'Municipality', isGCC: false },
      { name: 'Mangadu Municipality', type: 'Municipality', isGCC: false },
      { name: 'Sriperumbudur Town Panchayat', type: 'Town Panchayat', isGCC: false }
    ],
    commonLocalities: ['Kanchipuram Old Town', 'Sriperumbudur', 'Kundrathur', 'Mangadu', 'Oragadam']
  },
  Coimbatore: {
    name: 'Coimbatore',
    tamilName: 'கோயம்புத்தூர்',
    localBodies: [
      { name: 'Coimbatore City Municipal Corporation', type: 'Corporation', isGCC: false },
      { name: 'Pollachi Municipality', type: 'Municipality', isGCC: false },
      { name: 'Mettupalayam Municipality', type: 'Municipality', isGCC: false },
      { name: 'Valparai Municipality', type: 'Municipality', isGCC: false }
    ],
    commonLocalities: ['RS Puram', 'Gandhipuram', 'Peelamedu', 'Saibaba Colony', 'Singanallur', 'Ukkadam', 'Saravanampatti']
  },
  Madurai: {
    name: 'Madurai',
    tamilName: 'மதுரை',
    localBodies: [
      { name: 'Madurai City Municipal Corporation', type: 'Corporation', isGCC: false },
      { name: 'Melur Municipality', type: 'Municipality', isGCC: false },
      { name: 'Thirumangalam Municipality', type: 'Municipality', isGCC: false },
      { name: 'Usilampatti Municipality', type: 'Municipality', isGCC: false }
    ],
    commonLocalities: ['KK Nagar', 'Anna Nagar', 'Simmakkal', 'Goripalayam', 'Tallakulam', 'Thirunagar']
  },
  Tiruchirappalli: {
    name: 'Tiruchirappalli',
    tamilName: 'திருச்சிராப்பள்ளி',
    localBodies: [
      { name: 'Tiruchirappalli City Municipal Corporation', type: 'Corporation', isGCC: false },
      { name: 'Manapparai Municipality', type: 'Municipality', isGCC: false },
      { name: 'Thuvakudi Municipality', type: 'Municipality', isGCC: false }
    ],
    commonLocalities: ['Thillai Nagar', 'Cantonment', 'Srirangam', 'Ponmalai', 'K.K. Nagar', 'Woraiyur']
  },
  Salem: {
    name: 'Salem',
    tamilName: 'சேலம்',
    localBodies: [
      { name: 'Salem City Municipal Corporation', type: 'Corporation', isGCC: false },
      { name: 'Attur Municipality', type: 'Municipality', isGCC: false },
      { name: 'Mettur Municipality', type: 'Municipality', isGCC: false },
      { name: 'Edappadi Municipality', type: 'Municipality', isGCC: false }
    ],
    commonLocalities: ['Fairlands', 'Alagapuram', 'Hasthampatti', 'Shevapet', 'Ammapet', 'Suramangalam']
  },
  Tiruppur: {
    name: 'Tiruppur',
    tamilName: 'திருப்பூர்',
    localBodies: [
      { name: 'Tiruppur City Municipal Corporation', type: 'Corporation', isGCC: false },
      { name: 'Dharapuram Municipality', type: 'Municipality', isGCC: false },
      { name: 'Kangeyam Municipality', type: 'Municipality', isGCC: false },
      { name: 'Udumalaipettai Municipality', type: 'Municipality', isGCC: false }
    ],
    commonLocalities: ['Avinashi Road', 'Kumaran Road', 'Rayapuram', 'Veerapandi', 'Nallur']
  },
  Erode: {
    name: 'Erode',
    tamilName: 'ஈரோடு',
    localBodies: [
      { name: 'Erode City Municipal Corporation', type: 'Corporation', isGCC: false },
      { name: 'Bhavani Municipality', type: 'Municipality', isGCC: false },
      { name: 'Gobichettipalayam Municipality', type: 'Municipality', isGCC: false },
      { name: 'Sathyamangalam Municipality', type: 'Municipality', isGCC: false }
    ],
    commonLocalities: ['Perundurai Road', 'Brough Road', 'Surampatti', 'Veerappanchatram']
  },
  Tirunelveli: {
    name: 'Tirunelveli',
    tamilName: 'திருநெல்வேலி',
    localBodies: [
      { name: 'Tirunelveli City Municipal Corporation', type: 'Corporation', isGCC: false },
      { name: 'Ambasamudram Municipality', type: 'Municipality', isGCC: false },
      { name: 'Vikramasingapuram Municipality', type: 'Municipality', isGCC: false }
    ],
    commonLocalities: ['Palayamkottai', 'Tirunelveli Town', 'Tirunelveli Junction', 'Pettai']
  },
  Vellore: {
    name: 'Vellore',
    tamilName: 'வேலூர்',
    localBodies: [
      { name: 'Vellore City Municipal Corporation', type: 'Corporation', isGCC: false },
      { name: 'Gudiyatham Municipality', type: 'Municipality', isGCC: false },
      { name: 'Pernambut Municipality', type: 'Municipality', isGCC: false }
    ],
    commonLocalities: ['Katpadi', 'Sathuvachari', 'Bagayam', 'Thorapadi', 'Otteri']
  },
  Thanjavur: {
    name: 'Thanjavur',
    tamilName: 'தஞ்சாவூர்',
    localBodies: [
      { name: 'Thanjavur City Municipal Corporation', type: 'Corporation', isGCC: false },
      { name: 'Kumbakonam City Municipal Corporation', type: 'Corporation', isGCC: false },
      { name: 'Pattukkottai Municipality', type: 'Municipality', isGCC: false }
    ],
    commonLocalities: ['Medical College Road', 'Old Bus Stand', 'Manojipatti', 'Kumbakonam Town']
  },
  Dindigul: {
    name: 'Dindigul',
    tamilName: 'திண்டுக்கல்',
    localBodies: [
      { name: 'Dindigul City Municipal Corporation', type: 'Corporation', isGCC: false },
      { name: 'Palani Municipality', type: 'Municipality', isGCC: false },
      { name: 'Kodaikanal Municipality', type: 'Municipality', isGCC: false }
    ],
    commonLocalities: ['Begambur', 'Nagal Nagar', 'Palani Town', 'Kodaikanal Town']
  },
  Cuddalore: {
    name: 'Cuddalore',
    tamilName: 'கடலூர்',
    localBodies: [
      { name: 'Cuddalore City Municipal Corporation', type: 'Corporation', isGCC: false },
      { name: 'Chidambaram Municipality', type: 'Municipality', isGCC: false },
      { name: 'Panruti Municipality', type: 'Municipality', isGCC: false }
    ],
    commonLocalities: ['Cuddalore OT', 'Manjakuppam', 'Chidambaram Town']
  }
};

export const CATEGORY_DETAILS: Record<
  ProblemCategory,
  { label: string; tamilLabel: string; icon: string; description: string; color: string; badgeClass: string }
> = {
  garbage_dumped_street: {
    label: 'Garbage dumped on the street',
    tamilLabel: 'தெருவில் கொட்டப்பட்ட குப்பை',
    icon: 'Trash2',
    description: 'Accumulation of uncollected waste or roadside heaps',
    color: '#e11d48',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-200'
  },
  overflowing_bin: {
    label: 'Overflowing public garbage bin',
    tamilLabel: 'நிரம்பி வழியும் பொது குப்பைத் தொட்டி',
    icon: 'Archive',
    description: 'Municipal dustbins overflowing onto walkways or roadways',
    color: '#ea580c',
    badgeClass: 'bg-orange-100 text-orange-800 border-orange-200'
  },
  garbage_not_collected: {
    label: 'Garbage not collected',
    tamilLabel: 'சேகரிக்கப்படாத குப்பை',
    icon: 'Truck',
    description: 'Door-to-door or street collection missed for multiple days',
    color: '#d97706',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200'
  },
  plastic_accumulation: {
    label: 'Plastic waste accumulation',
    tamilLabel: 'பிளாஸ்டிக் கழிவு குவிப்பு',
    icon: 'Layers',
    description: 'Single-use plastics, packaging materials, or microplastics clogging drains',
    color: '#0284c7',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-200'
  },
  construction_demolition: {
    label: 'Construction & demolition waste',
    tamilLabel: 'கட்டிட இடிபாடு மற்றும் மண் கழிவுகள்',
    icon: 'Hammer',
    description: 'Debris, cement rubble, or tiles dumped illegally on pavements',
    color: '#7c3aed',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  waste_near_water_body: {
    label: 'Waste dumped near a water body',
    tamilLabel: 'நீர்நிலைகளின் அருகில் கொட்டப்பட்ட கழிவுகள்',
    icon: 'Droplets',
    description: 'Pollution near lakes, ponds, Buckingham Canal, Adyar, or Cooum rivers',
    color: '#0891b2',
    badgeClass: 'bg-cyan-100 text-cyan-800 border-cyan-200'
  },
  waste_burning: {
    label: 'Public waste burning',
    tamilLabel: 'பொது இடங்களில் குப்பை எரிப்பு',
    icon: 'Flame',
    description: 'Illegal burning of trash, plastics, or garden leaves causing toxic smoke',
    color: '#dc2626',
    badgeClass: 'bg-red-100 text-red-800 border-red-200'
  },
  improperly_segregated: {
    label: 'Mixed or improperly segregated waste',
    tamilLabel: 'பிரிக்கப்படாத கலப்புக் கழிவு',
    icon: 'Shuffle',
    description: 'Commercial or residential non-compliance with wet/dry segregation',
    color: '#059669',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  },
  other: {
    label: 'Other cleanliness issue',
    tamilLabel: 'பிற தூய்மை சார்ந்த பிரச்சனை',
    icon: 'AlertCircle',
    description: 'Other civic sanitation concerns not listed above',
    color: '#475569',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-200'
  }
};
