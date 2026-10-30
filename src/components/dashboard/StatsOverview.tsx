import React from 'react';
import { DashboardStats } from '../../services/reportService';
import { useLanguage } from '../../context/LanguageContext';
import { FileText, Clock, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';

interface StatsOverviewProps {
  stats: DashboardStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const { t } = useLanguage();

  const cards = [
    {
      title: 'Total Community Reports',
      tamilTitle: 'மொத்த புகார்கள்',
      count: stats.total,
      icon: FileText,
      color: 'text-slate-900',
      bgColor: 'bg-white',
      borderColor: 'border-slate-200',
      iconBg: 'bg-slate-100 text-slate-700'
    },
    {
      title: 'Awaiting / Under Review',
      tamilTitle: 'பரிசீலனையில் உள்ளவை',
      count: stats.underReview,
      icon: Clock,
      color: 'text-amber-800',
      bgColor: 'bg-white',
      borderColor: 'border-amber-200',
      iconBg: 'bg-amber-100 text-amber-700'
    },
    {
      title: 'Approved for Display',
      tamilTitle: 'பொது பார்வையில் உள்ளவை',
      count: stats.approved,
      icon: ShieldCheck,
      color: 'text-sky-800',
      bgColor: 'bg-white',
      borderColor: 'border-sky-200',
      iconBg: 'bg-sky-100 text-sky-700'
    },
    {
      title: 'Marked Resolved',
      tamilTitle: 'தீர்க்கப்பட்டவை',
      count: stats.resolved,
      icon: CheckCircle2,
      color: 'text-emerald-800',
      bgColor: 'bg-white',
      borderColor: 'border-emerald-200',
      iconBg: 'bg-emerald-100 text-emerald-700'
    },
    {
      title: 'Areas with Reports',
      tamilTitle: 'பதிவான பகுதிகள்',
      count: stats.distinctLocalities,
      icon: MapPin,
      color: 'text-forest-800',
      bgColor: 'bg-white',
      borderColor: 'border-forest-200',
      iconBg: 'bg-forest-100 text-forest-700'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-4 rounded-2xl border ${card.borderColor} ${card.bgColor} shadow-xs flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 line-clamp-1">
                {card.title}
              </span>
              <div className={`p-1.5 rounded-lg ${card.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-1">
              <span className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${card.color}`}>
                {card.count}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {card.tamilTitle}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
