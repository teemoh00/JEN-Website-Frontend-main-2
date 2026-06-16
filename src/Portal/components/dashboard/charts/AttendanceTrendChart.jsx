import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AttendanceTrendChart = ({ trendData }) => {
    // If no data is available yet, provide a flatline fallback
    const data = trendData || [
        { month: 'N/A', count: 0 }
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border-color)',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    color: 'var(--text-color)',
                    fontSize: '0.85rem'
                }}>
                    <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>
                    <p style={{ margin: 0, color: 'var(--primary)' }}>Attendance: {payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h3 style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Attendance Trend (Last 6 Months)
            </h3>

            <div className="chart-wrapper">
                <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={1}>
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c1e6" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#22c1e6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                            dy={10}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#22c1e6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#trendGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <style>{`
                .chart-wrapper {
                    flex: 1;
                    width: 100%;
                    min-height: 200px;
                    position: relative;
                }
                @media (max-width: 640px) {
                    .chart-wrapper {
                        min-height: 160px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default AttendanceTrendChart;
