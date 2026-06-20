import React, { useState, useEffect } from 'react';
import MemberStatsCard from '../components/members/MemberStatsCard';
import MembersTable from '../components/members/MembersTable';
import MembersActionBar from '../components/members/MembersActionBar';
import UploadExcelModal from '../components/members/UploadExcelModal';
import CreateMemberModal from '../components/members/CreateMemberModal';
import NewMemberCategoryModal from '../components/members/NewMemberCategoryModal';
import CreateCellModal from '../components/cells/CreateCellModal';
import api from '../../api/axios';

const MembersDashboard = () => {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createModalInitialStatus, setCreateModalInitialStatus] = useState('Regular Member');
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showCellModal, setShowCellModal] = useState(false);

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await api.get('members');
                setMembers(response.data);
            } catch (err) {
                console.error("Error fetching members:", err);
                setError("Failed to load members data.");
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    const unlinkedCommitted = members.filter(m => m.commitment_status === 'Committed Member').length; // For now assuming all are unlinked as requested before

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Members Database</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>View, manage, and track all ministry members.</p>
            </div>

            {/* Warning Banner */}
            {unlinkedCommitted > 0 && (
                <div style={{
                    background: 'rgba(245, 158, 11, 0.05)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    borderRadius: '0.5rem',
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    marginBottom: '2rem'
                }}>
                    <span style={{ color: '#f59e0b', fontSize: '1.2rem' }}>⚠️</span>
                    <span style={{ color: '#f59e0b', fontWeight: '700', fontSize: '0.9rem' }}>Action Required:</span>
                    <span style={{ color: '#f59e0b', fontSize: '0.9rem' }}>You have {unlinkedCommitted} unlinked committed members. <a href="#" style={{ color: '#f59e0b', textDecoration: 'underline' }}>Review Now</a></span>
                </div>
            )}

            {/* Stats */}
            <MemberStatsCard members={members} loading={loading} />

            {/* Action Bar */}
            <MembersActionBar 
                onNewMember={() => {
                    setCreateModalInitialStatus('Regular Member');
                    setShowCreateModal(true);
                }} 
                onNewCellGroup={() => setShowCellModal(true)}
            />

            {/* Data Table */}
            <MembersTable members={members} loading={loading} error={error} />

            {showUploadModal && <UploadExcelModal onClose={() => setShowUploadModal(false)} />}
            {showCreateModal && <CreateMemberModal onClose={() => setShowCreateModal(false)} initialStatus={createModalInitialStatus} />}
            {showCategoryModal && <NewMemberCategoryModal onClose={() => setShowCategoryModal(false)} />}
            {showCellModal && <CreateCellModal onClose={() => setShowCellModal(false)} />}
        </div>
    );
};

export default MembersDashboard;
