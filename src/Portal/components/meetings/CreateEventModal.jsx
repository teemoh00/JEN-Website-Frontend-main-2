import React, { useState } from 'react';

const CreateEventModal = ({ onClose }) => {
    const [isNewEventType, setIsNewEventType] = useState(false);

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: '#1a1a24',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '650px',
                padding: '2.5rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                position: 'relative'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer'
                }}>
                    ✕
                </button>

                <h2 style={{ margin: '0 0 2rem 0', color: '#ffffff', fontSize: '1.4rem', fontWeight: '800' }}>Create New Event</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Row 1: Event Name & Type */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>Event Name</label>
                            <input type="text" placeholder="e.g. Easter Conference" style={{
                                width: '100%', padding: '0 1rem', background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                            }} />
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <label style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', margin: 0 }}>Event Type</label>
                                <span onClick={() => setIsNewEventType(!isNewEventType)} style={{ color: '#0ea5e9', fontSize: '0.7rem', fontWeight: '600', cursor: 'pointer' }}>
                                    {isNewEventType ? 'Cancel' : '+ Add New'}
                                </span>
                            </div>
                            <div style={{ position: 'relative', height: '2.5rem', display: 'flex', alignItems: 'center' }}>
                                {isNewEventType ? (
                                    <input type="text" placeholder="e.g. Workshop" style={{
                                        width: '100%', padding: '0 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#ffffff', outline: 'none', fontSize: '0.9rem', height: '100%', boxSizing: 'border-box'
                                    }} />
                                ) : (
                                    <>
                                        <select style={{
                                            width: '100%', padding: '0 1rem', background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', appearance: 'none', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', height: '100%', boxSizing: 'border-box'
                                        }}>
                                            <option value="Conference" style={{ color: '#ffffff', background: '#1a1a24' }}>Conference</option>
                                            <option value="Retreat" style={{ color: '#ffffff', background: '#1a1a24' }}>Retreat</option>
                                            <option value="Seminar" style={{ color: '#ffffff', background: '#1a1a24' }}>Seminar</option>
                                        </select>
                                        <span style={{ position: 'absolute', right: '1rem', pointerEvents: 'none', color: '#ffffff', fontSize: '0.8rem' }}>▼</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Dates */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>Start Date & Time</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <input type="date" style={{
                                        width: '100%', padding: '0 1rem', background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box', fontFamily: 'monospace', fontWeight: '700'
                                    }} />
                                </div>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <input type="time" style={{
                                        width: '100%', padding: '0 1rem', background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box', fontFamily: 'monospace', fontWeight: '700'
                                    }} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>End Date & Time</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <input type="date" style={{
                                        width: '100%', padding: '0 1rem', background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box', fontFamily: 'monospace', fontWeight: '700'
                                    }} />
                                </div>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <input type="time" style={{
                                        width: '100%', padding: '0 1rem', background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box', fontFamily: 'monospace', fontWeight: '700'
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Venue */}
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>Venue / Location</label>
                        <input type="text" placeholder="e.g. Main Auditorium" style={{
                            width: '100%', padding: '0 1rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                        }} />
                    </div>

                    {/* Row 4: Description */}
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>Description</label>
                        <textarea placeholder="Event details..." rows="3" style={{
                            width: '100%', padding: '0 1rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', outline: 'none', fontSize: '0.9rem', resize: 'vertical', fontFamily: 'monospace', boxSizing: 'border-box'
                        }}></textarea>
                    </div>

                    {/* Row 5: Attendees & Fee */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>Target Attendees</label>
                            <input type="text" placeholder="e.g. 100" style={{
                                width: '100%', padding: '0 1rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                            }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>Facilitation Fee</label>
                            <input type="text" placeholder="0.00" style={{
                                width: '100%', padding: '0 1rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                            }} />
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.5rem', marginTop: '1rem' }}>
                        <button onClick={onClose} style={{
                            background: 'transparent', border: 'none', color: '#ffffff', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer'
                        }}>
                            Cancel
                        </button>
                        <button onClick={onClose} style={{
                            background: '#22c1e6', color: '#ffffff', border: 'none', borderRadius: '0.5rem', padding: '0.8rem 1.5rem', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 15px rgba(34, 193, 230, 0.4)'
                        }}>
                            Publish Event
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEventModal;
