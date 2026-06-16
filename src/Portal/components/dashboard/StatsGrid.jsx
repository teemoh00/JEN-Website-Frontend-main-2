import React from 'react';

const StatCard = ({ label, value, subtext, icon }) => (
    <div style={{
        background: 'var(--surface-1)', // Dark card background for stats
        border: '1px solid var(--border-color)',
        padding: '1.5rem',
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        position: 'relative',
        overflow: 'hidden'
    }}>
        <div style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-muted)',
            fontWeight: '600'
        }}>
            {label}
        </div>
        <div style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: 'var(--primary)'
        }}>
            {value}
        </div>
        {subtext && (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {subtext}
            </div>
        )}
    </div>
);

const StatsGrid = ({ data, loading }) => {
    return (
        <div className="stats-grid-container">
            <StatCard
                label="Total Attendance"
                value={loading ? "..." : (data?.total_attendance ?? 0)}
                subtext="This Year"
            />
            <StatCard
                label="Next Meeting"
                value={loading ? "..." : (data?.next_meeting?.date ?? "None")}
                subtext={data?.next_meeting ? `${data.next_meeting.title} - ${data.next_meeting.time}` : "No upcoming meetings"}
            />
            <StatCard
                label="Giving (YTD)"
                value={loading ? "..." : (data?.giving_ytd ?? "KES 0")}
                subtext="15% increase"
            />

            <style>{`
                .stats-grid-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2.5rem;
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
                        flex: 0 0 280px !important; /* Standardized width with charts */
                        scroll-snap-align: start;
                    }
                }
            `}</style>
        </div>
    );
};

export default StatsGrid;
