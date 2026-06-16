import React, { useState } from 'react';
import RoleCard from '../components/roles/RoleCard';
import PermissionMatrix from '../components/roles/PermissionMatrix';
import CreateRoleModal from '../components/roles/CreateRoleModal';

const RolesDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('roles'); // 'roles' or 'permissions'

    const roles = [
        { id: 1, name: 'Super Admin', users: 2, color: '#ef4444', description: 'Full access to all system modules and settings.' },
        { id: 2, name: 'Administrator', users: 5, color: '#3b82f6', description: 'Can manage members, cells, and standard portal settings.' },
        { id: 3, name: 'Pastor', users: 12, color: '#a855f7', description: 'Access to spiritual data, sermons, and member oversight.' },
        { id: 4, name: 'Cell Leader', users: 45, color: '#10b981', description: 'Manage specific cell group members and attendance.' },
        { id: 5, name: 'Member', users: 850, color: '#64748b', description: 'Standard access to personal data and basic resources.' },
    ];

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header section */}
            <div className="section-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1.5rem'
            }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--text-color)', marginBottom: '0.5rem' }}>
                        Roles & Permissions
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Manage system access levels and module permissions.
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.75rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                >
                    <span>+</span> Create New Role
                </button>
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '2rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '1rem',
                flexWrap: 'wrap'
            }}>
                <button
                    onClick={() => setActiveTab('roles')}
                    style={{
                        background: activeTab === 'roles' ? 'var(--surface-2)' : 'transparent',
                        color: activeTab === 'roles' ? 'var(--primary)' : 'var(--text-muted)',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    Role Overview
                </button>
                <button
                    onClick={() => setActiveTab('permissions')}
                    style={{
                        background: activeTab === 'permissions' ? 'var(--surface-2)' : 'transparent',
                        color: activeTab === 'permissions' ? 'var(--primary)' : 'var(--text-muted)',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    Permission Matrix
                </button>
            </div>

            {/* Content view */}
            {activeTab === 'roles' ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {roles.map(role => (
                        <RoleCard key={role.id} role={role} />
                    ))}
                </div>
            ) : (
                <PermissionMatrix />
            )}

            <CreateRoleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <style>{`
                @media (max-width: 640px) {
                    .section-header {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                    }
                    .section-header button {
                        width: 100% !important;
                        justify-content: center !important;
                    }
                    h1 {
                        fontSize: 1.5rem !important;
                    }
                    div[style*="gridTemplateColumns"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default RolesDashboard;
