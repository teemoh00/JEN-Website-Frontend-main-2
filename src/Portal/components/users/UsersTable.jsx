import React, { useState } from 'react';
import { MOCK_MEMBERS } from '../../../mockData';

const UsersTable = () => {
    const [filterRole, setFilterRole] = useState('All');
    const [users] = useState(MOCK_MEMBERS.map(m => ({
        id: m.id,
        username: m.email,
        email: m.email,
        profile: { full_name: `${m.first_name} ${m.last_name}` },
        is_staff: m.id === 1,
        is_active: true,
        date_joined: m.date_joined,
    })));
    const [loading] = useState(false);
    const [error] = useState(null);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return '#4ade80';
            case 'Inactive': return 'var(--text-muted)';
            case 'Locked': return '#ef4444';
            default: return 'var(--text-color)';
        }
    };

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Table Controls */}
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)', borderRadius: '0.4rem', padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
                    >
                        <option value="All">All Roles</option>
                        <option value="Admin">Admin</option>
                        <option value="Pastor">Pastor</option>
                        <option value="Cell Leader">Cell Leader</option>
                        <option value="Member">Member</option>
                    </select>
                    <button style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-muted)', borderRadius: '0.4rem', padding: '0.4rem 0.8rem', cursor: 'pointer' }}>
                        Filter Status
                    </button>
                </div>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search users..."
                        style={{
                            background: 'var(--surface-2)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-color)',
                            padding: '0.4rem 1rem 0.4rem 2rem',
                            borderRadius: '0.4rem',
                            fontSize: '0.9rem',
                            width: '250px'
                        }}
                    />
                    <span style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', opacity: 0.5 }}>🔍</span>
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', background: 'var(--surface-2)' }}>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>User Info</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Role</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Member Link</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Last Login</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Status</th>
                            <th style={{ textAlign: 'right', padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading users...</td></tr>}
                        {error && <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>{error}</td></tr>}
                        {!loading && !error && users.map(user => (
                            <tr key={user.id} style={{ borderBottom: '1px solid var(--surface-2)', color: 'var(--text-color)' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: '500', color: 'var(--text-color)' }}>{user.profile?.full_name || user.username}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        background: 'var(--border-color)',
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        border: '1px solid var(--border-color)'
                                    }}>
                                        {user.is_staff ? 'Admin' : 'Member'}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {user.profile ? (
                                        <span style={{ color: '#4ade80' }}>✓ Profile Exists</span>
                                    ) : (
                                        <span style={{ color: 'var(--text-muted)' }}>- No Profile</span>
                                    )}
                                </td>
                                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                                    {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'Unknown'}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ color: user.is_active ? '#4ade80' : '#ef4444', fontWeight: '500' }}>
                                        ● {user.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>⋮</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button style={{ background: 'var(--border-color)', border: 'none', color: 'var(--text-color)', padding: '0.3rem 0.8rem', borderRadius: '0.3rem', cursor: 'pointer', fontSize: '0.8rem' }}>Previous</button>
                <button style={{ background: 'var(--border-color)', border: 'none', color: 'var(--text-color)', padding: '0.3rem 0.8rem', borderRadius: '0.3rem', cursor: 'pointer', fontSize: '0.8rem' }}>Next</button>
            </div>
        </div>
    );
};

export default UsersTable;
