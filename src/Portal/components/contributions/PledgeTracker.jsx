import React from 'react';

const PledgeTracker = ({ pledges }) => {
    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1.25rem',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            height: '100%'
        }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--text-color)', marginBottom: '1.5rem' }}>
                Active Commitments
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {pledges.map(pledge => {
                    const percentage = Math.min(100, Math.round((pledge.current / pledge.target) * 100));

                    return (
                        <div key={pledge.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'flex-end' }}>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-color)' }}>{pledge.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Deadline: {new Date(pledge.deadline).toLocaleDateString()}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-color)' }}>{percentage}%</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>KES {pledge.current.toLocaleString()} / {pledge.target.toLocaleString()}</div>
                                </div>
                            </div>

                            {/* Progress Bar Container */}
                            <div style={{
                                height: '8px',
                                background: 'var(--surface-2)',
                                borderRadius: '4px',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: `${percentage}%`,
                                    height: '100%',
                                    background: pledge.color,
                                    borderRadius: '4px',
                                    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                                }} />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{
                marginTop: '2rem',
                padding: '1.25rem',
                background: 'rgba(var(--primary-rgb), 0.05)',
                borderRadius: '1rem',
                border: '1px dashed var(--primary)'
            }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '0.25rem' }}>
                    Total Remaining Balance
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-color)' }}>
                    KES {(pledges.reduce((acc, p) => acc + (p.target - p.current), 0)).toLocaleString()}
                </div>
            </div>
        </div>
    );
};

export default PledgeTracker;
