import React from 'react';

const CellAnalytics = () => {
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
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff' }}>0</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>✅</span> Assigned
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#4ade80', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                        0 <span style={{ fontSize: '1rem', color: '#4ade80' }}>0%</span>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>⚠️</span> Unassigned
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#f59e0b' }}>0</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>🏘️</span> Active Cells
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                        0 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>of 0</span>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>📊</span> Avg / Cell
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff' }}>0</div>
                </div>
            </div>

            {/* Charts Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-color)', fontSize: '1rem', fontWeight: '700' }}>Cell Size Distribution</h3>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        No data available
                    </div>
                </div>
                <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-color)', fontSize: '1rem', fontWeight: '700' }}>Cell Categories</h3>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        No data available
                    </div>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div style={{ marginBottom: '3rem', minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-color)', fontSize: '1rem', fontWeight: '700' }}>Weekly Attendance Trends</h3>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    No attendance data yet
                </div>
            </div>

            {/* Charts Row 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-color)', fontSize: '1rem', fontWeight: '700' }}>Top Cells by Size</h3>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        No data available
                    </div>
                </div>
                <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-color)', fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#f59e0b' }}>⚠️</span> Cells Needing Attention
                    </h3>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', fontSize: '0.9rem', fontWeight: '600' }}>
                        ✅ All cells are healthy!
                    </div>
                </div>
            </div>

            {/* Follow-Up Summary */}
            <div>
                <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--text-color)', fontSize: '1rem', fontWeight: '700' }}>Follow-Up Summary</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center', gap: '1rem' }}>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.25rem' }}>0</div>
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
