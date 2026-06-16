import React from 'react';

const StatCard = ({ label, value, icon, bgStyle }) => (
    <div style={{
        background: bgStyle,
        border: 'none',
        padding: '1.5rem',
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        color: '#333'
    }}>
        <div style={{
            fontSize: '1.5rem',
            marginBottom: '0.25rem',
            background: 'rgba(0,0,0,0.05)',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%'
        }}>
            {icon}
        </div>
        <div style={{
            fontSize: '0.85rem',
            textTransform: 'capitalize',
            letterSpacing: '0.05em',
            color: '#64748b',
            fontWeight: '600'
        }}>
            {label}
        </div>
        <div style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#0f172a'
        }}>
            {value}
        </div>
    </div>
);

const StatsGrid = ({ data, loading }) => {
    return (
        <div className="stats-grid-container">
            <StatCard
                label="Members"
                value={loading ? "..." : (data?.members ?? 471)}
                icon="👥"
                bgStyle="#ffffff"
            />
            <StatCard
                label="Cells"
                value={loading ? "..." : (data?.cells ?? 0)}
                icon="🏘️"
                bgStyle="#fff9c4"
            />
            <StatCard
                label="Events"
                value={loading ? "..." : (data?.events ?? 0)}
                icon="📅"
                bgStyle="#e3f2fd"
            />
            <StatCard
                label="Meetings"
                value={loading ? "..." : (data?.meetings ?? 0)}
                icon="📋"
                bgStyle="#ffebee"
            />
            <StatCard
                label="Giving"
                value={loading ? "..." : (data?.giving_ytd ?? "KES 441k")}
                icon="💰"
                bgStyle="#e8f5e9"
            />
            <StatCard
                label="Attendance"
                value={loading ? "..." : ((data?.attendance_percentage ?? 0) + "%")}
                icon="📊"
                bgStyle="#f3e5f5"
            />

            <style>{`
                .stats-grid-container {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                    margin-bottom: 2.5rem;
                }

                @media (max-width: 1024px) {
                    .stats-grid-container {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 768px) {
                    .stats-grid-container {
                        display: flex !important;
                        overflow-x: auto !important;
                        gap: 1.25rem !important;
                        padding: 0.25rem 0.25rem 1rem !important;
                        margin: -0.25rem -0.25rem 0 !important;
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: none; /* Hide scrollbar Firefox */
                        scroll-snap-type: x mandatory;
                    }
                    .stats-grid-container::-webkit-scrollbar {
                        display: none; /* Hide scrollbar Chrome/Safari */
                    }
                    .stats-grid-container > div {
                        flex: 0 0 160px !important;
                        scroll-snap-align: start;
                    }
                }
            `}</style>
        </div>
    );
};

export default StatsGrid;
