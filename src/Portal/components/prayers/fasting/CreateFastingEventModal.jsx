import React, { useState } from 'react';
import api from '../../../../api/axios';

const CreateFastingEventModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        startDate: '',
        endDate: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('prayers/fasting/events', {
                title: formData.title,
                start_date: formData.startDate,
                end_date: formData.endDate,
                description: formData.description
            });
            alert('Fasting Event created successfully!');
            onClose();
            // trigger refresh logic via parent if necessary
        } catch (error) {
            console.error('Error creating fasting event', error);
            alert('Failed to create fasting event');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '0.5rem 0',
        background: 'transparent',
        border: 'none',
        color: 'var(--text-color)',
        fontSize: '0.9rem',
        marginTop: '0.4rem',
        outline: 'none',
        fontWeight: '600'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        fontWeight: '600'
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
                padding: '2.5rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '520px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.4rem', color: 'var(--text-color)', margin: 0, fontWeight: '700' }}>Create Fasting Event</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer', padding: 0 }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={labelStyle}>Event Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. 21 Days of Prayer"
                            style={{ ...inputStyle, color: formData.title ? 'white' : 'var(--text-muted)', fontWeight: formData.title ? '600' : 'normal' }}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <label style={labelStyle}>Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                style={{ ...inputStyle, color: formData.startDate ? 'white' : 'var(--text-muted)' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                style={{ ...inputStyle, color: formData.endDate ? 'white' : 'var(--text-muted)' }}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Description / Theme</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Brief description of the fasting event..."
                            style={{ ...inputStyle, minHeight: '60px', resize: 'vertical', fontFamily: 'monospace', color: formData.description ? 'white' : 'var(--text-muted)', fontWeight: formData.description ? '600' : 'normal' }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '0.5rem',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}>Cancel</button>
                        <button type="submit" disabled={loading} style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '0.4rem',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'var(--text-color)',
                            fontWeight: '700',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '0.85rem',
                            opacity: loading ? 0.7 : 1
                        }}>{loading ? 'Creating...' : 'Create Event'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateFastingEventModal;
