import React from 'react';

const ActionButton = ({ label, primary, green, filled, className, onClick }) => {
    let background = 'transparent';
    let border = '1px solid var(--secondary)'; // Purple border default
    let color = 'var(--secondary)';

    if (filled) {
        background = 'var(--secondary)';
        border = 'none';
        color = 'white';
    } else if (green) {
        border = '1px solid #22c55e';
        color = '#22c55e';
    }

    return (
        <button onClick={onClick} className={`prophetic-action-btn ${className}`} style={{
            background,
            border,
            color,
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontWeight: '600',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap'
        }}>
            {label}
        </button>
    );
};

const PropheticActions = ({ onNewProphecy, onNewSchedule }) => {
    return (
        <div className="prophetic-actions-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <style>{`
                @media (max-width: 768px) {
                    .prophetic-actions-container {
                        flex-direction: column !important;
                        align-items: stretch !important;
                        gap: 1.25rem !important;
                    }
                    .prophetic-action-group {
                        flex-direction: column !important;
                        width: 100% !important;
                    }
                    .prophetic-action-btn {
                        width: 100% !important;
                        padding: 0.6rem 1rem !important;
                        font-size: 0.8rem !important;
                        text-align: center !important;
                    }
                }
            `}</style>
            <div className="prophetic-action-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <ActionButton label="New Prophecy Type" />
                <ActionButton label="New Prophecy/Instruction" onClick={onNewProphecy} />
                <ActionButton label="Download All Communications" filled />
            </div>

            <div className="prophetic-action-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <ActionButton label="Add A Prayer Schedule" green onClick={onNewSchedule} />
                <ActionButton label="View Prayer Schedules" green />
            </div>
        </div>
    );
};

export default PropheticActions;
