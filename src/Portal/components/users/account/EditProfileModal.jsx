import React, { useState } from 'react';
import api from '../../../../api/axios';

const EditProfileModal = ({ user, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        full_name: user?.profile?.full_name || '',
        about_me: user?.profile?.about_me || '',
        date_of_birth: user?.date_of_birth || '',
        residence: user?.residence || '',
        employment_status: user?.employment_status || ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.patch('accounts/user/', {
                date_of_birth: formData.date_of_birth,
                residence: formData.residence,
                employment_status: formData.employment_status,
                profile: {
                    full_name: formData.full_name,
                    about_me: formData.about_me
                }
            });
            onUpdate();
            onClose();
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        background: 'var(--bg-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '0.5rem',
        color: 'var(--text-color)',
        fontSize: '0.9rem',
        marginTop: '0.4rem',
        outline: 'none'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        fontWeight: '500',
        marginBottom: '0.5rem',
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>Edit Personal Details</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                    {error && <div style={{ color: '#ef4444', fontSize: '0.9rem' }}>{error}</div>}

                    {/* Full Name */}
                    <div>
                        <label style={labelStyle}>Full Name</label>
                        <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} style={inputStyle} required />
                    </div>

                    {/* About Me */}
                    <div>
                        <label style={labelStyle}>About Me</label>
                        <textarea
                            name="about_me"
                            value={formData.about_me}
                            onChange={handleChange}
                            rows="4"
                            style={{ ...inputStyle, resize: 'vertical' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {/* Date of Birth */}
                        <div>
                            <label style={labelStyle}>Date of Birth</label>
                            <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} style={inputStyle} />
                        </div>

                        {/* Location */}
                        <div>
                            <label style={labelStyle}>Location / Residence</label>
                            <input type="text" name="residence" value={formData.residence} onChange={handleChange} style={inputStyle} />
                        </div>
                    </div>

                    {/* Occupation */}
                    <div>
                        <label style={labelStyle}>Occupation / Employment Status</label>
                        <select
                            name="employment_status"
                            value={formData.employment_status}
                            onChange={handleChange}
                            style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                        >
                            <option value="">Select Employment Status</option>
                            <option value="Employed">Employed</option>
                            <option value="Self-Employed">Self-Employed</option>
                            <option value="Student">Student</option>
                            <option value="Unemployed">Unemployed</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} disabled={loading} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}>Cancel</button>
                        <button type="submit" disabled={loading} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'var(--bg-color)',
                            fontWeight: '700',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}>{loading ? 'Saving...' : 'Save Changes'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
