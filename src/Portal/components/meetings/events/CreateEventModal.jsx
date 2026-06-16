import React, { useState, useContext, useEffect } from 'react';
import axios from '../../../../api/axios';
import { EventContext } from '../../../../context/EventContext';

const CreateEventModal = ({ onClose }) => {
    const { addEvent } = useContext(EventContext);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        date: '',
        time: '',
        endDate: '',
        endTime: '',
        location: '',
        description: '',
        rsvpRequired: false,
        registrationFee: 0,
        trackingAttendance: true,
        onlineLink: ''
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [rsvpLink, setRsvpLink] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [categories, setCategories] = useState([]);
    const [showCopiedAlert, setShowCopiedAlert] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('meetings/categories/');
                const cats = Array.isArray(res.data) ? res.data : (res.data.results || []);
                setCategories(cats);
                if (cats.length > 0) {
                    setFormData(prev => ({ ...prev, category: cats[0].id }));
                }
            } catch (err) {
                console.error('Error loading categories:', err);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                name: formData.name,
                category: formData.category,
                date: formData.date,
                time: formData.time,
                end_date: formData.endDate || null,
                end_time: formData.endTime || null,
                location: formData.location,
                description: formData.description,
                rsvp_required: formData.rsvpRequired,
                registration_fee: formData.registrationFee || 0,
                tracking_attendance: formData.trackingAttendance,
                online_link: formData.onlineLink || null,
                status: 'Upcoming'
            };
            const response = await axios.post('events/events/', payload);
            setSuccessMessage(`Event "${response.data.name}" created successfully!`);

            // Create a registration link if RSVP is required
            if (response.data.rsvp_required) {
                const registrationUrl = `${window.location.origin}/events/${response.data.slug}/register`;
                setRsvpLink(registrationUrl);
            }

            // Wait a bit before closing or just let the user see the link
            if (!response.data.rsvp_required) {
                setTimeout(() => onClose(), 2000);
            }
        } catch (err) {
            console.error('Error creating event:', err);
            setError('Failed to create event. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        background: 'var(--bg-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '0.5rem',
        color: 'var(--text-color)',
        fontSize: '0.9rem',
        marginTop: '0.4rem'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        fontWeight: '500'
    };

    const checkboxStyle = {
        accentColor: 'var(--primary)',
        width: '1.2rem',
        height: '1.2rem',
        cursor: 'pointer'
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100
        }}>
            <div style={{
                background: 'var(--surface-1)',
                padding: '2rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '650px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-color)', margin: 0 }}>Create New Event</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>

                    {/* Basic Info */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Event Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Easter Conference" style={inputStyle} required />
                        </div>
                        <div>
                            <label style={labelStyle}>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle} required>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Start Date & Time</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} required />
                                <input type="time" name="time" value={formData.time} onChange={handleChange} style={inputStyle} required />
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>End Date & Time</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} style={inputStyle} required />
                                <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} style={inputStyle} required />
                            </div>
                        </div>
                    </div>

                    {/* Venue */}
                    <div>
                        <label style={labelStyle}>Venue / Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Main Auditorium" style={inputStyle} required />
                    </div>

                    {/* Description */}
                    <div>
                        <label style={labelStyle}>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Event details..." style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
                    </div>

                    {/* Advanced Options */}
                    <div style={{ background: 'var(--surface-2)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                        <div style={{ color: 'var(--text-color)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Settings</div>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <input type="checkbox" name="rsvpRequired" checked={formData.rsvpRequired} onChange={handleChange} style={checkboxStyle} />
                                RSVP Required
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <input type="checkbox" name="trackingAttendance" checked={formData.trackingAttendance} onChange={handleChange} style={checkboxStyle} />
                                Track Attendance
                            </label>
                        </div>

                        <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', alignItems: 'end' }}>
                            <div>
                                <label style={labelStyle}>Reg. Fee (0 for free)</label>
                                <input type="number" name="registrationFee" value={formData.registrationFee} onChange={handleChange} style={inputStyle} min="0" step="0.01" />
                            </div>
                            <div>
                                <label style={labelStyle}>Online Link (Optional)</label>
                                <input type="url" name="onlineLink" value={formData.onlineLink} onChange={handleChange} placeholder="https://..." style={inputStyle} />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        {error && <div style={{ color: '#ff4444', fontSize: '0.85rem', alignSelf: 'center' }}>{error}</div>}
                        {loading ? (
                            <div style={{ color: 'var(--primary)', fontWeight: '600' }}>Creating Event...</div>
                        ) : (
                            <>
                                <button type="button" onClick={onClose} style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border-color)',
                                    background: 'transparent',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer'
                                }}>Cancel</button>
                                <button type="submit" style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    border: 'none',
                                    background: 'var(--primary)',
                                    color: 'var(--bg-color)',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}>Publish Event</button>
                            </>
                        )}
                    </div>

                    {successMessage && (
                        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', borderRadius: '0.5rem', border: '1px solid #4ade80' }}>
                            <div style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '0.5rem' }}>{successMessage}</div>
                            {rsvpLink && (
                                <div style={{ background: 'var(--bg-color)', padding: '0.75rem', borderRadius: '0.4rem', marginTop: '0.5rem' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Registration Link:</div>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', position: 'relative' }}>
                                        <code style={{ fontSize: '0.8rem', color: 'var(--primary)', wordBreak: 'break-all' }}>{rsvpLink}</code>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                navigator.clipboard.writeText(rsvpLink);
                                                setCopied(true);
                                                setShowCopiedAlert(true);
                                                setTimeout(() => {
                                                    setCopied(false);
                                                    setShowCopiedAlert(false);
                                                }, 2000);
                                            }}
                                            style={{ background: 'var(--surface-2)', border: 'none', color: 'var(--text-color)', padding: '0.3rem 0.6rem', borderRadius: '0.3rem', cursor: 'pointer', fontSize: '0.7rem', whiteSpace: 'nowrap' }}
                                        >
                                            {copied ? 'Copied!' : 'Copy'}
                                        </button>

                                        {showCopiedAlert && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '-40px',
                                                right: '0',
                                                background: 'var(--primary)',
                                                color: 'var(--bg-color)',
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '0.4rem',
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                                animation: 'slideIn 0.3s ease-out',
                                                zIndex: 10
                                            }}>
                                                Link copied to clipboard!
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={onClose}
                                style={{ marginTop: '1rem', width: '100%', padding: '0.6rem', background: 'var(--primary)', color: 'var(--bg-color)', border: 'none', borderRadius: '0.4rem', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                Done
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CreateEventModal;
