import React, { useState, useEffect } from 'react';
import api from '../../../../api/axios';

const MessageHistory = ({ refreshTrigger }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.get('prayers/communications');
                const mapped = response.data.map(item => ({
                    id: item.id,
                    date: new Date(item.created_at).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
                    type: item.type,
                    subject: item.subject || item.body, // Fallback to body if no subject
                    recipient: item.recipient_group,
                    status: item.status
                }));
                setLogs(mapped);
            } catch (err) {
                console.error("Failed to load messages", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, [refreshTrigger]);

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1.5rem',
            border: '1px solid var(--border-color)',
            padding: '2rem',
            height: '100%'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>📜</span>
                    Recent Activity
                </h3>
                <button style={{ color: 'var(--primary)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>
                    View All
                </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-color)' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                            <th style={headerStyle}>Type</th>
                            <th style={headerStyle}>Subject / Preview</th>
                            <th style={headerStyle}>Audience</th>
                            <th style={headerStyle}>Date</th>
                            <th style={headerStyle}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading...</td></tr>
                        ) : logs.length === 0 ? (
                            <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No messages found</td></tr>
                        ) : logs.map(log => (
                            <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={cellStyle}>
                                    <span style={{
                                        fontSize: '0.75rem', fontWeight: '700', padding: '0.25rem 0.5rem', borderRadius: '0.25rem',
                                        background: 'var(--surface-2)', color: 'var(--text-muted)', textTransform: 'uppercase'
                                    }}>
                                        {log.type}
                                    </span>
                                </td>
                                <td style={{ ...cellStyle, fontWeight: '500', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {log.subject}
                                </td>
                                <td style={{ ...cellStyle, color: 'var(--text-muted)', textTransform: 'capitalize' }}>{log.recipient}</td>
                                <td style={{ ...cellStyle, color: 'var(--text-muted)', fontSize: '0.8rem' }}>{log.date}</td>
                                <td style={cellStyle}>
                                    <StatusBadge status={log.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    let color = 'var(--text-muted)';
    let bg = 'rgba(148, 163, 184, 0.1)';

    if (status === 'Sent') {
        color = '#22c55e';
        bg = 'rgba(34, 197, 94, 0.1)';
    } else if (status === 'Failed') {
        color = '#ef4444';
        bg = 'rgba(239, 68, 68, 0.1)';
    } else if (status === 'Pending') {
        color = '#f59e0b';
        bg = 'rgba(245, 158, 11, 0.1)';
    }

    return (
        <span style={{
            color, background: bg,
            padding: '0.25rem 0.5rem', borderRadius: '1rem',
            fontSize: '0.75rem', fontWeight: '600'
        }}>
            {status}
        </span>
    );
};

const headerStyle = {
    padding: '1rem 0.5rem',
    color: 'var(--text-muted)',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase'
};

const cellStyle = {
    padding: '1rem 0.5rem',
    fontSize: '0.875rem'
};

export default MessageHistory;
