import React from 'react';

// Simple SVG Line Chart
const AttendanceTrendChart = ({ trend }) => {
    const data = trend?.data || [];
    const labels = trend?.labels || [];

    // Normalize data for SVG coordinates (0-100 height)
    const max = Math.max(...data, 1) * 1.1; // Avoid divide by zero
    const points = data.map((val, idx) => {
        const x = data.length > 1 ? (idx / (data.length - 1)) * 100 : 50;
        const y = 100 - (val / max) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '1rem' }}>Attendance Trend</h3>
                    <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>Performance over selected period</p>
                </div>
            </div>

            <div style={{ flex: 1, position: 'relative', minHeight: '200px', padding: '0 0.5rem' }}>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map(h => (
                        <line key={h} x1="0" y1={h} x2="100" y2={h} stroke="var(--border-color)" strokeWidth="0.5" />
                    ))}

                    {/* Line */}
                    <polyline
                        points={points}
                        fill="none"
                        stroke="#22c1e6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Area fill (optional, simplified) */}
                    <polygon
                        points={`0,100 ${points} 100,100`}
                        fill="url(#gradient)"
                        opacity="0.2"
                    />

                    <defs>
                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#22c1e6" />
                            <stop offset="100%" stopColor="#22c1e6" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Points */}
                    {data.map((val, idx) => {
                        const x = data.length > 1 ? (idx / (data.length - 1)) * 100 : 50;
                        const y = 100 - (val / max) * 100;
                        return (
                            <circle key={idx} cx={x} cy={y} r="1.5" fill="#1A1625" stroke="#22c1e6" strokeWidth="1" />
                        );
                    })}
                </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {labels.length > 0 ? labels.filter((_, i) => i % (labels.length > 5 ? 2 : 1) === 0).map((l, i) => (
                    <span key={i}>{l}</span>
                )) : null}
            </div>
        </div>
    );
};

export default AttendanceTrendChart;
