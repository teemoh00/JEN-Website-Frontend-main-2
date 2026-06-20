import React, { useState, useEffect } from 'react';
import api from '../../../../api/axios';

const StatCard = ({ label, value, description, icon }) => (
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
            {icon && <span style={{ fontSize: '1.25rem', opacity: 0.8 }}>{icon}</span>}
        </div>
        <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-color)' }}>
            {value}
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            {description}
        </div>
    </div>
);

const FastingStatsCards = ({ refreshTrigger }) => {
    const [stats, setStats] = useState({
        total_commitments: 0,
        unique_participants: 0,
        today_commitments: 0,
        most_popular_day: 'N/A'
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('prayers/fasting/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching fasting stats", error);
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
                label="Total Commitments"
                value={stats.total_commitments}
                description="Total prayer commitments"
                icon="🔥"
            />
            <StatCard
                label="Unique Participants"
                value={stats.unique_participants}
                description="Distinct participants"
                icon="👥"
            />
            <StatCard
                label="Most Popular Day"
                value={stats.most_popular_day}
                description="Most selected fasting day"
                icon="📅"
            />
            <StatCard
                label="Today's Commitments"
                value={stats.today_commitments}
                description="Commitments submitted today"
                icon="⚡"
            />
        </div>
    );
};

export default FastingStatsCards;
