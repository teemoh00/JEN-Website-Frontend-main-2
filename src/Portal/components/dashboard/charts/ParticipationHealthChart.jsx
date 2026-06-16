import React from 'react';

const ParticipationHealthChart = ({ healthScore }) => {
    const score = healthScore ?? 82;

    // Determine status label based on score
    let labelText = "Growing";
    
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
            <h3 style={{ width: '100%', color: 'var(--text-color)', fontSize: '1.1rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'left', margin: '0 0 2rem 0' }}>
                Participation Health
            </h3>

            <div style={{ position: 'relative', width: '200px', height: '120px', display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <svg width="200" height="120" viewBox="0 0 200 120">
                    {/* Background Arc */}
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--surface-2)" strokeWidth="12" strokeLinecap="round" />
                    {/* Active Arc */}
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#0ea5e9"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={arcLength}
                        strokeDashoffset={offset}
                        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                    />
                </svg>

                <div style={{ position: 'absolute', bottom: '0', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0ea5e9', lineHeight: 1, marginBottom: '0.25rem' }}>{score}%</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#10b981' }}>{labelText}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.1rem', letterSpacing: '0.05em' }}>Healthy</div>
                </div>
            </div>

            <div style={{ display: 'flex', width: '100%', marginTop: 'auto', background: '#ffffff', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <div style={{ flex: 1, textAlign: 'center', padding: '1rem 0.5rem', borderRight: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>12</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Events</div>
                </div>
                <div style={{ flex: 1, textAlign: 'center', padding: '1rem 0.5rem', borderRight: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>8</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Attended</div>
                </div>
                <div style={{ flex: 1.5, textAlign: 'center', padding: '1rem 0.5rem' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981', marginBottom: '0.25rem' }}>+5%</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>vs Last Month</div>
                </div>
            </div>
        </div>
    );
};

export default ParticipationHealthChart;
