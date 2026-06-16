import React, { useState } from 'react';

const CreateFollowUpModal = ({ onClose }) => {
    const [member, setMember] = useState('');
    const [type, setType] = useState('General');
    const [message, setMessage] = useState('');

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                background: '#0f0f13', // Deep dark matching the image
                width: '100%',
                maxWidth: '500px',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                position: 'relative'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ margin: 0, color: '#ffffff', fontSize: '1.5rem', fontWeight: '800' }}>New Follow-Up</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            fontSize: '1.25rem',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Form Body */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Member Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Member</label>
                        <input
                            type="text"
                            placeholder="Search member..."
                            value={member}
                            onChange={(e) => setMember(e.target.value)}
                            style={{
                                padding: '0.75rem 0',
                                background: 'transparent',
                                border: 'none',
                                color: '#ffffff',
                                fontSize: '0.95rem',
                                outline: 'none',
                                fontWeight: '500'
                            }}
                        />
                    </div>

                    {/* Type Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Type</label>
                        <div style={{ position: 'relative' }}>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 0',
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#ffffff',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    appearance: 'none',
                                    cursor: 'pointer',
                                    fontWeight: '700'
                                }}
                            >
                                <option value="General" style={{ color: 'var(--text-color)', background: 'var(--bg-color)' }}>General</option>
                                <option value="Pastoral Care" style={{ color: 'var(--text-color)', background: 'var(--bg-color)' }}>Pastoral Care</option>
                                <option value="First Timer" style={{ color: 'var(--text-color)', background: 'var(--bg-color)' }}>First Timer</option>
                            </select>
                            <span style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#ffffff', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                ▼
                            </span>
                        </div>
                    </div>

                    {/* Message Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Message</label>
                        <textarea
                            placeholder="Follow-up message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            style={{
                                padding: '0.75rem 0',
                                background: 'transparent',
                                border: 'none',
                                color: '#ffffff',
                                fontSize: '0.95rem',
                                outline: 'none',
                                resize: 'vertical',
                                minHeight: '80px',
                                fontFamily: 'inherit',
                                fontWeight: '500'
                            }}
                        />
                    </div>
                </div>

                {/* Footer Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1.5rem', marginTop: '3rem' }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            background: '#94a3b8', // matches the light grey-blue in mockup
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            cursor: 'pointer'
                        }}
                    >
                        Create Follow-Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateFollowUpModal;
