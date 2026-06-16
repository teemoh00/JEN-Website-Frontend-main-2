import React, { useContext, useState } from 'react';
import { AttendanceContext } from '../../context/AttendanceContext';
import AttendanceTrackingList from '../components/meetings/attendance/AttendanceTrackingList';

const TabButton = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`attendance-tab-btn ${active ? 'active' : ''}`}
    >
        <span className="tab-icon">{icon}</span>
        <span className="tab-label">{label}</span>
    </button>
);

const AttendanceDashboard = () => {
    const { analyticsData, loading, error } = useContext(AttendanceContext);
    const [activeTab, setActiveTab] = useState('Overview');

    if (loading) return <div style={{ color: 'var(--text-muted)' }}>Loading Analytics...</div>;
    if (error) return <div style={{ color: '#ef4444' }}>Error: {error}</div>;
    if (!analyticsData) return null;

    const stats = analyticsData.stats || {};
    const members = analyticsData.members || [];

    return (
        <div className="attendance-dashboard-wrapper">
            <div className="attendance-header">
                <h1 className="attendance-title">Attendance Tracking</h1>
            </div>

            {/* Navigation Tabs */}
            <div className="attendance-nav-container">
                <TabButton active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} icon="📊" label="Overview" />
                <TabButton active={activeTab === 'Individual'} onClick={() => setActiveTab('Individual')} icon="🧑‍🤝‍🧑" label="Individual Tracking" />
                <TabButton active={activeTab === 'FollowUp'} onClick={() => setActiveTab('FollowUp')} icon="🔔" label="Follow-Up Needed" />
            </div>

            <style>{`
                .attendance-dashboard-wrapper {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding-bottom: 2rem;
                }

                .attendance-header {
                    margin-bottom: 2rem;
                }

                .attendance-title {
                    font-size: 1.8rem;
                    font-weight: 800;
                    margin: 0;
                    color: var(--text-color);
                }

                .attendance-nav-container {
                     border-bottom: 1px solid var(--border-color);
                     margin-bottom: 2rem;
                     display: flex;
                     overflow-x: auto;
                     scrollbar-width: none;
                }
                .attendance-nav-container::-webkit-scrollbar { display: none; }

                .attendance-tab-btn {
                    background: transparent;
                    border: none;
                    border-bottom: 2px solid transparent;
                    color: var(--text-muted);
                    padding: 1rem 0.5rem;
                    margin-right: 2rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    alignItems: center;
                    gap: 0.5rem;
                    transition: all 0.2s;
                    opacity: 0.7;
                    white-space: nowrap;
                }

                .attendance-tab-btn.active {
                    border-bottom: 2px solid var(--primary);
                    color: var(--primary);
                    opacity: 1;
                }

                .attendance-tab-btn:hover:not(.active) {
                    color: var(--text-color);
                    opacity: 1;
                }

                @media (max-width: 768px) {
                    .attendance-dashboard-wrapper {
                        padding-bottom: 100px;
                    }
                    .attendance-title {
                        font-size: 1.5rem;
                    }
                    .attendance-nav-container {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        margin-bottom: 0;
                        background: rgba(18, 13, 32, 0.9);
                        backdrop-filter: blur(10px);
                        border-top: 1px solid var(--border-color);
                        border-bottom: none;
                        z-index: 1000;
                        justify-content: space-around;
                        padding: 0.75rem 0.5rem;
                    }
                    .attendance-tab-btn {
                        margin-right: 0;
                        flex-direction: column;
                        gap: 0.25rem;
                        padding: 0.5rem;
                        font-size: 0.75rem;
                        border-bottom: none !important;
                    }
                    .tab-icon {
                        font-size: 1.2rem;
                    }
                }
            `}</style>

            {/* Content Based on Tab */}
            {activeTab === 'Overview' && (
                <>
                    {/* Stats Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <div style={{ background: 'var(--surface-1)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#6366f1', lineHeight: 1, marginBottom: '0.2rem' }}>{stats.total_members || 0}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>Total Members</div>
                        </div>
                        <div style={{ background: 'var(--surface-1)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#4ade80', lineHeight: 1, marginBottom: '0.2rem' }}>{stats.attended_this || 0}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>Attended This Meeting</div>
                        </div>
                        <div style={{ background: 'var(--surface-1)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ef4444', lineHeight: 1, marginBottom: '0.2rem' }}>{stats.absent_this || 0}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>Absent This Meeting</div>
                        </div>
                        <div style={{ background: 'var(--surface-1)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#22c1e6', lineHeight: 1, marginBottom: '0.2rem' }}>{stats.total_checkins || 0}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>Total Check-ins</div>
                        </div>
                    </div>

                    <AttendanceTrackingList members={members} />
                </>
            )}

            {activeTab === 'Individual' && (
                <AttendanceTrackingList members={members} />
            )}

            {activeTab === 'FollowUp' && (
                <AttendanceTrackingList members={members.filter(m => m.status === 'Needs Follow-up')} />
            )}
        </div>
    );
};

export default AttendanceDashboard;
