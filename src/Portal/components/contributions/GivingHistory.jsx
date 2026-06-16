import React from 'react';

const GivingHistory = ({ records }) => {
    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1.25rem',
            border: '1px solid var(--border-color)',
            overflow: 'hidden'
        }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--text-color)' }}>
                    Giving History
                </h3>
                <button style={{
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)',
                    padding: '0.4rem 0.875rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                }}>
                    Download Statement
                </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'rgba(var(--primary-rgb), 0.02)' }}>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700' }}>Date</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700' }}>Category</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700' }}>Method</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', textAlign: 'right' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, idx) => (
                            <tr key={record.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                                <td style={{ padding: '1.25rem 1.5rem' }}>
                                    <div style={{ color: 'var(--text-color)', fontWeight: '600', fontSize: '0.9rem' }}>
                                        {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </td>
                                <td style={{ padding: '1.25rem 1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '1rem',
                                        fontSize: '0.75rem',
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        color: '#3b82f6',
                                        fontWeight: '600'
                                    }}>
                                        {record.category}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                    {record.method}
                                </td>
                                <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                    <div style={{ color: 'var(--text-color)', fontWeight: '700', fontSize: '1rem' }}>
                                        KES {record.amount.toLocaleString()}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ padding: '1rem', textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
                <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>
                    View All Activity
                </button>
            </div>
        </div>
    );
};

export default GivingHistory;
