import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateEventModal from '../components/meetings/CreateEventModal';
import AllEventsList from '../components/events/AllEventsList';

const EventsDashboard = () => {
    const [activeTab, setActiveTab] = useState('Events Dashboard');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        if (tab === 'Event Attendance') {
            navigate('/portal/meetings/event-attendance');
        } else if (tab === 'Events Statistics') {
            navigate('/portal/meetings/event-statistics');
        } else {
            setActiveTab(tab);
        }
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Events</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>Plan, track, and manage ministry events.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
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
                    <span style={{ fontSize: '1.2rem' }}>+</span> Create Event
                </button>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', borderBottom: 'none' }}>
                {['Events Dashboard', 'Event Attendance', 'Events Mobilisation', 'Events Statistics', 'All Events'].map(tab => (
                    <div
                        key={tab}
                        onClick={() => handleTabClick(tab)}
                        style={{
                            color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            position: 'relative',
                            paddingBottom: '0.5rem'
                        }}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                
                {activeTab === 'All Events' ? (
                    <AllEventsList />
                ) : (
                    <>
                        {/* Row 1: Upcoming & Overall Progress */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                    {/* Upcoming Events Box */}
                    <div style={{
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '250px',
                        color: 'var(--text-muted)',
                        fontSize: '0.95rem'
                    }}>
                        No upcoming events
                    </div>

                    {/* Overall Registration Progress */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3 style={{ margin: '0 0 2rem 0', color: 'var(--text-color)', fontSize: '0.95rem', fontWeight: '700', width: '100%' }}>Overall Registration Progress</h3>
                        
                        <div style={{
                            width: '160px',
                            height: '160px',
                            borderRadius: '50%',
                            background: '#162b3b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '2rem',
                            boxShadow: 'inset 0 0 0 20px #1a3648'
                        }}>
                            <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)' }}>0.0%</span>
                        </div>

                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', textAlign: 'center' }}>
                            <div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-color)' }}>0</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Registered</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-color)' }}>0</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Target</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-color)' }}>0</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Invited</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 2: Financial Summary & Gender Distribution */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                    {/* Event Financial Summary (Empty Graph) */}
                    <div>
                        <h3 style={{ margin: '0 0 2rem 0', color: 'var(--text-color)', fontSize: '0.95rem', fontWeight: '700' }}>Event Financial Summary</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', color: 'var(--text-muted)', fontSize: '0.75rem', width: '80%' }}>
                            {/* Y axis */}
                            <div style={{ display: 'flex', flex: 1, minHeight: '150px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: '1rem', textAlign: 'right', whiteSpace: 'pre-wrap' }}>
                                    <span>Total{'\n'}Target</span>
                                    <span>Sponsored</span>
                                    <span>Collected</span>
                                    <span>Pending</span>
                                </div>
                                <div style={{ flex: 1, borderLeft: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                                    {/* Tick marks on x-axis */}
                                    <div style={{ position: 'absolute', bottom: '-20px', left: 0, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
                                    </div>
                                    {/* Small tick markers */}
                                    <div style={{ position: 'absolute', bottom: '-5px', left: 0, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ width: '1px', height: '5px', background: 'rgba(255,255,255,0.1)' }}></div>
                                        <div style={{ width: '1px', height: '5px', background: 'rgba(255,255,255,0.1)' }}></div>
                                        <div style={{ width: '1px', height: '5px', background: 'rgba(255,255,255,0.1)' }}></div>
                                        <div style={{ width: '1px', height: '5px', background: 'rgba(255,255,255,0.1)' }}></div>
                                        <div style={{ width: '1px', height: '5px', background: 'rgba(255,255,255,0.1)' }}></div>
                                    </div>
                                </div>
                            </div>
                            {/* Legend */}
                            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '3rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '8px', height: '8px', background: '#3b82f6' }}></span>Total Target</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '8px', height: '8px', background: '#10b981' }}></span>Sponsored</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '8px', height: '8px', background: '#0ea5e9' }}></span>Collected</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '8px', height: '8px', background: '#eab308' }}></span>Pending</span>
                            </div>
                        </div>
                    </div>

                    {/* Gender Distribution */}
                    <div>
                        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-color)', fontSize: '0.95rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>📊</span> Gender Distribution
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            No registration data
                        </div>
                    </div>
                </div>

                {/* Row 3: Bottom Stats */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>🎉</div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>4</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Total Events</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#422006', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>⏳</div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>0</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Upcoming</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#14532d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>✅</div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>4</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Completed</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#4c1d95', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>👥</div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>0</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Registered</div>
                        </div>
                    </div>
                </div>

                    </>
                )}
            </div>

            {isCreateModalOpen && <CreateEventModal onClose={() => {
                setIsCreateModalOpen(false);
                if (activeTab === 'All Events') {
                    // Quick hack to refresh active tab, ideally we'd pass a refresh callback
                    setActiveTab(''); 
                    setTimeout(() => setActiveTab('All Events'), 10);
                }
            }} />}

        </div>
    );
};

export default EventsDashboard;
