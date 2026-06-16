import React from 'react';

const ProfileTabs = ({ activeTab, onTabChange }) => {
    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1.25rem',
            padding: '0 1.5rem',
            border: '1px solid var(--border-color)',
            marginBottom: '2rem',
            display: 'flex',
            gap: '1.5rem',
            boxShadow: '0 4px 15px -5px rgba(0, 0, 0, 0.05)',
            overflowX: 'auto'
        }}>
            <TabItem
                label="Profile Overview"
                icon="👤"
                active={activeTab === 'profile'}
                onClick={() => onTabChange('profile')}
            />
            <TabItem
                label="Attendance History"
                icon="📅"
                active={activeTab === 'attendance'}
                onClick={() => onTabChange('attendance')}
            />
        </div>
    );
};

const TabItem = ({ label, icon, active, onClick }) => (
    <div
        onClick={onClick}
        style={{
            padding: '1.25rem 0.5rem',
            color: active ? 'var(--primary)' : 'var(--text-muted)',
            borderBottom: '3px solid',
            borderColor: active ? 'var(--primary)' : 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.95rem',
            fontWeight: active ? '700' : '500',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            whiteSpace: 'nowrap',
            opacity: active ? 1 : 0.7
        }}
        onMouseEnter={e => { if (!active) e.currentTarget.style.opacity = 1; }}
        onMouseLeave={e => { if (!active) e.currentTarget.style.opacity = 0.7; }}
    >
        <span style={{
            fontSize: '1.2rem',
            filter: active ? 'none' : 'grayscale(1)',
            transition: 'all 0.2s'
        }}>{icon}</span>
        {label}
    </div>
);

export default ProfileTabs;
