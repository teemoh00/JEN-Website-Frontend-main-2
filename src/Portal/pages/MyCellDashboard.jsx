import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import CellHeader from '../components/cells/my-cell/CellHeader';
import CellLeaderCard from '../components/cells/my-cell/CellLeaderCard';
import CellMembersList from '../components/cells/my-cell/CellMembersList';

const MyCellDashboard = () => {
    const { user } = useAuth();
    const [cellData, setCellData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyCell = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                // Fetch the specific cell details by getting all and filtering
                const cellsRes = await api.get('cells');
                const cells = Array.isArray(cellsRes.data) ? cellsRes.data : (cellsRes.data.results || []);
                
                // A user belongs to a cell if they are explicitly assigned via cell_group_id OR if they are the leader
                const myCell = cells.find(c => c.id === user.cell_group_id || c.leader_name === user.profile?.full_name);

                if (!myCell) {
                    setError("You are not currently assigned to any cell group, nor are you listed as a cell leader. Please contact your administrator.");
                    setLoading(false);
                    return;
                }

                // Fetch members for this cell
                const membersRes = await api.get('members', { params: { cell_id: myCell.id } });
                const members = Array.isArray(membersRes.data) ? membersRes.data : (membersRes.data.results || []);

                setCellData({
                    ...myCell,
                    members: members.map(m => ({
                        id: m.id,
                        name: m.full_name,
                        role: m.commitment_status === 'Committed Member' ? 'Committed Member' : 'Member',
                        avatar: m.profile_picture || null,
                        phone: m.phone_number
                    }))
                });
            } catch (err) {
                console.error("Error fetching my cell data:", err);
                setError("Failed to load your cell details.");
            } finally {
                setLoading(false);
            }
        };

        fetchMyCell();
    }, [user]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--text-muted)' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏘️</div>
                    <p>Loading your cell group...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--text-muted)' }}>
                <div style={{ textAlign: 'center', maxWidth: '400px', padding: '2rem', background: 'var(--surface-1)', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
                    <h3 style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>Dashboard Unavailable</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!cellData && !loading && !error) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--text-muted)' }}>
                <div style={{ textAlign: 'center', maxWidth: '400px', padding: '2rem', background: 'var(--surface-1)', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👋</div>
                    <h3 style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>Welcome to Cells</h3>
                    <p>You have not been assigned to a cell group yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            <CellHeader cell={cellData} />

            <div className="my-cell-grid">
                <div style={{ gridArea: 'leader' }}>
                    <CellLeaderCard leader={{ name: cellData.leader_name, location: '' }} />
                </div>
                <div style={{ gridArea: 'members' }}>
                    <CellMembersList members={cellData.members} />
                </div>
            </div>

            <style>{`
                .my-cell-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                    grid-template-areas: 
                        "leader"
                        "members";
                }

                @media (min-width: 1024px) {
                    .my-cell-grid {
                        grid-template-columns: 1fr 2.5fr;
                        grid-template-areas: 
                            "leader members";
                        align-items: start;
                    }
                }
            `}</style>
        </div>
    );
};

export default MyCellDashboard;
