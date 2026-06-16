import React from 'react';
import { useLocation } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';

const TopBar = ({ onToggleSidebar }) => {
    const location = useLocation();

    // Mapping paths to titles
    const getPageTitle = (pathname) => {
        const path = pathname.split('/').pop();
        if (pathname === '/portal/dashboard') return 'Dashboard';
        if (!path) return 'Dashboard';
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <header style={{
            height: '70px',
            background: 'var(--nav-bg)', // Adapts to theme
            borderBottom: '1px solid var(--border-color)',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                    className="portal-mobile-toggle"
                    onClick={onToggleSidebar}
                    style={{
                        display: 'none',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-color)',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '0.25rem'
                    }}
                >
                    ☰
                </button>
                <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Portal / {getPageTitle(location.pathname)}</div>
                    <h2 style={{ color: 'var(--text-color)', fontSize: '1.1rem', fontWeight: '700', lineHeight: 1.2 }}>{getPageTitle(location.pathname)}</h2>
                </div>
            </div>

            <style>{`
                @media (max-width: 968px) {
                    .portal-mobile-toggle {
                        display: block !important;
                    }
                    .theme-toggle-wrapper {
                        transform: scale(0.8);
                        transform-origin: right;
                    }
                }
                @media (max-width: 480px) {
                    .theme-toggle-wrapper {
                        transform: scale(0.75);
                    }
                    .assignment-title {
                        font-size: 1.3rem !important;
                    }
                }
            `}</style>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="theme-toggle-wrapper">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};

export default TopBar;
