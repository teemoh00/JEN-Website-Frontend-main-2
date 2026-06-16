import React from 'react';

const CellEngagementChart = () => {
    // Donut chart
    // 3 segments: Highly Engaged (Blue), Low Engagement (Grey), Moderately Engaged (Yellow/Cream)
    const radius = 80;
    const stroke = 20;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    // Data percentages (approx from image)
    const segments = [
        { color: 'var(--primary)', percent: 65, label: 'Highly Engaged' },
        { color: 'var(--text-color)', percent: 25, label: 'Moderately Engaged' },
        { color: '#4b5563', percent: 10, label: 'Low Engagement' } // Darker grey for low
    ];

    let offset = 0;

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%'
        }}>
            <h3 style={{ width: '100%', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1.5rem', textAlign: 'left' }}>
                Cell Engagement Status
            </h3>

            <div className="donut-container">
                <svg className="donut-svg" viewBox="0 0 160 160">
                    {segments.map((seg, i) => {
                        const dashArray = `${(seg.percent / 100) * circumference} ${circumference}`;
                        const dashOffset = offset;
                        offset -= (seg.percent / 100) * circumference;
                        return (
                            <circle
                                key={i}
                                cx="80"
                                cy="80"
                                r={normalizedRadius}
                                fill="transparent"
                                stroke={seg.color}
                                strokeWidth={stroke}
                                strokeDasharray={dashArray}
                                strokeDashoffset={dashOffset}
                                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                            />
                        );
                    })}
                </svg>
            </div>

            <style>{`
                .donut-container {
                    position: relative;
                    width: 160px;
                    height: 160px;
                    margin-bottom: 1.5rem;
                }
                .donut-svg {
                    width: 100%;
                    height: 100%;
                    transform: rotate(-90deg);
                }
                @media (max-width: 640px) {
                    .donut-container {
                        width: 120px !important;
                        height: 120px !important;
                        margin-bottom: 1rem !important;
                    }
                }
            `}</style>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', justifyContent: 'center' }}>
                {segments.map((seg, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: seg.color }}></span>
                        {seg.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CellEngagementChart;
