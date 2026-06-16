import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';

const StatCard = ({ icon, value, label, subtext, color = 'var(--primary)', loading }) => (
    <div style={{
        background: 'var(--surface-1)',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem'
    }}>
        <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            background: `rgba(${color === 'var(--primary)' ? '34, 193, 230' : (color === '#ef4444' ? '239, 68, 68' : (color === '#f59e0b' ? '245, 158, 11' : (color === 'var(--secondary)' ? '255, 144, 102' : '34, 193, 230')))}, 0.1)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            color: color
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-color)', lineHeight: 1 }}>{loading ? '...' : value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500', marginTop: '0.25rem' }}>{label}</div>
            {subtext && <div style={{ color: color, fontSize: '0.75rem', marginTop: '0.2rem' }}>{subtext}</div>}
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
        { icon: '🏘️', value: stats?.total_cells || '0', label: 'Total Cells', subtext: 'In database', color: 'var(--text-color)' },
        { icon: '✅', value: stats?.active_cells || '0', label: 'Active Cells', subtext: 'With members', color: 'var(--primary)' },
        { icon: '👥', value: stats?.total_members || '0', label: 'Total Members', subtext: 'Across all cells', color: 'var(--secondary)' },
        { icon: '⚠️', value: stats?.needs_attention || '0', label: 'Needs Attention', subtext: 'Low attendance', color: '#f59e0b' },
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
