import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import { ReportStatus } from '../../types/report';

interface StatusChartProps {
  data: { status: ReportStatus; count: number }[];
}

const STATUS_COLORS: Record<string, string> = {
  Submitted: '#94a3b8',
  'Under Review': '#f59e0b',
  'Approved for Public Display': '#0ea5e9',
  'Action Reported': '#6366f1',
  Resolved: '#10b981',
  Rejected: '#f43f5e'
};

export const StatusChart: React.FC<StatusChartProps> = ({ data }) => {
  const activeData = data.filter((d) => d.count > 0);

  if (activeData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-slate-400">
        No status data to display
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={activeData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="count"
            nameKey="status"
          >
            {activeData.map((entry) => (
              <Cell
                key={`cell-${entry.status}`}
                fill={STATUS_COLORS[entry.status] || '#64748b'}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0];
                return (
                  <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-xl space-y-0.5">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-emerald-400 font-mono">
                      Count: <strong>{item.value}</strong>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
