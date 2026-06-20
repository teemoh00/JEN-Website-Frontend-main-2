import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const QuickRegister = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const slug = searchParams.get('slug');
    const eventSlug = searchParams.get('event_slug');
    const identifier = searchParams.get('identifier') || '';
    
    // Auto-detect if identifier is email or phone
    const isEmail = identifier.includes('@');
    const initialEmail = isEmail ? identifier : '';
    const initialPhone = !isEmail ? identifier : '';

    const [formData, setFormData] = useState({
        full_name: '',
        email: initialEmail,
        phone_number: initialPhone,
        password: '',
        address: '',
        category: 'Member',
        commitment_status: 'Regular Member'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Register properly through accounts api
            const registerData = {
                username: formData.email, // Use email as username
                email: formData.email,
                password: formData.password,
                phone_number: formData.phone_number,
                full_name: formData.full_name,
                residence: formData.address // Map address to residence
            };

            const response = await axios.post('accounts/register/', registerData);

            // Auto login by saving token
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setUser(response.data.user);
            }

            setSuccessMessage('Registration successful! Now joining...');
            setTimeout(() => {
                if (eventSlug) {
                    navigate(`/event-join/${eventSlug}`);
                } else if (slug) {
                    navigate(`/join/${slug}`);
                } else {
                    navigate('/');
                }
            }, 2000);
        } catch (err) {
            console.error('Registration error:', err);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '0.5rem',
        color: 'white',
        marginTop: '0.4rem',
        outline: 'none'
    };

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
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Blurred Favicon Background overlay */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80vh',
                height: '80vh',
                backgroundImage: `url('/favicon.ico')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                opacity: 0.4,
                filter: 'blur(15px)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            <div className="portal-container animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '2rem', position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome to Jesus Enthroned Network</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Please register to join the meeting</p>
                </div>

                <div className="glass-card animate-slide-up animate-delay-200" style={{ padding: '2.5rem', borderRadius: '1.5rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                        <div>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Full Name</label>
                            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required style={inputStyle} />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Phone Number</label>
                            <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required style={inputStyle} />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required style={inputStyle} placeholder="Create a password" />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Address</label>
                            <textarea name="address" value={formData.address} onChange={handleChange} style={{ ...inputStyle, minHeight: '80px' }} />
                        </div>

                        {error && <div style={{ color: '#ef4444', fontSize: '0.85rem' }}>{error}</div>}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '0.75rem',
                                background: 'var(--primary)',
                                color: 'var(--bg-color)',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                marginTop: '1rem',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Registering...' : 'REGISTER & JOIN'}
                        </button>
                    </form>
                </div>
            </div>

            {successMessage && (
                <div className="premium-toast">
                    <div className="toast-content">
                        <div style={{ fontSize: '2rem' }}>✨</div>
                        <div>
                            <div style={{ fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '0.25rem' }}>Welcome</div>
                            <div style={{ fontSize: '0.95rem', fontWeight: '500' }}>{successMessage}</div>
                        </div>
                    </div>
                    <div className="toast-progress"></div>
                </div>
            )}

            <style>{`
                @media (max-width: 640px) {
                    .portal-container {
                        padding: 1rem !important;
                    }
                    .glass-card {
                        padding: 1.5rem !important;
                    }
                    h1 {
                        fontSize: 1.5rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default QuickRegister;
