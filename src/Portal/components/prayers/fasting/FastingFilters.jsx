import React, { useState, useEffect } from 'react';
import api from '../../../../api/axios';

const FastingFilters = ({ filters, setFilters }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('prayers/fasting/events');
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching fasting events", error);
            }
        };
        fetchEvents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFilters({ eventId: 'all', day: 'all', date: '' });
    };

    return (
        <div className="fasting-filters-container" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            marginBottom: '2rem',
            padding: '1.5rem',
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            border: '1px solid var(--border-color)'
        }}>
            <style>{`
                @media (max-width: 768px) {
                    .fasting-filters-container {
                        padding: 1rem !important;
                        flex-direction: column !important;
                        align-items: stretch !important;
                    }
                    .fasting-input-group {
                        width: 100% !important;
                    }
                    .fasting-input-group select, 
                    .fasting-input-group input {
                        min-width: 100% !important;
                        padding: 0.6rem 0.8rem !important;
                    }
                    .fasting-btn-group {
                        margin-left: 0 !important;
                        width: 100% !important;
                        justify-content: space-between !important;
                    }
                    .fasting-btn-group button {
                        flex: 1 !important;
                        padding: 0.6rem !important;
                        height: 38px !important;
                        font-size: 0.85rem !important;
                    }
                }
            `}</style>
            <div className="fasting-input-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: '500' }}>Filter by Event</label>
                <select 
                    name="eventId"
                    value={filters.eventId}
                    onChange={handleChange}
                    style={{
                        padding: '0.75rem 1rem',
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '0.5rem',
                        color: 'var(--text-color)',
                        minWidth: '200px',
                        outline: 'none',
                        cursor: 'pointer',
                        colorScheme: 'dark'
                    }}>
                    <option value="all">All Events</option>
                    {events.map(event => (
                        <option key={event.id} value={event.id}>{event.title}</option>
                    ))}
                </select>
            </div>

            <div className="fasting-btn-group" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginLeft: 'auto' }}>
                <button 
                    onClick={handleReset}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: 'transparent',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '0.5rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        height: '42px'
                    }}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default FastingFilters;
