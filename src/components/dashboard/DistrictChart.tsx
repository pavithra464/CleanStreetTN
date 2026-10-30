import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

interface DistrictChartProps {
  data: { district: string; count: number }[];
}

export const DistrictChart: React.FC<DistrictChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-slate-400">
        No geographic data available
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 15, right: 15, left: -10, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="district"
            angle={-25}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 10, fill: '#64748b' }}
          />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-xl space-y-0.5">
                    <p className="font-bold">{item.district}</p>
                    <p className="text-emerald-400 font-mono">
                      Reports: <strong>{item.count}</strong>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" fill="#15803d" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
