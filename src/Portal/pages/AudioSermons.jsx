import React, { useState } from 'react';
import AudioPlayer from '../components/media/AudioPlayer';
import { MOCK_AUDIO_SERMONS } from '../../mockData';

const AudioSermons = () => {
    const [sermons, setSermons] = useState(MOCK_AUDIO_SERMONS);
    const [loading] = useState(false);
    const [audioToDelete, setAudioToDelete] = useState(null);

    const triggerDelete = (id) => {
        setAudioToDelete(id);
    };

    const confirmDelete = () => {
        if (!audioToDelete) return;
        setSermons(prev => prev.filter(s => s.id !== audioToDelete));
        setAudioToDelete(null);
    };

    const cancelDelete = () => {
        setAudioToDelete(null);
    };
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '2rem' }}>Audio Sermons Archive</h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <input
                    type="text"
                    placeholder="Search sermons..."
                    style={{
                        flex: 1,
                        background: 'var(--surface-1)',
                        border: '1px solid var(--border-color)',
                        padding: '0.8rem 1.5rem',
                        borderRadius: '0.5rem',
                        color: 'var(--text-color)'
                    }}
                />
                <select style={{ background: 'var(--surface-1)', border: '1px solid var(--border-color)', color: 'var(--text-color)', padding: '0 1rem', borderRadius: '0.5rem' }}>
                    <option>All Speakers</option>
                </select>
                <select style={{ background: 'var(--surface-1)', border: '1px solid var(--border-color)', color: 'var(--text-color)', padding: '0 1rem', borderRadius: '0.5rem' }}>
                    <option>All Topics</option>
                </select>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    Loading sermons...
                </div>
            ) : Array.isArray(sermons) && sermons.length > 0 ? (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {sermons.map(sermon => (
                        <AudioPlayer
                            key={sermon.id}
                            title={sermon.title}
                            preacher={sermon.preacher}
                            audioUrl={sermon.audio_url}
                            date={sermon.date}
                            onDelete={() => triggerDelete(sermon.id)}
                        />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', background: 'var(--surface-1)', borderRadius: '1rem' }}>
                    {Array.isArray(sermons) ? 'No audio sermons available.' : 'Failed to load audio properly.'}
                </div>
            )}

            {audioToDelete && (
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
                        <h2 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontSize: '1.5rem' }}>Are you sure?</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                            You are about to permanently delete this audio sermon. This action cannot be undone. Are you sure you wish to proceed?
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
                                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
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
                                    background: 'var(--danger)',
                                    color: 'white',
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
        </div>
    );
};

export default AudioSermons;
