import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SidebarItem = ({ icon, label, path, active, hovered, setHovered, subItems, isOpen, onToggle, onClose }) => {
    return (
        <div style={{ marginBottom: '0.25rem' }}>
            <div
                onClick={subItems ? onToggle : undefined}
                onMouseEnter={() => setHovered(path)}
                onMouseLeave={() => setHovered(null)}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    color: active ? 'var(--primary)' : 'var(--text-color)',
                    background: active ? 'rgba(34, 193, 230, 0.1)' : (hovered === path ? 'var(--surface-2)' : 'transparent'),
                    transition: 'all 0.2s ease',
                    borderLeft: active ? '3px solid var(--primary)' : '3px solid transparent',
                    cursor: subItems ? 'pointer' : 'default',
                    whiteSpace: 'normal'
                }}
            >
                {subItems ? (
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                        <span style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>
                        <span style={{ fontWeight: active ? '600' : '500', fontSize: '0.95rem', lineHeight: '1.2' }}>{label}</span>
                    </div>
                ) : (
                    <Link to={path} onClick={onClose} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem', flex: 1, textDecoration: 'none', color: 'inherit' }}>
                        <span style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>
                        <span style={{ fontWeight: active ? '600' : '500', fontSize: '0.95rem', lineHeight: '1.2' }}>{label}</span>
                    </Link>
                )}

                {subItems && (
                    <span style={{ fontSize: '0.7rem', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: 'var(--text-muted)' }}>▼</span>
                )}
            </div>

            {/* Sub-items Dropdown */}
            {subItems && isOpen && (
                <div style={{ paddingLeft: '3.25rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {subItems.map(sub => (
                        <Link
                            key={sub.path}
                            to={sub.path}
                            onClick={onClose}
                            style={{
                                textDecoration: 'none',
                                color: location.pathname === sub.path ? 'var(--primary)' : 'var(--text-muted)',
                                fontSize: '0.85rem',
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                transition: 'all 0.2s',
                                fontWeight: location.pathname === sub.path ? '600' : '500'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = 'var(--primary)';
                                if(e.target.firstChild) e.target.firstChild.style.background = 'var(--primary)';
                            }}
                            onMouseLeave={(e) => {
                                if (location.pathname !== sub.path) {
                                    e.target.style.color = 'var(--text-muted)';
                                    if(e.target.firstChild) e.target.firstChild.style.background = '#4b5563';
                                }
                            }}
                        >
                            <span style={{
                                width: '5px',
                                height: '5px',
                                borderRadius: '50%',
                                background: location.pathname === sub.path ? 'var(--primary)' : '#4b5563',
                                display: 'inline-block',
                                transition: 'background 0.2s'
                            }}></span>
                            {sub.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const [hovered, setHovered] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (path) => {
        setOpenMenu(openMenu === path ? null : path);
    };

    const menuItems = [
        { icon: '📊', label: 'Dashboard', path: '/portal/dashboard' },
        { icon: '📅', label: 'Calendar', path: '/portal/calendar' },
        {
            icon: '🏘️',
            label: 'Follow up & Cell Management',
            path: '/portal/cell-management',
            subItems: [
                { label: 'Cells', path: '/portal/cells' },
                { label: 'Assign Members', path: '/portal/cells/assign' },
                { label: 'Cell Attendance', path: '/portal/cells/attendance' },
                { label: 'Cell Analytics', path: '/portal/cells/analytics' },
                { label: 'Follow-Ups', path: '/portal/follow-ups' },
                { label: 'My Cell', path: '/portal/my-cell' }
            ]
        },
        {
            icon: '👥',
            label: 'Meetings',
            path: '/portal/meetings-module',
            subItems: [
                { label: 'View Meetings', path: '/portal/meetings' },
                { label: 'Events', path: '/portal/meetings/events' },
                { label: 'Event Attendance', path: '/portal/meetings/event-attendance' },
                { label: 'Event Schedule', path: '/portal/meetings/event-schedule' },
                { label: 'Event Budget', path: '/portal/meetings/event-budget' },
                { label: 'Attendance', path: '/portal/meetings/attendance' }
            ]
        },
        { icon: '👥', label: 'Members', path: '/portal/members' },
        {
            icon: '🙏',
            label: 'Prayers',
            path: '/portal/prayers-module',
            subItems: [
                { label: 'Fasting & Commitment', path: '/portal/prayers/fasting' },
                { label: 'Prophetic Instructions', path: '/portal/prayers/prophetic' },
                { label: 'Communications', path: '/portal/prayers/communications' }
            ]
        },
        { icon: '📹', label: 'Media & Sermons', path: '/portal/media' },
        { icon: '📖', label: 'Devotionals', path: '/portal/media/devotional' },
        {
            icon: '💰',
            label: 'Financial Management',
            path: '/portal/financial-module',
            subItems: [
                { label: 'Overview', path: '/portal/giving' },
                { label: 'Contributions', path: '/portal/financial/contributions' },
                { label: 'Pledges', path: '/portal/financial/pledges' },
                { label: 'Budgets', path: '/portal/financial/budgets' },
                { label: 'Settings', path: '/portal/financial/settings' }
            ]
        },
        {
            icon: '🧾',
            label: 'Accounting',
            path: '/portal/accounting-module',
            subItems: [
                { label: 'Chart of Accounts', path: '/portal/accounting/chart-of-accounts' },
                { label: 'General Ledger', path: '/portal/accounting/general-ledger' },
                { label: 'Trial Balance', path: '/portal/accounting/trial-balance' },
                { label: 'Income Statement', path: '/portal/accounting/income-statement' },
                { label: 'Balance Sheet', path: '/portal/accounting/balance-sheet' },
                { label: 'Journal Entries', path: '/portal/accounting/journal-entries' },
                { label: 'Payroll', path: '/portal/accounting/payroll' },
                { label: 'Audit Log', path: '/portal/accounting/audit-log' }
            ]
        },
        {
            icon: '👤',
            label: 'Users',
            path: '/portal/users-module',
            subItems: [
                { label: 'Users', path: '/portal/users' },
                { label: 'My Account', path: '/portal/users/account' }
            ]
        },
        { icon: '🛡️', label: 'Roles & Permissions', path: '/portal/roles' },
    ];

    // Mobile styles logic
    const sidebarStyle = {
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '260px',
        background: 'var(--nav-bg)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1050,
        transform: 'translateX(0)',
        transition: 'transform 0.3s ease-in-out'
    };

    const { user, logout } = useAuth();
    const displayName = user?.profile?.full_name || user?.username || 'User';
    const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const avatarUrl = user?.profile?.avatar
        ? (user.profile.avatar.startsWith('http') ? user.profile.avatar : `${user.profile.avatar}`)
        : null;

    return (
        <aside className={`portal-sidebar ${isOpen ? 'mobile-visible' : ''}`} style={sidebarStyle}>
            {/* Brand Header */}
            <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                        src="/favicon.ico"
                        alt="Logo"
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }}
                    />
                    <div>
                        <div style={{ color: 'var(--text-color)', fontWeight: '700', fontSize: '0.95rem', lineHeight: 1 }}>Jesus Enthroned</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.05em', marginTop: '3px' }}>NETWORK PORTAL</div>
                    </div>
                </div>
                {/* Mobile Toggle Button */}
                <button
                    className="sidebar-toggle-btn"
                    onClick={onClose}
                    style={{
                        display: 'none', // Hidden on desktop
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '1.25rem',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        lineHeight: 1
                    }}
                >
                    ✕
                </button>
            </div>

            <style>{`
                @media (max-width: 968px) {
                    .sidebar-toggle-btn {
                        display: block !important;
                    }
                    .portal-sidebar {
                        transform: translateX(-100%) !important;
                        background-color: var(--bg-color, #120D20) !important;
                    }
                    .portal-sidebar.mobile-visible {
                        transform: translateX(0) !important;
                    }
                }
            `}</style>

            {/* Navigation Menu */}
            <div style={{ flex: 1, padding: '0 1rem', overflowY: 'auto' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem', paddingLeft: '1rem', fontWeight: '600' }}>
                    Main Menu
                </div>
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.path}
                        {...item}
                        active={location.pathname.startsWith(item.path)}
                        hovered={hovered}
                        setHovered={setHovered}
                        isOpen={openMenu === item.path}
                        onToggle={() => toggleMenu(item.path)}
                        onClose={onClose}
                    />
                ))}
            </div>

            {/* Footer Section */}
            <div style={{
                padding: '1.25rem 1.5rem',
                borderTop: '1px solid var(--border-color)',
                background: 'var(--surface-2)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '36px', height: '36px',
                        background: 'var(--primary)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--bg-color)',
                        fontWeight: '600',
                        fontSize: '0.8rem',
                        backgroundImage: avatarUrl ? `url(${avatarUrl})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: '2px solid var(--border-color)'
                    }}>
                        {!avatarUrl && initials}
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ color: 'var(--text-color)', fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {displayName}
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                            {user?.is_staff ? 'Administrator' : (user?.employment_status || 'Member')}
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        style={{
                            background: 'transparent',
                            color: '#ef4444',
                            padding: '0.5rem',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            border: 'none',
                            fontSize: '1.2rem',
                            lineHeight: 1
                        }} title="Logout">
                        ⏻
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
