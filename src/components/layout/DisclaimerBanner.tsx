import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Info, AlertTriangle } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 text-center sm:text-left">
        <div className="flex items-center gap-1.5 font-medium text-emerald-400">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>{t('banner.independent')}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-amber-300/90 font-medium">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
          <span>{t('emergency.notice')}</span>
        </div>
      </div>
    </div>
  );
};
