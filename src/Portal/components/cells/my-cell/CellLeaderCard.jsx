import React from 'react';

const CellLeaderCard = ({ leader }) => {
    if (!leader || !leader.name) return (
        <div style={{ background: 'var(--surface-1)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid var(--border-color)', height: '100%' }}>
            <h3 style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1.5rem' }}>👤 Leadership</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No leader assigned yet.</p>
        </div>
    );

    const leadership = {
        leader: { name: leader.name, role: 'Cell Leader', location: leader.location || '' },
    };

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            height: '100%'
        }}>
            <h3 style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                👤 Leadership
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Main Leader */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'var(--bg-color)', fontWeight: 'bold' }}>
                        {leadership.leader.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ color: 'var(--text-color)', fontWeight: '600', fontSize: '1rem' }}>{leadership.leader.name}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{leadership.leader.role}</div>
                        {leadership.leader.location && <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.1rem' }}>📍 {leadership.leader.location}</div>}
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic', margin: 0 }}>
                    "Leading with love and service."
                </p>
            </div>
        </div>
    );
};

export default CellLeaderCard;
