import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { PrivacyNoticeModal } from '../common/PrivacyNoticeModal';
import { ShieldCheck, PhoneCall, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1: Mission and Logo */}
            <div className="space-y-3">
              <div className="bg-slate-800/80 p-2 rounded-2xl inline-block border border-slate-700/60">
                <Logo showText={true} />
              </div>
              <p className="text-emerald-400 font-semibold italic text-sm">
                “Cleaner Streets, Healthier Communities, Greener Tamil Nadu.”
              </p>
              <p className="text-slate-400 leading-relaxed text-xs">
                A community-driven waste reporting, local cleanliness mapping, and verified municipal complaint routing platform for Chennai and Tamil Nadu.
              </p>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3">Explore CleanStreet</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/report" className="hover:text-emerald-400 transition">Report a Cleanliness Issue</Link>
                </li>
                <li>
                  <Link to="/map" className="hover:text-emerald-400 transition">Interactive Cleanliness Map</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-emerald-400 transition">Community Analytics Dashboard</Link>
                </li>
                <li>
                  <Link to="/learn" className="hover:text-emerald-400 transition">Waste Segregation & Quiz</Link>
                </li>
                <li>
                  <Link to="/campaigns" className="hover:text-emerald-400 transition">School & Community Drives</Link>
                </li>
                <li>
                  <Link to="/track" className="hover:text-emerald-400 transition">Track Report Status</Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Official Helplines */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3">Official Civic Helplines</h4>
              <ul className="space-y-2.5">
                <li className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Greater Chennai Corp (GCC)</span>
                    <a href="tel:1913" className="text-emerald-400 font-mono font-bold flex items-center gap-1 hover:underline">
                      <PhoneCall className="w-3 h-3" /> 1913
                    </a>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Toll-free 24x7 civic complaints for Chennai city</span>
                </li>
                <li className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">TN CM Helpline / Mudhalvarin Mugavari</span>
                    <a href="tel:1100" className="text-emerald-400 font-mono font-bold flex items-center gap-1 hover:underline">
                      <PhoneCall className="w-3 h-3" /> 1100
                    </a>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Unified public grievances across all 38 districts</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Trust & Transparency */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3">Transparency & Ethics</h4>
              <div className="space-y-2 text-slate-400 text-xs">
                <p>
                  CleanStreet TN is an independent civic engagement initiative. We do not represent any government agency or claim unverified partnerships.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setPrivacyModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium underline"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Privacy & Child Protection Notice</span>
                  </button>
                </div>
                <div className="pt-1">
                  <Link to="/admin" className="text-slate-400 hover:text-slate-200">
                    Moderator Portal Login
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
            <p>© {new Date().getFullYear()} CleanStreet TN. Built for Tamil Nadu communities and schools.</p>
            <p className="flex items-center gap-1 text-slate-400">
              Dedicated to environmental stewardship in Chennai & Tamil Nadu
            </p>
          </div>
        </div>
      </footer>

      <PrivacyNoticeModal isOpen={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} />
    </>
  );
};
