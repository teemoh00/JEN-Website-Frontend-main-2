import React from 'react';

const ProfileHeader = ({ user, onEditProfilePic, onEditProfile }) => {
    const initials = user?.profile?.full_name
        ? user.profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
        : user?.username?.substring(0, 2).toUpperCase() || '??';

    const avatarUrl = user?.profile?.avatar
        ? (user.profile.avatar.startsWith('http') ? user.profile.avatar : `${user.profile.avatar}`)
        : null;

    // Helper for icons to keep it clean
    const InfoItem = ({ icon, label, value, onEdit }) => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            background: 'var(--surface-2)',
            borderRadius: '0.75rem',
            border: '1px solid var(--border-color)',
            flex: '1 1 200px',
            transition: 'all 0.2s ease'
        }}>
            <span style={{ fontSize: '1.2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>{icon}</span>
            <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                <div style={{ color: 'var(--text-color)', fontSize: '0.9rem', fontWeight: '500' }}>{value}</div>
            </div>
            {onEdit && (
                <button
                    onClick={onEdit}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        opacity: 0.6
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0.6}
                >
                    ✎
                </button>
            )}
        </div>
    );

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            marginBottom: '2rem',
            border: '1px solid var(--border-color)',
            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)'
        }}>
            {/* Cover Image - Premium Mesh Gradient */}
            <div style={{
                height: '220px',
                background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #6366f1 100%)',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '2rem'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    opacity: 0.2
                }}></div>
            </div>

            <div style={{ padding: '0 2.5rem 2.5rem 2.5rem', position: 'relative' }}>
                {/* Profile Identity Section */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    marginTop: '-80px',
                    gap: '2rem',
                    flexWrap: 'wrap'
                }}>
                    {/* Avatar with Overlay Edit */}
                    <div style={{ position: 'relative', group: 'avatar' }}>
                        <div style={{
                            width: '160px',
                            height: '160px',
                            background: 'var(--surface-2)',
                            borderRadius: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '4rem',
                            fontWeight: '700',
                            color: 'white',
                            border: '6px solid var(--surface-1)',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                            backgroundImage: avatarUrl ? `url(${avatarUrl})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {!avatarUrl && <span style={{ opacity: 0.8 }}>{initials}</span>}

                            {/* Hover Edit Overlay */}
                            <div
                                onClick={onEditProfilePic}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'rgba(0,0,0,0.5)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: 0,
                                    transition: 'opacity 0.2s ease',
                                    cursor: 'pointer',
                                    gap: '0.5rem'
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                                onMouseLeave={e => e.currentTarget.style.opacity = 0}
                            >
                                <span style={{ fontSize: '1.5rem' }}>📷</span>
                                <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase' }}>Change Photo</span>
                            </div>
                        </div>
                    </div>

                    {/* Name and Basic Controls */}
                    <div style={{ flex: 1, paddingTop: '2.5rem', paddingBottom: '0.5rem', minWidth: '300px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.25rem',
                            marginBottom: '0.75rem',
                            flexWrap: 'wrap'
                        }}>
                            <h1 style={{
                                fontSize: '2.75rem',
                                fontWeight: '800',
                                color: 'var(--text-color)',
                                margin: 0,
                                letterSpacing: '-0.03em',
                                lineHeight: 1,
                                textShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}>
                                {user?.profile?.full_name || user?.username}
                            </h1>
                            <div style={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                color: '#10b981',
                                padding: '0.4rem 1rem',
                                borderRadius: '2rem',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                border: '1px solid rgba(16, 185, 129, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                backdropFilter: 'blur(4px)'
                            }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
                                Active Member
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={onEditProfile}
                                style={{
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.6rem 1.5rem',
                                    borderRadius: '0.75rem',
                                    fontSize: '0.9rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(34, 193, 230, 0.3)',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 15px rgba(34, 193, 230, 0.4)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 193, 230, 0.3)'; }}
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* About Me Section */}
                <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'var(--surface-2)', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '1rem', fontWeight: '700' }}>About Me</h3>
                        <span onClick={onEditProfile} style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>✎ Edit</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                        {user?.profile?.about_me || 'No bio yet. Click edit to share something about yourself!'}
                    </p>
                </div>

                {/* Info Grid */}
                <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    <InfoItem
                        icon="📅"
                        label="Birthday"
                        value={user?.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Not set'}
                        onEdit={onEditProfile}
                    />
                    <InfoItem
                        icon="💼"
                        label="Occupation"
                        value={user?.employment_status || 'Member'}
                        onEdit={null}
                    />
                    <InfoItem
                        icon="📍"
                        label="Residence"
                        value={user?.residence || 'Not set'}
                        onEdit={onEditProfile}
                    />
                    <InfoItem
                        icon="✨"
                        label="Member Since"
                        value={user?.date_joined ? new Date(user.date_joined).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}
                        onEdit={null}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
