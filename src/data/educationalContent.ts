export interface EducationalTopic {
  id: string;
  title: string;
  tamilTitle: string;
  category: string;
  summary: string;
  tamilSummary: string;
  keyPoints: string[];
  tamilKeyPoints: string[];
  chennaiContext: string;
  officialReferenceUrl?: string;
  officialReferenceTitle?: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  tamilQuestion: string;
  item: string;
  options: { label: string; tamilLabel: string; isCorrect: boolean }[];
  explanation: string;
  tamilExplanation: string;
}

export const EDUCATIONAL_TOPICS: EducationalTopic[] = [
  {
    id: 'wet-vs-dry-waste',
    title: 'Wet Waste vs Dry Waste: The Golden Rule of Segregation',
    tamilTitle: 'ஈரக் கழிவு vs உலர் கழிவு: குப்பைப் பிரித்தலின் அடிப்படை விதி',
    category: 'Daily Habits',
    summary: 'Source segregation at the household level is the most vital step in preventing open garbage dumps in Tamil Nadu.',
    tamilSummary: 'வீட்டிலேயே ஈரக் கழிவு மற்றும் உலர் கழிவுகளைப் பிரிப்பது மட்டுமே குப்பைக் கிடங்குகளைத் தடுக்கும் சிறந்த வழியாகும்.',
    keyPoints: [
      'Wet Waste (Green Bin): Vegetable peels, fruit rinds, leftover cooked food, tea leaves, eggshells, garden clippings. These are 100% biodegradable and compostable.',
      'Dry Waste (Blue Bin): Paper, clean cardboard, plastic wrappers, milk packets, glass bottles, metal tins, dry rags. Keep them dry and rinse food residues.',
      'Sanitary / Hazardous Waste (Red Bag): Diapers, sanitary pads, band-aids, razor blades, expired medicines. Wrap securely in newspaper and mark with a red cross.',
      'Never mix wet food with dry paper or plastic, as moisture ruins recyclability.'
    ],
    tamilKeyPoints: [
      'ஈரக் கழிவு (பச்சைத் தொட்டி): காய்கறி தோல்கள், பழக் கழிவுகள், மீதமுள்ள உணவுகள், டீத்தூள் மற்றும் காய்ந்த இலைகள். இவை உரமாக்கப்படக்கூடியவை.',
      'உலர் கழிவு (நீலத் தொட்டி): காகிதம், அட்டைப்பெட்டிகள், பிளாஸ்டிக் கவர்கள், பால் கவர்கள், கண்ணாடி பாட்டில்கள் மற்றும் உலோகங்கள்.',
      'மருத்துவக் கழிவுகள் (சிவப்பு பை): நாப்கின்கள், டயப்பர்கள், மருந்துகள் - இவற்றை தனி செய்தித்தாளில் சுற்றி வழங்க வேண்டும்.'
    ],
    chennaiContext: 'Under Greater Chennai Corporation Solid Waste Management By-laws, door-to-door sanitation workers collect segregated wet waste daily and dry recyclables on designated weekly schedules.',
    officialReferenceUrl: 'https://chennaicorporation.gov.in/gcc/department/solid-waste-management/',
    officialReferenceTitle: 'GCC Solid Waste Management Guidelines',
    icon: 'Recycle'
  },
  {
    id: 'why-segregation-matters',
    title: 'Why Waste Segregation Matters to Our Cities',
    tamilTitle: 'குப்பைப் பிரித்தல் ஏன் அவசியமானது?',
    category: 'Environmental Impact',
    summary: 'Mixed garbage rotting in Kodungaiyur and Perungudi dumpsites generates flammable methane, toxic black leachate, and air pollution.',
    tamilSummary: 'பிரிக்கப்படாத கலப்புக் குப்பைகள் கொடுங்கையூர் மற்றும் பெருங்குடி குப்பைமேடுகளில் மீத்தேன் வாயு மற்றும் நச்சுக்கழிவை உண்டாக்குகின்றன.',
    keyPoints: [
      'Prevents Toxic Leachate: When wet organic waste rots under plastic, it creates acidic leachate that seeps into Chennai groundwater tables.',
      'Stops Landfill Fires: Methane gas pockets formed by anaerobic decomposition ignite summer dumpsite blazes.',
      'Protects Sanitation Workers: Clean segregation protects conservancy workers from cuts, infections, and hazardous contaminants.',
      'Supports Biomining: Chennai is currently remediating legacy dumps through biomining; segregation prevents new waste from piling up.'
    ],
    tamilKeyPoints: [
      'நிலத்தடி நீர் பாதுகாப்பு: கலப்பு கழிவுகள் நிலத்தடி நீரில் நச்சுத்தன்மையை ஏற்படுத்துகின்றன.',
      'குப்பை மேட்டுத் தீ விபத்துகளைத் தடுத்தல்: கரிமக் கழிவுகள் சிதைந்து உருவாகும் மீத்தேன் வாயு கோடைக்கால தீ விபத்துகளை உருவாக்குகிறது.',
      'தூய்மைப் பணியாளர்கள் பாதுகாப்பு: உடைந்த கண்ணாடிகள் மற்றும் கத்தரிக்கோல்கள் காயங்களை ஏற்படுத்துவதைத் தடுக்கிறது.'
    ],
    chennaiContext: 'Kodungaiyur and Perungudi dumpsites have accumulated over 20 million metric tonnes of waste over three decades. Segregation ensures that 80% of daily city waste can be diverted from dumpsites.',
    officialReferenceUrl: 'https://cpcb.nic.in/rules-4/',
    officialReferenceTitle: 'Central Pollution Control Board SWM Rules 2016',
    icon: 'TreePine'
  },
  {
    id: 'reduce-single-use-plastic',
    title: 'Say No to Single-Use Plastic: Embrace the "Meendum Manjappai"',
    tamilTitle: 'ஒருமுறை பயன்படுத்தும் பிளாஸ்டிக்கைத் தவிர்ப்போம்: "மீண்டும் மஞ்சப்பை"',
    category: 'Sustainable Living',
    summary: 'Tamil Nadu banned 14 types of single-use plastics. Reusable traditional cloth bags (Manjappai) and steel containers are the way forward.',
    tamilSummary: 'தமிழ்நாடு அரசு தடை செய்துள்ள ஒருமுறை பயன்படுத்தும் பிளாஸ்டிக் பைகளுக்கு மாற்றாக பாரம்பரிய மஞ்சப்பையை பயன்படுத்துவோம்.',
    keyPoints: [
      'Banned Items: Plastic carry bags, non-woven bags, plastic-coated cups, thermocol plates, plastic straws, and plastic water pouches.',
      'Carry a Manjappai: Keep a washable cotton or jute bag in your school bag, bike trunk, or backpack at all times.',
      'Refuse Packaging: Request vegetable vendors, flower sellers, and bakeries to avoid plastic packaging; carry your own dabba for parcels.',
      'Report Violations: Commercial establishments flouting the plastic ban can be reported to GCC health inspectors and municipal commissioners.'
    ],
    tamilKeyPoints: [
      'தடை செய்யப்பட்டவை: பிளாஸ்டிக் பைகள், பிளாஸ்டிக் டம்ளர்கள், தெர்மாகோல் தட்டுகள், பிளாஸ்டிக் ஸ்ட்ராக்கள்.',
      'மஞ்சப்பை இயக்கம்: பள்ளி பையிலோ அல்லது இருசக்கர வாகனத்திலோ எப்போதும் ஒரு துணிப்பையை வைத்திருங்கள்.'
    ],
    chennaiContext: 'The Government of Tamil Nadu launched the "Meendum Manjappai" campaign to revive eco-friendly habits and rid Chennai beaches and storm drains of plastic choking.',
    officialReferenceUrl: 'https://tnpcb.gov.in/plastic-ban.php',
    officialReferenceTitle: 'TNPCB Plastic Ban Notification & Guidelines',
    icon: 'ShoppingBag'
  },
  {
    id: 'e-waste-disposal',
    title: 'Responsible Disposal of Electronic Waste (E-Waste)',
    tamilTitle: 'மின்னணுக் கழிவுகளை (E-Waste) பாதுகாப்பாக அகற்றுதல்',
    category: 'Hazardous Waste',
    summary: 'Old mobile phones, batteries, chargers, and computer components contain lead, mercury, and cadmium that poison our soil.',
    tamilSummary: 'பழைய மொபைல் போன்கள், பேட்டரிகள் போன்றவற்றில் உள்ள நச்சு வேதிப்பொருட்கள் மண்ணையும் நீரையும் நச்சாக்குகின்றன.',
    keyPoints: [
      'Never Hand to Ragpickers: Informal open burning of wires and acid leaching releases dangerous neurotoxins.',
      'Use Authorized Collection Centres: Drop discarded gadgets at authorized TNPCB e-waste collection kiosks located in electronics stores and GCC ward offices.',
      'Tape Battery Terminals: Before storing old lithium-ion batteries, tape both terminals with cello-tape to prevent accidental short-circuits and fires.'
    ],
    tamilKeyPoints: [
      'சாதாரண குப்பையோடு கலக்கக் கூடாது: பேட்டரிகள் மற்றும் கேபிள்களை பொது குப்பையில் எறியாதீர்கள்.',
      'அங்கீகரிக்கப்பட்ட சேகரிப்பு மையங்கள்: TNPCB அங்கீகரித்த இ-கழிவு சேகரிப்பு மையங்களில் ஒப்படைக்கவும்.'
    ],
    chennaiContext: 'Chennai generates over 45,000 tonnes of electronic waste annually. Several schools and colleges now run designated e-waste drop bins partnering with authorized recyclers.',
    officialReferenceUrl: 'https://tnpcb.gov.in/e-waste.php',
    officialReferenceTitle: 'TNPCB E-Waste Management Portal',
    icon: 'Cpu'
  },
  {
    id: 'stop-public-waste-burning',
    title: 'Stop Burning Waste in Public Spaces: A Severe Health Hazard',
    tamilTitle: 'பொது இடங்களில் குப்பையை எரிக்காதீர்கள்: உயிருக்கே ஆபத்து',
    category: 'Public Health',
    summary: 'Burning dry leaves, roadside trash, or plastics produces cancer-causing dioxins and worsens asthma among elderly citizens and children.',
    tamilSummary: 'காய்ந்த இலைகள், பிளாஸ்டிக் ஆகியவற்றை எரிப்பதால் உருவாகும் டையாக்சின் நச்சுப் புகை ஆஸ்துமா மற்றும் புற்றுநோயை உண்டாக்கும்.',
    keyPoints: [
      'Violates National Green Tribunal Orders: Open waste burning is punishable by fines up to ₹25,000 under the Air Act and municipal laws.',
      'Compost Leaves Instead: Dry leaves and garden cuttings should be mulched under trees or composted, never set on fire.',
      'Immediate Escalation: If you observe municipal workers or security guards setting roadside waste on fire, report immediately to GCC 1913 or TN CM Helpline 1100.'
    ],
    tamilKeyPoints: [
      'சட்டப்படி குற்றம்: தேசிய பசுமை தீர்ப்பாயத்தின் உத்தரவுப்படி பொது இடங்களில் குப்பை எரிப்பது கடும் அபராதத்திற்குரியது.',
      'உடனடி புகார்: குப்பை எரிப்பு கண்டால் உடனடியாக 1913 அல்லது 1100 என்ற எண்களில் புகார் தெரிவிக்கவும்.'
    ],
    chennaiContext: 'Winter air inversions in Chennai trap smoke from open burning in residential neighborhoods such as Velachery, Ambattur, and Madhavaram, causing severe respiratory issues.',
    officialReferenceUrl: 'https://www.greentribunal.gov.in/',
    officialReferenceTitle: 'National Green Tribunal Directives on Open Waste Burning',
    icon: 'Flame'
  },
  {
    id: 'protect-local-water-bodies',
    title: 'Protecting Chennai & Tamil Nadu Water Bodies from Garbage Dumping',
    tamilTitle: 'நீர்நிலைகளைப் பாதுகாப்போம்: கழிவுகள் கொட்டுவதைத் தடுப்போம்',
    category: 'Conservation',
    summary: 'Dumping construction debris and plastic garbage into lakes, canals, and riverbanks destroys flood buffers and kills aquatic ecosystems.',
    tamilSummary: 'ஏரிகள், கால்வாய்கள் மற்றும் ஆறுகளில் குப்பை கொட்டுவது மழைக்கால வெள்ளத்திற்கு முக்கியக் காரணமாகிறது.',
    keyPoints: [
      'Adyar & Cooum Rivers: Chennai rivers suffer from continuous illegal commercial waste dumping along riverbank service roads.',
      'Choking Storm Water Drains: Plastic bottles dumped into road gutters cause urban flooding during monsoon downpours.',
      'Pallikaranai Marshland: One of the last remaining natural wetlands in South India is threatened by plastic litter and dumping.',
      'Community Vigilance: Document and report dump trucks unloading construction debris near water bodies immediately.'
    ],
    tamilKeyPoints: [
      'மழைநீர் வடிகால் அடைப்பு: தெருக்களில் வீசப்படும் பிளாஸ்டிக் பாட்டில்கள் மழைநீர் வடிகால்களை அடைத்து வெள்ளப்பெருக்கை ஏற்படுத்துகின்றன.',
      'பள்ளிக்கரணை சதுப்புநிலம்: பிளாஸ்டிக் கழிவுகளால் பறவைகளும் நீர்வாழ் உயிரினங்களும் பாதிக்கப்படுகின்றன.'
    ],
    chennaiContext: 'During the 2015 and 2023 Chennai floods, choked waterways severely slowed down flood discharge. Keeping water bodies clear of garbage is vital for disaster mitigation.',
    officialReferenceUrl: 'https://chennaicorporation.gov.in/',
    officialReferenceTitle: 'Chennai River Restoration Trust & Water Resources Dept',
    icon: 'Droplets'
  },
  {
    id: 'organize-school-cleanliness-drive',
    title: 'How to Organize a Successful School Cleanliness Drive',
    tamilTitle: 'பள்ளியில் தூய்மை இயக்கத்தை வெற்றிகரமாக நடத்துவது எப்படி?',
    category: 'Student Action',
    summary: 'A step-by-step practical guide for school students, Eco Clubs, and NCC/NSS volunteers to lead safe community cleanups.',
    tamilSummary: 'மாணவர்கள் மற்றும் சுற்றுச்சூழல் மன்றங்கள் இணைந்து பாதுகாப்பான தூய்மை இயக்கங்களை நடத்துவதற்கான வழிகாட்டி.',
    keyPoints: [
      'Safety First: Always wear thick reusable rubber gloves and closed-toe sports shoes. Never touch broken glass, medical needles, or unknown chemicals.',
      'Obtain Permissions: Inform your school principal, residential welfare association, and local ward junior engineer at least 5 days in advance.',
      'Equip Your Team: Arrange large reusable jute sacks, metal trash grabbers, first-aid kit, drinking water, and masks.',
      'Audit the Waste: Count and record the types of garbage collected (e.g. 50 plastic cups, 20 packaging wraps) to present data to your school assembly.'
    ],
    tamilKeyPoints: [
      'பாதுகாப்பு முக்கியம்: தடிமனான கையுறைகள், காலணிகள் அணிய வேண்டும். உடைந்த கண்ணாடிகளை கைகளால் தொடக்கூடாது.',
      'முன் அனுமதி: பள்ளி தலைமை ஆசிரியர் மற்றும் உள்ளாட்சி அமைப்பிடம் உரிய அனுமதி பெறவும்.'
    ],
    chennaiContext: 'Over 200 Chennai schools have active National Green Corps (NGC) units conducting weekly campus cleanups and neighborhood segregation awareness campaigns.',
    officialReferenceUrl: 'https://cma.tn.gov.in/',
    officialReferenceTitle: 'Swachh Bharat Mission (Urban) Student Volunteer Guidelines',
    icon: 'Users'
  },
  {
    id: 'filing-civic-complaints-responsibly',
    title: 'Filing Civic Complaints Responsibly & Effectively',
    tamilTitle: 'குடிமைப் புகார்களைப் பொறுப்புடன் பதிவு செய்யும் வழிகள்',
    category: 'Civic Responsibility',
    summary: 'How to submit precise, actionable reports that municipal conservancy teams can resolve quickly without confusion.',
    tamilSummary: 'மாநகராட்சிப் பணியாளர்கள் விரைவாக தீர்வு காணும் வகையில் தெளிவான தகவல்களுடன் புகார் அளிப்பது எப்படி?',
    keyPoints: [
      'Give Clear Landmarks: Instead of just "Main Road", state "Opposite Post Office, 3rd Street corner, Anna Nagar West".',
      'Attach a Clear Photo: Take a well-lit photo showing both the garbage heap and the street background for easy location finding.',
      'Record Your Reference Number: CleanStreet TN gives you a community reference, but always note down the official GCC or TN CM Helpline docket number for tracking.',
      'Avoid Duplicate Spamming: Submitting 10 reports for the same dustbin delays processing for everyone else in your ward.'
    ],
    tamilKeyPoints: [
      'தெளிவான அடையாளம்: "முதன்மை சாலை" என்பதற்குப் பதிலாக "அஞ்சல் நிலையம் எதிரில், 3வது தெரு முனை" என்று குறிப்பிடவும்.',
      'புகைப்படம் இணைத்தல்: பிரச்சனையையும் அதன் இருப்பிடத்தையும் காட்டும் தெளிவான படத்தை எடுக்கவும்.',
      'தொடர் கண்காணிப்பு: அதிகாரப்பூர்வ புகார் எண்ணை குறித்து வைத்துக் கொள்ளவும்.'
    ],
    chennaiContext: 'GCC 1913 assigns a specific Junior Engineer (SWM) based on ward coordinates. Accurate descriptions speed up clearance within 24 to 48 hours.',
    officialReferenceUrl: 'https://erp.chennaicorporation.gov.in/pgr/',
    officialReferenceTitle: 'GCC Citizen Charter for Sanitation Clearance',
    icon: 'CheckCircle2'
  }
];

export const WASTE_SEGREGATION_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Where should discarded banana peels and leftover sambar rice go?',
    tamilQuestion: 'வாழைப்பழத் தோலும் மீதமுள்ள சாம்பார் சாதமும் எந்தத் தொட்டியில் போடப்பட வேண்டும்?',
    item: 'Banana peels & leftover food',
    options: [
      { label: 'Green Bin (Wet / Biodegradable Waste)', tamilLabel: 'பச்சைத் தொட்டி (ஈரக் கழிவு)', isCorrect: true },
      { label: 'Blue Bin (Dry / Recyclable Waste)', tamilLabel: 'நீலத் தொட்டி (உலர் கழிவு)', isCorrect: false },
      { label: 'Red Bin (Sanitary / Hazardous Waste)', tamilLabel: 'சிவப்புத் தொட்டி (மருத்துவக் கழிவு)', isCorrect: false },
      { label: 'Any dustbin or roadside', tamilLabel: 'எந்தத் தொட்டியிலும் போடலாம்', isCorrect: false }
    ],
    explanation: 'All fruit peels, vegetable leftovers, and cooked food are organic wet waste. They are turned into rich natural compost in municipal micro-composting centres (MCC).',
    tamilExplanation: 'காய்கறி, பழத்தோல்கள் மற்றும் சமைத்த உணவுகள் மக்கும் கரிமக் கழிவுகள் ஆகும். இவை உரமாக மாற்றப்படும்.'
  },
  {
    id: 2,
    question: 'How should empty plastic milk pouches be discarded?',
    tamilQuestion: 'காலி பால் பாக்கெட்டுகளை எவ்வாறு அகற்ற வேண்டும்?',
    item: 'Empty milk packets',
    options: [
      { label: 'Throw into the green wet-waste bin immediately', tamilLabel: 'உடனடியாக பச்சைத் தொட்டியில் எறிய வேண்டும்', isCorrect: false },
      { label: 'Rinse with a little water, dry, and place in the Blue Bin (Dry Waste)', tamilLabel: 'சிறிது நீரில் கழுவி, உலர்த்தி நீலத் தொட்டியில் போட வேண்டும்', isCorrect: true },
      { label: 'Burn them along with garden leaves', tamilLabel: 'தோட்ட இலைகளுடன் சேர்த்து எரிக்க வேண்டும்', isCorrect: false },
      { label: 'Dump them directly into the stormwater drain', tamilLabel: 'மழைநீர் வடிகாலில் வீச வேண்டும்', isCorrect: false }
    ],
    explanation: 'Rinsing milk pouches prevents bad odors and fungal growth, making the high-grade LDPE plastic 100% recyclable by dry waste recyclers.',
    tamilExplanation: 'பால் கவர்களை லேசாகக் கழுவி உலர்த்தினால் மட்டுமே அதனை மறுசுழற்சி செய்ய இயலும்.'
  },
  {
    id: 3,
    question: 'What is the correct way to dispose of broken glass bottles or tube lights?',
    tamilQuestion: 'உடைந்த கண்ணாடி பாட்டில்களை எவ்வாறு அப்புறப்படுத்த வேண்டும்?',
    item: 'Broken glass / fluorescent tube light',
    options: [
      { label: 'Wrap securely in thick newspaper, label "Broken Glass", and inform the conservancy worker', tamilLabel: 'செய்தித்தாளில் சுற்றி, "கண்ணாடி" என எழுதி பணியாளரிடம் நேரடியாகக் கூற வேண்டும்', isCorrect: true },
      { label: 'Mix loosely into a thin plastic carry bag', tamilLabel: 'சாதாரண பிளாஸ்டிக் பையில் போட்டு எறியலாம்', isCorrect: false },
      { label: 'Toss into open roadside soil', tamilLabel: 'தெருவோர மண்ணில் எறியலாம்', isCorrect: false },
      { label: 'Flush down the toilet drain', tamilLabel: 'கழிப்பறையில் போடலாம்', isCorrect: false }
    ],
    explanation: 'Wrapping sharp glass protects our sanitation workers from severe cuts and bleeding infections during daily door-to-door collection.',
    tamilExplanation: 'உடைந்த கண்ணாடிகள் தூய்மைப் பணியாளர்களுக்கு காயம் ஏற்படுத்தாமல் இருக்க செய்தித்தாளில் சுற்றித் தர வேண்டும்.'
  },
  {
    id: 4,
    question: 'What should you do with a bulging or expired smartphone battery?',
    tamilQuestion: 'வீங்கிய அல்லது காலாவதியான ஸ்மார்ட்போன் பேட்டரியை என்ன செய்ய வேண்டும்?',
    item: 'Lithium-ion phone battery',
    options: [
      { label: 'Drop it in your household green wet waste bin', tamilLabel: 'வீட்டுப் பச்சைத் தொட்டியில் போட வேண்டும்', isCorrect: false },
      { label: 'Burn it in an outdoor bonfire', tamilLabel: 'வெளியில் தீயில் எரிக்க வேண்டும்', isCorrect: false },
      { label: 'Tape the contacts and hand over to an authorized e-waste collection centre or TNPCB drop box', tamilLabel: 'முனைகளில் டேப் ஒட்டி, அங்கீகரிக்கப்பட்ட இ-கழிவு சேகரிப்பு மையத்தில் ஒப்படைக்க வேண்டும்', isCorrect: true },
      { label: 'Bury it in the garden soil', tamilLabel: 'தோட்டத்து மண்ணில் புதைக்க வேண்டும்', isCorrect: false }
    ],
    explanation: 'Lithium-ion batteries can burst into toxic flames if punctured in garbage compactor trucks. Always take them to designated e-waste drop points.',
    tamilExplanation: 'லித்தியம் பேட்டரிகள் அழுத்தப்பட்டால் வெடித்துத் தீப்பற்றும் அபாயம் கொண்டவை. இ-கழிவு மையத்தில் மட்டுமே கொடுக்க வேண்டும்.'
  },
  {
    id: 5,
    question: 'Which official toll-free helpline should Chennai residents call for municipal garbage issues?',
    tamilQuestion: 'சென்னை மாநகராட்சி தூய்மைப் பிரச்சனைகளுக்கு எந்த கட்டணமில்லா எண்ணை அழைக்க வேண்டும்?',
    item: 'Official GCC civic helpline',
    options: [
      { label: 'GCC Grievance Helpline: 1913', tamilLabel: 'சென்னை மாநகராட்சி உதவி மையம்: 1913', isCorrect: true },
      { label: 'Fire Service: 101', tamilLabel: 'தீயணைப்பு துறை: 101', isCorrect: false },
      { label: 'Ambulance: 108', tamilLabel: 'ஆம்புலன்ஸ்: 108', isCorrect: false },
      { label: 'Police: 100', tamilLabel: 'காவல்துறை: 100', isCorrect: false }
    ],
    explanation: '1913 is Greater Chennai Corporation’s 24x7 civic complaint helpline for solid waste, streetlights, and sanitation. For other Tamil Nadu districts, use the State Helpline 1100.',
    tamilExplanation: '1913 என்பது பெருநகர சென்னை மாநகராட்சியின் 24x7 குறைதீர்க்கும் எண்ணாகும். தமிழகத்தின் பிற பகுதிகளுக்கு 1100 ஆகும்.'
  }
];

export const CLEANLINESS_DRIVE_TEMPLATE = {
  title: 'CleanStreet TN — Community & School Cleanliness Drive Blueprint',
  subtitle: 'A practical 5-phase guide for student environmental clubs and residential associations in Tamil Nadu',
  phases: [
    {
      phase: 'Phase 1: Pre-Drive Preparation (7 Days Ahead)',
      steps: [
        'Survey the target neighborhood or school street to determine trash volume and key hotspots.',
        'Obtain written clearance from school administration or local Resident Welfare Association (RWA).',
        'Inform the local Corporation Ward Junior Engineer (SWM) so waste trucks can collect the collected sacks.',
        'Recruit volunteer captains: Safety Leader, Logistics Lead, and Data/Photo Recorder.'
      ]
    },
    {
      phase: 'Phase 2: Safety & Equipment Checklist',
      steps: [
        'Reusable industrial rubber gloves for every single participant (no bare hands!).',
        'Large reusable woven sacks (Jute or heavy-duty polypropylene) labeled WET and DRY.',
        'Face masks (especially if clearing dry dusty leaf piles or roadside gravel).',
        'Closed-toe footwear mandatory (no slippers or sandals permitted).',
        'First-aid kit containing antiseptic lotion, Band-aids, cotton gauze, and ORS packets.',
        'Fresh drinking water in refillable stainless steel cans (strictly zero single-use plastic water cups).'
      ]
    },
    {
      phase: 'Phase 3: Execution Day (Morning 6:30 AM to 8:30 AM)',
      steps: [
        'Assemble at designated meeting point for a 5-minute safety briefing.',
        'Divide into squads of 4 volunteers each, covering 50-meter street segments.',
        'Segregate as you pick: dry recyclables into blue sacks, biodegradable waste into green sacks.',
        'Take before-and-after photographs from the exact same angle.'
      ]
    },
    {
      phase: 'Phase 4: Waste Audit & Handover',
      steps: [
        'Count total bags collected and weigh if a spring balance is available.',
        'Stack filled sacks at the pre-agreed municipal collection junction.',
        'Wash hands thoroughly with soap and water.'
      ]
    },
    {
      phase: 'Phase 5: Post-Drive Awareness & Tracking',
      steps: [
        'Submit a community report or campaign log on CleanStreet TN with before-and-after photos.',
        'Share results at school morning assembly to inspire other classes.'
      ]
    }
  ]
};
