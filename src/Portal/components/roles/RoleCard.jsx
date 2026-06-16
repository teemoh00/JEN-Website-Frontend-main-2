import React from 'react';

const RoleCard = ({ role }) => {
    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1.25rem',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Top accent line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: role.color
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '0.75rem',
                    background: `${role.color}20`,
                    color: role.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem'
                }}>
                    🛡️
                </div>
                <div style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    background: 'var(--surface-2)',
                    color: 'var(--text-muted)',
                    fontWeight: '600'
                }}>
                    {role.users} Users
                </div>
            </div>

            <div>
                <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: 'var(--text-color)',
                    marginBottom: '0.5rem'
                }}>
                    {role.name}
                </h3>
                <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    lineHeight: '1.5',
                    minHeight: '3rem'
                }}>
                    {role.description}
                </p>
            </div>

            <div style={{
                display: 'flex',
                gap: '0.75rem',
                marginTop: 'auto',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-color)'
            }}>
                <button style={{
                    flex: 1,
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-color)',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}>
                    Manage
                </button>
                <button style={{
                    flex: 1,
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-color)',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}>
                    Users
                </button>
            </div>
        </div>
    );
};

export default RoleCard;
