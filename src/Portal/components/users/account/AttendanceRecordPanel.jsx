import React, { useState } from 'react';

const AttendanceRecordPanel = () => {
    // Mock data based on the provided image
    const attendanceHistory = [
        { id: 1, date: 'Feb 02, 2026', event: 'Sunday Service', type: 'Service', time: '10:00 AM', status: 'Present' },
        { id: 2, date: 'Jan 28, 2026', event: 'Mid-Week Cell Group', type: 'Cell Meeting', time: '06:00 PM', status: 'Present' },
        { id: 3, date: 'Jan 26, 2026', event: 'Sunday Service', type: 'Service', time: '-', status: 'Absent' },
        { id: 4, date: 'Jan 21, 2026', event: 'Mid-Week Cell Group', type: 'Cell Meeting', time: '06:15 PM', status: 'Present' },
        { id: 5, date: 'Jan 19, 2026', event: 'Sunday Service', type: 'Service', time: '09:55 AM', status: 'Present' },
    ];

    const summary = { present: 35, absent: 2, rate: 94 };

    const getStatusColor = (status) => {
        return status === 'Present' ? '#4ade80' : '#ef4444';
    };

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
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '20%' }}>Date</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '25%' }}>Event / Meeting</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '20%' }}>Type</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '20%' }}>Check-in Time</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '15%' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceHistory.map(record => (
                            <tr key={record.id} style={{ borderBottom: 'none', color: 'var(--text-color)' }}>
                                <td style={{ padding: '1.25rem 0' }}>{record.date}</td>
                                <td style={{ padding: '1.25rem 0', fontWeight: '700' }}>{record.event}</td>
                                <td style={{ padding: '1.25rem 0' }}>{record.type}</td>
                                <td style={{ padding: '1.25rem 0', color: 'var(--text-muted)' }}>{record.time}</td>
                                <td style={{ padding: '1.25rem 0' }}>
                                    <span style={{
                                        color: getStatusColor(record.status),
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        fontSize: '0.9rem'
                                    }}>
                                        {record.status === 'Present' ? '✓ Present' : '✕ Absent'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
