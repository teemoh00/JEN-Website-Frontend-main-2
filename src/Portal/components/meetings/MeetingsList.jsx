import React, { useState, useEffect, useRef } from 'react';
import axios from '../../../api/axios';
import MeetingAttendeesModal from './MeetingAttendeesModal';

const MeetingsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);
    const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
    const [attendeesMeeting, setAttendeesMeeting] = useState(null);
    const [deletePrompt, setDeletePrompt] = useState({ isOpen: false, meeting: null, deleting: false, error: null });

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setActiveMenu(null);
        if (activeMenu !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeMenu]);

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await axios.get('meetings/meetings/');
                setMeetings(Array.isArray(response.data) ? response.data : response.data.results || []);
            } catch (error) {
                console.error('Error fetching meetings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMeetings();
    }, []);

    const filteredMeetings = meetings.filter(m =>
        (filter === 'All' || m.status === filter) &&
        (m.title.toLowerCase().includes(searchTerm.toLowerCase()) || (m.category_name && m.category_name.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    const handleCopyLink = (meeting) => {
        if (!meeting.portal_link) {
            alert("No shareable link available for this meeting.");
            return;
        }
        const portalPath = meeting.portal_link.startsWith('/') ? meeting.portal_link : `/${meeting.portal_link}`;
        const link = `${window.location.origin}${portalPath}`;

        const copyToClipboard = (text) => {
            if (navigator.clipboard && window.isSecureContext) {
                return navigator.clipboard.writeText(text);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                return new Promise((res, rej) => {
                    document.execCommand('copy') ? res() : rej();
                    textArea.remove();
                });
            }
        };

        copyToClipboard(link).then(() => {
            setCopiedId(meeting.id);
            setTimeout(() => setCopiedId(null), 2000);
        }).catch(() => alert("Failed to copy link. Please try copying it manually."));
    };

    // Opens dropdown at a fixed position based on button location so it's never clipped
    const handleMenuToggle = (e, meetingId) => {
        e.stopPropagation();
        if (activeMenu === meetingId) {
            setActiveMenu(null);
            return;
        }
        const rect = e.currentTarget.getBoundingClientRect();
        setMenuPos({
            top: rect.bottom + window.scrollY + 4,
            right: window.innerWidth - rect.right
        });
        setActiveMenu(meetingId);
    };

    const handleDeleteClick = (meeting) => {
        setActiveMenu(null);
        setDeletePrompt({ isOpen: true, meeting, deleting: false, error: null });
    };

    const confirmDelete = async () => {
        const { meeting } = deletePrompt;
        setDeletePrompt(prev => ({ ...prev, deleting: true, error: null }));
        try {
            await axios.delete(`meetings/meetings/${meeting.id}/`);
            setMeetings(prev => prev.filter(m => m.id !== meeting.id));
            setDeletePrompt({ isOpen: false, meeting: null, deleting: false, error: null });
        } catch (err) {
            setDeletePrompt(prev => ({
                ...prev,
                deleting: false,
                error: err.response?.data?.detail || 'Failed to delete. Please try again.'
            }));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Upcoming': return 'var(--primary)';
            case 'Completed': return '#4ade80';
            case 'Cancelled': return 'var(--text-muted)';
            default: return 'var(--text-color)';
        }
    };

    return (
        <>
            <div style={{
                background: 'var(--surface-1)',
                borderRadius: '1rem',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '1.5rem'
            }}>
                {/* Toolbar */}
                <div style={{
                    padding: '1.25rem',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        {['All', 'Upcoming', 'Completed', 'Cancelled'].map(f => (
                            <button key={f} onClick={() => setFilter(f)} style={{
                                background: filter === f ? 'rgba(34, 193, 230, 0.1)' : 'transparent',
                                color: filter === f ? 'var(--primary)' : 'var(--text-muted)',
                                border: filter === f ? '1px solid rgba(34, 193, 230, 0.3)' : '1px solid transparent',
                                borderRadius: '0.5rem',
                                padding: '0.3rem 0.8rem',
                                fontSize: '0.8rem',
                                cursor: 'pointer'
                            }}>{f}</button>
                        ))}
                    </div>

                    <input
                        type="text"
                        placeholder="Search meetings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: 'var(--bg-color)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '0.5rem',
                            color: 'var(--text-color)',
                            outline: 'none',
                            fontSize: '0.9rem',
                            minWidth: '200px'
                        }}
                    />
                </div>

                {/* Table with horizontal scroll */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', color: '#e2e8f0', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ textAlign: 'left', padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: '600', whiteSpace: 'nowrap' }}>Meeting Title</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', whiteSpace: 'nowrap' }}>Date &amp; Time</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', whiteSpace: 'nowrap' }}>Type / Facilitator</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', whiteSpace: 'nowrap' }}>Category</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', whiteSpace: 'nowrap' }}>Join Link</th>
                                <th style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', whiteSpace: 'nowrap' }}>Status</th>
                                <th style={{ textAlign: 'center', padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: '600', width: '60px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        Loading meetings...
                                    </td>
                                </tr>
                            ) : filteredMeetings.length > 0 ? filteredMeetings.map(m => (
                                <tr key={m.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}
                                    onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: '1rem 1.25rem', fontWeight: '600', color: 'var(--text-color)', whiteSpace: 'nowrap', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {m.title}
                                    </td>
                                    <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>
                                        <div style={{ color: 'var(--text-color)', fontSize: '0.85rem' }}>
                                            {m.end_date && m.end_date !== m.date ? `${m.date} – ${m.end_date}` : m.date}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.time}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: '600' }}>{m.meeting_type}</div>
                                        {m.facilitator_name && (
                                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>👤 {m.facilitator_name}</div>
                                        )}
                                        {!m.facilitator_name && m.location && (
                                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>📍 {m.location}</div>
                                        )}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)', padding: '0.2rem 0.55rem', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                                            {m.category_name}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <button
                                            onClick={() => handleCopyLink(m)}
                                            style={{
                                                background: copiedId === m.id ? 'rgba(74,222,128,0.15)' : 'rgba(34,193,230,0.1)',
                                                border: copiedId === m.id ? '1px solid #4ade80' : '1px solid rgba(34,193,230,0.3)',
                                                color: copiedId === m.id ? '#4ade80' : 'var(--primary)',
                                                cursor: 'pointer',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                padding: '0.4rem 0.75rem',
                                                borderRadius: '0.5rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4rem',
                                                whiteSpace: 'nowrap',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {copiedId === m.id ? '✅ Copied' : '🔗 Copy Link'}
                                        </button>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <span style={{
                                            color: getStatusColor(m.status),
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.35rem',
                                            fontSize: '0.78rem',
                                            fontWeight: '600',
                                            background: `rgba(${m.status === 'Completed' ? '74, 222, 128' : m.status === 'Cancelled' ? '148,163,184' : '34, 193, 230'}, 0.1)`,
                                            padding: '0.25rem 0.65rem',
                                            borderRadius: '2rem',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: getStatusColor(m.status), flexShrink: 0 }}></span>
                                            {m.status}
                                        </span>
                                    </td>

                                    {/* ── Three-dot button ── */}
                                    <td style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
                                        <button
                                            onClick={(e) => handleMenuToggle(e, m.id)}
                                            style={{
                                                background: activeMenu === m.id ? 'var(--surface-2)' : 'transparent',
                                                border: activeMenu === m.id ? '1px solid var(--border-color)' : '1px solid transparent',
                                                color: 'var(--text-color)',
                                                cursor: 'pointer',
                                                width: '34px', height: '34px',
                                                borderRadius: '0.4rem',
                                                fontSize: '1.3rem',
                                                fontWeight: '700',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.15s',
                                                letterSpacing: '-1px',
                                                lineHeight: 1
                                            }}
                                            title="Actions"
                                        >⋮</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="7" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No meetings found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Dropdown menu (fixed position, escapes any overflow clip) ── */}
            {activeMenu !== null && (
                <div
                    onMouseDown={(e) => e.stopPropagation()}
                    style={{
                        position: 'fixed',
                        top: menuPos.top,
                        right: menuPos.right,
                        background: 'var(--surface-1)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '0.75rem',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                        zIndex: 9999,
                        minWidth: '195px',
                        overflow: 'hidden'
                    }}
                >
                    {/* View Attendees */}
                    <button
                        onClick={() => { setAttendeesMeeting(meetings.find(m => m.id === activeMenu)); setActiveMenu(null); }}
                        style={{
                            width: '100%', padding: '0.75rem 1rem',
                            background: 'transparent', border: 'none',
                            color: 'var(--text-color)', cursor: 'pointer',
                            textAlign: 'left', fontSize: '0.875rem',
                            fontWeight: '500', display: 'flex',
                            alignItems: 'center', gap: '0.6rem'
                        }}
                        onMouseOver={e => e.currentTarget.style.background = 'var(--surface-2)'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                    >
                        👥 View Attendees
                    </button>

                    {/* Copy Join Link */}
                    <button
                        onClick={() => { handleCopyLink(meetings.find(m => m.id === activeMenu)); setActiveMenu(null); }}
                        style={{
                            width: '100%', padding: '0.75rem 1rem',
                            background: 'transparent', border: 'none',
                            color: 'var(--text-color)', cursor: 'pointer',
                            textAlign: 'left', fontSize: '0.875rem',
                            fontWeight: '500', display: 'flex',
                            alignItems: 'center', gap: '0.6rem'
                        }}
                        onMouseOver={e => e.currentTarget.style.background = 'var(--surface-2)'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                    >
                        🔗 Copy Join Link
                    </button>

                    {/* Divider */}
                    <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.2rem 0' }} />

                    {/* Delete Meeting */}
                    <button
                        onClick={() => handleDeleteClick(meetings.find(m => m.id === activeMenu))}
                        style={{
                            width: '100%', padding: '0.75rem 1rem',
                            background: 'transparent', border: 'none',
                            color: '#ef4444', cursor: 'pointer',
                            textAlign: 'left', fontSize: '0.875rem',
                            fontWeight: '500', display: 'flex',
                            alignItems: 'center', gap: '0.6rem'
                        }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                    >
                        🗑️ Delete Meeting
                    </button>
                </div>
            )}

            {/* Attendees Modal */}
            {attendeesMeeting && (
                <MeetingAttendeesModal
                    meeting={attendeesMeeting}
                    onClose={() => setAttendeesMeeting(null)}
                />
            )}

            {/* Delete Confirmation Modal */}
            {deletePrompt.isOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 10000, padding: '1rem'
                }}>
                    <div style={{
                        background: 'var(--surface-1)',
                        borderRadius: '1.25rem',
                        padding: '2rem',
                        width: '100%',
                        maxWidth: '440px',
                        border: '1px solid var(--border-color)',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗑️</div>
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-color)', margin: '0 0 0.75rem 0' }}>
                            Delete Meeting?
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0 0 0.5rem 0' }}>
                            Are you sure you want to permanently delete
                        </p>
                        <p style={{ color: 'var(--text-color)', fontWeight: '700', fontSize: '1rem', margin: '0 0 1rem 0' }}>
                            "{deletePrompt.meeting?.title}"?
                        </p>
                        <p style={{ color: '#fca5a5', fontSize: '0.82rem', margin: '0 0 1.5rem 0' }}>
                            ⚠️ This will also delete all attendance records for this meeting. This action cannot be undone.
                        </p>

                        {deletePrompt.error && (
                            <div style={{
                                padding: '0.75rem 1rem',
                                borderRadius: '0.5rem',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                color: '#fca5a5',
                                fontSize: '0.85rem',
                                marginBottom: '1.25rem',
                                textAlign: 'left'
                            }}>
                                {deletePrompt.error}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                onClick={() => setDeletePrompt({ isOpen: false, meeting: null, deleting: false, error: null })}
                                disabled={deletePrompt.deleting}
                                style={{
                                    flex: 1, padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--surface-2)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-color)',
                                    cursor: 'pointer',
                                    fontWeight: '600', fontSize: '0.9rem',
                                    opacity: deletePrompt.deleting ? 0.5 : 1
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={deletePrompt.deleting}
                                style={{
                                    flex: 1, padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    background: '#ef4444',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontWeight: '700', fontSize: '0.9rem',
                                    opacity: deletePrompt.deleting ? 0.7 : 1,
                                    transition: 'opacity 0.2s'
                                }}
                            >
                                {deletePrompt.deleting ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MeetingsList;
