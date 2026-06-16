import React, { useState } from 'react';
import CreateSessionModal from '../components/meetings/CreateSessionModal';

const mockScheduleData = [
    { id: 1, start: '6:00 PM', end: '7:00 PM', type: 'MEAL', typeColor: '#f59e0b', duration: '60 min', title: 'Supper and Refreshing', speaker: null, location: 'Dining Hall', description: 'Attendees to take time to have supper and refresh from travelling' },
    { id: 2, start: '6:00 PM', end: '6:00 PM', type: 'OTHER', typeColor: '#9ca3af', duration: '0 min', title: 'Arrival', speaker: null, location: 'Institution', description: 'Reggistration and setting up of the event' },
    { id: 3, start: '7:00 PM', end: '7:20 PM', type: 'OTHER', typeColor: '#9ca3af', duration: '20 min', title: 'Official Welcoming Statement', speaker: 'Moderator', location: 'Main Auditorium', description: 'An official Welcoming message to the members' },
    { id: 4, start: '7:20 PM', end: '8:00 PM', type: 'PRAYER', typeColor: '#22c55e', duration: '40 min', title: 'Prayer Session', speaker: 'Prayer Moderator', location: 'Main Auditorium', description: 'First Prayer Session' },
    { id: 5, start: '8:00 PM', end: '10:00 PM', type: 'TEACHING', typeColor: '#3b82f6', duration: '120 min', title: 'Opening Session', speaker: 'Pastor Benjamin Kimani', location: 'Main Auditorium', description: 'First session that will serve as the anchor of the leadership training.' }
];

const EventSchedule = () => {
    const [selectedEvent, setSelectedEvent] = useState('1');
    const [activeTab, setActiveTab] = useState('Day 1');
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: '#ffffff' }}>Event Schedule</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>Plan and manage your event program — sessions, speakers, and timing.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button onClick={() => setIsModalOpen(true)} style={{ background: '#22c55e', color: '#ffffff', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>+</span> Add Session
                    </button>
                    <button style={{ background: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>📄</span> PDF Report
                    </button>
                    <button style={{ background: '#a855f7', color: '#ffffff', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>📅</span> Timetable
                    </button>
                </div>
            </div>

            {/* Select Event */}
            <div style={{ marginBottom: '3rem' }}>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Select Event</label>
                <div style={{ position: 'relative' }}>
                    <select
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'transparent',
                            border: '1px solid #ffffff',
                            borderRadius: '0.5rem',
                            color: '#ffffff',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            outline: 'none',
                            appearance: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="" style={{ color: '#ffffff', background: '#1a1a24' }}>Select an event...</option>
                        <option value="1" style={{ color: '#ffffff', background: '#1a1a24' }}>LEADERSHIP TRAINING 2026 EDITION — 4/2/2026 (GILGIL)</option>
                        <option value="2" style={{ color: '#ffffff', background: '#1a1a24' }}>YOUTH RETREAT 2026 — 5/15/2026 (NAIROBI)</option>
                    </select>
                    <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#ffffff', fontSize: '0.8rem' }}>▼</span>
                </div>
            </div>

            {selectedEvent ? (
                <>
                    {/* Stats Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📅</div>
                            <div>
                                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', lineHeight: 1 }}>3</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Days</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📋</div>
                            <div>
                                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', lineHeight: 1 }}>17</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Sessions</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🎤</div>
                            <div>
                                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', lineHeight: 1 }}>6</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Speakers</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>⏱️</div>
                            <div>
                                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', lineHeight: 1 }}>16h</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Total Time</div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                        <button
                            onClick={() => setActiveTab('Day 1')}
                            style={{
                                background: activeTab === 'Day 1' ? 'transparent' : 'transparent',
                                border: activeTab === 'Day 1' ? '1px solid #0ea5e9' : '1px solid transparent',
                                color: activeTab === 'Day 1' ? '#ffffff' : 'var(--text-muted)',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            Day 1
                            <span style={{
                                background: activeTab === 'Day 1' ? '#0ea5e9' : 'rgba(255,255,255,0.1)',
                                color: activeTab === 'Day 1' ? '#ffffff' : 'var(--text-muted)',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem'
                            }}>7</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('Day 2')}
                            style={{
                                background: 'transparent',
                                border: activeTab === 'Day 2' ? '1px solid #0ea5e9' : '1px solid transparent',
                                color: activeTab === 'Day 2' ? '#ffffff' : 'var(--text-muted)',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            Day 2
                            <span style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-muted)', borderRadius: '50%', padding: '2px 6px', fontSize: '0.7rem' }}>10</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('Day 3')}
                            style={{
                                background: 'transparent',
                                border: activeTab === 'Day 3' ? '1px solid #0ea5e9' : '1px solid transparent',
                                color: activeTab === 'Day 3' ? '#ffffff' : 'var(--text-muted)',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Day 3
                        </button>
                    </div>

                    {/* Timeline List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingLeft: '1rem' }}>
                        {mockScheduleData.map((session, index) => (
                            <div key={session.id} style={{ display: 'flex', gap: '2rem', position: 'relative' }}>
                                {/* Start Time & Dot */}
                                <div style={{ width: '80px', textAlign: 'right', flexShrink: 0, position: 'relative' }}>
                                    <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.9rem' }}>{session.start}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '0.2rem' }}>{session.end}</div>
                                    {/* Dot indicator */}
                                    <div style={{
                                        position: 'absolute',
                                        right: '-1.3rem',
                                        top: '0.4rem',
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        background: session.typeColor,
                                        zIndex: 2
                                    }}></div>
                                </div>

                                {/* Content Body */}
                                <div style={{ flex: 1, paddingBottom: '1rem' }}>
                                    {/* Type Pill & Duration */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                        <span style={{
                                            background: 'rgba(255,255,255,0.05)',
                                            color: session.typeColor,
                                            padding: '0.15rem 0.5rem',
                                            borderRadius: '0.25rem',
                                            fontSize: '0.65rem',
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            border: `1px solid rgba(255,255,255,0.05)`
                                        }}>
                                            {session.type}
                                        </span>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{session.duration}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>{session.title}</h3>

                                    {/* Speaker & Location */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.75rem' }}>
                                        {session.speaker && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                                <span>🎤</span> {session.speaker}
                                            </div>
                                        )}
                                        {session.location && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                                <span style={{ color: '#ef4444' }}>📍</span> {session.location}
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0, lineHeight: '1.4' }}>{session.description}</p>
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', gap: '0.75rem', paddingRight: '1rem' }}>
                                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}>📝</button>
                                    <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1rem' }}>🗑️</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '4rem', padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📅</div>
                    <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Please select an event to view its schedule.</p>
                </div>
            )}

            {isModalOpen && <CreateSessionModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default EventSchedule;
