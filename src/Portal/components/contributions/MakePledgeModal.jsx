import React, { useState } from 'react';

const MakePledgeModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        amount: '',
        date: '',
        purpose: '',
        pledgeType: '',
        attendeesSponsored: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Pledge recorded: ' + JSON.stringify(formData));
        onClose();
    };

    const inputStyle = {
        width: '100%',
        padding: '0.5rem 0',
        background: 'transparent',
        border: 'none',
        color: 'var(--text-color)',
        fontSize: '0.9rem',
        marginTop: '0.25rem',
        outline: 'none',
        fontWeight: '600'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        fontWeight: '600',
        display: 'block'
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
            zIndex: 1100,
            padding: '1rem'
        }}>
            <div style={{
                background: '#1A1625', // Using specific dark color
                borderRadius: '0.8rem',
                width: '100%',
                maxWidth: '450px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh'
            }}>
                <div style={{ 
                    padding: '1.5rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexShrink: 0
                }}>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--text-color)', margin: 0, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>🙏</span> Make Pledge
                    </h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer', padding: 0 }}>×</button>
                </div>

                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', overflowY: 'auto' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        
                        <div>
                            <label style={labelStyle}>Full Name *</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. John Doe" style={inputStyle} required />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={labelStyle}>Email *</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" style={inputStyle} required />
                            </div>

                            <div>
                                <label style={labelStyle}>Phone</label>
                                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="07XXXXXXXX" style={inputStyle} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={labelStyle}>Amount (KES) *</label>
                                <input type="number" name="amount" value={formData.amount} onChange={handleChange} style={inputStyle} required />
                            </div>

                            <div>
                                <label style={labelStyle}>Date *</label>
                                <input type="date" name="date" value={formData.date} onChange={handleChange} style={{ ...inputStyle, colorScheme: 'dark' }} required />
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>Purpose</label>
                            <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} placeholder="e.g. Building fund, Conference" style={inputStyle} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ position: 'relative' }}>
                                <label style={labelStyle}>Pledge Type</label>
                                <select name="pledgeType" value={formData.pledgeType} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                                    <option value="" style={{ color: 'var(--text-muted)', background: 'var(--surface-2)' }}>Select...</option>
                                    <option value="One-time" style={{ color: 'var(--text-color)', background: 'var(--surface-2)' }}>One-time</option>
                                    <option value="Monthly" style={{ color: 'var(--text-color)', background: 'var(--surface-2)' }}>Monthly</option>
                                    <option value="Annual" style={{ color: 'var(--text-color)', background: 'var(--surface-2)' }}>Annual</option>
                                </select>
                                <span style={{ position: 'absolute', right: '0', top: '1.75rem', pointerEvents: 'none', color: 'var(--text-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>v</span>
                            </div>

                            <div>
                                <label style={labelStyle}>Attendees Sponsored</label>
                                <input type="text" name="attendeesSponsored" value={formData.attendeesSponsored} onChange={handleChange} style={inputStyle} />
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>Notes</label>
                            <input type="text" name="notes" value={formData.notes} onChange={handleChange} placeholder="e.g. Payment timeline" style={inputStyle} />
                        </div>

                        <div style={{ marginTop: '0.5rem' }}>
                            <button type="submit" style={{
                                width: '100%',
                                padding: '0.875rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: 'var(--primary)',
                                color: 'var(--text-color)',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontSize: '0.95rem'
                            }}>Record Pledge</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MakePledgeModal;
