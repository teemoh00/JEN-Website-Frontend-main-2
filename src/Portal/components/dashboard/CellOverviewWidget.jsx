import React from 'react';

const CellOverviewWidget = ({ data, loading }) => {
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
            <h3 style={{ color: 'var(--text-color)', fontSize: '1.1rem', fontWeight: '700', margin: '0 0 1.5rem 0' }}>
                My Cell Group
            </h3>
            
            {!data?.cell_group_name ? (
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem', background: 'var(--surface-2)', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                        🏘️
                    </div>
                    <h4 style={{ color: 'var(--text-color)', margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '700' }}>No Cell Assigned</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>You haven't been assigned to a cell group yet.</p>
                </div>
            ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                        <div style={{ background: 'var(--surface-2)', padding: '1rem', borderRadius: '0.75rem' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Members</div>
                            <div style={{ color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: '700' }}>{data.cell_members_count}</div>
                        </div>
                        <div style={{ background: 'var(--surface-2)', padding: '1rem', borderRadius: '0.75rem' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Next Gathering</div>
                            <div style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '700' }}>
                                {data.cell_next_meeting ? `${data.cell_next_meeting.date} at ${data.cell_next_meeting.time}` : 'TBD'}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Engagement Health</div>
                        <div style={{ height: '6px', background: 'var(--surface-2)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: '85%', height: '100%', background: 'var(--primary)' }}></div>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.25rem' }}>Healthy (85%)</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CellOverviewWidget;
