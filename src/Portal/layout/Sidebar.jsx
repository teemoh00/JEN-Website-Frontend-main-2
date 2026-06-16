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
                    whiteSpace: 'nowrap'
                }}
            >
                {subItems ? (
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                        <span style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center' }}>{icon}</span>
                        <span style={{ fontWeight: active ? '600' : '500', fontSize: '0.95rem' }}>{label}</span>
                    </div>
                ) : (
                    <Link to={path} onClick={onClose} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem', flex: 1, textDecoration: 'none', color: 'inherit' }}>
                        <span style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center' }}>{icon}</span>
                        <span style={{ fontWeight: active ? '600' : '500', fontSize: '0.95rem' }}>{label}</span>
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
                                fontSize: '0.9rem',
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                display: 'block',
                                transition: 'all 0.2s',
                                fontWeight: location.pathname === sub.path ? '600' : '400'
                            }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                            onMouseLeave={(e) => {
                                if (location.pathname !== sub.path) e.target.style.color = 'var(--text-muted)';
                            }}
                        >
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
            label: 'Cell Management',
            path: '/portal/cell-management',
            subItems: [
                { label: 'Cells', path: '/portal/cells' },
                { label: 'Assign Members', path: '/portal/cells/assign' },
                { label: 'My Cells', path: '/portal/my-cell' }
            ]
        },
        {
            icon: '📅',
            label: 'Meetings',
            path: '/portal/meetings-module',
            subItems: [
                { label: 'View Meetings', path: '/portal/meetings' },
                { label: 'Events', path: '/portal/meetings/events' },
                { label: 'Meetings Attendance', path: '/portal/meetings/attendance' }
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
        { icon: '❤', label: 'Contributions', path: '/portal/giving' },
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
