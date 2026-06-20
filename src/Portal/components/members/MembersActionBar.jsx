import React from 'react';

const ActionButton = ({ icon, label, primary = false, onClick }) => (
    <button onClick={onClick} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: primary ? '0.6rem 1.2rem' : '0.6rem 0.5rem',
        borderRadius: '0.5rem',
        border: 'none',
        background: primary ? 'var(--primary)' : 'transparent',
        color: primary ? 'var(--bg-color)' : 'var(--text-color)',
        fontWeight: primary ? '700' : '600',
        fontSize: '0.85rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap'
    }}>
        <span style={{ fontSize: '1.1rem' }}>{icon}</span> {label}
    </button>
);

const MembersActionBar = ({ onNewMember, onNewCellGroup }) => {
    return (
        <div style={{
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            overflowX: 'auto',
            padding: '0.5rem 0'
        }}>
            <ActionButton icon="➕" label="New Member" primary={true} onClick={onNewMember} />
            <ActionButton icon="👨‍👩‍👧‍👦" label="New Cell Group" onClick={onNewCellGroup} />
        </div>
    );
};

export default MembersActionBar;
