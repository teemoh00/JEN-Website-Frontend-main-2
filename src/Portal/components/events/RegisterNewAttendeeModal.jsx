import React, { useState } from 'react';
import axios from '../../../api/axios';

const RegisterNewAttendeeModal = ({ event, onClose, onRegisterSuccess }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        phone_number: '',
        email: '',
        residence: '',
        gender: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Attempt to register member
            let identifierToUse = formData.email || formData.phone_number;
            
            try {
                const registerData = {
                    username: formData.email || formData.phone_number,
                    email: formData.email,
                    phone_number: formData.phone_number,
                    full_name: formData.full_name,
                    residence: formData.residence,
                    gender: formData.gender,
                    password: Math.random().toString(36).slice(-8) + 'A1!' // Random temp password
                };
                await axios.post('accounts/register/', registerData);
            } catch (regErr) {
                // If member already exists, we ignore registration failure and just try checking them in
                // Usually status 400 for duplicate user
            }

            // 2. Check in to event
            await axios.post('events/attendance/join/', {
                slug: event.slug,
                identifier: identifierToUse
            });

            onRegisterSuccess();
        } catch (err) {
            console.error('Registration/Check-in error:', err);
            setError(err.response?.data?.error || 'Failed to check in attendee.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        color: 'white',
        outline: 'none',
        fontSize: '0.9rem',
        marginTop: '0.2rem'
    };

    const labelStyle = {
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginTop: '1.2rem',
        display: 'block'
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }}>
            <div className="animate-scale-up" style={{
                background: '#1a1b26', // Dark purple/blue theme like the image
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '450px',
                padding: '2rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                color: 'white'
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', margin: 0 }}>Register New Attendee</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                    {event.name.toUpperCase()} — will be registered as an attendee.
                </p>

                <form onSubmit={handleSubmit}>
                    <label style={labelStyle}>Full Name *</label>
                    <input 
                        type="text" 
                        name="full_name" 
                        placeholder="John Doe" 
                        value={formData.full_name} 
                        onChange={handleChange} 
                        style={inputStyle} 
                        required 
                    />

                    <label style={labelStyle}>Phone Number *</label>
                    <input 
                        type="tel" 
                        name="phone_number" 
                        placeholder="0712345678" 
                        value={formData.phone_number} 
                        onChange={handleChange} 
                        style={inputStyle} 
                        required 
                    />

                    <label style={labelStyle}>Email Address *</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="john@example.com" 
                        value={formData.email} 
                        onChange={handleChange} 
                        style={inputStyle} 
                        required 
                    />

                    <label style={labelStyle}>Residence *</label>
                    <input 
                        type="text" 
                        name="residence" 
                        placeholder="Nairobi" 
                        value={formData.residence} 
                        onChange={handleChange} 
                        style={inputStyle} 
                        required 
                    />

                    <label style={labelStyle}>Gender *</label>
                    <select 
                        name="gender" 
                        value={formData.gender} 
                        onChange={handleChange} 
                        style={{...inputStyle, background: '#1a1b26', appearance: 'none', cursor: 'pointer'}} 
                        required
                    >
                        <option value="">-- Select --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    {error && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '1rem' }}>{error}</div>}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2.5rem' }}>
                        <button 
                            type="button" 
                            onClick={onClose}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                padding: '0.6rem 1rem',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            style={{
                                background: '#22c55e',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                padding: '0.6rem 1.25rem',
                                fontSize: '0.9rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Processing...' : 'Register Attendee'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterNewAttendeeModal;
