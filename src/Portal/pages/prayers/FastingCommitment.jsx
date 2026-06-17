import React, { useState } from 'react';
import FastingStatsCards from '../../components/prayers/fasting/FastingStatsCards';
import FastingFilters from '../../components/prayers/fasting/FastingFilters';
import FastingTable from '../../components/prayers/fasting/FastingTable';
import FastingAnalytics from '../../components/prayers/fasting/FastingAnalytics';
import CommitToFastModal from '../../components/prayers/fasting/CommitToFastModal';
import CreateFastingEventModal from '../../components/prayers/fasting/CreateFastingEventModal';

const FastingCommitment = () => {
    const [showCommitModal, setShowCommitModal] = useState(false);
    const [showCreateEventModal, setShowCreateEventModal] = useState(false);
    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '4rem' }}>
            {/* Header */}
            <div style={{
                background: 'var(--surface-1)',
                borderRadius: '1.5rem',
                border: '1px solid var(--border-color)',
                padding: '2rem',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '2rem' }}>🔥</span>
                        <div>
                            <h1 style={{
                                fontSize: '2rem',
                                fontWeight: '700',
                                color: 'var(--text-color)',
                                lineHeight: 1.2
                            }}>
                                Prayer & Fasting Dashboard
                            </h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.25rem' }}>
                                Manage and view fasting commitments across the network
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => setShowCommitModal(true)} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-color)',
                            cursor: 'pointer',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span>🙏</span> Commit to Fast
                        </button>
                        <button onClick={() => setShowCreateEventModal(true)} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'var(--text-color)',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span>➕</span> Create Fasting Event
                        </button>
                    </div>
                </div>
            </div>

            {/* Dashboard Components */}
            <FastingStatsCards />
            <FastingFilters />
            <FastingTable />
            <FastingAnalytics />

            {showCommitModal && <CommitToFastModal onClose={() => setShowCommitModal(false)} />}
            {showCreateEventModal && <CreateFastingEventModal onClose={() => setShowCreateEventModal(false)} />}

        </div>
    );
};

export default FastingCommitment;
