import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { EventContext } from '../../context/EventContext';

const EventRegistration = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { events, registerForEvent } = useContext(EventContext);
    const [event, setEvent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        feeOption: 'Full',
        otherAmount: '',
        notes: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                // Try fetching by slug first
                const response = await axios.get(`events/events/${eventId}/`);
                setEvent(response.data);
            } catch (err) {
                console.error('Error fetching event:', err);
                // If slug fails, try fetching by ID as a fallback (using the action we added)
                try {
                    const response = await axios.get(`events/events/by_id/${eventId}/`);
                    setEvent(response.data);
                } catch (err2) {
                    console.error('Event not found:', err2);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (event) {
            try {
                await registerForEvent({
                    event: event.id,
                    full_name: formData.name,
                    email: formData.email,
                    phone_number: formData.phone,
                    location: formData.location,
                    fee_option: formData.feeOption,
                    amount_paid: formData.feeOption === 'Full' ? event.registration_fee : (formData.otherAmount || 0),
                    notes: formData.notes
                });
                setSubmitted(true);
            } catch (err) {
                console.error('Registration failed:', err);
                alert('Registration failed. Please try again.');
            }
        }
    };

    if (!event) {
        return <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>Loading Event...</div>;
    }

    if (submitted) {
        return (
            <div style={{
                maxWidth: '600px',
                margin: '4rem auto',
                padding: '2rem',
                background: '#1A1625',
                borderRadius: '1rem',
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center',
                color: '#eff3c1'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎉 Registration Successful!</h2>
                <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>You have successfully registered for <strong>{event.name}</strong>.</p>
                <button onClick={() => navigate('/events')} style={{
                    padding: '0.75rem 1.5rem',
                    background: '#22c1e6',
                    color: '#120D20',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}>Back to Events</button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1rem' }}>
            <div style={{
                background: '#1A1625',
                padding: '2rem',
                borderRadius: '1rem',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                    <h1 style={{ color: '#eff3c1', margin: 0, fontSize: '2rem' }}>{event.name}</h1>
                    <div style={{ color: '#94a3b8', marginTop: '0.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <span>📅 {event.date} at {event.time}</span>
                        <span>📍 {event.location}</span>
                        {event.registration_fee > 0 && (
                            <span style={{ color: '#22c1e6', fontWeight: 'bold' }}>💰 Registration Fee: {event.registration_fee}</span>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#120D20',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '0.5rem',
                                color: '#eff3c1',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: '#120D20',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    color: '#eff3c1',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        <div className="phone-field">
                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: '#120D20',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    color: '#eff3c1',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Which location/branch are you from?</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Accra Central"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#120D20',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '0.5rem',
                                color: '#eff3c1',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    {event.registration_fee > 0 && (
                        <div style={{ background: 'rgba(34, 193, 230, 0.05)', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid rgba(34, 193, 230, 0.2)' }}>
                            <label style={{ display: 'block', color: '#eff3c1', marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>Registration Fee Option</label>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94a3b8', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="feeOption"
                                        value="Full"
                                        checked={formData.feeOption === 'Full'}
                                        onChange={handleChange}
                                        style={{ accentColor: '#22c1e6' }}
                                    />
                                    Full Amount ({event.registration_fee})
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94a3b8', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="feeOption"
                                        value="Other"
                                        checked={formData.feeOption === 'Other'}
                                        onChange={handleChange}
                                        style={{ accentColor: '#22c1e6' }}
                                    />
                                    Other amount
                                </label>

                                {formData.feeOption === 'Other' && (
                                    <div style={{ marginLeft: '2rem', animation: 'fadeIn 0.3s ease-in-out' }}>
                                        <input
                                            type="number"
                                            name="otherAmount"
                                            value={formData.otherAmount}
                                            onChange={handleChange}
                                            placeholder="Enter amount"
                                            required
                                            min="0"
                                            style={{
                                                width: '150px',
                                                padding: '0.5rem',
                                                background: '#120D20',
                                                border: '1px solid rgba(34, 193, 230, 0.4)',
                                                borderRadius: '0.4rem',
                                                color: '#eff3c1'
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div>
                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Notes / Special Requirements (Optional)</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#120D20',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '0.5rem',
                                color: '#eff3c1',
                                fontSize: '1rem',
                                minHeight: '100px',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    <button type="submit" style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: '#22c1e6',
                        color: '#120D20',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Register Now
                    </button>
                </form>
            </div>

            <style>{`
                @media (max-width: 640px) {
                    .form-grid-2 {
                        grid-template-columns: 1fr !important;
                    }
                    h1 {
                        fontSize: 1.5rem !important;
                    }
                    div[style*="padding: 2rem"] {
                        padding: 1.5rem 1rem !important;
                    }
                    div[style*="margin: 4rem auto"] {
                        margin: 2rem auto !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default EventRegistration;
