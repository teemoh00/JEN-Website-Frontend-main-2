import React from 'react';

const BirthdayCard = ({ birthdayData }) => {
    // If no backend data is available, gracefully fall back
    const birthday = birthdayData || {
        date: 'Date not set',
        turningAge: '...',
        daysLeft: 0
    };

    return (
        <div className="birthday-card" style={{
            background: 'var(--surface-1)',
            borderRadius: '1.5rem',
            padding: '3rem',
            border: '1px solid var(--border-color)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: '400px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
            <style>{`
                @media (max-width: 640px) {
                    .birthday-card {
                        padding: 1.5rem !important;
                        min-height: 300px !important;
                    }
                    .birthday-title {
                        font-size: 0.9rem !important;
                        margin-bottom: 0.5rem !important;
                    }
                    .birthday-date {
                        font-size: 2.5rem !important;
                    }
                    .birthday-age {
                        font-size: 1.2rem !important;
                        margin-bottom: 1.5rem !important;
                    }
                    .birthday-age-num {
                        font-size: 1.5rem !important;
                    }
                    .birthday-countdown {
                        padding: 0.5rem 1.25rem !important;
                    }
                }
            `}</style>

            {/* Background Decorations */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-20%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                opacity: 0.1,
                borderRadius: '50%',
                filter: 'blur(40px)'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-10%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
                opacity: 0.1,
                borderRadius: '50%',
                filter: 'blur(30px)'
            }}></div>

            {/* Confetti (CSS only representation) */}
            <div style={{ fontSize: '2rem', position: 'absolute', top: '10%', left: '10%', opacity: 0.3 }}>🎉</div>
            <div style={{ fontSize: '1.5rem', position: 'absolute', top: '20%', right: '15%', opacity: 0.2 }}>✨</div>
            <div style={{ fontSize: '2rem', position: 'absolute', bottom: '15%', left: '20%', opacity: 0.2 }}>🎂</div>

            <div style={{ zIndex: 2 }}>
                <h2 className="birthday-title" style={{
                    color: 'var(--text-muted)',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    marginBottom: '1rem'
                }}>
                    Upcoming Birthday
                </h2>

                <div className="birthday-date" style={{
                    fontSize: '4.5rem',
                    fontWeight: '800',
                    background: 'linear-gradient(to right, #22c1e6, #a855f7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.1,
                    marginBottom: '0.5rem'
                }}>
                    {birthday.date}
                </div>

                <div className="birthday-age" style={{
                    fontSize: '2rem',
                    color: 'var(--text-muted)',
                    fontWeight: '600',
                    marginBottom: '2.5rem'
                }}>
                    Turning <span className="birthday-age-num" style={{ color: 'var(--text-color)', fontSize: '2.5rem' }}>{birthday.turningAge}</span> Years Old
                </div>

                <div className="birthday-countdown" style={{
                    background: 'var(--surface-2)',
                    padding: '0.75rem 2rem',
                    borderRadius: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    border: '1px solid var(--border-color)',
                    width: 'fit-content',
                    margin: '0 auto'
                }}>
                    <span style={{ fontSize: '1.2rem' }}>⏳</span>
                    <span style={{ color: 'var(--text-color)', fontSize: '1rem', fontWeight: '600' }}>
                        {birthday.daysLeft} days to go!
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BirthdayCard;
