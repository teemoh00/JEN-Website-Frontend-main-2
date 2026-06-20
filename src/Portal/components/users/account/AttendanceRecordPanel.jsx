import React, { useState, useEffect } from 'react';
import api from '../../../../api/axios';

const AttendanceRecordPanel = ({ user }) => {
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            if (!user?.member_id) {
                setLoading(false);
                return;
            }
            try {
                const response = await api.get(`accounts/attendance/?member_id=${user.member_id}`);
                setAttendanceHistory(response.data);
            } catch (err) {
                console.error("Error fetching attendance:", err);
                setError("Failed to load attendance history.");
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, [user?.member_id]);

    const presentCount = attendanceHistory.filter(r => r.attended).length;
    const absentCount = attendanceHistory.filter(r => !r.attended).length;
    const total = presentCount + absentCount;
    const rate = total > 0 ? Math.round((presentCount / total) * 100) : 0;

    const summary = { present: presentCount, absent: absentCount, rate: rate };

    const getStatusColor = (attended) => {
        return attended ? '#4ade80' : '#ef4444';
    };

    if (loading) return <div style={{ padding: '2rem', color: 'var(--text-color)' }}>Loading attendance...</div>;
    if (error) return <div style={{ padding: '2rem', color: '#ef4444' }}>{error}</div>;

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '2.5rem',
            color: 'var(--text-color)',
            border: '1px solid var(--border-color)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: '800' }}>Attendance History</h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}>
                    All Events
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            <div style={{ overflowX: 'auto', marginBottom: '3rem' }}>
                {attendanceHistory.length === 0 ? (
                    <div style={{ padding: '2rem 0', color: 'var(--text-muted)' }}>No attendance records found yet.</div>
                ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '20%' }}>Date</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '25%' }}>Event / Meeting</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '20%' }}>Type</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '15%' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceHistory.map(record => (
                            <tr key={record.id} style={{ borderBottom: 'none', color: 'var(--text-color)' }}>
                                <td style={{ padding: '1.25rem 0' }}>{record.date}</td>
                                <td style={{ padding: '1.25rem 0', fontWeight: '700' }}>{record.meeting_type}</td>
                                <td style={{ padding: '1.25rem 0' }}>{record.meeting_type}</td>
                                <td style={{ padding: '1.25rem 0' }}>
                                    <span style={{
                                        color: getStatusColor(record.attended),
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        fontSize: '0.9rem'
                                    }}>
                                        {record.attended ? '✓ Present' : '✕ Absent'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
            </div>

            {/* Summary Stats Cards */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{
                    background: 'rgba(14, 165, 233, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(14, 165, 233, 0.2)',
                    minWidth: '150px'
                }}>
                    <div style={{ fontSize: '0.8rem', color: '#0ea5e9', marginBottom: '0.5rem' }}>Total Present</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)' }}>{summary.present}</div>
                </div>

                <div style={{
                    background: 'rgba(239, 68, 68, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    minWidth: '150px'
                }}>
                    <div style={{ fontSize: '0.8rem', color: '#ef4444', marginBottom: '0.5rem' }}>Total Absent</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)' }}>{summary.absent}</div>
                </div>

                <div style={{
                    background: 'rgba(16, 185, 129, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    minWidth: '150px'
                }}>
                    <div style={{ fontSize: '0.8rem', color: '#10b981', marginBottom: '0.5rem' }}>Attendance Rate</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)' }}>{summary.rate}%</div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceRecordPanel;
