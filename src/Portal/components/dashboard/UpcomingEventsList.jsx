import React from 'react';

const UpcomingEventsList = ({ events, loading }) => {
    const upcomingEvents = events || [];

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            height: '100%'
        }}>
            <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
                📅 Upcoming Events
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {loading ? (
                    <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>Loading events...</div>
                ) : upcomingEvents.length === 0 ? (
                    <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>No upcoming events.</div>
                ) : (
                    upcomingEvents.map((event, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '0.75rem',
                            borderLeft: '3px solid #22c1e6'
                        }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ color: 'var(--text-color)', fontWeight: '600', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                                    {event.title}
                                </div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span>{event.date}</span>
                                    <span style={{ width: '4px', height: '4px', background: 'var(--text-muted)', borderRadius: '50%' }}></span>
                                    <span>{event.location}</span>
                                </div>
                            </div>
                            <div style={{ marginLeft: '1rem' }}>
                                <span style={{
                                    background: 'rgba(34, 193, 230, 0.1)',
                                    color: 'var(--primary)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '1rem',
                                    fontSize: '0.7rem',
                                    fontWeight: '600',
                                    textTransform: 'uppercase'
                                }}>
                                    {event.type}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UpcomingEventsList;
