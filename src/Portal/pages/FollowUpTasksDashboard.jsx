import React, { useState } from 'react';
import CreateFollowUpModal from '../components/cells/CreateFollowUpModal';

const FollowUpTasksDashboard = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Follow-Up Management</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>Track and manage member follow-ups.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        background: 'var(--primary)',
                        color: 'var(--bg-color)',
                        border: 'none',
                        borderRadius: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.95rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 15px rgba(34, 193, 230, 0.3)'
                    }}
                >
                    <span style={{ fontSize: '1.2rem' }}>+</span> New Follow-Up
                </button>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>📋</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>0</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}>Total Follow-Ups</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>⏳</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#f59e0b', lineHeight: 1 }}>0</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}>Pending</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>✅</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#4ade80', lineHeight: 1 }}>0</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}>Completed</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>🚫</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ef4444', lineHeight: 1 }}>0</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}>No Response</div>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '4rem', borderBottom: 'none' }}>
                {['All', 'Pending', 'Completed', 'No Response'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            background: activeTab === tab ? 'rgba(34, 193, 230, 0.15)' : 'transparent',
                            color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                            border: 'none',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '2rem',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Empty State */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '40vh', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.8 }}>📬</div>
                <p style={{ fontSize: '1rem' }}>No follow-ups found</p>
            </div>

            {/* Modal */}
            {isModalOpen && <CreateFollowUpModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default FollowUpTasksDashboard;
