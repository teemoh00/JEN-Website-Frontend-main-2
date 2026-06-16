import React, { useState } from 'react';
import api from '../../../api/axios';

const UploadAudioModal = ({ onClose, onUploadSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        preacher: '',
        date: '',
        audioUrl: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.audioUrl) {
            alert('Please enter an audio URL.');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                title: formData.title,
                preacher: formData.preacher,
                date: formData.date,
                audio_url: formData.audioUrl
            };
            await api.post('/sermons/audio/', payload);
            if (onUploadSuccess) onUploadSuccess();
            onClose();
        } catch (error) {
            const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message;
            console.error('Error uploading audio sermon:', error);
            alert(`Failed to upload audio sermon. Reason: ${errorMsg}`);
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
                maxWidth: '600px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>Upload Audio Sermon</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                    {/* Audio Source */}
                    <div>
                        <label style={labelStyle}>Audio Link (SoundCloud, Spotify, etc.)</label>
                        <input
                            type="url"
                            name="audioUrl"
                            value={formData.audioUrl}
                            onChange={handleChange}
                            placeholder="https://soundcloud.com/..."
                            style={inputStyle}
                            required
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label style={labelStyle}>Sermon Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. The Power of Faith" style={inputStyle} required />
                    </div>

                    {/* Preacher & Date */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Preacher / Speaker</label>
                            <input type="text" name="preacher" value={formData.preacher} onChange={handleChange} placeholder="e.g. Pst. John Doe" style={inputStyle} required />
                        </div>
                        <div>
                            <label style={labelStyle}>Date Preached</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} required />
                        </div>
                    </div>



                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} disabled={loading} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}>Cancel</button>
                        <button type="submit" disabled={loading} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'var(--bg-color)',
                            fontWeight: '700',
                            cursor: 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}>
                            {loading ? 'Uploading...' : 'Upload Sermon'}
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default UploadAudioModal;
