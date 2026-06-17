import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';

const StatCard = ({ icon, value, label, subtext, color = 'var(--primary)', loading }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.2rem',
        background: 'transparent'
    }}>
        <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'var(--surface-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
            {icon}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: '1.1' }}>{loading ? '...' : value}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: '500' }}>{label}</div>
            {subtext && <div style={{ color: color, fontSize: '0.75rem', fontWeight: '600' }}>{subtext}</div>}
        </div>
    </div>
);

const CellStatsCards = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('church/cells/stats/');
                setStats(response.data);
            } catch (err) {
                console.error('Error fetching cell stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statConfig = [
        { icon: '🏘️', value: stats?.total_cells || '0', label: 'Total Cells', color: 'var(--text-color)' },
        { icon: '✅', value: stats?.active_cells || '0', label: 'Active Cells', subtext: '0% operational', color: '#22d3ee' },
        { icon: '👥', value: stats?.total_members || '0', label: 'Total Members', subtext: 'Avg. 0 per cell', color: '#fef08a' },
        { icon: '⚠️', value: stats?.needs_attention || '0', label: 'Needs Attention', subtext: 'Low membership', color: '#f59e0b' },
    ];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
        }}>
            {statConfig.map((stat, index) => (
                <StatCard key={index} {...stat} loading={loading} />
            ))}
        </div>
    );
};

export default CellStatsCards;
