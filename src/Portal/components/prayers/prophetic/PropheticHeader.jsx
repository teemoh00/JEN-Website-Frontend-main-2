import React from 'react';

const PropheticHeader = () => {
    return (
        <div className="prophetic-header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <style>{`
                @media (max-width: 768px) {
                    .prophetic-header-container {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 1.5rem !important;
                        margin-bottom: 2rem !important;
                    }
                    .prophetic-greeting {
                        font-size: 1.4rem !important;
                        flex-wrap: wrap !important;
                    }
                    .prophetic-subtext {
                        font-size: 0.85rem !important;
                    }
                    .prophetic-stat-card {
                        min-width: 100% !important;
                        padding: 1rem 1.5rem !important;
                    }
                }
            `}</style>
            <div>
                <h1 className="prophetic-greeting" style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-color)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Hello there! Welcome Back, Timothy <span style={{ fontSize: '1.5rem' }}>👋</span>
                </h1>
                <p className="prophetic-subtext" style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>The word .!</p>
            </div>

            <div className="prophetic-stat-card" style={{
                background: 'var(--surface-1)',
                padding: '1.5rem 2rem',
                borderRadius: '1rem',
                border: '1px solid var(--border-color)',
                minWidth: '250px'
            }}>
                <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Fulfilled Prophecies</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Check your name</p>
            </div>
        </div>
    );
};

export default PropheticHeader;
