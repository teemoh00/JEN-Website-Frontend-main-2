import React from 'react';

const ContributionHistoryWidget = () => {
    const contributions = [
        { date: 'Feb 02, 2026', type: 'Tithe', amount: '5,000', method: 'M-Pesa' },
        { date: 'Jan 28, 2026', type: 'Building Fund', amount: '10,000', method: 'Bank Transfer' },
        { date: 'Jan 21, 2026', type: 'Offering', amount: '2,000', method: 'M-Pesa' },
        { date: 'Jan 14, 2026', type: 'Tithe', amount: '5,000', method: 'Card' },
    ];

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h3 style={{ color: '#0ea5e9', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', margin: '0 0 1.5rem 0' }}>
                Latest Contributions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                {contributions.map((item, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1.25rem',
                        background: 'var(--surface-1)',
                        borderRadius: '0.75rem',
                        borderLeft: i === 0 ? '3px solid #0ea5e9' : '3px solid transparent'
                    }}>
                        <div>
                            <div style={{ color: 'var(--text-color)', fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{item.type}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{item.date} • {item.method}</div>
                        </div>
                        <div style={{ color: 'var(--text-color)', fontWeight: '700', fontSize: '1rem' }}>
                            KES {item.amount}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                width: '100%',
                marginTop: '1.5rem',
                textAlign: 'center',
                color: '#0ea5e9',
                fontWeight: '700',
                fontSize: '0.85rem',
                cursor: 'pointer'
            }}>
                View Full Statement
            </div>
        </div>
    );
};

export default ContributionHistoryWidget;
