import React from 'react';

const ContributionStats = ({ stats }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const statCards = [
        { label: 'Total Contribution', value: formatCurrency(stats.totalGiven), icon: '💰', color: 'var(--primary)', trend: '+12% this month' },
        { label: 'Monthly Average', value: formatCurrency(stats.monthlyAverage), icon: '📊', color: '#a855f7', trend: 'Based on last 12 months' },
        { label: 'Active Pledges', value: stats.activePledges, icon: '🤝', color: '#10b981', trend: '2 ending soon' },
        { label: 'Fulfillment Rate', value: `${stats.fulfillmentRate}%`, icon: '🎯', color: '#f59e0b', trend: 'Excellent progress' },
    ];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
        }}>
            {statCards.map((card, idx) => (
                <div key={idx} style={{
                    background: 'var(--surface-1)',
                    borderRadius: '1.25rem',
                    padding: '1.5rem',
                    border: '1px solid var(--border-color)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '0.75rem',
                            background: `${card.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.25rem'
                        }}>
                            {card.icon}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: '600' }}>
                            {card.trend.includes('%') ? '↑' : ''} {card.trend}
                        </div>
                    </div>
                    <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                            {card.label}
                        </div>
                        <div style={{
                            fontSize: '1.5rem',
                            fontWeight: '800',
                            color: 'var(--text-color)',
                            letterSpacing: '-0.02em'
                        }}>
                            {card.value}
                        </div>
                    </div>
                    {/* Subtle corner glow */}
                    <div style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        width: '60px',
                        height: '60px',
                        background: card.color,
                        filter: 'blur(40px)',
                        opacity: 0.1,
                        borderRadius: '50%'
                    }} />
                </div>
            ))}
        </div>
    );
};

export default ContributionStats;
