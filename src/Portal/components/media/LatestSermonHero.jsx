import React, { useState } from 'react';
import { MOCK_VIDEO_SERMONS } from '../../../mockData';

const LatestSermonHero = () => {
    const [latestSermon] = useState(MOCK_VIDEO_SERMONS[0] || null);
    const [loading] = useState(false);

    if (loading || !latestSermon) {
        return (
            <div style={{
                background: 'var(--surface-1)',
                borderRadius: '1.5rem',
                padding: '3rem',
                marginBottom: '2rem',
                minHeight: '280px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)'
            }}>
                {loading ? 'Loading latest sermon...' : 'No latest sermon available.'}
            </div>
        );
    }

    // Format date nicely if possible
    const formattedDate = new Date(latestSermon.date).toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric'
    });

    const backgroundImageUrl = latestSermon.thumbnail || "https://images.unsplash.com/photo-1549488497-6577382be704?q=80&w=2070&auto=format&fit=crop";

    return (
        <div style={{
            background: 'linear-gradient(90deg, #d97706 0%, #1e1b4b 100%)', // Orange to Dark Blue gradient
            borderRadius: '1.5rem',
            padding: '3rem',
            marginBottom: '2rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            minHeight: '280px'
        }}>
            {/* Background Image Overlay */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: `url("${backgroundImageUrl}") center/cover`,
                opacity: 0.4,
                mixBlendMode: 'overlay'
            }}></div>

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
                <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.2rem' }}>
                    <span style={{
                        background: 'var(--primary)',
                        color: 'var(--bg-color)',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '0.4rem',
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        letterSpacing: '0.5px'
                    }}>
                        LATEST MESSAGE
                    </span>
                    <span style={{
                        background: 'rgba(0,0,0,0.4)',
                        color: 'var(--text-color)',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '0.4rem',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        letterSpacing: '0.5px'
                    }}>
                        VIDEO
                    </span>
                </div>

                <h2 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-color)', margin: '0 0 0.5rem 0', lineHeight: 1.1 }}>
                    {latestSermon.title}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', marginBottom: '2rem', fontWeight: '500' }}>
                    Preached by {latestSermon.preacher} • {formattedDate}
                </p>

                <a href={latestSermon.video_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <button style={{
                        background: 'var(--primary)',
                        color: 'var(--bg-color)',
                        border: 'none',
                        borderRadius: '0.5rem',
                        padding: '0.8rem 2rem',
                        fontSize: '1rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        boxShadow: '0 4px 6px var(--surface-2)'
                    }}>
                        <span>▶</span> Watch Now
                    </button>
                </a>
            </div>
        </div>
    );
};

export default LatestSermonHero;
