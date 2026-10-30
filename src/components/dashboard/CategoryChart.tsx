import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { ProblemCategory } from '../../types/report';
import { CATEGORY_DETAILS } from '../../data/tamilNaduDistricts';

interface CategoryChartProps {
  data: { category: ProblemCategory; count: number; label: string }[];
}

export const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  const chartData = data.map((item) => {
    const detail = CATEGORY_DETAILS[item.category] || CATEGORY_DETAILS.other;
    return {
      name: detail.label,
      shortName: detail.label.length > 20 ? detail.label.slice(0, 18) + '...' : detail.label,
      count: item.count,
      color: detail.color
    };
  });

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-slate-400">
        No category data available yet
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >
          <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="shortName"
            width={120}
            tick={{ fontSize: 10 }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-xl space-y-1">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-emerald-400 font-mono">
                      Reports: <strong>{item.count}</strong>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" radius={[0, 6, 6, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
