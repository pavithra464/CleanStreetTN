import React from 'react';
import { ReportStatus } from '../../types/report';
import { useLanguage } from '../../context/LanguageContext';
import { CheckCircle2, Clock, Eye, AlertTriangle, ShieldCheck, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: ReportStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const { t } = useLanguage();

  let badgeColor = '';
  let Icon = Clock;

  switch (status) {
    case 'Submitted':
      badgeColor = 'bg-slate-100 text-slate-800 border-slate-200';
      Icon = Clock;
      break;
    case 'Under Review':
      badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
      Icon = Eye;
      break;
    case 'Approved for Public Display':
      badgeColor = 'bg-sky-100 text-sky-800 border-sky-200';
      Icon = ShieldCheck;
      break;
    case 'Action Reported':
      badgeColor = 'bg-indigo-100 text-indigo-800 border-indigo-200';
      Icon = AlertTriangle;
      break;
    case 'Resolved':
      badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
      Icon = CheckCircle2;
      break;
    case 'Rejected':
      badgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
      Icon = XCircle;
      break;
    default:
      badgeColor = 'bg-slate-100 text-slate-800 border-slate-200';
      Icon = Clock;
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4'
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border shadow-xs ${badgeColor} ${sizeClasses[size]}`}
    >
      <Icon className={iconSizes[size]} />
      <span>{t(`status.${status}`)}</span>
    </span>
  );
};
