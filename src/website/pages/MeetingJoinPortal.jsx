import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const MeetingJoinPortal = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [meeting, setMeeting] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                // We need an endpoint to get meeting details by slug
                const response = await axios.get(`meetings/meetings/by_slug/?slug=${slug}`);
                setMeeting(response.data);
                calculateTimeLeft(response.data.date, response.data.time);
            } catch (err) {
                console.error('Error fetching meeting:', err);
                setError('Meeting not found or link expired.');
            } finally {
                setLoading(false);
            }
        };
        fetchMeeting();
    }, [slug]);

    useEffect(() => {
        if (!meeting) return;
        const timer = setInterval(() => {
            calculateTimeLeft(meeting.date, meeting.time);
        }, 1000);
        return () => clearInterval(timer);
    }, [meeting]);

    const calculateTimeLeft = (date, time) => {
        const target = new Date(`${date}T${time}`);
        const now = new Date();
        const difference = target - now;

        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        setTimeLeft(timeLeft);
    };

    const handleJoin = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const response = await axios.post('attendance/sessions/join_meeting/', {
                slug,
                phone_number: phoneNumber
            });

            // Success! Attendence recorded, redirecting...
            const { redirect_url, member_name } = response.data;
            setSuccessMessage(`Welcome ${member_name}! You are checked in. Redirecting to meeting...`);
            setTimeout(() => {
                window.location.href = redirect_url;
            }, 2000);
        } catch (err) {
            if (err.response?.status === 404 && err.response?.data?.status === 'unregistered') {
                // User not found, redirect to quick register
                navigate(`/quick-register?slug=${slug}&phone=${phoneNumber}`);
            } else {
                setError(err.response?.data?.error || 'Unable to join meeting. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Loading Meeting Portal...</div>;

    if (error && !meeting) return (
        <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h2>{error}</h2>
            <button onClick={() => navigate('/')} style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', background: 'var(--primary)', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>Go Home</button>
        </div>
    );

    return (
        <div className="premium-bg" style={{
            minHeight: '100vh',
            color: 'white',
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)), url('/portal_abstract_bg_1772432885192.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div className="portal-container animate-fade-in" style={{ width: '100%', maxWidth: '800px', padding: '2rem' }}>
                <h2 style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem' }}>Jesus Enthroned Network</h2>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{meeting.title}</h1>
                <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: '500' }}>
                    {meeting.end_date && meeting.end_date !== meeting.date ? (
                        `📅 ${meeting.date} - ${meeting.end_date}`
                    ) : (
                        `📅 ${meeting.date}`
                    )}
                </div>

                <div className="glass-card animate-slide-up" style={{
                    borderRadius: '1.5rem',
                    padding: '2rem',
                    marginBottom: '3rem',
                    textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Meeting starts in:</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                        {['days', 'hours', 'minutes', 'seconds'].map(unit => (
                            <div key={unit} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)' }}>{timeLeft[unit] ?? 0}</div>
                                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{unit}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card animate-slide-up animate-delay-200" style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', borderRadius: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Join Meeting</h3>
                    <form onSubmit={handleJoin} style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{ textAlign: 'left' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Phone Number</label>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter your registered phone number"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    marginTop: '0.4rem',
                                    background: '#1e293b',
                                    border: '1px solid #334155',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none'
                                }}
                                required
                            />
                        </div>
                        {error && <div style={{ color: '#ef4444', fontSize: '0.85rem' }}>{error}</div>}
                        <button
                            type="submit"
                            disabled={submitting}
                            style={{
                                padding: '0.75rem',
                                background: 'var(--primary)',
                                color: 'var(--bg-color)',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                marginTop: '1rem',
                                opacity: submitting ? 0.7 : 1
                            }}
                        >
                            {submitting ? 'Verifying...' : 'JOIN NOW'}
                        </button>
                    </form>
                </div>
            </div>

            {successMessage && (
                <div className="premium-toast">
                    <div className="toast-content">
                        <div style={{ fontSize: '2rem' }}>🚀</div>
                        <div>
                            <div style={{ fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '0.25rem' }}>Success</div>
                            <div style={{ fontSize: '0.95rem', fontWeight: '500' }}>{successMessage}</div>
                        </div>
                    </div>
                    <div className="toast-progress"></div>
                </div>
            )}
        </div>
    );
};

export default MeetingJoinPortal;
