import React from 'react';

const CreateNewVersionModal = ({ onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: '#1a1a24',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '500px',
                padding: '2.5rem 2rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <h2 style={{ margin: '0 0 2rem 0', color: '#ffffff', fontSize: '1.25rem', fontWeight: '800' }}>Create New Version</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Budget Name */}
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'capitalize' }}>Budget Name *</label>
                        <input type="text" placeholder="e.g. Main Event Budget" style={{
                            width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#ffffff', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                        }} />
                    </div>

                    {/* Notes */}
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'capitalize' }}>Notes</label>
                        <textarea placeholder="Optional notes..." rows="3" style={{
                            width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#ffffff', outline: 'none', fontSize: '0.9rem', resize: 'vertical', fontFamily: 'monospace', boxSizing: 'border-box'
                        }}></textarea>
                    </div>

                    {/* Warning Text */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <span style={{ color: '#f59e0b', fontSize: '1rem' }}>⚠️</span>
                        <span style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: '600' }}>A new version will copy existing items from v1.</span>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button onClick={onClose} style={{
                            background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', padding: '0.6rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer'
                        }}>
                            Cancel
                        </button>
                        <button onClick={onClose} style={{
                            background: '#7c3aed', color: '#ffffff', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer'
                        }}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNewVersionModal;
