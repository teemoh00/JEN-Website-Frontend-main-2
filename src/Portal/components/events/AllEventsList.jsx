import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';

const AllEventsList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const res = await axios.get('events');
            setEvents(Array.isArray(res.data) ? res.data : (res.data.results || []));
            setError('');
        } catch (err) {
            console.error('Error fetching events:', err);
            setError('Failed to load events. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Loading events...</div>;
    }

    if (error) {
        return <div style={{ color: '#ef4444', textAlign: 'center', padding: '2rem' }}>{error}</div>;
    }

    if (events.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--surface-1)', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
                <h3 style={{ color: 'var(--text-color)', margin: '0 0 0.5rem 0' }}>No Events Found</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>Create your first event to see it here.</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {events.map((event) => (
                <div key={event.id} style={{
                    background: 'var(--surface-1)',
                    borderRadius: '1rem',
                    border: '1px solid var(--border-color)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    transition: 'transform 0.2s',
                    cursor: 'pointer'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <span style={{ 
                                display: 'inline-block', 
                                padding: '0.25rem 0.75rem', 
                                background: 'rgba(34, 193, 230, 0.1)', 
                                color: 'var(--primary)', 
                                borderRadius: '2rem', 
                                fontSize: '0.75rem', 
                                fontWeight: '700', 
                                marginBottom: '0.75rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                {event.type}
                            </span>
                            <h3 style={{ color: 'var(--text-color)', margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '800' }}>{event.name}</h3>
                            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>{event.description || 'No description provided.'}</p>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                            <div>
                                <div style={{ color: 'var(--text-color)', fontSize: '1.1rem', fontWeight: '700' }}>
                                    {new Date(event.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                    {event.start_time.substring(0, 5)} - {event.end_time.substring(0, 5)}
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const link = `${window.location.origin}${event.portal_link}`;
                                    navigator.clipboard.writeText(link);
                                    alert('Link copied to clipboard!');
                                }}
                                style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    color: 'var(--text-color)',
                                    border: 'none',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem'
                                }}
                            >
                                🔗 Share Link
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <span style={{ fontSize: '1.1rem' }}>📍</span>
                            <span>{event.venue}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <span style={{ fontSize: '1.1rem' }}>👥</span>
                            <span>Target: {event.target_attendees || 'Unlimited'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <span style={{ fontSize: '1.1rem' }}>💰</span>
                            <span>Fee: {event.facilitation_fee > 0 ? `KSH ${parseFloat(event.facilitation_fee).toLocaleString()}` : 'Free'}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllEventsList;
