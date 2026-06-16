import React from 'react';

const GivingProgressChart = () => {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h3 style={{ color: '#0ea5e9', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', margin: '0 0 1rem 0' }}>
                Giving & Pledges Progress
            </h3>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0ea5e9' }}>
                    <span style={{ width: '8px', height: '8px', background: '#0ea5e9' }}></span> Fulfilled
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    Target Pledged
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '180px', paddingBottom: '1rem', flex: 1 }}>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Q1</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Q2</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Q3</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Q4</div>
            </div>
        </div>
    );
};

export default GivingProgressChart;
