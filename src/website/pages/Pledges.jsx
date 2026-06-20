import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Pledges = () => {
    const [isNewPledge, setIsNewPledge] = useState(false);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            
            {/* Header Section with Dark Background */}
            <div style={{ 
                background: 'var(--bg-color)', 
                paddingTop: '150px', 
                paddingBottom: '160px', 
                textAlign: 'center',
                position: 'relative'
            }}>
                {/* Glowing Icon */}
                <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    background: 'rgba(34, 193, 230, 0.1)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 0 20px rgba(34, 193, 230, 0.2)'
                }}>
                    <span style={{ fontSize: '1.5rem' }}>🤝</span>
                </div>

                {/* Pill Label */}
                <div style={{ 
                    display: 'inline-block',
                    padding: '0.3rem 1rem',
                    background: 'rgba(34, 193, 230, 0.15)',
                    color: 'var(--primary)',
                    borderRadius: '2rem',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '0.05em',
                    marginBottom: '1.5rem'
                }}>
                    MY PLEDGES
                </div>

                <h1 style={{ 
                    fontSize: '3rem', 
                    fontWeight: '800', 
                    color: 'var(--text-color)', 
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em'
                }}>
                    Manage Your Giving
                </h1>
                
                <p style={{ 
                    color: 'var(--text-muted)', 
                    fontSize: '1.1rem', 
                    maxWidth: '600px', 
                    margin: '0 auto' 
                }}>
                    Track your contributions, fulfill your pledges securely via Paystack, or make a new commitment to support the vision.
                </p>
            </div>

            {/* White Background Section */}
            <div style={{ 
                flex: 1, 
                backgroundColor: '#f8fafc',
                position: 'relative',
                paddingBottom: '80px'
            }}>
                {/* Search Card overlapping the transition */}
                <div style={{ 
                    maxWidth: '600px', 
                    margin: '0 auto', 
                    background: 'white', 
                    borderRadius: '1rem', 
                    padding: '3rem', 
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    marginTop: '-100px',
                    textAlign: isNewPledge ? 'left' : 'center'
                }}>
                    {!isNewPledge ? (
                        <>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
                                Find Your Pledges
                            </h2>
                            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
                                Enter your email or phone number to securely access your pledge history.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                <input 
                                    type="text" 
                                    placeholder="e.g. name@example.com or 0712345678" 
                                    style={{ 
                                        flex: 1, 
                                        padding: '1rem 1.5rem', 
                                        borderRadius: '0.5rem', 
                                        border: '1px solid #e2e8f0', 
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        color: '#0f172a'
                                    }} 
                                />
                                <button style={{ 
                                    background: 'var(--primary)', 
                                    color: 'white', 
                                    border: 'none', 
                                    padding: '0 2rem', 
                                    borderRadius: '0.5rem', 
                                    fontWeight: '700', 
                                    fontSize: '0.95rem',
                                    cursor: 'pointer'
                                }}>
                                    Search
                                </button>
                            </div>

                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                margin: '2rem 0',
                                color: '#94a3b8',
                                fontSize: '0.85rem'
                            }}>
                                <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                                <span style={{ padding: '0 1rem' }}>Or start fresh</span>
                                <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                            </div>

                            <button 
                                onClick={() => setIsNewPledge(true)}
                                style={{ 
                                    width: '100%', 
                                    padding: '1rem', 
                                    background: 'transparent', 
                                    border: '2px dashed #cbd5e1', 
                                    borderRadius: '0.5rem', 
                                    color: '#475569', 
                                    fontWeight: '700', 
                                    fontSize: '0.95rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}>
                                + Make a New Pledge
                            </button>
                        </>
                    ) : (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                                        New Pledge
                                    </h2>
                                    <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
                                        Enter your details to make a new commitment.
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setIsNewPledge(false)}
                                    style={{ 
                                        background: '#f1f5f9', 
                                        color: '#475569', 
                                        border: 'none', 
                                        padding: '0.4rem 1rem', 
                                        borderRadius: '2rem', 
                                        fontSize: '0.8rem', 
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Full Name *</label>
                                    <input type="text" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', color: '#0f172a' }} />
                                </div>
                                
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Email Address *</label>
                                        <input type="email" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', color: '#0f172a' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Phone Number</label>
                                        <input type="tel" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', color: '#0f172a' }} />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Pledge Amount (KES) *</label>
                                    <input type="number" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', color: '#0f172a' }} />
                                </div>

                                <button style={{ 
                                    marginTop: '1rem',
                                    width: '100%', 
                                    padding: '1rem', 
                                    background: '#0f172a', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '0.5rem', 
                                    fontWeight: '700', 
                                    fontSize: '1rem',
                                    cursor: 'pointer'
                                }}>
                                    Create & Proceed to Pay
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Pledges;
