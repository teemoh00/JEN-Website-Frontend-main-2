import React from 'react';
import MemberStatsCard from '../components/members/MemberStatsCard';
import MembersTable from '../components/members/MembersTable';

const MembersDashboard = () => {
    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Members Database</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>View, manage, and track all ministry members.</p>
            </div>

            {/* Stats */}
            <MemberStatsCard />

            {/* Data Table */}
            <MembersTable />
        </div>
    );
};

export default MembersDashboard;
