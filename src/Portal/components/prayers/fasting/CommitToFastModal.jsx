import React, { useState } from 'react';

const CommitToFastModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        daysFasting: []
    });

    const handleDayToggle = (day) => {
        setFormData(prev => ({
            ...prev,
            daysFasting: prev.daysFasting.includes(day)
                ? prev.daysFasting.filter(d => d !== day)
                : [...prev.daysFasting, day]
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Commitment simulated: ' + JSON.stringify(formData));
        onClose();
    };

    const inputStyle = {
        width: '100%',
        padding: '0.5rem 0',
        background: 'transparent',
        border: 'none',
        color: 'var(--text-color)',
        fontSize: '0.9rem',
        marginTop: '0.4rem',
        outline: 'none',
        fontWeight: '600'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        fontWeight: '600'
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100
        }}>
            <div style={{
                background: 'var(--surface-1)',
                padding: '2.5rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '480px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.4rem', color: 'var(--text-color)', margin: 0, fontWeight: '700' }}>Commit to Fast</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer', padding: 0 }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={labelStyle}>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            style={{ ...inputStyle, color: formData.fullName ? 'white' : 'var(--text-muted)', fontWeight: formData.fullName ? '600' : 'normal' }}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <label style={labelStyle}>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="0712 345 678"
                                style={{ ...inputStyle, color: formData.phone ? 'white' : 'var(--text-muted)', fontWeight: formData.phone ? '600' : 'normal' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@mail.com"
                                style={{ ...inputStyle, color: formData.email ? 'white' : 'var(--text-muted)', fontWeight: formData.email ? '600' : 'normal' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Days Fasting</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', marginTop: '0.8rem' }}>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                                const fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                                const fullDay = fullDays[idx];
                                const isSelected = formData.daysFasting.includes(fullDay);
                                return (
                                    <label key={fullDay} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        cursor: 'pointer',
                                        color: isSelected ? 'var(--primary)' : 'var(--text-muted)',
                                        fontSize: '0.9rem',
                                        fontWeight: isSelected ? '600' : 'normal'
                                    }}>
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleDayToggle(fullDay)}
                                            style={{ accentColor: 'var(--primary)', width: '16px', height: '16px', cursor: 'pointer' }}
                                        />
                                        {day}
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '0.5rem',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}>Cancel</button>
                        <button type="submit" style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '0.4rem',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'var(--text-color)',
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}>Submit Commitment</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommitToFastModal;
