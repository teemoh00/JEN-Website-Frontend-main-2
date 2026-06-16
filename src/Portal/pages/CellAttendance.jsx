import React, { useState } from 'react';

const CellAttendance = () => {
    const [selectedCell, setSelectedCell] = useState('');
    const [meetingDate, setMeetingDate] = useState('2026-06-16');

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Cell Attendance</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>Record and track cell meeting attendance.</p>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '250px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cell Group</label>
                    <div style={{ position: 'relative' }}>
                        <select
                            value={selectedCell}
                            onChange={(e) => setSelectedCell(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                background: 'transparent',
                                border: 'none',
                                color: selectedCell ? 'var(--text-color)' : 'var(--text-muted)',
                                fontSize: '0.95rem',
                                outline: 'none',
                                appearance: 'none',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            <option value="" disabled style={{ color: 'var(--text-muted)', background: '#1a1a24' }}>Select a cell...</option>
                            <option value="1" style={{ color: '#ffffff', background: '#1a1a24' }}>North Region Cell 1</option>
                            <option value="2" style={{ color: '#ffffff', background: '#1a1a24' }}>Youth Cell East</option>
                        </select>
                        <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                            ▼
                        </span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '200px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Meeting Date</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <input
                            type="date"
                            value={meetingDate}
                            onChange={(e) => setMeetingDate(e.target.value)}
                            style={{
                                padding: '0.75rem 1rem',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-color)',
                                fontSize: '0.95rem',
                                outline: 'none',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {!selectedCell && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '40vh', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.8 }}>📋</div>
                    <p style={{ fontSize: '1rem' }}>Select a cell group to record attendance</p>
                </div>
            )}
        </div>
    );
};

export default CellAttendance;
