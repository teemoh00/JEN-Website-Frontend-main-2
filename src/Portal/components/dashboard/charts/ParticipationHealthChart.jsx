import React from 'react';

const ParticipationHealthChart = ({ healthScore }) => {
    const score = healthScore ?? 0;

    // Determine status label based on score
    let labelText = "Needs Attention";
    if (score >= 80) labelText = "Growing";
    else if (score >= 40) labelText = "Stable";

    // 251.2 is the approximate circumference of the 180-deg arc (pi * r).
    const arcLength = 251.2;
    const offset = arcLength * (1 - (score / 100));

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
                My Participation Health
            </h3>

            <div style={{ position: 'relative', width: '200px', height: '120px', display: 'flex', justifyContent: 'center' }}>
                <svg width="200" height="120" viewBox="0 0 200 120">
                    {/* Background Arc */}
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--border-color)" strokeWidth="12" strokeLinecap="round" />
                    {/* Active Arc */}
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#22c1e6"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={arcLength}
                        strokeDashoffset={offset}
                        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                    />
                </svg>

                <div style={{ position: 'absolute', bottom: '0', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', lineHeight: 1 }}>{score}%</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-color)', marginTop: '0.25rem' }}>{labelText}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.1rem' }}>Overall</div>
                </div>
            </div>
        </div>
    );
};

export default ParticipationHealthChart;
