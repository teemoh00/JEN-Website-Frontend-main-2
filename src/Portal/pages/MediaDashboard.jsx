import React, { useState } from 'react';
import MediaStatsCards from '../components/media/MediaStatsCards';
import LatestSermonHero from '../components/media/LatestSermonHero';
import VideoGrid from '../components/media/VideoGrid';
import AudioSermons from './AudioSermons';
import VideoSermons from './VideoSermons';
import PhotoGallery from './PhotoGallery';
import WatchLive from './WatchLive';
import QuickAccessCards from '../components/media/QuickAccessCards';
import UploadAudioModal from '../components/media/UploadAudioModal';
import UploadVideoModal from '../components/media/UploadVideoModal';
import UploadPhotosModal from '../components/media/UploadPhotosModal';
import UploadLiveStreamModal from '../components/media/UploadLiveStreamModal';

const MediaDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isUploadAudioModalOpen, setIsUploadAudioModalOpen] = useState(false);
    const [isUploadVideoModalOpen, setIsUploadVideoModalOpen] = useState(false);
    const [isUploadPhotosModalOpen, setIsUploadPhotosModalOpen] = useState(false);
    const [isUploadLiveStreamModalOpen, setIsUploadLiveStreamModalOpen] = useState(false);

    // No active live stream in frontend-only mode
    const [activeLiveStream] = useState(null);
    const [fetchingStream] = useState(false);
    const [streamToConfirm, setStreamToConfirm] = useState(null);

    const triggerEndLiveStream = () => {
        setStreamToConfirm(activeLiveStream);
    };

    const confirmEndLiveStream = () => {
        setStreamToConfirm(null);
    };

    const cancelEndLiveStream = () => {
        setStreamToConfirm(null);
    };

    // Tab Navigation Component
    const TabNav = () => (
        <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '2rem',
            padding: '0.25rem',
            flexWrap: 'wrap',
            background: 'var(--surface-1)',
            borderRadius: '0.75rem'
        }}>
            {[
                { id: 'dashboard', icon: '⚡', label: 'Dashboard' },
                { id: 'live', icon: '🔴', label: 'Watch Live' },
                { id: 'audio', icon: '🎤', label: 'Audio' },
                { id: 'video', icon: '📹', label: 'Video' },
                { id: 'photos', icon: '🖼️', label: 'Photos' },
                { id: 'management', icon: '⚙️', label: 'Admin' }
            ].map(tab => (
                <div
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                        padding: '0.5rem 0.8rem',
                        background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                        color: activeTab === tab.id ? 'var(--bg-color)' : 'var(--text-muted)',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: activeTab === tab.id ? '700' : '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.2s',
                        flex: '1 1 auto',
                        justifyContent: 'center',
                        minWidth: '90px'
                    }}
                >
                    <span style={{
                        animation: tab.id === 'live' && activeTab !== 'live' ? 'pulse 2s infinite' : 'none'
                    }}>{tab.icon}</span> {tab.label}
                </div>
            ))}
            <style>{`
                @keyframes pulse {
                    0% { opacity: 1; text-shadow: 0 0 5px rgba(244, 63, 94, 0.5); }
                    50% { opacity: 0.3; text-shadow: 0 0 20px rgba(244, 63, 94, 1); }
                    100% { opacity: 1; text-shadow: 0 0 5px rgba(244, 63, 94, 0.5); }
                }
            `}</style>
        </div>
    );

    return (
        <div className="media-dashboard-container" style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            <TabNav />

            {activeTab === 'dashboard' && (
                <>
                    <LatestSermonHero />
                    <MediaStatsCards />
                    <QuickAccessCards onNavigate={setActiveTab} />
                </>
            )}

            {activeTab === 'live' && <WatchLive />}
            {activeTab === 'audio' && <AudioSermons />}
            {activeTab === 'video' && <VideoSermons />}
            {activeTab === 'photos' && <PhotoGallery />}

            {activeTab === 'management' && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                }}>
                    {/* Quick Live Stream Paste Section */}
                    <div style={{
                        background: 'var(--surface-1)',
                        border: '1px solid var(--danger)',
                        borderRadius: '1rem',
                        padding: '2rem',
                    }}>
                        <h2 style={{ color: 'var(--danger)', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ animation: 'pulse 2s infinite' }}>🔴</span> Quick Go Live
                        </h2>
                        {fetchingStream ? (
                            <p style={{ color: 'var(--text-muted)' }}>Checking live stream status...</p>
                        ) : activeLiveStream ? (
                            <div>
                                <p style={{ color: 'var(--text-color)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                                    Currently broadcasting: <strong style={{ color: 'var(--primary)' }}>{activeLiveStream.title}</strong>
                                </p>
                                <button
                                    onClick={triggerEndLiveStream}
                                    style={{
                                        background: 'var(--surface-2)',
                                        color: 'var(--danger)',
                                        border: '1px solid var(--danger)',
                                        padding: '1rem 2rem',
                                        borderRadius: '0.5rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = 'var(--danger)';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = 'var(--surface-2)';
                                        e.currentTarget.style.color = 'var(--danger)';
                                    }}
                                >
                                    🛑 End Active Stream
                                </button>
                            </div>
                        ) : (
                            <>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Paste a YouTube or Facebook Live link below to instantly broadcast to the Watch Live tab.</p>
                                <form
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        const url = e.target.elements.liveLink.value;
                                        if (!url) return;
                                        try {
                                            await api.post('/sermons/live/', {
                                                title: 'Live Service',
                                                stream_url: url,
                                                is_live: true
                                            });
                                            e.target.reset();
                                            setActiveTab('live');
                                        } catch (error) {
                                            console.error('Failed to quick start live stream:', error);
                                            alert('Failed to start live stream.');
                                        }
                                    }}
                                    style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
                                >
                                    <input
                                        type="url"
                                        name="liveLink"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        required
                                        style={{
                                            flex: 1,
                                            minWidth: '250px',
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--bg-color)',
                                            color: 'var(--text-color)',
                                            fontSize: '1rem'
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        style={{
                                            background: 'var(--danger)',
                                            color: 'white',
                                            border: 'none',
                                            padding: '1rem 2rem',
                                            borderRadius: '0.5rem',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            fontSize: '1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        Go Live Now <span>↗</span>
                                    </button>
                                </form>
                            </>
                        )}
                    </div>

                    {/* General Media Management */}
                    <div style={{
                        background: 'var(--surface-1)',
                        border: '1px solid #22c1e6',
                        borderRadius: '1rem',
                        padding: '2rem',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ color: 'var(--primary)', marginTop: 0 }}>Content Uploads & Advanced Management</h2>
                        <p style={{ color: 'var(--text-color)', marginBottom: '2rem' }}>Upload recorded sermons, photos, or manage existing live stream configurations.</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                            <button
                                onClick={() => setIsUploadLiveStreamModalOpen(true)}
                                style={{ background: 'var(--surface-2)', color: 'var(--text-color)', border: '1px solid var(--border-color)', padding: '0.8rem 1.5rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                ⚙️ Advanced Live Streams
                            </button>
                            <button
                                onClick={() => setIsUploadAudioModalOpen(true)}
                                style={{ background: 'var(--primary)', color: 'var(--bg-color)', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                + Upload Audio
                            </button>
                            <button
                                onClick={() => setIsUploadVideoModalOpen(true)}
                                style={{ background: 'var(--primary)', color: 'var(--bg-color)', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                + Add Video
                            </button>
                            <button
                                onClick={() => setIsUploadPhotosModalOpen(true)}
                                style={{ background: 'var(--primary)', color: 'var(--bg-color)', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                + Upload Photos
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isUploadAudioModalOpen && <UploadAudioModal onClose={() => setIsUploadAudioModalOpen(false)} onUploadSuccess={() => setActiveTab('audio')} />}
            {isUploadVideoModalOpen && <UploadVideoModal onClose={() => setIsUploadVideoModalOpen(false)} onUploadSuccess={() => setActiveTab('video')} />}
            {isUploadPhotosModalOpen && <UploadPhotosModal onClose={() => setIsUploadPhotosModalOpen(false)} onUploadSuccess={() => setActiveTab('photos')} />}
            {isUploadLiveStreamModalOpen && <UploadLiveStreamModal onClose={() => setIsUploadLiveStreamModalOpen(false)} onUploadSuccess={() => setActiveTab('live')} />}

            {streamToConfirm && (
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
                        <h2 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontSize: '1.5rem' }}>End Live Stream?</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                            You are about to stop broadcasting <strong style={{ color: 'var(--text-color)' }}>{streamToConfirm.title}</strong> to the Watch Live tab. Are you sure you wish to proceed?
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button
                                onClick={cancelEndLiveStream}
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
                                onClick={confirmEndLiveStream}
                                style={{
                                    padding: '0.8rem 1.5rem',
                                    borderRadius: '0.75rem',
                                    border: 'none',
                                    background: '#f43f5e',
                                    color: 'white',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'opacity 0.2s',
                                    flex: 1
                                }}
                                onMouseOver={(e) => e.target.style.opacity = '0.9'}
                                onMouseOut={(e) => e.target.style.opacity = '1'}
                            >
                                End Stream
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @media (max-width: 768px) {
                    .media-dashboard-container div[style*="padding: 2rem"] {
                        padding: 1.25rem !important;
                    }
                    .media-dashboard-container div[style*="gap: 1rem"] {
                        flex-direction: column !important;
                    }
                    .media-dashboard-container input[name="liveLink"] {
                        width: 100% !important;
                    }
                    .media-dashboard-container button[type="submit"] {
                        width: 100% !important;
                        justify-content: center !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default MediaDashboard;
