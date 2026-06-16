import React from 'react';

const PledgesWidget = () => {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                🤝
            </div>
            <h3 style={{ color: 'var(--text-color)', fontSize: '1rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>
                No Pledges Yet
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                You haven't made any pledges yet.
            </p>
        </div>
    );
};

export default PledgesWidget;
