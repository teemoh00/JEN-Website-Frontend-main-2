import React from 'react';

const AttendanceWidget = ({ recentAttendance, loading }) => {
    return (
        <div style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-color)',
            borderRadius: '1rem',
            padding: '1.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--text-color)', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>
                    My Attendance
                </h3>
                <button style={{ background: 'var(--surface-2)', color: 'var(--text-muted)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.75rem', cursor: 'pointer' }}>
                    View All
                </button>
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1, background: 'var(--surface-2)', padding: '1rem 0.5rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-color)', marginBottom: '0.25rem' }}>0</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Attended</div>
                </div>
                <div style={{ flex: 1, background: 'var(--surface-2)', padding: '1rem 0.5rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-color)', marginBottom: '0.25rem' }}>0</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Total</div>
                </div>
                <div style={{ flex: 1, background: '#dcfce7', padding: '1rem 0.5rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#166534', marginBottom: '0.25rem' }}>0%</div>
                    <div style={{ fontSize: '0.7rem', color: '#166534' }}>Rate</div>
                </div>
            </div>

            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                Recent History
            </div>
            
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>No attendance records yet</p>
            </div>
        </div>
    );
};

export default AttendanceWidget;
