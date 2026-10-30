import React from 'react';
import { X, ShieldCheck, Lock, Eye, AlertCircle } from 'lucide-react';

interface PrivacyNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyNoticeModal: React.FC<PrivacyNoticeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Privacy & Child Protection Notice</h3>
              <p className="text-xs text-slate-500">How CleanStreet TN handles civic reports and reporter data</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex gap-3 text-emerald-950">
            <Lock className="w-5 h-5 shrink-0 text-emerald-700 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-900">Student & Resident Privacy Protection</p>
              <p className="text-xs text-emerald-800 mt-0.5">
                Because this platform is designed for school students and residential communities, we strictly avoid collecting unnecessary personal data. No phone numbers, personal email addresses, or precise residential apartment numbers are ever made publicly visible.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1.5">
              <Eye className="w-4 h-4 text-slate-700" /> 1. What Information is Publicly Displayed?
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Report title and general problem description.</li>
              <li>General street name, landmark, locality, and urban local body (e.g., T. Nagar, Chennai).</li>
              <li>Photographs of the garbage accumulation or civic issue.</li>
              <li>Current community report status and official complaint references entered by users.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1.5">
              <Lock className="w-4 h-4 text-slate-700" /> 2. What Information Remains Strictly Private?
            </h4>
            <p>
              Reporter contact telephone numbers, email addresses, and private account identifiers are encrypted in the database and accessible exclusively by verified moderators for follow-up verification. They are never exported or displayed on public cards or maps.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1.5">
              <AlertCircle className="w-4 h-4 text-slate-700" /> 3. How to Request Data Correction or Removal?
            </h4>
            <p>
              If a photograph accidentally contains private faces, vehicle registration plates, or sensitive personal details, any user may request immediate review or redaction by contacting our volunteer moderator desk or flagging the reference code.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-500">
            <strong>Legal Note:</strong> CleanStreet TN is an independent civic reporting tool. It is not an official government database. Official complaints must be filed through designated channels such as Greater Chennai Corporation (1913) or the Tamil Nadu CM Helpline (1100).
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl transition"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
