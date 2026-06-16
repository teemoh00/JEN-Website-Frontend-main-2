import React, { useState } from 'react';

const CreateMemberModal = ({ onClose, initialStatus = 'Regular Member' }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        cellGroup: '',
        category: '',
        commitmentStatus: initialStatus,
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Member registration simulated: ' + JSON.stringify(formData));
        onClose();
    };

    const inputStyle = {
        width: '100%',
        padding: '0.5rem 0',
        background: 'transparent',
        border: 'none',
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        marginTop: '0.4rem',
        outline: 'none',
    };

    const labelStyle = {
        color: 'var(--text-color)',
        fontSize: '0.85rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
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
                padding: '2rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '600px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.4rem', color: 'var(--primary)', margin: 0, fontWeight: '700' }}>
                        {initialStatus === 'Committed Member' ? 'Register Committed Member' : 'Register New Member'}
                    </h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer', padding: 0 }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.2rem' }}>

                    {/* Full Name */}
                    <div style={{ marginBottom: '0.5rem' }}>
                        <label style={{...labelStyle, color: 'var(--text-muted)'}}><span style={{ color: '#8b5cf6', fontSize: '1rem' }}>👤</span> Full Name</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter full name" style={{...inputStyle, paddingLeft: '0.2rem'}} required />
                    </div>

                    {/* Phone & Email */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '0.5rem' }}>
                        <div>
                            <label style={{...labelStyle, color: 'var(--text-muted)'}}><span style={{ color: '#ec4899', fontSize: '1rem' }}>📞</span> Phone Number</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="0712 345 678" style={{...inputStyle, paddingLeft: '0.2rem'}} required />
                        </div>
                        <div>
                            <label style={{...labelStyle, color: 'var(--text-muted)'}}><span style={{ color: '#d8b4e2', fontSize: '1rem' }}>✉️</span> Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@mail.com" style={{...inputStyle, paddingLeft: '0.2rem'}} />
                        </div>
                    </div>

                    {/* Cell Group & Category */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '0.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <label style={{...labelStyle, color: 'var(--text-muted)'}}><span style={{ color: '#8b5cf6', fontSize: '1rem' }}>👥</span> Cell Group</label>
                            <select name="cellGroup" value={formData.cellGroup} onChange={handleChange} style={{...inputStyle, appearance: 'none', paddingLeft: '0.2rem', color: formData.cellGroup ? 'var(--text-color)' : 'var(--text-color)', fontWeight: '600'}}>
                                <option value="" disabled>Select Cell</option>
                                <option>Goshen Alpha</option>
                                <option>Judah Beta</option>
                                <option>Zion</option>
                                <option>None</option>
                            </select>
                            <span style={{ position: 'absolute', right: '0.5rem', top: '2.2rem', pointerEvents: 'none', fontSize: '0.8rem', color: 'var(--text-color)', fontWeight: 'bold' }}>v</span>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <label style={{...labelStyle, color: 'var(--text-muted)'}}><span style={{ color: '#fcd34d', fontSize: '1rem' }}>🏷️</span> Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} style={{...inputStyle, appearance: 'none', paddingLeft: '0.2rem', color: formData.category ? 'var(--text-color)' : 'var(--text-color)', fontWeight: '600'}}>
                                <option value="" disabled>Select Category</option>
                                <option>Member</option>
                                <option>Leader</option>
                                <option>Visitor</option>
                                <option>Child</option>
                            </select>
                            <span style={{ position: 'absolute', right: '0.5rem', top: '2.2rem', pointerEvents: 'none', fontSize: '0.8rem', color: 'var(--text-color)', fontWeight: 'bold' }}>v</span>
                        </div>
                    </div>

                    {/* Commitment Status */}
                    <div style={{ marginBottom: '0.5rem' }}>
                        <label style={{...labelStyle, color: 'var(--text-muted)'}}><span style={{ color: '#a1a1aa', fontSize: '1rem' }}>♡</span> Commitment Status</label>
                        <div style={{ display: 'flex', gap: '2rem', marginTop: '0.8rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: formData.commitmentStatus === 'Regular Member' ? 'var(--primary)' : 'var(--text-muted)' }}>
                                <input
                                    type="radio"
                                    name="commitmentStatus"
                                    value="Regular Member"
                                    checked={formData.commitmentStatus === 'Regular Member'}
                                    onChange={handleChange}
                                    style={{ accentColor: formData.commitmentStatus === 'Regular Member' ? 'var(--primary)' : 'var(--text-muted)' }}
                                />
                                Regular Member
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: formData.commitmentStatus === 'Committed Member' ? 'var(--primary)' : 'var(--text-muted)' }}>
                                <input
                                    type="radio"
                                    name="commitmentStatus"
                                    value="Committed Member"
                                    checked={formData.commitmentStatus === 'Committed Member'}
                                    onChange={handleChange}
                                    style={{ accentColor: formData.commitmentStatus === 'Committed Member' ? 'var(--primary)' : 'var(--text-muted)' }}
                                />
                                Committed Member
                            </label>
                        </div>
                    </div>

                    {/* Address */}
                    <div style={{ marginBottom: '0.5rem' }}>
                        <label style={{...labelStyle, color: 'var(--text-muted)'}}><span style={{ color: '#ec4899', fontSize: '1rem' }}>📍</span> Home Address / Location</label>
                        <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Enter residential area or specific address" style={{ ...inputStyle, minHeight: '60px', resize: 'vertical', paddingLeft: '0.2rem', fontFamily: 'monospace' }} />
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '0.5rem',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--text-color)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}>Cancel</button>
                        <button type="submit" style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '0.4rem',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'white',
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}>Register Member</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMemberModal;
