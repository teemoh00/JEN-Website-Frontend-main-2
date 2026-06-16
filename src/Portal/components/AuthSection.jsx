import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const AuthSection = () => {
    const [activeTab, setActiveTab] = useState('login');
    const navigate = useNavigate();
    const { setUser } = useAuth();

    // Form states
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({
        phone_number: '',
        email: '',
        date_of_birth: '',
        residence: '',
        employment_status: '',
        password: '',
        confirm_password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        try {
            const response = await api.post('accounts/login/', {
                username: loginData.email,
                password: loginData.password
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            navigate('/portal/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirm_password) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        setError('');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        try {
            const response = await api.post('accounts/register/', {
                username: registerData.email,
                email: registerData.email,
                password: registerData.password,
                phone_number: registerData.phone_number,
                date_of_birth: registerData.date_of_birth,
                residence: registerData.residence,
                employment_status: registerData.employment_status
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            navigate('/portal/dashboard');
        } catch (err) {
            setError(Object.values(err.response?.data || {}).flat().join(', ') || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="auth-section" style={{ padding: '4rem 0 6rem', background: '#eff3c1' }}>
            <div className="container auth-container" style={{ maxWidth: '1200px' }}>
                <div className="auth-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '4rem',
                    alignItems: 'start'
                }}>
                    {/* Left: Login/Register Card */}
                    <div className="auth-card" style={{
                        background: 'white',
                        padding: '2.5rem',
                        borderRadius: '1.5rem',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)'
                    }}>
                        {/* Tabs */}
                        {activeTab !== 'forgot-password' && (
                            <div style={{
                                display: 'flex',
                                background: '#dce7c5', // Slightly darker secondary for tab background
                                padding: '0.3rem',
                                borderRadius: '0.75rem',
                                marginBottom: '2rem'
                            }}>
                                <button
                                    onClick={() => setActiveTab('login')}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        border: 'none',
                                        background: activeTab === 'login' ? '#22c1e6' : 'transparent',
                                        color: activeTab === 'login' ? 'white' : '#120D20',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => setActiveTab('register')}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        border: 'none',
                                        background: activeTab === 'register' ? '#22c1e6' : 'transparent',
                                        color: activeTab === 'register' ? 'white' : '#120D20', // Using dark text for contrast on inactive
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Register
                                </button>
                            </div>
                        )}

                        {/* Login Form */}
                        {activeTab === 'login' && (
                            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {error && <div style={{ color: 'red', fontSize: '0.85rem' }}>{error}</div>}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#120D20' }}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        autoComplete="username"
                                        placeholder="your@email.com"
                                        value={loginData.email}
                                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                        required
                                        style={{
                                            width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#eff3c1', outline: 'none', boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#120D20' }}>Password</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type={showLoginPassword ? "text" : "password"}
                                            name="password"
                                            autoComplete="current-password"
                                            placeholder="........"
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                            required
                                            style={{
                                                width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#eff3c1', outline: 'none', boxSizing: 'border-box'
                                            }}
                                        />
                                        <span
                                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                                            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', userSelect: 'none' }}
                                        >
                                            {showLoginPassword ? '👁️‍🗨️' : '👁️'}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('forgot-password')}
                                        style={{ background: 'transparent', border: 'none', color: '#22c1e6', fontSize: '0.85rem', textDecoration: 'none', cursor: 'pointer' }}
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <button type="submit" disabled={loading} style={{
                                    background: '#22c1e6',
                                    color: 'white',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    fontWeight: '700',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    marginTop: '0.5rem',
                                    opacity: loading ? 0.7 : 1
                                }}>
                                    {loading ? 'Signing In...' : 'Sign In >'}
                                </button>
                            </form>
                        )}

                        {/* Forgot Password Form */}
                        {activeTab === 'forgot-password' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#120D20', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        Forgot Password? <span>🔒</span>
                                    </h3>
                                    <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                        Enter your email and we'll send you instructions to reset your password
                                    </p>
                                </div>

                                <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#120D20' }}>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            placeholder="Enter your email"
                                            style={{
                                                padding: '0.75rem',
                                                borderRadius: '0.5rem',
                                                border: '1px solid #cbd5e1',
                                                background: '#eff3c1',
                                                outline: 'none',
                                                width: '100%',
                                                boxSizing: 'border-box'
                                            }}
                                        />
                                    </div>

                                    <button type="submit" style={{
                                        background: 'linear-gradient(to right, #6366f1, #8b5cf6)', // Purple/Blue gradient
                                        color: 'white',
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        fontWeight: '600',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        marginTop: '0.5rem',
                                        boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.2)'
                                    }}>
                                        Send Reset Instructions
                                    </button>
                                </form>

                                <div style={{ textAlign: 'center' }}>
                                    <button
                                        onClick={() => setActiveTab('login')}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#6366f1',
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            fontWeight: '500',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            margin: '0 auto'
                                        }}
                                    >
                                        &lt; Back to login
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Register Form */}
                        {activeTab === 'register' && (
                            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {error && <div style={{ color: 'red', fontSize: '0.85rem' }}>{error}</div>}
                                {/* Phone Number */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#120D20' }}>Phone Number</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>📞</span>
                                        <input
                                            type="tel"
                                            name="phone"
                                            autoComplete="tel"
                                            placeholder="0700000000"
                                            value={registerData.phone_number}
                                            onChange={(e) => setRegisterData({ ...registerData, phone_number: e.target.value })}
                                            required
                                            style={{
                                                width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#eff3c1', outline: 'none', boxSizing: 'border-box'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Email Address */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#120D20' }}>Email Address</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>✉️</span>
                                        <input
                                            type="email"
                                            name="email"
                                            autoComplete="username"
                                            placeholder="your@email.com"
                                            value={registerData.email}
                                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                            required
                                            style={{
                                                width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#eff3c1', outline: 'none', boxSizing: 'border-box'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Date Of Birth */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#120D20' }}>Date Of Birth</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>📅</span>
                                        <input
                                            type="date"
                                            name="dob"
                                            autoComplete="bday"
                                            value={registerData.date_of_birth}
                                            onChange={(e) => setRegisterData({ ...registerData, date_of_birth: e.target.value })}
                                            required
                                            style={{
                                                width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#eff3c1', outline: 'none', color: '#64748b', boxSizing: 'border-box'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Area of Residence */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#120D20' }}>Area of Residence</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>📍</span>
                                        <input
                                            type="text"
                                            name="residence"
                                            placeholder="Enter your Area of Residence"
                                            value={registerData.residence}
                                            onChange={(e) => setRegisterData({ ...registerData, residence: e.target.value })}
                                            required
                                            style={{
                                                width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#eff3c1', outline: 'none', boxSizing: 'border-box'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Employment Status */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#120D20' }}>Employment Status</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>💼</span>
                                        <select
                                            name="employment_status"
                                            value={registerData.employment_status}
                                            onChange={(e) => setRegisterData({ ...registerData, employment_status: e.target.value })}
                                            required
                                            style={{
                                                width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#eff3c1', outline: 'none', appearance: 'none', color: '#64748b', boxSizing: 'border-box'
                                            }}
                                        >
                                            <option value="">Select Employment Status</option>
                                            <option value="Employed">Employed</option>
                                            <option value="Self-Employed">Self-Employed</option>
                                            <option value="Student">Student</option>
                                            <option value="Unemployed">Unemployed</option>
                                        </select>
                                        <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }}>▼</span>
                                    </div>
                                </div>

                                {/* Password */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#120D20' }}>Password</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>🔒</span>
                                        <input
                                            type={showRegisterPassword ? "text" : "password"}
                                            name="password"
                                            autoComplete="new-password"
                                            placeholder="........"
                                            value={registerData.password}
                                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                            required
                                            style={{
                                                width: '100%', padding: '0.75rem 2.5rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#eff3c1', outline: 'none', boxSizing: 'border-box'
                                            }}
                                        />
                                        <span
                                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', userSelect: 'none' }}
                                        >
                                            {showRegisterPassword ? '👁️‍🗨️' : '👁️'}
                                        </span>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#120D20' }}>Confirm Password</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>🔒</span>
                                        <input
                                            type={showRegisterPassword ? "text" : "password"}
                                            name="confirm_password"
                                            autoComplete="new-password"
                                            placeholder="........"
                                            value={registerData.confirm_password}
                                            onChange={(e) => setRegisterData({ ...registerData, confirm_password: e.target.value })}
                                            required
                                            style={{
                                                width: '100%', padding: '0.75rem 2.5rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#eff3c1', outline: 'none', boxSizing: 'border-box'
                                            }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#120D20' }}>
                                    <input type="checkbox" id="terms" required style={{ accentColor: '#22c1e6' }} />
                                    <label htmlFor="terms">I agree to <span style={{ fontWeight: '600' }}>privacy policy & terms</span></label>
                                </div>

                                <button type="submit" disabled={loading} style={{
                                    background: '#22c1e6',
                                    color: 'white',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    fontWeight: '700',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    marginTop: '0.5rem',
                                    opacity: loading ? 0.7 : 1
                                }}>
                                    {loading ? 'Creating Account...' : 'Create Account >'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Right: Dashboard Features */}
                    <div className="benefits-section">
                        <h2 className="benefits-title" style={{ fontSize: '2rem', fontWeight: '800', color: '#120D20', marginBottom: '1rem' }}>
                            Your Personal Dashboard
                        </h2>
                        <p style={{ color: '#64748b', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
                            As a registered member, you'll have access to exclusive features:
                        </p>

                        <div className="benefits-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                            {[
                                { icon: '▶', title: 'Sermon Library', desc: 'Access all past sermons and exclusive content' },
                                { icon: '📅', title: 'Event Registration', desc: 'Register for events and track your RSVPs' },
                                { icon: '❤', title: 'Giving History', desc: 'View your giving history and receipts' },
                                { icon: '⚙️', title: 'Profile Settings', desc: 'Manage your account and preferences' },
                            ].map((feature, idx) => (
                                <div key={idx} style={{
                                    background: '#dce7c5', // Slightly darker/different shade for cards
                                    padding: '1.5rem',
                                    borderRadius: '1rem'
                                }}>
                                    <div style={{
                                        width: '40px', height: '40px',
                                        borderRadius: '10px',
                                        border: '1px solid #22c1e6',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#22c1e6', marginBottom: '1rem'
                                    }}>
                                        {feature.icon}
                                    </div>
                                    <h4 style={{ fontWeight: '700', color: '#120D20', marginBottom: '0.5rem' }}>{feature.title}</h4>
                                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>{feature.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{
                            background: 'rgba(34, 193, 230, 0.15)',
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            fontSize: '0.9rem',
                            color: '#475569',
                            border: '1px solid rgba(34, 193, 230, 0.3)'
                        }}>
                            <span style={{ fontWeight: '700', color: '#0ea5e9' }}>Coming Soon:</span> Full church management features including small groups, ministry teams, and more.
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 968px) {
                    .auth-section {
                        padding: 3rem 1rem !important;
                    }
                    .auth-container {
                        padding: 0 !important;
                    }
                    .auth-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                    .auth-card {
                        padding: 1.5rem !important;
                        border-radius: 1rem !important;
                    }
                    .benefits-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .benefits-title {
                        font-size: 1.5rem !important;
                    }
                }
                @media (max-width: 480px) {
                    .auth-section {
                        padding: 2rem 0.5rem !important;
                    }
                    .auth-card {
                        padding: 1.25rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default AuthSection;
