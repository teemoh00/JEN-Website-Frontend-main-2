import React, { useState, useEffect } from 'react';
import api from '../../../../api/axios';

const FastingEventsTable = ({ refreshTrigger }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('prayers/fasting/events');
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching fasting events", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [refreshTrigger]);

    const handleCopyLink = (id) => {
        const link = `${window.location.origin}/fasting-event/${id}/register`;
        navigator.clipboard.writeText(link);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const headerStyle = {
        padding: '1rem 1.5rem',
        textAlign: 'left',
        color: 'var(--text-muted)',
        fontWeight: '600',
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    };

    const cellStyle = {
        padding: '1rem 1.5rem',
        color: 'var(--text-color)',
        fontSize: '0.9rem',
        verticalAlign: 'middle'
    };

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1.5rem',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            marginBottom: '2rem'
        }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '1.25rem' }}>Active Fasting Events</h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border-color)' }}>
                            <th style={headerStyle}>ID</th>
                            <th style={headerStyle}>Title</th>
                            <th style={headerStyle}>Start Date</th>
                            <th style={headerStyle}>End Date</th>
                            <th style={headerStyle}>Description</th>
                            <th style={headerStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading...</td></tr>
                        ) : events.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No events found</td></tr>
                        ) : events.map(event => (
                            <tr key={event.id} style={{ borderBottom: '1px solid var(--border-color)' }} className="table-row-hover">
                                <td style={cellStyle}>{event.id}</td>
                                <td style={{ ...cellStyle, fontWeight: '600' }}>{event.title}</td>
                                <td style={cellStyle}>{event.start_date}</td>
                                <td style={cellStyle}>{event.end_date}</td>
                                <td style={{ ...cellStyle, color: 'var(--text-muted)' }}>
                                    {event.description?.length > 40 ? event.description.substring(0, 40) + '...' : event.description}
                                </td>
                                <td style={cellStyle}>
                                    <button 
                                        onClick={() => handleCopyLink(event.id)}
                                        style={{
                                            background: copiedId === event.id ? 'rgba(34, 193, 100, 0.1)' : 'rgba(34, 193, 230, 0.1)',
                                            color: copiedId === event.id ? '#22c55e' : 'var(--primary)',
                                            border: 'none',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '0.25rem',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            fontSize: '0.75rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.4rem',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <span>🔗</span>
                                        {copiedId === event.id ? 'Copied!' : 'Copy Share Link'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FastingEventsTable;
