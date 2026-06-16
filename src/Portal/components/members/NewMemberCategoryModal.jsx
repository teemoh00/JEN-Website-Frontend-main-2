import React, { useState } from 'react';

const NewMemberCategoryModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        color: '#22c1e6'
    });

    const colors = [
        '#22c1e6', // Cyan
        '#fef08a', // Pale Yellow
        '#f59e0b', // Orange
        '#ef4444', // Red
        '#4ade80', // Green
        '#ec4899', // Pink
        '#6366f1', // Indigo
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleColorSelect = (color) => {
        setFormData(prev => ({ ...prev, color }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Category creation simulated: ' + JSON.stringify(formData));
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
        outline: 'none'
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
                padding: '2rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '450px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.4rem', color: 'var(--text-color)', margin: 0, fontWeight: '700' }}>New Member Category</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer', padding: 0 }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={labelStyle}>Category Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Visitor, Member, Leader"
                            style={{...inputStyle, color: 'var(--text-muted)', paddingLeft: '0.5rem'}}
                            required
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Description (Optional)</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Brief description of who belongs to this category..."
                            style={{ ...inputStyle, minHeight: '60px', resize: 'both', fontFamily: 'monospace', color: 'var(--text-muted)', paddingLeft: '0.5rem' }}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Color Tag</label>
                        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                            {colors.map(color => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => handleColorSelect(color)}
                                    style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        background: color,
                                        border: formData.color === color ? '2px solid white' : 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        padding: 0
                                    }}
                                    aria-label={`Select color ${color}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1.5rem', marginTop: '1rem' }}>
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
                            color: 'white',
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}>Create Category</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewMemberCategoryModal;
