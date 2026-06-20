import React, { useState } from 'react';
import api from '../../../api/axios';

const AddDevotionalModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        slug: '',
        scriptureReference: '',
        author: '',
        scriptureText: '',
        message: '',
        kingdomInsight: '',
        prayer: '',
        featuredImage: '',
        status: 'Draft'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('devotionals', formData);
            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            console.error("Error creating devotional", error);
            alert("Failed to create devotional. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Styling from the image
    const inputStyle = {
        width: '100%',
        padding: '0.75rem 1rem',
        background: '#0d0a14',
        border: '1px solid rgba(34, 193, 230, 0.3)',
        borderRadius: '0.4rem',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        marginTop: '0.4rem',
        outline: 'none',
        fontFamily: 'inherit'
    };

    const textareaStyle = {
        ...inputStyle,
        minHeight: '80px',
        resize: 'vertical',
        fontFamily: 'monospace'
    };

    const labelStyle = {
        color: 'var(--text-color)',
        fontSize: '0.85rem',
        fontWeight: '700',
        display: 'block'
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            padding: '2rem'
        }}>
            <div style={{
                background: '#120d1e',
                borderRadius: '0.5rem',
                width: '100%',
                maxWidth: '650px',
                border: '1px solid rgba(34, 193, 230, 0.2)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh'
            }}>
                <div style={{ 
                    padding: '1.5rem 2rem', 
                    borderBottom: '1px solid rgba(34, 193, 230, 0.2)',
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexShrink: 0
                }}>
                    <h2 style={{ fontSize: '1.4rem', color: 'var(--primary)', margin: 0, fontWeight: '700' }}>
                        Add New Devotional
                    </h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer', padding: 0 }}>×</button>
                </div>

                <div style={{ padding: '2rem', overflowY: 'auto' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={labelStyle}>Title *</label>
                                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter devotional title" style={{...inputStyle, color: formData.title ? 'white' : 'var(--text-muted)'}} required />
                            </div>
                            <div>
                                <label style={labelStyle}>Date *</label>
                                <input type="date" name="date" value={formData.date} onChange={handleChange} style={{ ...inputStyle, colorScheme: 'dark', color: formData.date ? 'white' : 'var(--text-muted)' }} required />
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>Slug</label>
                            <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="url-friendly-slug" style={{...inputStyle, color: formData.slug ? 'white' : 'var(--text-muted)'}} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={labelStyle}>Scripture Reference *</label>
                                <input type="text" name="scriptureReference" value={formData.scriptureReference} onChange={handleChange} placeholder="e.g., John 3:16" style={{...inputStyle, color: formData.scriptureReference ? 'white' : 'var(--text-muted)'}} required />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <label style={labelStyle}>Author</label>
                                <select name="author" value={formData.author} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: formData.author ? 'white' : 'var(--text-muted)' }}>
                                    <option value="" style={{ color: 'var(--text-color)', background: 'var(--surface-2)' }}>Select Author</option>
                                    <option value="Pastor Tim" style={{ color: 'var(--text-color)', background: 'var(--surface-2)' }}>Pastor Tim</option>
                                    <option value="Guest Speaker" style={{ color: 'var(--text-color)', background: 'var(--surface-2)' }}>Guest Speaker</option>
                                </select>
                                <span style={{ position: 'absolute', right: '1rem', top: '2.3rem', pointerEvents: 'none', color: 'var(--text-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>v</span>
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>Scripture Text *</label>
                            <textarea name="scriptureText" value={formData.scriptureText} onChange={handleChange} placeholder="Enter the scripture verse text" style={{...textareaStyle, color: formData.scriptureText ? 'white' : 'var(--text-muted)'}} required />
                        </div>

                        <div>
                            <label style={labelStyle}>Message *</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Enter the devotional message/reflection" style={{ ...textareaStyle, minHeight: '120px', color: formData.message ? 'white' : 'var(--text-muted)' }} required />
                        </div>

                        <div>
                            <label style={labelStyle}>Kingdom Insight</label>
                            <textarea name="kingdomInsight" value={formData.kingdomInsight} onChange={handleChange} placeholder="Enter Kingdom Insight (optional)" style={{...textareaStyle, color: formData.kingdomInsight ? 'white' : 'var(--text-muted)'}} />
                        </div>

                        <div>
                            <label style={labelStyle}>Prayer</label>
                            <textarea name="prayer" value={formData.prayer} onChange={handleChange} placeholder="Enter Prayer (optional)" style={{...textareaStyle, color: formData.prayer ? 'white' : 'var(--text-muted)'}} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={labelStyle}>Featured Image URL</label>
                                <input type="text" name="featuredImage" value={formData.featuredImage} onChange={handleChange} placeholder="https://example.com/image.jpg" style={{...inputStyle, color: formData.featuredImage ? 'white' : 'var(--text-muted)'}} />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <label style={labelStyle}>Status</label>
                                <select name="status" value={formData.status} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: 'var(--text-color)' }}>
                                    <option value="Draft" style={{ color: 'var(--text-color)', background: 'var(--surface-2)' }}>Draft</option>
                                    <option value="Published" style={{ color: 'var(--text-color)', background: 'var(--surface-2)' }}>Published</option>
                                </select>
                                <span style={{ position: 'absolute', right: '1rem', top: '2.3rem', pointerEvents: 'none', color: 'var(--text-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>v</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                            <button type="button" onClick={onClose} style={{
                                padding: '0.6rem 1.2rem',
                                border: '1px solid rgba(34, 193, 230, 0.4)',
                                background: 'transparent',
                                color: 'var(--text-color)',
                                borderRadius: '0.4rem',
                                fontWeight: '600',
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
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontSize: '0.85rem',
                                opacity: loading ? 0.7 : 1
                            }} disabled={loading}>
                                {loading ? 'Saving...' : 'Add Devotional'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDevotionalModal;
