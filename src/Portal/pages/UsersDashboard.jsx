import React, { useState, useEffect } from 'react';
import UserStatsCards from '../components/users/UserStatsCards';
import UserActionsMenu from '../components/users/UserActionsMenu';
import UsersTable from '../components/users/UsersTable';
import AddUserModal from '../components/users/AddUserModal';
import AssignRolesModal from '../components/users/AssignRolesModal';
import api from '../../api/axios';

const UsersDashboard = () => {
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isAssignRolesModalOpen, setIsAssignRolesModalOpen] = useState(false);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('users');
                setUsers(response.data);
            } catch (err) {
                console.error("Error fetching users:", err);
                setError("Failed to load users data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

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
            <UserStatsCards users={users} loading={loading} />

            {/* Actions */}
            <UserActionsMenu
                onAddUser={() => setIsAddUserModalOpen(true)}
                onAssignRoles={() => setIsAssignRolesModalOpen(true)}
            />

            {/* Main Content Grid */}
            <div className="users-dashboard-grid">
                <div style={{ gridArea: 'table' }}>
                    <UsersTable users={users} loading={loading} error={error} />
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
