import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const FastingRegistration = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        daysFasting: []
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`prayers/fasting/events/${id}`);
                setEvent(response.data);
            } catch (err) {
                console.error('Error fetching event:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (day) => {
        setFormData(prev => {
            const days = prev.daysFasting.includes(day)
                ? prev.daysFasting.filter(d => d !== day)
                : [...prev.daysFasting, day];
            return { ...prev, daysFasting: days };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.daysFasting.length === 0) {
            alert("Please select at least one day.");
            return;
        }

        try {
            await axios.post('prayers/fasting/commit', {
                fasting_event_id: id,
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                days_fasting: formData.daysFasting
            });
            setSubmitted(true);
        } catch (err) {
            console.error('Registration failed:', err);
            alert('Registration failed. Please try again.');
        }
    };

    if (loading) {
        return <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>Loading Event...</div>;
    }

    if (!event) {
        return <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>Event not found.</div>;
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
                <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>You have successfully committed to fast for <strong>{event.title}</strong>.</p>
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
                    <h1 style={{ color: '#eff3c1', margin: 0, fontSize: '2rem' }}>{event.title}</h1>
                    <div style={{ color: '#94a3b8', marginTop: '0.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <span>📅 {event.start_date} to {event.end_date}</span>
                    </div>
                    {event.description && (
                        <p style={{ color: '#cbd5e1', marginTop: '1rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                            {event.description}
                        </p>
                    )}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
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
                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Days Committing to Fast</label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {weekDays.map(day => (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => handleCheckboxChange(day)}
                                    style={{
                                        padding: '0.4rem 1rem',
                                        borderRadius: '2rem',
                                        border: formData.daysFasting.includes(day) ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                        background: formData.daysFasting.includes(day) ? '#22c1e6' : 'transparent',
                                        color: formData.daysFasting.includes(day) ? '#120D20' : '#94a3b8',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
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
                        Commit to Fast
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

export default FastingRegistration;
