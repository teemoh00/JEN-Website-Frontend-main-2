import React, { useState } from 'react';

const mockBreakdownData = [
    { id: 1, name: 'Main Plenary Session', date: 'Feb 02, 2026', type: 'Plenary', present: 450, absent: 50, excused: 10, rate: 90 },
    { id: 2, name: 'Youth Breakout Track', date: 'Feb 02, 2026', type: 'Breakout', present: 120, absent: 30, excused: 5, rate: 77 },
    { id: 3, name: 'Leadership Workshop', date: 'Feb 02, 2026', type: 'Workshop', present: 200, absent: 15, excused: 2, rate: 92 },
    { id: 4, name: 'Evening Networking', date: 'Feb 02, 2026', type: 'Social', present: 300, absent: 40, excused: 10, rate: 85 }
];

const EventStatistics = () => {
    const [selectedEvent, setSelectedEvent] = useState('');

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Event Statistics & Analytics</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>Track engagement and participation health for specific events.</p>
                </div>
                {selectedEvent && (
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'var(--text-color)', fontSize: '0.9rem', fontWeight: '600' }}>
                        This Event <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem' }}>▼</span>
                    </div>
                )}
            </div>

            {/* Select Event */}
            <div style={{ marginBottom: '3rem' }}>
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
                            color: 'var(--text-color)',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            outline: 'none',
                            appearance: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Select an event...</option>
                        <option value="1" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>LEADERSHIP TRAINING 2026 EDITION — 4/2/2026 (GILGIL)</option>
                        <option value="2" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>YOUTH RETREAT 2026 — 5/15/2026 (NAIROBI)</option>
                        <option value="3" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>ANNUAL GENERAL MEETING — 6/20/2026 (NAKURU)</option>
                        <option value="4" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>SUNDAY SERVICE EXTRAVAGANZA — 7/05/2026 (MAIN SANCTUARY)</option>
                    </select>
                    <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-color)', fontSize: '0.8rem' }}>▼</span>
                </div>
            </div>

            {selectedEvent ? (
                <>
                    {/* Stats Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📅</div>
                            <div>
                                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>4</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Total Sessions</div>
                                <div style={{ fontSize: '0.65rem', color: '#f59e0b', marginTop: '0.25rem' }}>For this event</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>👥</div>
                            <div>
                                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>1,070</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Total Check-Ins</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📊</div>
                            <div>
                                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>267</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Avg. Per Session</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📈</div>
                            <div>
                                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>88%</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Attendance Rate</div>
                                <div style={{ fontSize: '0.65rem', color: '#10b981', marginTop: '0.25rem' }}>High engagement</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>⚠️</div>
                            <div>
                                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>12%</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Missed Rate</div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
                        
                        {/* Attendance Trend Chart */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                <div>
                                    <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '0.95rem', fontWeight: '700' }}>Check-In Timeline</h3>
                                    <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Arrival patterns throughout the event</p>
                                </div>
                            </div>
                            {/* Line Chart Mockup using SVG */}
                            <div style={{ flex: 1, position: 'relative', minHeight: '220px' }}>
                                <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                                    <defs>
                                        <linearGradient id="trendGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="rgba(34, 193, 230, 0.3)" />
                                            <stop offset="100%" stopColor="rgba(34, 193, 230, 0)" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M0,150 L30,120 L50,125 L70,95 L100,95 L120,70 L140,75 L160,60 L180,50 L200,55 L220,40 L240,40 L260,25 L280,30 L300,15 L320,50 L320,200 L0,200 Z" fill="url(#trendGradient)" stroke="none" />
                                    <polyline points="0,150 30,120 50,125 70,95 100,95 120,70 140,75 160,60 180,50 200,55 220,40 240,40 260,25 280,30 300,15" fill="none" stroke="#22c1e6" strokeWidth="4" />
                                    {/* Points */}
                                    {[[0,150], [30,120], [50,125], [70,95], [100,95], [120,70], [140,75], [160,60], [180,50], [200,55], [220,40], [240,40], [260,25], [280,30], [300,15]].map((pt, i) => (
                                        <circle key={i} cx={pt[0]} cy={pt[1]} r="4" fill="#0f0f13" stroke="#22c1e6" strokeWidth="2" />
                                    ))}
                                </svg>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '1rem', paddingRight: '20%' }}>
                                    <span>8am</span><span>9am</span><span>10am</span><span>11am</span><span>12pm</span><span>1pm</span>
                                </div>
                            </div>
                        </div>

                        {/* Meetings vs Events Bar Chart (now Session Comparison) */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ margin: '0 0 2rem 0', color: 'var(--text-color)', fontSize: '0.95rem', fontWeight: '700', textAlign: 'center' }}>Session Comparison</h3>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '220px', paddingBottom: '1rem' }}>
                                    {/* S1 */}
                                    <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'flex-end', height: '100%' }}>
                                        <div style={{ width: '25px', height: '30%', background: '#0ea5e9' }}></div>
                                        <div style={{ width: '25px', height: '80%', background: '#d4d4aa' }}></div>
                                    </div>
                                    {/* S2 */}
                                    <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'flex-end', height: '100%' }}>
                                        <div style={{ width: '25px', height: '40%', background: '#0ea5e9' }}></div>
                                        <div style={{ width: '25px', height: '55%', background: '#d4d4aa' }}></div>
                                    </div>
                                    {/* S3 */}
                                    <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'flex-end', height: '100%' }}>
                                        <div style={{ width: '25px', height: '40%', background: '#0ea5e9' }}></div>
                                        <div style={{ width: '25px', height: '2%', background: '#d4d4aa' }}></div>
                                    </div>
                                    {/* S4 */}
                                    <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'flex-end', height: '100%' }}>
                                        <div style={{ width: '25px', height: '45%', background: '#0ea5e9' }}></div>
                                        <div style={{ width: '25px', height: '100%', background: '#d4d4aa' }}></div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-around', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                                    <span>Session 1</span><span>Session 2</span><span>Session 3</span><span>Session 4</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-color)', fontWeight: '600' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '8px', height: '8px', background: '#0ea5e9' }}></span>Expected</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '8px', height: '8px', background: '#d4d4aa' }}></span>Actual</span>
                                </div>
                            </div>
                        </div>

                        {/* Attendance Distribution Pie Chart */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ margin: '0 0 2rem 0', color: 'var(--text-color)', fontSize: '0.95rem', fontWeight: '700', textAlign: 'center' }}>Demographic Split</h3>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {/* CSS Pie Chart Mockup using conic-gradient */}
                                <div style={{
                                    width: '180px',
                                    height: '180px',
                                    borderRadius: '50%',
                                    background: 'conic-gradient(#22c55e 0% 45%, #0ea5e9 45% 80%, #f59e0b 80% 95%, #ef4444 95% 100%)',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '2rem'
                                }}>
                                    <div style={{ textAlign: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-color)' }}>100%</div>
                                        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Attendees</div>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-color)', fontWeight: '600', width: '80%' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '8px', height: '8px', background: '#0ea5e9', borderRadius: '50%' }}></span>35% Youth</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }}></span>45% Adults</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }}></span>15% Leaders</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></span>5% Guests</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Detailed Attendance Breakdown Table */}
                    <div style={{ marginTop: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ color: 'var(--text-color)', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>Session Breakdown</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer' }}>Filter</span>
                                <button style={{ background: '#22c1e6', color: 'var(--text-color)', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 1.25rem', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' }}>
                                    Export Report
                                </button>
                            </div>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                                <thead>
                                    <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                                        <th style={{ padding: '1rem 0' }}>Session Name</th>
                                        <th style={{ padding: '1rem 0' }}>Type</th>
                                        <th style={{ padding: '1rem 0', textAlign: 'center' }}>Present</th>
                                        <th style={{ padding: '1rem 0', textAlign: 'center' }}>Absent</th>
                                        <th style={{ padding: '1rem 0', textAlign: 'center' }}>Excused</th>
                                        <th style={{ padding: '1rem 0' }}>Rate</th>
                                        <th style={{ padding: '1rem 0', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockBreakdownData.map((row) => (
                                        <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1.5rem 0' }}>
                                                <div style={{ color: 'var(--text-color)', fontWeight: '700', marginBottom: '0.25rem' }}>{row.name}</div>
                                                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{row.date}</div>
                                            </td>
                                            <td style={{ padding: '1.5rem 0' }}>
                                                <span style={{ background: 'var(--border-color)', color: 'var(--text-color)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem' }}>{row.type}</span>
                                            </td>
                                            <td style={{ padding: '1.5rem 0', color: '#22c55e', fontWeight: '600', textAlign: 'center' }}>{row.present}</td>
                                            <td style={{ padding: '1.5rem 0', color: '#ef4444', fontWeight: '600', textAlign: 'center' }}>{row.absent}</td>
                                            <td style={{ padding: '1.5rem 0', color: '#f59e0b', fontWeight: '600', textAlign: 'center' }}>{row.excused}</td>
                                            <td style={{ padding: '1.5rem 0' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <span style={{ color: row.rate >= 90 ? '#22c55e' : row.rate >= 80 ? '#3b82f6' : '#f59e0b', fontWeight: '700' }}>{row.rate}%</span>
                                                    <div style={{ width: '40px', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', position: 'relative' }}>
                                                        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${row.rate}%`, background: row.rate >= 90 ? '#22c55e' : row.rate >= 80 ? '#3b82f6' : '#f59e0b', borderRadius: '2px' }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1.5rem 0', textAlign: 'right', color: 'var(--text-muted)', cursor: 'pointer' }}>⋮</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '4rem', padding: '3rem', background: 'var(--border-color)', borderRadius: '1rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📊</div>
                    <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Please select an event to view its statistics.</p>
                </div>
            )}
        </div>
    );
};

export default EventStatistics;
