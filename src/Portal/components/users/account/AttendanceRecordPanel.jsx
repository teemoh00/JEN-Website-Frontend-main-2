import React, { useState, useEffect } from 'react';
import api from '../../../../api/axios';

const AttendanceRecordPanel = () => {
    const [filterType, setFilterType] = useState('All');
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [summary, setSummary] = useState({ present: 0, absent: 0, rate: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendanceHistory = async () => {
            try {
                const response = await api.get('accounts/attendance/history/');
                setAttendanceHistory(response.data.history);
                setSummary(response.data.summary);
            } catch (err) {
                console.error('Error fetching attendance history:', err);
                setError('Failed to load attendance history.');
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceHistory();
    }, []);

    const getStatusColor = (status) => {
        return status === 'Present' ? '#4ade80' : '#ef4444';
    };

    if (loading) return (
        <div style={{ padding: '2rem', background: 'var(--surface-1)', borderRadius: '1rem', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
            Loading attendance records...
        </div>
    );

    if (error) return (
        <div style={{ padding: '2rem', background: 'var(--surface-1)', borderRadius: '1rem', border: '1px solid var(--border-color)', color: '#ef4444' }}>
            {error}
        </div>
    );

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1.5rem',
            padding: '2.5rem',
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.05)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '4px', height: '24px', background: 'var(--primary)', borderRadius: '2px' }}></div>
                    <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: '800' }}>Attendance History</h3>
                </div>

                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-color)',
                        borderRadius: '0.75rem',
                        padding: '0.5rem 1rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        outline: 'none'
                    }}
                >
                    <option value="All">All Events</option>
                    <option value="Event">Services / Events</option>
                    <option value="Meeting">Cell Meetings</option>
                </select>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem 0.5rem', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Date</th>
                            <th style={{ padding: '1rem 0.5rem', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Event / Meeting</th>
                            <th style={{ padding: '1rem 0.5rem', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Type</th>
                            <th style={{ padding: '1rem 0.5rem', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Check-in</th>
                            <th style={{ padding: '1rem 0.5rem', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceHistory.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No attendance records found.
                                </td>
                            </tr>
                        ) : (
                            attendanceHistory
                                .filter(item => filterType === 'All' || item.type === filterType)
                                .map(record => (
                                    <tr key={record.id} style={{ borderBottom: '1px solid var(--surface-2)', color: 'var(--text-color)', transition: 'background 0.2s' }}>
                                        <td style={{ padding: '1.25rem 0.5rem' }}>{record.date}</td>
                                        <td style={{ padding: '1.25rem 0.5rem', color: 'var(--text-color)', fontWeight: '700' }}>{record.event}</td>
                                        <td style={{ padding: '1.25rem 0.5rem' }}>
                                            <span style={{
                                                background: 'var(--surface-2)',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '2rem',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                border: '1px solid var(--border-color)'
                                            }}>
                                                {record.type}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1.25rem 0.5rem', color: 'var(--text-muted)' }}>{record.time}</td>
                                        <td style={{ padding: '1.25rem 0.5rem' }}>
                                            <span style={{
                                                color: getStatusColor(record.status),
                                                fontWeight: '800',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4rem',
                                                fontSize: '0.9rem'
                                            }}>
                                                {record.status === 'Present' ? '✓ Present' : '✕ Absent'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Summary Stats Cards */}
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{
                    flex: '1',
                    background: 'rgba(16, 185, 129, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '1.25rem',
                    border: '1px solid rgba(16, 185, 129, 0.1)',
                    minWidth: '180px'
                }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#10b981', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total Present</div>
                    <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-color)' }}>{summary.present}</div>
                </div>

                <div style={{
                    flex: '1',
                    background: 'rgba(239, 68, 68, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '1.25rem',
                    border: '1px solid rgba(239, 68, 68, 0.1)',
                    minWidth: '180px'
                }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#ef4444', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total Absent</div>
                    <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-color)' }}>{summary.absent}</div>
                </div>

                <div style={{
                    flex: '1',
                    background: 'rgba(34, 193, 230, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '1.25rem',
                    border: '1px solid rgba(34, 193, 230, 0.1)',
                    minWidth: '180px'
                }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Attendance Rate</div>
                    <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-color)' }}>{summary.rate}%</div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceRecordPanel;
