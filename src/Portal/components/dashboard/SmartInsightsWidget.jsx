import React from 'react';

const SmartInsightsWidget = () => {
    return (
        <div style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-color)',
            borderRadius: '1rem',
            padding: '1.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h3 style={{ color: 'var(--text-color)', fontSize: '1.1rem', fontWeight: '700', margin: '0 0 1.5rem 0' }}>
                Smart Insights
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ paddingLeft: '1rem', borderLeft: '2px solid #0ea5e9', fontSize: '0.85rem', color: 'var(--text-color)', lineHeight: '1.4' }}>
                    Your attendance improved by 15% this month 👏
                </div>
                <div style={{ paddingLeft: '1rem', borderLeft: '2px solid #10b981', fontSize: '0.85rem', color: 'var(--text-color)', lineHeight: '1.4' }}>
                    You are 80% toward fulfilling your seasonal pledge 🙌
                </div>
                <div style={{ paddingLeft: '1rem', borderLeft: '2px solid transparent', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    High engagement in Jan Sunday services recorded.
                </div>
            </div>
        </div>
    );
};

export default SmartInsightsWidget;
