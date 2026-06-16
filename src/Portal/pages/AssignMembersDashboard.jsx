import React, { useState } from 'react';
import { MOCK_ASSIGNMENT_STATS, MOCK_UNASSIGNED_MEMBERS, MOCK_CELLS } from '../../mockData';
import AssignmentStatsCards from '../components/cells/assignment/AssignmentStatsCards';
import UnassignedMembersList from '../components/cells/assignment/UnassignedMembersList';
import CellGroupsPanel from '../components/cells/assignment/CellGroupsPanel';

const AssignMembersDashboard = () => {
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [stats] = useState(MOCK_ASSIGNMENT_STATS);
    const [unassignedMembers, setUnassignedMembers] = useState(MOCK_UNASSIGNED_MEMBERS);
    const [cells] = useState(MOCK_CELLS);
    const [loading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const toggleSelection = (id) => {
        setSelectedMembers(prev =>
            prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
        );
    };

    const handleAssign = (cellId) => {
        if (selectedMembers.length === 0) {
            showToast('Please select at least one member to assign.', 'error');
            return;
        }
        // In-memory: remove selected members from the unassigned list
        setUnassignedMembers(prev => prev.filter(m => !selectedMembers.includes(m.id)));
        setSelectedMembers([]);
        showToast('Members assigned successfully!', 'success');
    };

    return (
        <div className="assignment-dashboard">
            <div className="assignment-header">
                <h1 className="assignment-title">Assign Members</h1>
                <p className="assignment-subtitle">Match unassigned members to suitable cell groups.</p>
            </div>

            <AssignmentStatsCards stats={stats} loading={loading} />

            <div className="assignment-grid">
                <div className="assignment-panel-wrapper">
                    <UnassignedMembersList
                        members={unassignedMembers}
                        loading={loading}
                        selectedMembers={selectedMembers}
                        toggleSelection={toggleSelection}
                    />
                </div>
                <div className="assignment-panel-wrapper">
                    <CellGroupsPanel
                        cells={cells}
                        loading={loading}
                        onAssign={handleAssign}
                    />
                </div>
            </div>

            {/* Toast Notification */}
            {toast.show && (
                <div className="assignment-toast" style={{ background: toast.type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)' }}>
                    <span style={{ fontSize: '1.2rem' }}>
                        {toast.type === 'success' ? '✓' : '⚠'}
                    </span>
                    {toast.message}
                </div>
            )}

            <style>{`
                .assignment-dashboard {
                    maxWidth: 1400px;
                    margin: 0 auto;
                    height: calc(100vh - 120px);
                    display: flex;
                    flex-direction: column;
                }

                .assignment-header {
                    margin-bottom: 1.5rem;
                }

                .assignment-title {
                    font-size: 1.8rem;
                    font-weight: 800;
                    margin: 0;
                    color: var(--text-color);
                }

                .assignment-subtitle {
                    color: var(--text-muted);
                    margin-top: 0.5rem;
                }

                .assignment-grid {
                    display: grid;
                    grid-template-columns: minmax(300px, 1fr) minmax(300px, 2fr);
                    gap: 1.5rem;
                    flex: 1;
                    min-height: 0;
                }

                .assignment-panel-wrapper {
                    height: 100%;
                    min-height: 0;
                }

                .assignment-toast {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    padding: 1rem 1.5rem;
                    border-radius: 0.75rem;
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
                    backdrop-filter: blur(8px);
                    z-index: 1000;
                    animation: slideIn 0.3s ease-out;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    font-weight: 500;
                }

                 @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                 }

                 @media (max-width: 1024px) {
                    .assignment-dashboard {
                        height: auto !important;
                        padding-bottom: 5rem; /* Space for bottom nav */
                    }

                    .assignment-grid {
                        grid-template-columns: 1fr !important;
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                        flex: none;
                    }

                    .assignment-panel-wrapper {
                        height: 500px; /* Fixed height for panels on mobile to ensure visibility and local scroll */
                        flex: none;
                    }

                    .assignment-title {
                        font-size: 1.5rem;
                    }
                 }
            `}</style>
        </div>
    );
};

export default AssignMembersDashboard;
