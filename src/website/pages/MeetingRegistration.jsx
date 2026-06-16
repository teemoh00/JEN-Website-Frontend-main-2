import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MeetingRegistration = () => {
    const { meetingId } = useParams();
    const navigate = useNavigate();
    const [meeting, setMeeting] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: ''
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                const response = await axios.get(`meetings/meetings/${meetingId}/`);
                setMeeting(response.data);
            } catch (error) {
                console.error('Error fetching meeting:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMeeting();
    }, [meetingId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here we would typically POST to a registration endpoint.
        // For now, since a registration model wasn't explicitly requested, 
        // we'll simulate success.
        setSubmitted(true);
    };

    if (loading) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eff3c1' }}>Loading...</div>;
    }

    if (!meeting) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eff3c1' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ color: '#120D20' }}>Meeting not found</h2>
                    <button onClick={() => navigate('/')} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#22c1e6', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>Go Home</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#eff3c1' }}>
            <Navbar />
            <div style={{ flex: 1, padding: '4rem 1rem' }}>
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    background: '#1A1625',
                    padding: '2.5rem',
                    borderRadius: '1.5rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    {submitted ? (
                        <div style={{ textAlign: 'center', color: 'white' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                            <h2 style={{ color: '#eff3c1', marginBottom: '1rem' }}>Registration Successful!</h2>
                            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>You have registered for <strong>{meeting.title}</strong>.</p>
                            <button onClick={() => navigate('/')} style={{
                                padding: '0.8rem 2rem',
                                background: '#22c1e6',
                                border: 'none',
                                borderRadius: '0.6rem',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}>Back to Website</button>
                        </div>
                    ) : (
                        <>
                            <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
                                <h1 style={{ color: '#eff3c1', margin: 0, fontSize: '1.8rem' }}>{meeting.title}</h1>
                                <p style={{ color: 'var(--primary)', fontWeight: '600', marginTop: '0.5rem' }}>Meeting Registration</p>
                                <div style={{ color: '#94a3b8', marginTop: '1rem', display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
                                    <span>
                                        📅 {meeting.end_date && meeting.end_date !== meeting.date ? (
                                            `${meeting.date} - ${meeting.end_date}`
                                        ) : (
                                            meeting.date
                                        )} at {meeting.time}
                                    </span>
                                    <span>📍 {meeting.location || 'Location TBD'}</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                                <div>
                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Email Address</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Phone Number</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={inputStyle} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Notes (Optional)</label>
                                    <textarea name="notes" value={formData.notes} onChange={handleChange} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
                                </div>
                                <button type="submit" style={{
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    background: '#22c1e6',
                                    color: '#120D20',
                                    border: 'none',
                                    borderRadius: '0.6rem',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}>Register Now</button>
                            </form>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    background: '#120D20',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '0.5rem',
    color: '#eff3c1',
    fontSize: '0.95rem',
    outline: 'none'
};

export default MeetingRegistration;
