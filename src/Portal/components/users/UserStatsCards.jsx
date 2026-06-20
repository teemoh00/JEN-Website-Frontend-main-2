import React, { useState } from 'react';

const StatCard = ({ title, value, icon, color = 'var(--primary)', subtext, loading }) => (
    <div style={{
        background: 'var(--surface-1)',
        borderRadius: '1rem',
        padding: '1.25rem',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    }}>
        <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            background: `rgba(${color === 'var(--primary)' ? '34, 193, 230' : (color === '#4ade80' ? '74, 222, 128' : (color === '#ef4444' ? '239, 68, 68' : '168, 85, 247'))}, 0.1)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: color
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-color)', lineHeight: 1 }}>
                {loading ? '...' : value}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '500', marginTop: '0.2rem' }}>{title}</div>
            {subtext && <div style={{ fontSize: '0.7rem', color: color, marginTop: '2px' }}>{subtext}</div>}
        </div>
    </div>
);

const UserStatsCards = ({ users = [], loading }) => {
    const stats = {
        total_users: users.length,
        active_users: users.length, // Assume all active for now as no inactive flag exists
        signed_in_today: 0, // Not tracked in DB yet
        locked_accounts: 0, // Not tracked in DB yet
        no_role_assigned: users.filter(u => !u.is_staff).length,
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
        }}>
            <StatCard icon="👥" value={stats?.total_users || 0} title="Total Users" color="#22c1e6" loading={loading} />
            <StatCard icon="🟢" value={stats?.active_users || 0} title="Active Users" color="#4ade80" loading={loading} />
            <StatCard icon="🔐" value={stats?.signed_in_today || 0} title="Signed In Today" color="#a855f7" subtext="24h Activity" loading={loading} />
            <StatCard icon="⛔" value={stats?.locked_accounts || 0} title="Locked Accounts" color="#ef4444" subtext="Action Required" loading={loading} />
            <StatCard icon="⚠️" value={stats?.no_role_assigned || 0} title="No Role Assigned" color="#f59e0b" loading={loading} />
        </div>
    );
};

export default UserStatsCards;
