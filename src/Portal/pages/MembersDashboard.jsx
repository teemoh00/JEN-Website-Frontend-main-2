import React, { useState } from 'react';
import MemberStatsCard from '../components/members/MemberStatsCard';
import MembersTable from '../components/members/MembersTable';
import MembersActionBar from '../components/members/MembersActionBar';
import UploadExcelModal from '../components/members/UploadExcelModal';
import CreateMemberModal from '../components/members/CreateMemberModal';
import NewMemberCategoryModal from '../components/members/NewMemberCategoryModal';
import CreateCellModal from '../components/cells/CreateCellModal';

const MembersDashboard = () => {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createModalInitialStatus, setCreateModalInitialStatus] = useState('Regular Member');
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showCellModal, setShowCellModal] = useState(false);
    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Members Database</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>View, manage, and track all ministry members.</p>
            </div>

            {/* Warning Banner */}
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
                <span style={{ color: '#f59e0b', fontSize: '0.9rem' }}>You have 130 unlinked committed members. <a href="#" style={{ color: '#f59e0b', textDecoration: 'underline' }}>Review Now</a></span>
            </div>

            {/* Stats */}
            <MemberStatsCard />

            {/* Action Bar */}
            <MembersActionBar 
                onUploadExcel={() => setShowUploadModal(true)} 
                onNewMember={() => {
                    setCreateModalInitialStatus('Regular Member');
                    setShowCreateModal(true);
                }} 
                onNewCategory={() => setShowCategoryModal(true)}
                onNewCellGroup={() => setShowCellModal(true)}
                onAddCommittedMember={() => {
                    setCreateModalInitialStatus('Committed Member');
                    setShowCreateModal(true);
                }}
            />

            {/* Data Table */}
            <MembersTable />

            {showUploadModal && <UploadExcelModal onClose={() => setShowUploadModal(false)} />}
            {showCreateModal && <CreateMemberModal onClose={() => setShowCreateModal(false)} initialStatus={createModalInitialStatus} />}
            {showCategoryModal && <NewMemberCategoryModal onClose={() => setShowCategoryModal(false)} />}
            {showCellModal && <CreateCellModal onClose={() => setShowCellModal(false)} />}
        </div>
    );
};

export default MembersDashboard;
