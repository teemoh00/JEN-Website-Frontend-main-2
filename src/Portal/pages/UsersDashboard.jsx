import React, { useState } from 'react';
import UserStatsCards from '../components/users/UserStatsCards';
import UserActionsMenu from '../components/users/UserActionsMenu';
import UsersTable from '../components/users/UsersTable';
import AddUserModal from '../components/users/AddUserModal';
import AssignRolesModal from '../components/users/AssignRolesModal';

const UsersDashboard = () => {
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isAssignRolesModalOpen, setIsAssignRolesModalOpen] = useState(false);

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Users & Security</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Manage system access and roles.</p>
                </div>
            </div>

            {/* Stats */}
            <UserStatsCards />

            {/* Actions */}
            <UserActionsMenu
                onAddUser={() => setIsAddUserModalOpen(true)}
                onAssignRoles={() => setIsAssignRolesModalOpen(true)}
            />

            {/* Main Content Grid */}
            <div className="users-dashboard-grid">
                <div style={{ gridArea: 'table' }}>
                    <UsersTable />
                </div>
            </div>

            {isAddUserModalOpen && <AddUserModal onClose={() => setIsAddUserModalOpen(false)} />}
            {isAssignRolesModalOpen && <AssignRolesModal onClose={() => setIsAssignRolesModalOpen(false)} />}

            <style>{`
                .users-dashboard-grid {
                    display: block;
                }

                @media (min-width: 1024px) {
                    .users-dashboard-grid {
                        display: block;
                    }
                }
            `}</style>
        </div>
    );
};

export default UsersDashboard;
