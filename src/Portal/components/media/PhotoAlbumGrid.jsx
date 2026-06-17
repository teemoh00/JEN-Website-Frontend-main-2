import React, { useState } from 'react';
import { MOCK_PHOTO_ALBUMS } from '../../../mockData';

const AlbumCard = ({ title, count, cover, onDelete, galleryUrl }) => (
    <div style={{
        background: 'var(--surface-1)',
        borderRadius: '1rem',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        cursor: 'pointer',
        position: 'relative'
    }}>
        <div
            onClick={onDelete}
            style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                zIndex: 10,
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--danger)',
                backdropFilter: 'blur(2px)'
            }}
            title="Delete Gallery"
        >
            🗑️
        </div>
        <a href={galleryUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div style={{ height: '200px', background: `url(${cover})`, backgroundSize: 'cover' }}></div>
        </a>
        <div style={{ padding: '1rem' }}>
            <h3 style={{ color: 'var(--text-color)', fontSize: '1.1rem', margin: '0 0 0.3rem 0' }}>{title}</h3>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{count} Photos</div>
        </div>
    </div>
);

const PhotoAlbumGrid = () => {
    const [galleries, setGalleries] = useState(MOCK_PHOTO_ALBUMS.map(a => ({
        id: a.id,
        title: a.name,
        thumbnail: a.cover_photo,
        gallery_url: null,
    })));
    const [loading] = useState(false);
    const [galleryToDelete, setGalleryToDelete] = useState(null);

    const triggerDelete = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setGalleryToDelete(id);
    };

    const confirmDelete = () => {
        if (!galleryToDelete) return;
        setGalleries(prev => prev.filter(g => g.id !== galleryToDelete));
        setGalleryToDelete(null);
    };

    const cancelDelete = () => {
        setGalleryToDelete(null);
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading photo galleries...</div>;
    }

    if (galleries.length === 0) {
        return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', background: 'var(--surface-1)', borderRadius: '1rem' }}>No photo galleries available.</div>;
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {Array.isArray(galleries) ? (
                galleries.map(gallery => (
                    <AlbumCard
                        key={gallery.id}
                        title={gallery.title}
                        count={10}
                        cover={gallery.thumbnail || "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=400"}
                        galleryUrl={gallery.gallery_url}
                        onDelete={(e) => triggerDelete(e, gallery.id)}
                    />
                ))
            ) : (
                <div style={{ textAlign: 'center', gridColumn: '1 / -1', color: 'var(--danger)' }}>Failed to load galleries properly (Data Format Error).</div>
            )}

            {galleryToDelete && (
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
                            You are about to permanently delete this photo gallery. This action cannot be undone. Are you sure you wish to proceed?
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
                                    background: 'var(--danger)',
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
        </div>
    );
};

export default PhotoAlbumGrid;
