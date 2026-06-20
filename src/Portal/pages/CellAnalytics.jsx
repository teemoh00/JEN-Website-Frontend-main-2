import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import api from '../../api/axios';

const CellAnalytics = () => {
    const [stats, setStats] = useState({
        totalMembers: 0,
        assigned: 0,
        unassigned: 0,
        assignedPercentage: 0,
        totalCells: 0,
        activeCells: 0,
        avgPerCell: 0
    });

    const [topCells, setTopCells] = useState([]);
    const [attentionCells, setAttentionCells] = useState([]);
    const [sizeDistribution, setSizeDistribution] = useState([]);
    const [activityStatus, setActivityStatus] = useState([]);
    const [mockAttendance, setMockAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const [membersRes, cellsRes] = await Promise.all([
                    api.get('members'),
                    api.get('cells')
                ]);

                const members = Array.isArray(membersRes.data) ? membersRes.data : (membersRes.data.results || []);
                const cells = Array.isArray(cellsRes.data) ? cellsRes.data : (cellsRes.data.results || []);

                const totalMembers = members.length;
                const assignedMembers = members.filter(m => m.cell_group_id || m.cell_group_name).length;
                const unassignedMembers = totalMembers - assignedMembers;
                const assignedPercentage = totalMembers > 0 ? Math.round((assignedMembers / totalMembers) * 100) : 0;
                
                const activeCellsCount = cells.filter(c => c.member_count > 0).length;
                const avgPerCell = cells.length > 0 ? Math.round(assignedMembers / cells.length) : 0;

                setStats({
                    totalMembers,
                    assigned: assignedMembers,
                    unassigned: unassignedMembers,
                    assignedPercentage,
                    totalCells: cells.length,
                    activeCells: activeCellsCount,
                    avgPerCell
                });

                // Top Cells
                const sortedCells = [...cells].sort((a, b) => (b.member_count || 0) - (a.member_count || 0));
                setTopCells(sortedCells.slice(0, 5));

                const fullCells = cells.filter(c => (c.member_count || 0) >= 15);
                setAttentionCells(fullCells);

                // Distribution Buckets
                let b1 = 0, b2 = 0, b3 = 0, b4 = 0;
                cells.forEach(c => {
                    const count = c.member_count || 0;
                    if (count === 0) b1++; // 0 members
                    else if (count <= 5) b2++; // 1-5
                    else if (count <= 10) b3++; // 6-10
                    else b4++; // >10
                });
                setSizeDistribution([
                    { name: 'Empty (0)', count: b1 },
                    { name: 'Small (1-5)', count: b2 },
                    { name: 'Medium (6-10)', count: b3 },
                    { name: 'Large (>10)', count: b4 }
                ]);

                // Activity Status
                setActivityStatus([
                    { name: 'Active Cells', value: activeCellsCount },
                    { name: 'Empty Cells', value: cells.length - activeCellsCount }
                ]);

                // Mock Attendance
                setMockAttendance([
                    { week: 'Wk 1', attendance: Math.round(totalMembers * 0.6) },
                    { week: 'Wk 2', attendance: Math.round(totalMembers * 0.7) },
                    { week: 'Wk 3', attendance: Math.round(totalMembers * 0.65) },
                    { week: 'Wk 4', attendance: Math.round(totalMembers * 0.8) }
                ]);

            } catch (err) {
                console.error("Error fetching analytics data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalyticsData();
    }, []);
    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Cell Analytics</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>Overview of cell health, membership distribution, and trends.</p>
            </div>

            {/* Top Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>👥</span> Total Members
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-color)' }}>{loading ? '...' : stats.totalMembers}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>✅</span> Assigned
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#4ade80', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                        {loading ? '...' : stats.assigned} <span style={{ fontSize: '1rem', color: '#4ade80' }}>{stats.assignedPercentage}%</span>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>⚠️</span> Unassigned
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#f59e0b' }}>{loading ? '...' : stats.unassigned}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>🏘️</span> Active Cells
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-color)', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                        {loading ? '...' : stats.activeCells} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>of {stats.totalCells}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>📊</span> Avg / Cell
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-color)' }}>{loading ? '...' : stats.avgPerCell}</div>
                </div>
            </div>

            {/* Charts Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-color)', fontSize: '1rem', fontWeight: '700' }}>Cell Size Distribution</h3>
                    <div style={{ flex: 1, height: '250px' }}>
                        {loading ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>Loading chart...</div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sizeDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                    <RechartsTooltip 
                                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                                    />
                                    <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
                <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-color)', fontSize: '1rem', fontWeight: '700' }}>Cell Activity Status</h3>
                    <div style={{ flex: 1, height: '250px' }}>
                        {loading ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>Loading chart...</div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={activityStatus}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        <Cell key="cell-0" fill="#4ade80" />
                                        <Cell key="cell-1" fill="#94a3b8" />
                                    </Pie>
                                    <RechartsTooltip 
                                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div style={{ marginBottom: '3rem', minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-color)', fontSize: '1rem', fontWeight: '700' }}>Overall Weekly Attendance Trends</h3>
                <div style={{ flex: 1, height: '250px' }}>
                    {loading ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>Loading chart...</div>
                    ) : stats.totalMembers === 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>Add members to see attendance trends</div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockAttendance} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <RechartsTooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                                />
                                <Line type="monotone" dataKey="attendance" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: '#a855f7', strokeWidth: 2, stroke: '#1e293b' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Charts Row 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-color)', fontSize: '1rem', fontWeight: '700' }}>Top Cells by Size</h3>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {topCells.length > 0 ? topCells.map((cell, idx) => (
                            <div key={cell.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'var(--surface-1)', borderRadius: '0.5rem' }}>
                                <div style={{ color: 'var(--text-color)' }}>{idx + 1}. {cell.name}</div>
                                <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{cell.member_count}</div>
                            </div>
                        )) : (
                            <div style={{ color: 'var(--text-muted)' }}>No cells available.</div>
                        )}
                    </div>
                </div>
                <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-color)', fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#f59e0b' }}>⚠️</span> Cells Needing Attention (Max Capacity)
                    </h3>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {attentionCells.length > 0 ? attentionCells.map(cell => (
                            <div key={cell.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '0.5rem' }}>
                                <div style={{ color: 'var(--text-color)' }}>{cell.name}</div>
                                <div style={{ fontWeight: 'bold', color: '#f59e0b' }}>{cell.member_count} Members</div>
                            </div>
                        )) : (
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', fontSize: '0.9rem', fontWeight: '600' }}>
                                ✅ All cells have healthy capacities!
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Follow-Up Summary */}
            <div>
                <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--text-color)', fontSize: '1rem', fontWeight: '700' }}>Follow-Up Summary</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center', gap: '1rem' }}>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '0.25rem' }}>0</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Total</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#f59e0b', marginBottom: '0.25rem' }}>0</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Pending</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#4ade80', marginBottom: '0.25rem' }}>0</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Completed</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ef4444', marginBottom: '0.25rem' }}>0</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>No Response</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CellAnalytics;
