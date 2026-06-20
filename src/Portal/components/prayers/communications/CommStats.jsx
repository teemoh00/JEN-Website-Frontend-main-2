import React, { useState, useEffect } from 'react';
import api from '../../../../api/axios';

const StatCard = ({ label, value, description, icon, color = 'var(--primary)' }) => (
    <div style={{
        background: 'var(--surface-1)',
        borderRadius: '1rem',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid var(--border-color)'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase'
            }}>
                {label}
            </span>
            <div style={{
                width: '40px', height: '40px',
                borderRadius: '50%',
                background: color === 'var(--primary)' ? 'rgba(34, 193, 230, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: color,
                fontSize: '1.2rem'
            }}>
                {icon}
            </div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-color)' }}>
            {value}
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            {description}
        </div>
    </div>
);

const CommStats = ({ refreshTrigger }) => {
    const [stats, setStats] = useState({
        total_communications: 0,
        sms_sent: 0,
        emails_sent: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('prayers/communications/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching comm stats", error);
            }
        };
        fetchStats();
    }, [refreshTrigger]);
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
        }}>
            <StatCard
                label="Alerts Sent (All Time)"
                value={stats.total_communications.toLocaleString()}
                description={`${stats.sms_sent} SMS / ${stats.emails_sent} Emails`}
                icon="📢"
            />
            <StatCard
                label="Active Intercessors"
                value="856"
                description="Dummy stat for layout"
                icon="👥"
                color="#22c55e"
            />
            <StatCard
                label="SMS Balance"
                value="4,500"
                description="Credits remaining"
                icon="💳"
            />
            <StatCard
                label="Avg. Open Rate"
                value="98%"
                description="For push notifications"
                icon="📈"
                color="#22c55e"
            />
        </div>
    );
};

export default CommStats;
