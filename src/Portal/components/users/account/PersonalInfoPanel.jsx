import React, { useState } from 'react';
import api from '../../../../api/axios';

const InfoField = ({ label, value }) => (
    <div style={{
        background: 'var(--surface-2)',
        padding: '1.25rem',
        borderRadius: '1rem',
        border: '1px solid var(--border-color)',
        transition: 'all 0.2s ease'
    }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{label}</div>
        <div style={{ color: 'var(--text-color)', fontWeight: '600', fontSize: '1.1rem' }}>{value}</div>
    </div>
);

const PersonalInfoPanel = ({ user, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleCommit = async () => {
        setLoading(true);
        try {
            await api.post('church/members/commit_to_ministry/');
            setShowConfirm(false);
            setShowSuccess(true);
            if (onUpdate) onUpdate();
        } catch (err) {
            console.error('Commitment error:', err);
            alert(err.response?.data?.message || "Failed to complete commitment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const ModalOverlay = ({ children, onClose }) => (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '1rem'
        }} onClick={onClose}>
            <div
                style={{
                    background: 'var(--surface-1)',
                    borderRadius: '2rem',
                    padding: '3rem',
                    maxWidth: '500px',
                    width: '100%',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    position: 'relative',
                    textAlign: 'center'
                }}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>
            {/* Personal Info Grid */}
            <div style={{
                background: 'var(--surface-1)',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                border: '1px solid var(--border-color)',
                boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                    <div style={{ width: '4px', height: '24px', background: 'var(--primary)', borderRadius: '2px' }}></div>
                    <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: '800' }}>Personal Details</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    <InfoField label="Primary Email" value={user?.email || 'Not provided'} />
                    <InfoField label="Phone Contact" value={user?.phone_number || 'Not provided'} />
                    <InfoField label="Role / Occupation" value={user?.employment_status || 'Not provided'} />
                    <InfoField label="Current Residence" value={user?.residence || 'Not provided'} />
                    <InfoField label="Date of Birth" value={user?.date_of_birth || 'Not provided'} />
                </div>
            </div>

            {/* Premium Commitment Section */}
            <div style={{
                position: 'relative',
                borderRadius: '1.5rem',
                padding: '3rem',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                background: user?.commitment_status === 'Committed Member'
                    ? 'linear-gradient(135deg, var(--surface-1) 0%, rgba(16, 185, 129, 0.05) 100%)'
                    : 'linear-gradient(135deg, var(--surface-1) 0%, rgba(34, 193, 230, 0.05) 100%)',
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)'
            }}>
                {/* Decorative background element */}
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    background: user?.commitment_status === 'Committed Member' ? '#10b981' : 'var(--primary)',
                    filter: 'blur(100px)',
                    opacity: 0.1,
                    zIndex: 0
                }}></div>

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2.5rem' }}>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '1rem',
                                background: user?.commitment_status === 'Committed Member' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(34, 193, 230, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                🏛️
                            </div>
                            <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '1.5rem', fontWeight: '900' }}>Ministry Connection</h3>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '10', margin: 0, maxWidth: '550px', lineHeight: '1.6' }}>
                            {user?.commitment_status === 'Committed Member'
                                ? "You are a recognized pillar of our ministry. Your official commitment enables us to grow together in faith and service."
                                : "Take the next step in your spiritual journey. Becoming a committed member opens doors to leadership, deeper service, and ministerial support."}
                        </p>
                    </div>

                    {user?.commitment_status !== 'Committed Member' ? (
                        <button
                            onClick={() => setShowConfirm(true)}
                            disabled={loading}
                            style={{
                                background: 'var(--primary)',
                                color: 'var(--text-color)',
                                border: 'none',
                                padding: '1.25rem 2.5rem',
                                borderRadius: '1rem',
                                fontWeight: '900',
                                fontSize: '1.1rem',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                boxShadow: '0 15px 30px -5px rgba(34, 193, 230, 0.4)',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 20px 35px -5px rgba(34, 193, 230, 0.5)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(34, 193, 230, 0.4)'; }}
                        >
                            Complete My Commitment
                        </button>
                    ) : (
                        <div style={{
                            background: 'rgba(16, 185, 129, 0.1)',
                            padding: '1.5rem 2rem',
                            borderRadius: '1.25rem',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            color: '#10b981',
                            fontWeight: '900',
                            fontSize: '1.1rem'
                        }}>
                            <div style={{
                                background: '#10b981',
                                color: 'var(--text-color)',
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.9rem',
                                boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)'
                            }}>✓</div>
                            Committed Member
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <ModalOverlay onClose={() => setShowConfirm(false)}>
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>🙌</div>
                    <h2 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontSize: '2rem', fontWeight: '900', letterSpacing: '-0.02em' }}>Finalize Commitment</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        Are you ready to step forward as an official pillar of our community?
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={() => setShowConfirm(false)}
                            style={{
                                flex: 1,
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                border: '1px solid var(--border-color)',
                                background: 'transparent',
                                color: 'var(--text-color)',
                                fontWeight: '700',
                                cursor: 'pointer'
                            }}
                        >
                            Maybe Later
                        </button>
                        <button
                            onClick={handleCommit}
                            disabled={loading}
                            style={{
                                flex: 1,
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                border: 'none',
                                background: 'var(--primary)',
                                color: 'var(--text-color)',
                                fontWeight: '900',
                                cursor: 'pointer',
                                boxShadow: '0 10px 20px -5px rgba(34, 193, 230, 0.3)'
                            }}
                        >
                            {loading ? 'Confirming...' : 'Yes, I Commit'}
                        </button>
                    </div>
                </ModalOverlay>
            )}

            {/* Success Modal */}
            {showSuccess && (
                <ModalOverlay onClose={() => setShowSuccess(false)}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                        transform: 'rotate(-5deg)'
                    }}>
                        <span style={{ fontSize: '4rem', color: '#10b981' }}>🥇</span>
                    </div>
                    <h2 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontSize: '2.25rem', fontWeight: '900', letterSpacing: '-0.04em' }}>Welcome Aboard!</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        You've officially joined the inner circle of our ministry. Your commitment is a testament to your faith and service!
                    </p>
                    <button
                        onClick={() => setShowSuccess(false)}
                        style={{
                            width: '100%',
                            padding: '1.25rem',
                            borderRadius: '1rem',
                            border: 'none',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'var(--text-color)',
                            fontWeight: '900',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            boxShadow: '0 15px 30px -10px rgba(16, 185, 129, 0.5)'
                        }}
                    >
                        Glory to God!
                    </button>
                </ModalOverlay>
            )}
        </div>
    );
};

export default PersonalInfoPanel;
