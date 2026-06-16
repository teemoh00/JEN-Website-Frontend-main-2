import React, { useState } from 'react';
import { MOCK_MY_CELL } from '../../mockData';
import CellHeader from '../components/cells/my-cell/CellHeader';
import CellLeaderCard from '../components/cells/my-cell/CellLeaderCard';
import CellMembersList from '../components/cells/my-cell/CellMembersList';

const MyCellDashboard = () => {
    const [cellData] = useState(MOCK_MY_CELL);
    const [loading] = useState(false);
    const [error] = useState(null);

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

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            <CellHeader cell={cellData} />

            <div className="my-cell-grid">
                <div style={{ gridArea: 'leader' }}>
                    <CellLeaderCard leader={{ name: cellData.leader_name, location: cellData.location }} />
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
