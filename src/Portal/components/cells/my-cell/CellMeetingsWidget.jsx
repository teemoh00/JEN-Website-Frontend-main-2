import React from 'react';

const CellMeetingsWidget = ({ schedule }) => {
    const meetingDay = schedule?.day || 'TBD';
    const meetingTime = schedule?.time || 'TBD';

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h3 style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📅 Meetings & Activity
            </h3>

            {/* Next Meeting Info */}
            <div style={{
                background: 'rgba(34, 193, 230, 0.05)',
                borderLeft: '4px solid #22c1e6',
                borderRadius: '0.5rem',
                padding: '1.25rem',
                marginBottom: '1rem'
            }}>
                <div style={{ color: 'var(--primary)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', marginBottom: '0.5rem' }}>Standard Schedule</div>
                <div style={{ color: 'var(--text-color)', fontSize: '1.2rem', fontWeight: '700' }}>Every {meetingDay}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>@ {meetingTime}</div>
            </div>

            <div style={{ marginTop: 'auto', padding: '1rem', background: 'var(--surface-2)', borderRadius: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                Attendance tracking is coming soon!
            </div>
        </div>
    );
};

export default CellMeetingsWidget;
