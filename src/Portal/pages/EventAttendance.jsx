import React, { useState } from 'react';

const mockAttendees = [
    { id: 1, name: 'Agani Chelsea', phone: '0706738213', email: 'aganichelsea2004@gmail.com', category: 'Other', status: 'Checked In', time: 'Apr 5, 12:27 AM', method: 'Manual' },
    { id: 2, name: 'Andrew Momanyi', phone: '0793326592', email: 'andrewmonyi@jen.com', category: '-', status: 'Checked In', time: 'Apr 2, 07:32 PM', method: 'Manual' },
    { id: 3, name: 'Aron Kipsang Ngeno', phone: '0701755632', email: 'ngenoaron16@gmail.com', category: 'Working', status: 'Checked In', time: 'Apr 3, 05:29 PM', method: 'Manual' },
    { id: 4, name: 'BENJAMIN KIMANI', phone: '0746269179', email: 'benjaminkimani50@gmail.com', category: 'Ministry', status: 'Checked In', time: 'Apr 2, 07:57 PM', method: 'Manual' },
    { id: 5, name: 'Caleb koech', phone: '0725425383', email: 'calebkoech03@gmail.com', category: 'Business', status: 'Pending', time: '-', method: '-' },
    { id: 6, name: 'Chris Macharia', phone: '0716412519', email: 'chrismacharia@jen.com', category: '-', status: 'Checked In', time: 'Apr 2, 07:35 PM', method: 'Manual' },
    { id: 7, name: 'Cjaay Martin', phone: '0712852259', email: 'cjaaay12@gmail.com', category: '-', status: 'Checked In', time: 'Apr 2, 06:21 PM', method: 'Manual' },
    { id: 8, name: 'Daniel wisdom', phone: '0118072260', email: 'daniel25@gmail.com', category: '-', status: 'Checked In', time: 'Apr 2, 06:19 PM', method: 'Manual' },
    { id: 9, name: 'Edwin Alumasa', phone: '0114211617', email: 'edualmasa2@gmail.com', category: 'Student', status: 'Checked In', time: 'Apr 2, 10:11 PM', method: 'Manual' }
];

const EventAttendance = () => {
    const [activeTab, setActiveTab] = useState('All (58)');
    const [selectedEvent, setSelectedEvent] = useState('');

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: '#ffffff' }}>Event Attendance</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>Check in attendees manually or scan QR codes.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button style={{ background: '#22c55e', color: '#ffffff', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>+</span> Register
                    </button>
                    <button style={{ background: '#0ea5e9', color: '#ffffff', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>✉️</span> Email All QR Codes
                    </button>
                    <button style={{ background: '#a855f7', color: '#ffffff', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>🔲</span> Scan QR Code
                    </button>
                    <button style={{ background: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>📄</span> PDF Report
                    </button>
                </div>
            </div>

            {/* Select Event */}
            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Select Event</label>
                <div style={{ position: 'relative' }}>
                    <select
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'transparent',
                            border: '1px solid #ffffff',
                            borderRadius: '0.5rem',
                            color: '#ffffff',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            outline: 'none',
                            appearance: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="" style={{ color: '#ffffff', background: '#1a1a24' }}>Select an event...</option>
                        <option value="1" style={{ color: '#ffffff', background: '#1a1a24' }}>LEADERSHIP TRAINING 2026 EDITION — 4/2/2026 (GILGIL)</option>
                        <option value="2" style={{ color: '#ffffff', background: '#1a1a24' }}>YOUTH RETREAT 2026 — 5/15/2026 (NAIROBI)</option>
                        <option value="3" style={{ color: '#ffffff', background: '#1a1a24' }}>ANNUAL GENERAL MEETING — 6/20/2026 (NAKURU)</option>
                        <option value="4" style={{ color: '#ffffff', background: '#1a1a24' }}>SUNDAY SERVICE EXTRAVAGANZA — 7/05/2026 (MAIN SANCTUARY)</option>
                    </select>
                    <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#ffffff', fontSize: '0.8rem' }}>▼</span>
                </div>
            </div>

            {selectedEvent ? (
                <>
                    {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>📄</div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', lineHeight: 1 }}>58</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Registered</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>✅</div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', lineHeight: 1 }}>51</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Checked In</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>⏳</div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', lineHeight: 1 }}>7</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Pending</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>📊</div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', lineHeight: 1 }}>87.9%</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Attendance Rate</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>📱</div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', lineHeight: 1 }}>0</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>QR Scans</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(234, 179, 8, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>✋</div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', lineHeight: 1 }}>51</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Manual</div>
                    </div>
                </div>
            </div>

            {/* Quick Check-In Bar */}
            <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', marginRight: '1rem' }}>QUICK CHECK-IN:</span>
                <input type="text" placeholder="Enter phone number or email..." style={{ background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', flex: 1, fontSize: '0.9rem' }} />
                <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>Check In</button>
            </div>

            {/* Search & Filter Tabs */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <input type="text" placeholder="Search attendees..." style={{ background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '0.9rem', width: '250px' }} />
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {['All (58)', 'Checked In (51)', 'Pending (7)'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                background: 'transparent',
                                border: activeTab === tab ? '1px solid var(--primary)' : '1px solid transparent',
                                color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table Area */}
            <div>
                <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Registered Attendees (58)</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                        <thead>
                            <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.05)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
                                <th style={{ padding: '1rem 0', width: '40px' }}>#</th>
                                <th style={{ padding: '1rem 0' }}>Name</th>
                                <th style={{ padding: '1rem 0' }}>Phone</th>
                                <th style={{ padding: '1rem 0' }}>Email</th>
                                <th style={{ padding: '1rem 0' }}>Category</th>
                                <th style={{ padding: '1rem 0' }}>Status</th>
                                <th style={{ padding: '1rem 0' }}>Check-In Time</th>
                                <th style={{ padding: '1rem 0' }}>Method</th>
                                <th style={{ padding: '1rem 0', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockAttendees.map((attendee, index) => (
                                <tr key={attendee.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>{index + 1}</td>
                                    <td style={{ padding: '1rem 0', color: '#ffffff', fontWeight: '600' }}>{attendee.name}</td>
                                    <td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>{attendee.phone}</td>
                                    <td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>{attendee.email}</td>
                                    <td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>{attendee.category}</td>
                                    <td style={{ padding: '1rem 0' }}>
                                        <span style={{
                                            background: attendee.status === 'Checked In' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                            color: attendee.status === 'Checked In' ? '#4ade80' : '#f59e0b',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.75rem',
                                            fontWeight: '600'
                                        }}>
                                            {attendee.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>{attendee.time}</td>
                                    <td style={{ padding: '1rem 0' }}>
                                        {attendee.method !== '-' ? (
                                            <span style={{
                                                background: 'rgba(14, 165, 233, 0.1)',
                                                color: '#0ea5e9',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '1rem',
                                                fontSize: '0.75rem',
                                                fontWeight: '600'
                                            }}>
                                                {attendee.method}
                                            </span>
                                        ) : (
                                            <span style={{ color: 'var(--text-muted)' }}>-</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '1rem 0', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        {attendee.status === 'Checked In' ? (
                                            <button style={{ background: 'transparent', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', borderRadius: '0.25rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', cursor: 'pointer' }}>Undo</button>
                                        ) : (
                                            <button style={{ background: 'transparent', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#4ade80', borderRadius: '0.25rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', cursor: 'pointer' }}>Check In</button>
                                        )}
                                        <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', borderRadius: '0.25rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', cursor: 'pointer' }}>QR</button>
                                        <button style={{ background: 'transparent', border: '1px solid rgba(14, 165, 233, 0.3)', color: '#0ea5e9', borderRadius: '0.25rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', cursor: 'pointer' }}>✉</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
                </>
            ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '4rem', padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📅</div>
                    <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Please select an event to view attendance details.</p>
                </div>
            )}
        </div>
    );
};

export default EventAttendance;
