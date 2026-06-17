import React, { useState, useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { ThemeContext } from '../../context/ThemeContext';

const PortalLayout = () => {
    const { theme } = useContext(ThemeContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    const bottomNavItems = [
        { icon: '📊', label: 'Home', path: '/portal/dashboard' },
        { icon: '🏘️', label: 'Cells', path: '/portal/cells' },
        { icon: '📅', label: 'Meetings', path: '/portal/meetings' },
        { icon: '👥', label: 'Members', path: '/portal/members' },
        { icon: '❤', label: 'Giving', path: '/portal/giving' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-color)' }}>
            {/* Backdrop for mobile */}
            {sidebarOpen && (
                <div
                    className="sidebar-backdrop"
                    onClick={closeSidebar}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 1040,
                        backdropFilter: 'blur(4px)'
                    }}
                />
            )}

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '260px', minHeight: '100vh' }} className="portal-main">
                <TopBar onToggleSidebar={toggleSidebar} />

                <main style={{
                    flex: 1,
                    padding: '2rem',
                    overflowY: 'auto'
                }} className="portal-content">
                    <Outlet />
                </main>
            </div>

            <style>{`
                /* Portal Specific Responsive Styles */
                @media (max-width: 968px) {
                    .portal-main {
                        margin-left: 0 !important;
                        overflow-x: hidden !important; /* Prevent page-level horizontal scroll */
                    }
                    .portal-content {
                        padding: 1.5rem 0.75rem 1rem !important; /* Increased top padding */
                    }
                }
            `}</style>

            {theme === 'light' && (
                <style>{`
                    :root, body, html {
                        --bg-color: #f1f5f9 !important;
                        --surface-1: #ffffff !important;
                        --surface-2: #e2e8f0 !important;
                        --text-color: #0f172a !important;
                        --text-muted: #64748b !important;
                        --primary: #0ea5e9 !important;
                        --secondary: #9333ea !important;
                        --nav-bg: #ffffff !important;
                        --border-color: rgba(0, 0, 0, 0.1) !important;
                        --card-bg: #ffffff !important;
                        --btn-text: #0f172a !important;
                        --btn-bg: #e2e8f0 !important;
                        background-color: var(--bg-color) !important;
                        color: var(--text-color) !important;
                    }
                    /* Force the Sidebar and TopBar to retain dark mode colors */
                    .portal-sidebar, header {
                        --bg-color: #120D20 !important;
                        --surface-1: #1A1625 !important;
                        --surface-2: #2a2438 !important;
                        --text-color: #f8fafc !important;
                        --text-muted: #94a3b8 !important;
                        --nav-bg: #120D20 !important;
                        --border-color: var(--border-color) !important;
                        --card-bg: #1A1625 !important;
                        color: var(--text-color) !important;
                    }
                    .portal-sidebar {
                        background-color: var(--nav-bg) !important;
                    }
                `}</style>
            )}
        </div>
    );
};

export default PortalLayout;
