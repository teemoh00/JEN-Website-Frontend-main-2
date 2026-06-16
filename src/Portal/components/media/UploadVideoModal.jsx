import React, { useState, useRef } from 'react';
import api from '../../../api/axios';

const UploadVideoModal = ({ onClose, onUploadSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        preacher: '',
        date: '',
        videoUrl: ''
    });
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const thumbnailInputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleThumbnailSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.type.startsWith('image/')) {
                setThumbnailFile(selectedFile);
            } else {
                alert('Please upload an image file (JPG, PNG, etc.)');
            }
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.videoUrl) {
            alert('Please enter a video URL.');
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('preacher', formData.preacher);
            data.append('date', formData.date);
            data.append('video_url', formData.videoUrl); // Backend field mapping
            if (thumbnailFile) {
                data.append('thumbnail', thumbnailFile);
            }

            await api.post('/sermons/video/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (onUploadSuccess) onUploadSuccess();
            onClose();
        } catch (error) {
            console.error('Error uploading video sermon:', error);
            alert('Failed to add video. Please try again.');
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
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>Add Video Content</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>

                    {/* Video Source */}
                    <div>
                        <label style={labelStyle}>Video Link (YouTube / Vimeo)</label>
                        <input
                            type="url"
                            name="videoUrl"
                            value={formData.videoUrl}
                            onChange={handleChange}
                            placeholder="https://www.youtube.com/watch?v=..."
                            style={inputStyle}
                            required
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label style={labelStyle}>Video Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Sunday Service Live" style={inputStyle} required />
                    </div>

                    {/* Preacher & Date */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Preacher / Speaker</label>
                            <input type="text" name="preacher" value={formData.preacher} onChange={handleChange} placeholder="e.g. Pst. John Doe" style={inputStyle} required />
                        </div>
                        <div>
                            <label style={labelStyle}>Date Recorded</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} required />
                        </div>
                    </div>

                    {/* Thumbnail Image */}
                    <div>
                        <label style={{ ...labelStyle, display: 'block', marginBottom: '0.4rem' }}>Thumbnail Image (Optional)</label>
                        <div
                            onClick={() => thumbnailInputRef.current?.click()}
                            style={{
                                border: '2px dashed rgba(255,255,255,0.2)',
                                borderRadius: '0.75rem',
                                padding: '1.5rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                background: 'var(--surface-2)'
                            }}
                        >
                            <input
                                type="file"
                                ref={thumbnailInputRef}
                                onChange={handleThumbnailSelect}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🖼️</div>
                            {thumbnailFile ? (
                                <div style={{ color: 'var(--primary)', fontWeight: '500' }}>{thumbnailFile.name}</div>
                            ) : (
                                <>
                                    <div style={{ color: 'var(--text-color)', fontWeight: '500' }}>Click to select thumbnail</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>JPG, PNG, WEBP supported</div>
                                </>
                            )}
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
                            {loading ? 'Adding...' : 'Add Video'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadVideoModal;
