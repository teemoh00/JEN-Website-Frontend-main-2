import React, { useContext } from 'react';
import { EventContext } from '../../../../context/EventContext';

const StatCard = ({ icon, value, label, subtext, color = 'var(--primary)' }) => (
    <div style={{
        background: 'var(--surface-1)',
        borderRadius: '1rem',
        padding: '1.25rem',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    }}>
        <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '10px',
            background: `rgba(${color === 'var(--primary)' ? '34, 193, 230' : (color === '#4ade80' ? '74, 222, 128' : '168, 85, 247')}, 0.1)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: color
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-color)', lineHeight: 1 }}>{value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '500', marginTop: '0.2rem' }}>{label}</div>
            {subtext && <div style={{ color: color, fontSize: '0.7rem', marginTop: '0.1rem' }}>{subtext}</div>}
        </div>
    </div>
);

const EventStatsCards = () => {
    const { events } = useContext(EventContext);

    const totalEvents = events.length;
    const upcomingEvents = events.filter(e => e.status === 'Upcoming' || e.status === 'Registration Open').length;
    const completedEvents = events.filter(e => e.status === 'Completed').length;

    // Average attendance (RSVPs) across all events
    const totalAttendance = events.reduce((acc, curr) => acc + (curr.registrations_count || curr.registrations?.length || 0), 0);
    const avgAttendance = events.length > 0 ? Math.round(totalAttendance / events.length) : 0;

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
        }}>
            <StatCard icon="🎉" value={totalEvents} label="Total Events" color="#eff3c1" />
            <StatCard icon="⏳" value={upcomingEvents} label="Upcoming" color="#22c1e6" subtext="In queue" />
            <StatCard icon="✅" value={completedEvents} label="Completed" color="#4ade80" />
            <StatCard icon="👥" value={avgAttendance} label="Avg RSVPs" color="#a855f7" />
        </div>
    );
};

export default EventStatsCards;
