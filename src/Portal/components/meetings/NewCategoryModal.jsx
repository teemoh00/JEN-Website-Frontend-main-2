import React, { useState } from 'react';
import axios from '../../../api/axios';

const NewCategoryModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        color: 'var(--primary)'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const colors = [
        'var(--primary)', // Cyan
        'var(--secondary)', // Purple
        '#f59e0b', // Orange
        '#ef4444', // Red
        '#4ade80', // Green
        '#ec4899', // Pink
        '#6366f1', // Indigo
    ];

    const Alert = ({ type, message }) => {
        const isError = type === 'error';
        const bgColor = isError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(74, 222, 128, 0.1)';
        const borderColor = isError ? '#ef4444' : '#4ade80';
        const icon = isError ? '⚠️' : '✅';

        return (
            <div style={{
                padding: '0.8rem 1rem',
                borderRadius: '0.75rem',
                background: bgColor,
                border: `1px solid ${borderColor}`,
                color: isError ? '#fca5a5' : '#86efac',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                animation: 'slideIn 0.3s ease-out'
            }}>
                <span style={{ fontSize: '1.1rem' }}>{icon}</span>
                <span>{message}</span>
                <style>{`
                    @keyframes slideIn {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleColorSelect = (color) => {
        setFormData(prev => ({ ...prev, color }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await axios.post('meetings/categories/', formData);
            setSuccess(true);
            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 1500);
        } catch (err) {
            console.error('Error creating category:', err);
            setError(err.response?.data?.name || 'Failed to create category. Please try again.');
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
        marginTop: '0.4rem'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        fontWeight: '500'
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
                maxWidth: '450px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-color)', margin: 0 }}>New Category</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={labelStyle}>Category Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Special Events"
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Category Color</label>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                            {colors.map(color => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => handleColorSelect(color)}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: color,
                                        border: formData.color === color ? '3px solid white' : '2px solid transparent',
                                        cursor: 'pointer',
                                        boxShadow: formData.color === color ? '0 0 0 2px #22c1e6' : 'none',
                                        transition: 'all 0.2s'
                                    }}
                                    aria-label={`Select color ${color}`}
                                />
                            ))}
                        </div>
                    </div>

                    {error && <Alert type="error" message={error} />}
                    {success && <Alert type="success" message="Category created successfully!" />}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                        <button type="button" onClick={onClose} disabled={loading} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.5 : 1
                        }}>Cancel</button>
                        <button type="submit" disabled={loading} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'var(--bg-color)',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}>{loading ? 'Creating...' : 'Create Category'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewCategoryModal;
