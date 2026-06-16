import React from 'react';

const DeleteConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, loading }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '1rem'
        }} onClick={onCancel}>
            <div
                style={{
                    background: 'var(--surface-1)',
                    borderRadius: '1.5rem',
                    padding: '2.5rem',
                    maxWidth: '400px',
                    width: '100%',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    textAlign: 'center',
                    position: 'relative'
                }}
                onClick={e => e.stopPropagation()}
            >
                <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: '#ef4444',
                    fontSize: '2rem'
                }}>
                    ⚠️
                </div>

                <h2 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '800' }}>
                    {title || 'Confirm Deletion'}
                </h2>

                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {message || 'Are you sure you want to delete this item? This action cannot be undone.'}
                </p>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        style={{
                            flex: 1,
                            padding: '0.8rem',
                            borderRadius: '0.75rem',
                            border: '1px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-color)',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '0.95rem'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        style={{
                            flex: 1,
                            padding: '0.8rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            color: 'white',
                            fontWeight: '700',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '0.95rem',
                            boxShadow: '0 10px 15px -3px rgba(239, 68, 64, 0.3)'
                        }}
                    >
                        {loading ? 'Deleting...' : 'Yes, Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
