import React, { useState } from 'react';
import api from '../../../../api/axios';

const EditProfilePictureModal = ({ user, onClose, onUpdate }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setError('Please select an image first.');
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        // Use a simple key to avoid PHP dot/underscore conversion bugs
        formData.append('avatar', selectedFile);
        formData.append('email', user.email);

        try {
            await api.post('accounts/user/avatar/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onUpdate();
            onClose();
        } catch (err) {
            console.error('Error uploading avatar:', err);
            setError('Failed to upload avatar. Please try again.');
        } finally {
            setLoading(false);
        }
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
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                textAlign: 'center'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>Edit Profile Picture</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && <div style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</div>}

                    {/* Preview Area */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            background: 'var(--bg-color)',
                            border: '4px solid #22c1e6',
                            margin: '0 auto',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            backgroundImage: previewUrl ? `url(${previewUrl})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                            {!previewUrl && <span style={{ fontSize: '3rem', color: 'var(--text-color)' }}>?</span>}
                        </div>
                    </div>

                    {/* File Input */}
                    <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                        <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '500', display: 'block', marginBottom: '0.5rem' }}>Select Image File</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                background: 'var(--bg-color)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.5rem',
                                color: 'var(--text-color)',
                                fontSize: '0.9rem',
                                outline: 'none'
                            }}
                        />
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Recommended: Square image, max 2MB.</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
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

export default EditProfilePictureModal;
