import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TRANSLATIONS: Record<string, { en: string; ta: string }> = {
  // Navigation
  'nav.home': { en: 'Home', ta: 'முகப்பு' },
  'nav.report': { en: 'Report a Problem', ta: 'புகார் அளிக்க' },
  'nav.map': { en: 'Cleanliness Map', ta: 'தூய்மை வரைபடம்' },
  'nav.dashboard': { en: 'Live Dashboard', ta: 'புள்ளிவிவரம்' },
  'nav.learn': { en: 'Learn Segregation', ta: 'கழிவு மேலாண்மை' },
  'nav.campaigns': { en: 'Community Drives', ta: 'தூய்மை இயக்கங்கள்' },
  'nav.track': { en: 'Track Status', ta: 'புகார் நிலை' },
  'nav.admin': { en: 'Moderator Login', ta: 'நிர்வாகி பகுதி' },

  // Disclaimer & Emergency
  'banner.independent': {
    en: 'An independent community cleanliness initiative. CleanStreet TN is not an official government website.',
    ta: 'சுயாதீன சமூக தூய்மை முயற்சி. க்ளீன்ஸ்ட்ரீட் தமிழ்நாடு அரசு அதிகாரப்பூர்வ தளம் அல்ல.'
  },
  'emergency.notice': {
    en: 'CleanStreet TN is not an emergency service. For urgent hazards or public fires, contact the appropriate emergency authority immediately (Fire: 101, Police: 100).',
    ta: 'க்ளீன்ஸ்ட்ரீட் தமிழ்நாடு அவசர கால சேவை அல்ல. அவசர தீ விபத்து அல்லது உடனடி ஆபத்துகளுக்கு உரிய அதிகாரிகளைத் தொடர்பு கொள்ளவும் (தீயணைப்பு: 101, காவல்: 100).'
  },

  // Hero section
  'hero.title': { en: "Let's Make Tamil Nadu's Streets Cleaner.", ta: 'தமிழ்நாட்டின் தெருக்களைத் தூய்மையாக்குவோம்.' },
  'hero.subtitle': {
    en: 'See garbage piling up in your neighbourhood? Report it, find the right official complaint channel, and help your community take action.',
    ta: 'உங்கள் பகுதியில் குப்பை தேங்குகிறதா? புகார் அளியுங்கள், உரிய அரசு குறைதீர்ப்பு வழியைக் கண்டறியுங்கள், சமூகத்துடன் இணைந்து நடவடிக்கை எடுங்கள்.'
  },
  'hero.btn.report': { en: 'Report a Problem', ta: 'புகார் பதிவு செய்க' },
  'hero.btn.map': { en: 'Explore Cleanliness Map', ta: 'தூய்மை வரைபடத்தைக் காண்க' },

  // Feature cards
  'feature.1.title': { en: 'Report Garbage', ta: 'குப்பையை புகாரளிக்கவும்' },
  'feature.1.desc': { en: 'Upload photos, pin the street location, and document municipal waste accumulation in minutes.', ta: 'புகைப்படங்களை பதிவேற்றி, தெருவின் இருப்பிடத்தைக் குறிப்பிட்டு புகாரைப் பதியுங்கள்.' },
  'feature.2.title': { en: 'Explore Local Issues', ta: 'பகுதி சிக்கல்களை அறியவும்' },
  'feature.2.desc': { en: 'Discover verified civic waste concerns near your school, residence, or commercial ward.', ta: 'உங்கள் பள்ளி அல்லது குடியிருப்பு அருகில் உள்ள தூய்மைப் பிரச்சனைகளைக் கண்டறியுங்கள்.' },
  'feature.3.title': { en: 'Contact the Right Authority', ta: 'சரியான அதிகாரியைத் தொடர்பு கொள்ளவும்' },
  'feature.3.desc': { en: 'Get routed directly to GCC 1913, TN CM Helpline 1100, or verified local municipal bodies.', ta: 'சென்னை மாநகராட்சி 1913, முதல்வரின் முகவரி 1100 அல்லது உங்கள் நகராட்சியின் தொடர்பு எண் பெறுங்கள்.' },
  'feature.4.title': { en: 'Learn to Segregate Waste', ta: 'குப்பைப் பிரித்தலைக் கற்கவும்' },
  'feature.4.desc': { en: 'Master wet vs dry segregation, explore the Meendum Manjappai campaign, and play the quiz.', ta: 'ஈர மற்றும் உலர் கழிவுப் பிரிப்பு முறைகளைக் கற்று வினாடி வினாவில் பங்கேற்கவும்.' },

  // How it works
  'how.title': { en: 'How CleanStreet TN Works', ta: 'க்ளீன்ஸ்ட்ரீட் தமிழ்நாடு எவ்வாறு செயல்படுகிறது?' },
  'how.subtitle': { en: 'Five simple, transparent steps connecting community reporting with official municipal action.', ta: 'சமூக புகாரிலிருந்து அரசு நடவடிக்கை வரையிலான ஐந்து எளிய படிகள்.' },
  'how.step1.title': { en: '1. Identify Problem', ta: '1. சிக்கலை அடையாளம் காணுதல்' },
  'how.step1.desc': { en: 'Notice an overflowing dustbin, illegal dump, or public trash burning in your ward.', ta: 'உங்கள் பகுதியில் நிரம்பி வழியும் தொட்டி அல்லது குப்பை எரிப்பைக் கவனியுங்கள்.' },
  'how.step2.title': { en: '2. Submit Report', ta: '2. விவரங்களுடன் பதிவு செய்தல்' },
  'how.step2.desc': { en: 'Provide the street address, landmarks, and an optional photograph. Receive a CSTN tracking code.', ta: 'இருப்பிடம் மற்றும் புகைப்படத்துடன் சமர்ப்பித்து CSTN குறிப்பு எண்ணைப் பெறுங்கள்.' },
  'how.step3.title': { en: '3. Discover Official Channel', ta: '3. அரசுத் துறையைக் கண்டறிதல்' },
  'how.step3.desc': { en: 'Our routing engine connects you to GCC (1913), TN CM Helpline (1100), or your local municipality.', ta: 'எங்கள் வழிகாட்டி உங்கள் பகுதிக்குரிய GCC 1913 அல்லது 1100 எண்ணை வழங்கும்.' },
  'how.step4.title': { en: '4. Register Official Grievance', ta: '4. அதிகாரப்பூர்வ புகார் பதிவு' },
  'how.step4.desc': { en: 'Dial the verified helpline or open the government portal to submit an official municipal docket.', ta: 'அரசு இணையதளம் அல்லது அழைப்பு மூலம் அதிகாரப்பூர்வ புகார் எண் பெறுங்கள்.' },
  'how.step5.title': { en: '5. Follow Community Progress', ta: '5. தூய்மை நிலையைத் தொடர்ந்து அறிதல்' },
  'how.step5.desc': { en: 'Track status changes, moderator reviews, and confirmed resolution notes with after-photos.', ta: 'தூய்மை செய்யப்பட்ட விவரங்களையும் மாற்றங்களையும் வரைபடத்தில் கண்காணிக்கவும்.' },

  // Form labels & Report
  'report.heading': { en: 'Report a Cleanliness Problem', ta: 'தூய்மைப் பிரச்சனையைப் பதிவு செய்க' },
  'report.subheading': { en: 'Every report builds community awareness and helps route issues to the right local authorities.', ta: 'ஒவ்வொரு புகாரும் சமூக விழிப்புணர்வை ஏற்படுத்தி அரசு தீர்வு காண உதவுகிறது.' },
  'form.title': { en: 'Report Title', ta: 'புகாரின் தலைப்பு' },
  'form.title.placeholder': { en: 'e.g. Overflowing garbage bin near bus stop', ta: 'எ.கா. பேருந்து நிறுத்தம் அருகில் நிரம்பி வழியும் குப்பைத் தொட்டி' },
  'form.description': { en: 'Detailed Description', ta: 'விவரமான விளக்கம்' },
  'form.description.placeholder': { en: 'Describe the waste issue, duration observed, and public impact...', ta: 'குப்பையின் அளவு, எத்தனை நாட்களாக உள்ளது போன்ற விவரங்களை விவரிக்கவும்...' },
  'form.category': { en: 'Problem Category', ta: 'பிரச்சனை வகை' },
  'form.state': { en: 'State', ta: 'மாநிலம்' },
  'form.district': { en: 'District', ta: 'மாவட்டம்' },
  'form.local_body': { en: 'Urban Local Body', ta: 'உள்ளாட்சி அமைப்பு' },
  'form.city_town': { en: 'City or Town', ta: 'நகரம் / ஊர்' },
  'form.locality': { en: 'Area or Locality', ta: 'பகுதி / வட்டாரம்' },
  'form.street_name': { en: 'Street Name', ta: 'தெரு பெயர்' },
  'form.landmark': { en: 'Prominent Landmark', ta: 'அடையாளக் குறிப்பு' },
  'form.postal_code': { en: 'Postal Code (PIN)', ta: 'அஞ்சல் குறியீட்டு எண்' },
  'form.photo': { en: 'Upload Photograph (Optional)', ta: 'புகைப்படம் பதிவேற்றுக (விருப்பத்தேர்வு)' },
  'form.photo.help': { en: 'Supports JPG, PNG, WebP up to 5 MB. Strictly no executable files.', ta: 'JPG, PNG, WebP படங்கள் (அதிகபட்சம் 5 MB).' },
  'form.date_observed': { en: 'Date Observed', ta: 'கவனிக்கப்பட்ட நாள்' },
  'form.reporter_name': { en: 'Your Name (Optional)', ta: 'உங்கள் பெயர் (விருப்பத்தேர்வு)' },
  'form.reporter_contact': { en: 'Phone / Email (Kept Strictly Private)', ta: 'தொலைபேசி / மின்னஞ்சல் (ரகசியமாக வைக்கப்படும்)' },
  'form.privacy_notice': {
    en: 'I confirm this report is accurate and agree that public cleanliness details (excluding personal contact information) will be visible on CleanStreet TN.',
    ta: 'இந்த தகவல் உண்மையானது என்பதை உறுதிப்படுத்துகிறேன். எனது தனிப்பட்ட தொடர்பு விவரங்கள் அன்றி பொது தூய்மை தகவல்கள் மட்டும் தளத்தில் காட்டப்பட ஒப்புக்கொள்கிறேன்.'
  },
  'form.submit_button': { en: 'Submit Community Report', ta: 'சமூக புகாரை சமர்ப்பிக்கவும்' },

  // Statuses
  'status.Submitted': { en: 'Submitted', ta: 'சமர்ப்பிக்கப்பட்டது' },
  'status.Under Review': { en: 'Under Review', ta: 'பரிசீலனையில்' },
  'status.Approved for Public Display': { en: 'Approved for Public Display', ta: 'பொது பார்வைக்கு அனுமதிக்கப்பட்டது' },
  'status.Action Reported': { en: 'Action Reported', ta: 'நடவடிக்கை எடுக்கப்பட்டது' },
  'status.Resolved': { en: 'Resolved', ta: 'தீர்க்கப்பட்டது' },
  'status.Rejected': { en: 'Rejected', ta: 'நிராகரிக்கப்பட்டது' },

  // Routing actions
  'routing.call_gcc': { en: 'Call GCC — 1913', ta: 'சென்னை மாநகராட்சி — 1913 அழைக்க' },
  'routing.gcc_portal': { en: 'Register Official GCC Complaint', ta: 'அதிகாரப்பூர்வ GCC புகார் பதிவு' },
  'routing.call_cm': { en: 'Call Tamil Nadu Helpline — 1100', ta: 'தமிழக முதலமைச்சர் உதவி — 1100 அழைக்க' },
  'routing.cm_portal': { en: 'Open Tamil Nadu Grievance Portal', ta: 'முதல்வரின் முகவரி இணையதளம்' },
  'routing.unverified': {
    en: 'Local complaint contact not yet verified.',
    ta: 'உள்ளூர் நகராட்சி உதவி எண் இன்னும் சரிபார்க்கப்படவில்லை.'
  },
  'routing.unverified_sub': {
    en: 'For this local body, please register your grievance through the Tamil Nadu Chief Minister’s Helpline (1100) or check the official Directorate of Municipal Administration portal.',
    ta: 'இந்த உள்ளாட்சிக்கு முதல்வரின் முகவரி (1100) மூலமாகவோ அல்லது நகராட்சி நிர்வாக ஆணையரக தளம் மூலமாகவோ புகார் தெரிவிக்கலாம்.'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('cleanstreet_language');
      return saved === 'ta' ? 'ta' : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('cleanstreet_language', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[language] || entry.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
