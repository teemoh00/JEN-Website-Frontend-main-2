import React from 'react';

const PermissionMatrix = () => {
    const modules = [
        'Dashboard', 'Cell Groups', 'Members', 'Events', 'Sermons', 'Media', 'Financials', 'Roles & Permissions'
    ];

    const roles = ['Administrator', 'Pastor', 'Cell Leader', 'Technical Admin', 'Finance Officer'];

    const permissions = ['View', 'Create', 'Edit', 'Delete', 'Approve'];

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1.25rem',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'var(--surface-2)' }}>
                            <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-color)', fontWeight: '700' }}>Module / Capability</th>
                            {roles.map(role => (
                                <th key={role} style={{
                                    padding: '1.25rem 1rem',
                                    color: 'var(--text-color)',
                                    fontWeight: '700',
                                    textAlign: 'center',
                                    minWidth: '120px'
                                }}>
                                    {role}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {modules.map((module, mIdx) => (
                            <React.Fragment key={module}>
                                <tr style={{ background: 'rgba(var(--primary-rgb), 0.03)' }}>
                                    <td colSpan={roles.length + 1} style={{
                                        padding: '0.75rem 1.5rem',
                                        fontWeight: '700',
                                        fontSize: '0.875rem',
                                        color: 'var(--primary)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {module}
                                    </td>
                                </tr>
                                {permissions.map((perm, pIdx) => (
                                    <tr key={`${module}-${perm}`} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                            <div style={{ marginLeft: '1rem' }}>{perm} Records</div>
                                        </td>
                                        {roles.map(role => (
                                            <td key={`${role}-${module}-${perm}`} style={{ padding: '1rem', textAlign: 'center' }}>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={Math.random() > 0.5} // Mock data randomness
                                                    style={{
                                                        width: '18px',
                                                        height: '18px',
                                                        accentColor: 'var(--primary)',
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PermissionMatrix;
