import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';

const UploadLiveStreamModal = ({ onClose, onUploadSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        streamUrl: '',
        isLive: true
    });
    const [existingStreams, setExistingStreams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [streamToDelete, setStreamToDelete] = useState(null);

    useEffect(() => {
        const fetchStreams = async () => {
            try {
                const response = await api.get('/sermons/live/');
                setExistingStreams(response.data.results || response.data);
            } catch (error) {
                console.error("Error fetching streams:", error);
            } finally {
                setFetching(false);
            }
        };
        fetchStreams();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleToggleExisting = async (streamId, currentStatus) => {
        try {
            await api.patch(`/sermons/live/${streamId}/`, { is_live: !currentStatus });
            setExistingStreams(prev => prev.map(s => s.id === streamId ? { ...s, is_live: !currentStatus } : s));
            if (onUploadSuccess) onUploadSuccess();
        } catch (error) {
            console.error('Error toggling stream:', error);
            alert('Failed to update stream status.');
        }
    };

    const triggerDelete = (streamId) => {
        setStreamToDelete(streamId);
    };

    const confirmDelete = async () => {
        if (!streamToDelete) return;
        try {
            await api.delete(`/sermons/live/${streamToDelete}/`);
            setExistingStreams(prev => prev.filter(s => s.id !== streamToDelete));
            if (onUploadSuccess) onUploadSuccess();
            setStreamToDelete(null);
        } catch (error) {
            console.error('Error deleting stream:', error);
            alert('Failed to delete stream.');
            setStreamToDelete(null);
        }
    };

    const cancelDelete = () => {
        setStreamToDelete(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.streamUrl) {
            alert('Please enter a stream URL.');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                title: formData.title,
                stream_url: formData.streamUrl,
                is_live: formData.isLive
            };
            await api.post('/sermons/live/', payload);
            if (onUploadSuccess) onUploadSuccess();
            onClose();
        } catch (error) {
            console.error('Error creating live stream:', error);
            alert('Failed to create live stream configuration.');
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
                maxWidth: '650px',
                maxHeight: '90vh',
                overflowY: 'auto',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--danger)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ animation: 'pulse 2s infinite', fontSize: '1rem' }}>🔴</span> Manage Live Streams
                    </h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                {/* Existing Streams Section */}
                <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--surface-2)', borderRadius: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--text-color)', marginTop: 0, marginBottom: '1rem' }}>Current Configurations</h3>
                    {fetching ? (
                        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Loading existing streams...</p>
                    ) : existingStreams.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {existingStreams.map(stream => (
                                <div key={stream.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-color)', padding: '0.8rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                                    <div>
                                        <div style={{ fontWeight: '600', color: 'var(--text-color)' }}>{stream.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{stream.stream_url}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <button
                                            onClick={() => handleToggleExisting(stream.id, stream.is_live)}
                                            style={{
                                                background: stream.is_live ? 'var(--danger)' : 'var(--surface-1)',
                                                color: stream.is_live ? 'white' : 'var(--text-muted)',
                                                border: `1px solid ${stream.is_live ? 'var(--danger)' : 'var(--border-color)'}`,
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '0.4rem',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {stream.is_live ? 'End Stream' : 'Go Live'}
                                        </button>
                                        <button
                                            onClick={() => triggerDelete(stream.id)}
                                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                                            title="Delete Configuration"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>No live streams configured yet.</p>
                    )}
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />

                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-color)', marginTop: 0, marginBottom: '1rem' }}>Add New Live Stream</h3>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                    <div>
                        <label style={labelStyle}>Stream Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Sunday Service - Live Now" style={inputStyle} required />
                    </div>

                    <div>
                        <label style={labelStyle}>Live Stream Link (YouTube Live / Facebook Live)</label>
                        <input
                            type="url"
                            name="streamUrl"
                            value={formData.streamUrl}
                            onChange={handleChange}
                            placeholder="https://www.youtube.com/watch?v=..."
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.5rem', padding: '1rem', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                        <input
                            type="checkbox"
                            id="isLive"
                            name="isLive"
                            checked={formData.isLive}
                            onChange={handleChange}
                            style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--danger)', cursor: 'pointer' }}
                        />
                        <label htmlFor="isLive" style={{ color: 'var(--text-color)', fontWeight: '600', cursor: 'pointer' }}>
                            Set as LIVE instantly
                        </label>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} disabled={loading} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}>Close</button>
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
                            {loading ? 'Saving...' : 'Add Configuration'}
                        </button>
                    </div>
                </form>
            </div>

            {streamToDelete && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 2000
                }}>
                    <div style={{
                        background: 'var(--surface-1)',
                        padding: '2.5rem',
                        borderRadius: '1.5rem',
                        border: '1px solid var(--danger)',
                        boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.25)',
                        maxWidth: '450px',
                        width: '90%',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
                        <h2 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontSize: '1.5rem' }}>Delete Configuration?</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                            You are about to permanently delete this stream configuration. This action cannot be undone. Are you sure you wish to proceed?
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button
                                onClick={cancelDelete}
                                style={{
                                    padding: '0.8rem 1.5rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    background: 'transparent',
                                    color: 'var(--text-color)',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s',
                                    flex: 1
                                }}
                                onMouseOver={(e) => e.target.style.background = 'var(--border-color)'}
                                onMouseOut={(e) => e.target.style.background = 'transparent'}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                style={{
                                    padding: '0.8rem 1.5rem',
                                    borderRadius: '0.75rem',
                                    border: 'none',
                                    background: '#f43f5e',
                                    color: 'var(--text-color)',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'opacity 0.2s',
                                    flex: 1
                                }}
                                onMouseOver={(e) => e.target.style.opacity = '0.9'}
                                onMouseOut={(e) => e.target.style.opacity = '1'}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes pulse {
                    0% { opacity: 1; text-shadow: 0 0 5px rgba(244, 63, 94, 0.5); }
                    50% { opacity: 0.5; text-shadow: 0 0 20px rgba(244, 63, 94, 1); }
                    100% { opacity: 1; text-shadow: 0 0 5px rgba(244, 63, 94, 0.5); }
                }
            `}</style>
        </div>
    );
};

export default UploadLiveStreamModal;
