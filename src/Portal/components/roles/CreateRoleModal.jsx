import React from 'react';

const CreateRoleModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '1rem'
        }} onClick={onClose}>
            <div style={{
                background: 'var(--surface-1)',
                width: '100%',
                maxWidth: '500px',
                borderRadius: '1.5rem',
                padding: '2rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                position: 'relative'
            }} onClick={e => e.stopPropagation()}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-color)' }}>
                    Create New Role
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                            Role Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Finance Moderator"
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                borderRadius: '0.75rem',
                                border: '1px solid var(--border-color)',
                                background: 'var(--surface-2)',
                                color: 'var(--text-color)',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                            Description
                        </label>
                        <textarea
                            rows="4"
                            placeholder="What can this role do?"
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                borderRadius: '0.75rem',
                                border: '1px solid var(--border-color)',
                                background: 'var(--surface-2)',
                                color: 'var(--text-color)',
                                outline: 'none',
                                resize: 'none'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                            Inherit Permissions From (Optional)
                        </label>
                        <select style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: '0.75rem',
                            border: '1px solid var(--border-color)',
                            background: 'var(--surface-2)',
                            color: 'var(--text-color)',
                            outline: 'none',
                            appearance: 'none'
                        }}>
                            <option value="">None (Start from scratch)</option>
                            <option value="member">Standard Member</option>
                            <option value="leader">Cell Leader</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: '0.75rem',
                                border: '1px solid var(--border-color)',
                                background: 'transparent',
                                color: 'var(--text-color)',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: '0.75rem',
                                border: 'none',
                                background: 'var(--primary)',
                                color: 'white',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Create Role
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRoleModal;
