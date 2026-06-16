import React, { useState } from 'react';
import ContributionStats from '../components/contributions/ContributionStats';
import GivingHistory from '../components/contributions/GivingHistory';
import PledgeTracker from '../components/contributions/PledgeTracker';
import GiveNowModal from '../components/contributions/GiveNowModal';

const ContributionDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const stats = {
        totalGiven: 125000,
        monthlyAverage: 15600,
        activePledges: 3,
        fulfillmentRate: 85
    };

    const history = [
        { id: 1, date: '2024-03-15', amount: 5000, category: 'Tithe', method: 'M-Pesa', status: 'Completed' },
        { id: 2, date: '2024-03-10', amount: 2000, category: 'Thanksgiving', method: 'M-Pesa', status: 'Completed' },
        { id: 3, date: '2024-03-01', amount: 10000, category: 'Building Fund', method: 'Bank Transfer', status: 'Completed' },
        { id: 4, date: '2024-02-15', amount: 5000, category: 'Tithe', method: 'M-Pesa', status: 'Completed' },
        { id: 5, date: '2024-02-05', amount: 3000, category: 'Missions', method: 'Card', status: 'Completed' },
    ];

    const pledges = [
        { id: 1, name: 'Building Fund 2024', target: 50000, current: 35000, deadline: '2024-12-31', color: '#3b82f6' },
        { id: 2, name: 'Missions Outreach', target: 20000, current: 12000, deadline: '2024-06-30', color: '#10b981' },
        { id: 3, name: 'Youth Center Setup', target: 15000, current: 5000, deadline: '2024-09-15', color: '#a855f7' },
    ];

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '3rem' }}>
            {/* Header Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--text-color)', marginBottom: '0.5rem' }}>
                        Contributions & Giving
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Track your seeds, tithes, and commitments to the house of God.
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        background: 'linear-gradient(135deg, var(--primary), #0284c7)',
                        color: 'white',
                        border: 'none',
                        padding: '0.875rem 1.75rem',
                        borderRadius: '0.875rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 12px rgba(34, 193, 230, 0.3)',
                        transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                    <span style={{ fontSize: '1.2rem' }}>♥</span> Give Now
                </button>
            </div>

            {/* Stats Overview */}
            <ContributionStats stats={stats} />

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '2rem',
                marginTop: '2rem'
            }} className="contribution-content-grid">
                {/* Left: History */}
                <div style={{ gridArea: 'history' }}>
                    <GivingHistory records={history} />
                </div>

                {/* Right: Pledges */}
                <div style={{ gridArea: 'pledges' }}>
                    <PledgeTracker pledges={pledges} />
                </div>
            </div>

            <GiveNowModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <style>{`
                .contribution-content-grid {
                    display: grid;
                    grid-template-areas: 
                        "history"
                        "pledges";
                }

                @media (min-width: 1024px) {
                    .contribution-content-grid {
                        grid-template-columns: 1.8fr 1fr;
                        grid-template-areas: "history pledges";
                    }
                }
            `}</style>
        </div>
    );
};

export default ContributionDashboard;
