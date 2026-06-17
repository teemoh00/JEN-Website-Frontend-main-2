import React, { useState } from 'react';
import AddBudgetItemModal from '../components/meetings/AddBudgetItemModal';
import CreateNewVersionModal from '../components/meetings/CreateNewVersionModal';

const EventBudget = () => {
    const [activeTab, setActiveTab] = useState('Line Items');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState('');

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Event Budget & Expenditure</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>Plan budgets, track expenses, and generate financial reports</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative' }}>
                        <select 
                            value={selectedEvent}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '0.5rem',
                            color: 'var(--text-color)',
                            padding: '0.6rem 2.5rem 0.6rem 1rem',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            outline: 'none',
                            cursor: 'pointer',
                            appearance: 'none'
                        }}>
                            <option value="" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Select an event...</option>
                            <option value="1" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>LEADERSHIP TRAINING 2026 EDI...</option>
                            <option value="2" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Youth Retreat 2026</option>
                            <option value="3" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Annual General Meeting</option>
                        </select>
                        <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-color)', fontSize: '0.7rem' }}>▼</span>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <select style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '0.5rem',
                            color: 'var(--text-color)',
                            padding: '0.6rem 2.5rem 0.6rem 1rem',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            outline: 'none',
                            cursor: 'pointer',
                            appearance: 'none'
                        }}>
                            <option value="v1" style={{ background: '#1a1a24' }}>v1 — draft</option>
                        </select>
                        <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-color)', fontSize: '0.7rem' }}>▼</span>
                    </div>
                </div>
            </div>

            {selectedEvent ? (
                <>
                    {/* Budget Container Header */}
                    <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h2 style={{ color: 'var(--text-color)', margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>Main Leadership Training Budget</h2>
                    <span style={{ background: '#ffffff', color: '#000000', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', fontWeight: '700' }}>Draft</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}>v1</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button onClick={() => setIsModalOpen(true)} style={{ background: '#7c3aed', color: 'var(--text-color)', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        + Add Item
                    </button>
                    <button style={{ background: 'var(--border-color)', color: 'var(--text-color)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        📄 PDF Report
                    </button>
                    <button onClick={() => setIsVersionModalOpen(true)} style={{ background: 'var(--border-color)', color: 'var(--text-color)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        + New Version
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>📋</div>
                    <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.2rem' }}>Estimated Budget</div>
                        <div style={{ color: '#3b82f6', fontSize: '1.25rem', fontWeight: '700' }}>KES 0</div>
                    </div>
                </div>
                <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>💸</div>
                    <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.2rem' }}>Total Spent</div>
                        <div style={{ color: '#22c55e', fontSize: '1.25rem', fontWeight: '700' }}>KES 0</div>
                    </div>
                </div>
                <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>💰</div>
                    <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.2rem' }}>Remaining</div>
                        <div style={{ color: '#22c55e', fontSize: '1.25rem', fontWeight: '700' }}>KES 0</div>
                    </div>
                </div>
                <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>📉</div>
                    <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.2rem' }}>Variance</div>
                        <div style={{ color: '#22c55e', fontSize: '1.25rem', fontWeight: '700' }}>+0.0%</div>
                    </div>
                </div>
                <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>✅</div>
                    <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.2rem' }}>Items Paid</div>
                        <div style={{ color: '#a855f7', fontSize: '1.25rem', fontWeight: '700' }}>0 / 0</div>
                    </div>
                </div>
            </div>

            {/* Execution Progress */}
            <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--text-color)', fontSize: '0.85rem', fontWeight: '700' }}>Budget Execution</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>0.0%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px' }}>
                    <div style={{ width: '0%', height: '100%', background: '#7c3aed', borderRadius: '4px' }}></div>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <button
                    onClick={() => setActiveTab('Line Items')}
                    style={{
                        background: activeTab === 'Line Items' ? '#7c3aed' : 'var(--border-color)',
                        color: 'var(--text-color)',
                        border: 'none',
                        borderRadius: '0.5rem',
                        padding: '0.6rem 1.25rem',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    Line Items (0)
                </button>
                <button
                    onClick={() => setActiveTab('Category Summary')}
                    style={{
                        background: activeTab === 'Category Summary' ? '#7c3aed' : 'var(--border-color)',
                        color: 'var(--text-color)',
                        border: 'none',
                        borderRadius: '0.5rem',
                        padding: '0.6rem 1.25rem',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    Category Summary
                </button>
                <button
                    onClick={() => setActiveTab('Audit Trail')}
                    style={{
                        background: activeTab === 'Audit Trail' ? '#7c3aed' : 'var(--border-color)',
                        color: 'var(--text-color)',
                        border: 'none',
                        borderRadius: '0.5rem',
                        padding: '0.6rem 1.25rem',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    Audit Trail (1)
                </button>
            </div>

            {/* Empty State Content */}
            <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '4rem 2rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>No items yet. Add budget line items to get started.</p>
            </div>
                </>
            ) : (
                <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '4rem 2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-color)', fontSize: '1.1rem', fontWeight: '600' }}>Please select an event to view its budget.</p>
                </div>
            )}

            {isModalOpen && <AddBudgetItemModal onClose={() => setIsModalOpen(false)} />}
            {isVersionModalOpen && <CreateNewVersionModal onClose={() => setIsVersionModalOpen(false)} />}
        </div>
    );
};

export default EventBudget;
