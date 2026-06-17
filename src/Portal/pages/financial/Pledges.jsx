import React, { useState } from 'react';
import MakePledgeModal from '../../components/contributions/MakePledgeModal';

const Pledges = () => {
    const [showMakePledge, setShowMakePledge] = useState(false);

    const pledgesData = [
        { id: 1, date: '2026-06-03', name: 'Stephen Njiu', purpose: 'Partner Contribution', pledged: 'KES 200,000', redeemed: 'KES 0', progress: '0%', status: 'Pending' },
        { id: 2, date: '2026-06-03', name: 'Timothy Mutisya', purpose: 'Partner Contribution', pledged: 'KES 10,000', redeemed: 'KES 0', progress: '0%', status: 'Pending' },
        { id: 3, date: '2026-05-29', name: 'Kuria Teresiah Wanjiru', purpose: 'Partner Contribution', pledged: 'KES 500', redeemed: 'KES 0', progress: '0%', status: 'Pending' },
        { id: 4, date: '2026-05-18', name: 'Paul Muyu', purpose: 'Partner Contribution', pledged: 'KES 5,000', redeemed: 'KES 0', progress: '0%', status: 'Pending' },
        { id: 5, date: '2026-05-18', name: 'John Ngugi', purpose: 'Partner Contribution', pledged: 'KES 35,000', redeemed: 'KES 0', progress: '0%', status: 'Pending' },
        { id: 6, date: '2026-04-30', name: 'James Kiarie', purpose: 'Partner Contribution', pledged: 'KES 5,000', redeemed: 'KES 0', progress: '0%', status: 'Pending' },
        { id: 7, date: '2026-04-29', name: 'Miriam Nkirote', purpose: 'Partner Contribution', pledged: 'KES 25,000', redeemed: 'KES 0', progress: '0%', status: 'Pending' },
        { id: 8, date: '2026-04-27', name: 'Joy Ngugi', purpose: 'Partner Contribution', pledged: 'KES 35,000', redeemed: 'KES 0', progress: '0%', status: 'Pending' },
        { id: 9, date: '2026-04-27', name: 'VICTOR MUTINDA', purpose: 'Partner Contribution', pledged: 'KES 10,000', redeemed: 'KES 0', progress: '0%', status: 'Pending' },
    ];

    const StatBlock = ({ label, value, color }) => (
        <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: '600' }}>
                {label}
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: color }}>
                {value}
            </div>
        </div>
    );

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '3rem' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    Pledges
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                    View and manage member pledges and redemption progress.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
                <StatBlock label="TOTAL PLEDGED" value="KES 575,300" color="white" />
                <StatBlock label="TOTAL REDEEMED" value="KES 81,500" color="#22c55e" />
                <StatBlock label="REMAINING BALANCE" value="KES 493,800" color="#ef4444" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <input 
                        type="text" 
                        placeholder="Search pledges..." 
                        style={{
                            padding: '0.5rem',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-color)',
                            outline: 'none',
                            fontSize: '0.85rem',
                            minWidth: '150px'
                        }}
                    />
                    
                    <select style={{
                        padding: '0.5rem',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-color)',
                        outline: 'none',
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                    }}>
                        <option value="all" style={{ background: 'var(--surface-2)' }}>All Statuses</option>
                        <option value="pending" style={{ background: 'var(--surface-2)' }}>Pending</option>
                        <option value="redeemed" style={{ background: 'var(--surface-2)' }}>Redeemed</option>
                    </select>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <input type="date" style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', outline: 'none', colorScheme: 'dark' }} />
                        <span>-</span>
                        <input type="date" style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', outline: 'none', colorScheme: 'dark' }} />
                    </div>
                </div>

                <button 
                    onClick={() => setShowMakePledge(true)}
                    style={{
                        padding: '0.6rem 1.2rem',
                        borderRadius: '0.4rem',
                        border: 'none',
                        background: 'var(--primary)',
                        color: 'var(--text-color)',
                        fontWeight: '700',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    + Make Pledge
                </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '1rem 0', fontWeight: '600' }}>Date</th>
                            <th style={{ padding: '1rem 0', fontWeight: '600' }}>Name</th>
                            <th style={{ padding: '1rem 0', fontWeight: '600' }}>Purpose</th>
                            <th style={{ padding: '1rem 0', fontWeight: '600' }}>Pledged</th>
                            <th style={{ padding: '1rem 0', fontWeight: '600' }}>Redeemed</th>
                            <th style={{ padding: '1rem 0', fontWeight: '600' }}>Progress</th>
                            <th style={{ padding: '1rem 0', fontWeight: '600' }}>Status</th>
                            <th style={{ padding: '1rem 0', fontWeight: '600' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pledgesData.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                                <td style={{ padding: '1.25rem 0', color: 'var(--text-muted)' }}>{p.date}</td>
                                <td style={{ padding: '1.25rem 0', color: 'var(--text-color)', fontWeight: '700' }}>{p.name}</td>
                                <td style={{ padding: '1.25rem 0', color: '#60a5fa' }}>{p.purpose}</td>
                                <td style={{ padding: '1.25rem 0', color: 'var(--text-color)', fontWeight: '700' }}>{p.pledged}</td>
                                <td style={{ padding: '1.25rem 0', color: '#22c55e', fontWeight: '700' }}>{p.redeemed}</td>
                                <td style={{ padding: '1.25rem 0', color: 'var(--text-muted)' }}>{p.progress}</td>
                                <td style={{ padding: '1.25rem 0' }}>
                                    <span style={{
                                        padding: '0.25rem 0.6rem',
                                        background: 'rgba(239, 68, 68, 0.15)',
                                        color: '#ef4444',
                                        borderRadius: '0.2rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        {p.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem 0' }}>
                                    <button style={{
                                        background: 'rgba(34, 197, 94, 0.15)',
                                        color: '#22c55e',
                                        border: 'none',
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: '0.25rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        cursor: 'pointer'
                                    }}>
                                        Redeem
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showMakePledge && <MakePledgeModal onClose={() => setShowMakePledge(false)} />}
        </div>
    );
};

export default Pledges;
