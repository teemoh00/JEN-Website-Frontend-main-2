import React, { useState } from 'react';

const RecordIncomeModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        incomeType: '',
        amount: '',
        date: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Income recorded: ' + JSON.stringify(formData));
        onClose();
    };

    const inputStyle = {
        width: '100%',
        padding: '0.5rem 0',
        background: 'transparent',
        border: 'none',
        color: 'white',
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
                maxWidth: '420px',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ 
                    padding: '1.5rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                }}>
                    <h2 style={{ fontSize: '1.25rem', color: 'white', margin: 0, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>💰</span> Record Income
                    </h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer', padding: 0 }}>×</button>
                </div>

                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        
                        <div style={{ position: 'relative' }}>
                            <label style={labelStyle}>Income Type *</label>
                            <select name="incomeType" value={formData.incomeType} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} required>
                                <option value="" style={{ color: 'var(--text-muted)', background: 'var(--surface-2)' }}>Select income type...</option>
                                <option value="Tithe" style={{ color: 'var(--text-color)', background: 'var(--surface-2)' }}>Tithe</option>
                                <option value="Offering" style={{ color: 'var(--text-color)', background: 'var(--surface-2)' }}>Offering</option>
                                <option value="Thanksgiving" style={{ color: 'var(--text-color)', background: 'var(--surface-2)' }}>Thanksgiving</option>
                            </select>
                            <span style={{ position: 'absolute', right: '0', top: '1.75rem', pointerEvents: 'none', color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>v</span>
                        </div>

                        <div>
                            <label style={labelStyle}>Amount (KES) *</label>
                            <input type="number" name="amount" value={formData.amount} onChange={handleChange} style={inputStyle} required />
                        </div>

                        <div>
                            <label style={labelStyle}>Date *</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} style={{ ...inputStyle, colorScheme: 'dark' }} required />
                        </div>

                        <div>
                            <label style={labelStyle}>Description</label>
                            <input type="text" name="description" value={formData.description} onChange={handleChange} style={inputStyle} />
                        </div>

                        <div style={{ marginTop: '0.5rem' }}>
                            <button type="submit" style={{
                                width: '100%',
                                padding: '0.875rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: 'var(--primary)',
                                color: 'white',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontSize: '0.95rem'
                            }}>Record Income</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RecordIncomeModal;
