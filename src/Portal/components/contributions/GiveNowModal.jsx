import React, { useState } from 'react';

const GiveNowModal = ({ isOpen, onClose }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Tithe');

    if (!isOpen) return null;

    const categories = ['Tithe', 'Thanksgiving', 'Welfare', 'Building Fund', 'Missions', 'Seed of Faith'];

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '1rem'
        }} onClick={onClose}>
            <div style={{
                background: 'var(--surface-1)',
                width: '100%',
                maxWidth: '480px',
                borderRadius: '2rem',
                padding: '2.5rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                border: '1px solid var(--border-color)'
            }} onClick={e => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.5rem' }}
                >
                    ×
                </button>

                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-color)', textAlign: 'center' }}>
                    Giving to the Lord
                </h2>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.95rem' }}>
                    "Every man according as he purposeth in his heart, so let him give."
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-color)' }}>
                            Select Category
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: '0.75rem',
                                        border: category === cat ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                                        background: category === cat ? 'rgba(34, 193, 230, 0.05)' : 'var(--surface-2)',
                                        color: category === cat ? 'var(--primary)' : 'var(--text-color)',
                                        fontWeight: '600',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-color)' }}>
                            Enter Amount (KES)
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            style={{
                                width: '100%',
                                padding: '1.25rem',
                                borderRadius: '1rem',
                                border: '1px solid var(--border-color)',
                                background: 'var(--surface-2)',
                                color: 'var(--text-color)',
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                outline: 'none',
                                textAlign: 'center'
                            }}
                        />
                    </div>

                    <button
                        onClick={onClose}
                        style={{
                            width: '100%',
                            padding: '1.25rem',
                            borderRadius: '1rem',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'white',
                            fontWeight: '800',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            marginTop: '1rem',
                            boxShadow: '0 10px 15px -3px rgba(34, 193, 230, 0.4)'
                        }}
                    >
                        Proceed to Payment
                    </button>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', opacity: 0.6 }}>
                        <span style={{ fontSize: '1.5rem' }}>💳</span>
                        <span style={{ fontSize: '1.5rem' }}>📱</span>
                        <span style={{ fontSize: '1.5rem' }}>🏦</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiveNowModal;
