import React, { useState } from 'react';
import { ProblemCategory } from '../../types/report';
import { routeOfficialComplaint } from '../../data/officialContacts';
import { useLanguage } from '../../context/LanguageContext';
import {
  PhoneCall,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Building2,
  FileCheck2,
  CheckCircle,
  HelpCircle,
  Info
} from 'lucide-react';

interface OfficialRoutingCardProps {
  state: string;
  district: string;
  localBody: string;
  category: ProblemCategory;
  reportId?: string;
  existingOfficialReference?: string;
  onSaveOfficialReference?: (ref: string, authority: string) => Promise<void>;
}

export const OfficialRoutingCard: React.FC<OfficialRoutingCardProps> = ({
  state,
  district,
  localBody,
  category,
  existingOfficialReference,
  onSaveOfficialReference
}) => {
  const { language, t } = useLanguage();
  const [userEnteredRef, setUserEnteredRef] = useState(existingOfficialReference || '');
  const [isSavingRef, setIsSavingRef] = useState(false);
  const [refSavedSuccess, setRefSavedSuccess] = useState(false);

  const routingMatch = routeOfficialComplaint({
    state: state || 'Tamil Nadu',
    district: district || 'Chennai',
    localBody: localBody || 'Greater Chennai Corporation',
    category
  });

  const { matchedContact, stateGrievanceContact, isLocalBodyVerified, notes } = routingMatch;

  const handleSaveReference = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEnteredRef.trim() || !onSaveOfficialReference) return;
    setIsSavingRef(true);
    try {
      const authName = matchedContact?.authority_name || stateGrievanceContact.authority_name;
      await onSaveOfficialReference(userEnteredRef.trim(), authName);
      setRefSavedSuccess(true);
      setTimeout(() => setRefSavedSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingRef(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-forest-950 text-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Official Government Complaint Routing
              </h3>
              <p className="text-xs text-slate-300">
                Jurisdiction: <span className="font-semibold text-emerald-300">{localBody}</span> ({district}, {state})
              </p>
            </div>
          </div>

          {/* Verification Badge */}
          {isLocalBodyVerified ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Official Channel</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Local Contact Pending Verification</span>
            </span>
          )}
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Distinction Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-blue-950">
              Difference Between CleanStreet TN and Official Complaints
            </p>
            <p className="text-blue-800 leading-relaxed">
              Submitting on CleanStreet TN logs a <strong>community report</strong> for public awareness and volunteer tracking. To trigger official municipal conservancy action, you must file a complaint directly with the responsible authority using the verified buttons below.
            </p>
          </div>
        </div>

        {/* PRIMARY ROUTE: If Local Body is Verified (e.g. GCC) */}
        {isLocalBodyVerified && matchedContact && (
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/70 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Designated Local Authority
                </span>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base mt-1">
                  {language === 'ta' && matchedContact.tamil_authority_name
                    ? matchedContact.tamil_authority_name
                    : matchedContact.authority_name}
                </h4>
              </div>

              <div className="text-[11px] text-slate-500">
                Verified: <span className="font-medium text-slate-700">{matchedContact.verification_date}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'ta' && matchedContact.tamil_instructions
                ? matchedContact.tamil_instructions
                : matchedContact.instructions}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {matchedContact.phone_number && (
                <a
                  href={`tel:${matchedContact.phone_number}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-xs hover:shadow transition transform active:scale-95"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>
                    {matchedContact.call_button_label || `Call ${matchedContact.phone_number}`}
                  </span>
                </a>
              )}

              {matchedContact.portal_url && (
                <a
                  href={matchedContact.portal_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs rounded-xl shadow-xs transition"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-600" />
                  <span>
                    {matchedContact.portal_button_label || 'Register Official Complaint'}
                  </span>
                </a>
              )}

              {matchedContact.source_url && (
                <a
                  href={matchedContact.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-slate-700 hover:text-emerald-700 underline flex items-center gap-1 ml-auto"
                >
                  <span>Official Source: {matchedContact.source_name}</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* UNVERIFIED LOCAL BODY NOTICE (Outside GCC without confirmed helpline) */}
        {!isLocalBodyVerified && (
          <div className="border border-amber-200 bg-amber-50/70 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>{t('routing.unverified')}</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              CleanStreet TN only publishes contact numbers and portals verified by official government gazettes or direct municipal portals. Contact details for <strong>{localBody}</strong> are currently under verification. Please use the State Government Grievance portal below.
            </p>
            <div className="pt-1">
              <a
                href="https://tnurbanepay.tn.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-900 font-medium underline hover:text-amber-950"
              >
                <span>Search Directorate of Municipal Administration (DMA TN) Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* STATE HELPLINE: Mudhalvarin Mugavari (1100) */}
        <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              Statewide Alternative Channel
            </span>
            <span className="text-[11px] text-slate-700 font-medium">All 38 TN Districts</span>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              {language === 'ta' && stateGrievanceContact.tamil_authority_name
                ? stateGrievanceContact.tamil_authority_name
                : stateGrievanceContact.authority_name}
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {language === 'ta' && stateGrievanceContact.tamil_instructions
                ? stateGrievanceContact.tamil_instructions
                : stateGrievanceContact.instructions}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="tel:1100"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('routing.call_cm')}</span>
            </a>

            <a
              href={stateGrievanceContact.portal_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t('routing.cm_portal')}</span>
            </a>
          </div>
        </div>

        {/* WORKFLOW B: RECORD OFFICIAL COMPLAINT REFERENCE */}
        {onSaveOfficialReference && (
          <div className="border-t border-slate-100 pt-4">
            <form onSubmit={handleSaveReference} className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-700" />
                  <span>Official complaint reference (optional)</span>
                </label>
                <span className="text-[11px] text-slate-700">Enter after filing with GCC or 1100</span>
              </div>
              <p className="text-[11px] text-slate-700">
                Did you submit a complaint to GCC 1913 or Mudhalvarin Mugavari? Record your official government docket number (e.g. GCC-2026-12345 or MM-78901) so fellow community members can track official progress.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userEnteredRef}
                  onChange={(e) => setUserEnteredRef(e.target.value)}
                  placeholder="e.g. GCC-PGR-2026-98124 or 1100-REF-551"
                  className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-mono"
                />
                <button
                  type="submit"
                  disabled={isSavingRef || !userEnteredRef.trim()}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition"
                >
                  {isSavingRef ? 'Saving...' : 'Link Reference'}
                </button>
              </div>
              {refSavedSuccess && (
                <p className="text-xs text-emerald-800 font-semibold flex items-center gap-1 animate-in fade-in">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Official reference code successfully saved to this report!</span>
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
