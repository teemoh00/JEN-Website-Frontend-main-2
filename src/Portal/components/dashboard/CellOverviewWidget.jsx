import React from 'react';

const CellOverviewWidget = ({ data, loading }) => {

    if (loading) {
        return (
            <div style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--border-color)',
                borderRadius: '1rem',
                padding: '1.5rem',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)'
            }}>
                Loading Cell Info...
            </div>
        );
    }

    if (!data?.cell_group_name) {
        return (
            <div style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--border-color)',
                borderRadius: '1rem',
                padding: '1.5rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
                <h3 style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>No Cell Group Assigned</h3>
                <p style={{ color: 'var(--text-muted)' }}>You are not currently assigned to a cell group. Please contact the church admin.</p>
            </div>
        );
    }

    return (
        <div style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-color)',
            borderRadius: '1rem',
            padding: '1.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    🏠 My Cell Group
                </h3>
                <button style={{ background: 'rgba(34, 193, 230, 0.1)', color: 'var(--primary)', border: 'none', borderRadius: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                    View Details
                </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ color: 'var(--text-color)', fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                    {data.cell_group_name}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span>Leader:</span>
                    <span style={{ color: 'var(--text-color)', fontWeight: '600' }}>{data.cell_leader_name || 'N/A'}</span>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem'
            }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Members</div>
                    <div style={{ color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: '700' }}>{data.cell_members_count}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Next Gathering</div>
                    <div style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '700' }}>
                        {data.cell_next_meeting ? `${data.cell_next_meeting.date} at ${data.cell_next_meeting.time}` : 'TBD'}
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Engagement Health</div>
                <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '85%', height: '100%', background: 'var(--primary)' }}></div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.25rem' }}>Healthy (85%)</div>
            </div>
        </div>
    );
};

export default CellOverviewWidget;
