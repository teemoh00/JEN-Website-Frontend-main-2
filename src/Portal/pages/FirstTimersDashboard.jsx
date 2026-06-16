import React, { useState } from 'react';

const FirstTimersDashboard = () => {
    const [guests] = useState([
        { id: 1, name: 'Alice Johnson', date: '2026-06-14', phone: '+254700000001', status: 'New', assignedTo: 'Unassigned' },
        { id: 2, name: 'Bob Smith', date: '2026-06-07', phone: '+254700000002', status: 'Contacted', assignedTo: 'John Doe' },
        { id: 3, name: 'Charlie Brown', date: '2026-05-30', phone: '+254700000003', status: 'Integrated', assignedTo: 'Jane Smith' },
    ]);

    const getStatusColor = (status) => {
        if (status === 'New') return '#ef4444'; // Red
        if (status === 'Contacted') return '#eab308'; // Yellow
        if (status === 'Integrated') return '#22c1e6'; // Cyan
        return 'var(--text-muted)';
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>First Timers & Guests</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Track new visitors, capture their details, and assign them for follow-up.</p>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {/* Stats */}
                <div style={{ flex: 1, minWidth: '200px', background: 'var(--surface-1)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>New Guests (This Month)</div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-color)' }}>24</div>
                </div>
                <div style={{ flex: 1, minWidth: '200px', background: 'var(--surface-1)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Pending Follow-up</div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#ef4444' }}>8</div>
                </div>
                <div style={{ flex: 1, minWidth: '200px', background: 'var(--surface-1)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Integration Rate</div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#22c1e6' }}>65%</div>
                </div>
            </div>

            <div style={{ background: 'var(--surface-1)', borderRadius: '1rem', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-color)' }}>Guest Roster</h3>
                    <button style={{ background: 'var(--primary)', color: 'var(--bg-color)', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer' }}>+ Add Guest</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'var(--surface-2)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Name</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Date Visited</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Contact</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Status</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Assigned To</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guests.map(guest => (
                                <tr key={guest.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-color)', fontWeight: '500' }}>{guest.name}</td>
                                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{guest.date}</td>
                                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{guest.phone}</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <span style={{
                                            background: `${getStatusColor(guest.status)}20`,
                                            color: getStatusColor(guest.status),
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.75rem',
                                            fontWeight: '600'
                                        }}>
                                            {guest.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{guest.assignedTo}</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <button style={{ background: 'transparent', color: 'var(--primary)', border: '1px solid var(--border-color)', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', cursor: 'pointer', fontSize: '0.8rem' }}>Log Contact</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FirstTimersDashboard;
