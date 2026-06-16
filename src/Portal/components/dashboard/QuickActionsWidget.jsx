import React, { useState } from 'react';
import api from '../../../api/axios';

const QuickActionItem = ({ icon, label, onClick, primary = false }) => (
    <button
        onClick={onClick}
        style={{
            background: primary ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
            border: primary ? 'none' : '1px solid var(--border-color)',
            borderRadius: '0.75rem',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            width: '100%',
            color: primary ? 'var(--bg-color)' : 'var(--text-color)'
        }}
    >
        <div style={{ fontSize: '1.5rem' }}>{icon}</div>
        <div style={{ fontSize: '0.8rem', fontWeight: '600', textAlign: 'center', lineHeight: '1.2' }}>{label}</div>
    </button>
);

const LatestMeetingsModal = ({ onClose, meetings }) => {
    const displayMeetings = meetings !== undefined ? meetings : [
        { id: 1, date: 'Feb 10, 2026', type: 'Prayer Meeting', attendance: 12, status: 'Completed' },
        { id: 2, date: 'Feb 03, 2026', type: 'Bible Study', attendance: 15, status: 'Completed' },
        { id: 3, date: 'Jan 27, 2026', type: 'Fellowship', attendance: 14, status: 'Completed' },
        { id: 4, date: 'Jan 20, 2026', type: 'Prayer Meeting', attendance: 11, status: 'Completed' },
    ];

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(18, 13, 32, 0.8)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000
        }}>
            <div style={{
                background: 'var(--surface-1)',
                borderRadius: '1.5rem',
                border: '1px solid var(--border-color)',
                width: '90%',
                maxWidth: '500px',
                padding: '2rem',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ color: 'var(--text-color)', margin: 0, fontSize: '1.25rem' }}>Latest Meetings</h3>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                    {displayMeetings.length === 0 ? (
                        <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No recent meetings found.
                        </div>
                    ) : (
                        displayMeetings.map(meeting => (
                            <div key={meeting.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '0.75rem',
                                border: '1px solid var(--border-color)'
                            }}>
                                <div>
                                    <div style={{ color: 'var(--text-color)', fontWeight: '600' }}>{meeting.type}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{meeting.date}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '1.1rem' }}>{meeting.attendance}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Attendees</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                    <button onClick={onClose} style={{
                        background: 'var(--primary)',
                        color: 'var(--bg-color)',
                        border: 'none',
                        padding: '0.6rem 1.5rem',
                        borderRadius: '0.5rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const CreateMeetingModal = ({ onClose, meetingCategories }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        category: meetingCategories?.length > 0 ? meetingCategories[0].id : '',
        meeting_type: 'Physical',
        location: '',
        meeting_link: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/meetings/meetings/', formData);
            alert("Meeting created successfully!");
            onClose();
        } catch (err) {
            console.error("Error creating meeting:", err);
            setError(err.response?.data?.detail || "Failed to create meeting.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(18, 13, 32, 0.8)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000
        }}>
            <div style={{
                background: 'var(--surface-1)',
                borderRadius: '1.5rem',
                border: '1px solid var(--border-color)',
                width: '90%',
                maxWidth: '500px',
                padding: '2rem',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ color: 'var(--text-color)', margin: 0, fontSize: '1.25rem' }}>Create New Meeting</h3>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                </div>

                {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Meeting Title *</label>
                        <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Weekly Prayer" style={{
                            width: '93%',
                            padding: '0.75rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '0.5rem',
                            color: 'var(--text-color)',
                            outline: 'none'
                        }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Date *</label>
                            <input type="date" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} style={{
                                width: '85%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.5rem',
                                color: 'var(--text-color)',
                                outline: 'none'
                            }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Time *</label>
                            <input type="time" required value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} style={{
                                width: '85%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.5rem',
                                color: 'var(--text-color)',
                                outline: 'none'
                            }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Category *</label>
                            <select value={formData.category} required onChange={e => setFormData({ ...formData, category: e.target.value })} style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.5rem',
                                color: 'var(--text-color)',
                                outline: 'none'
                            }}>
                                <option value="">Select Category</option>
                                {Array.isArray(meetingCategories) && meetingCategories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Meeting Type</label>
                            <select value={formData.meeting_type} onChange={e => setFormData({ ...formData, meeting_type: e.target.value })} style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.5rem',
                                color: 'var(--text-color)',
                                outline: 'none'
                            }}>
                                <option value="Physical">Physical</option>
                                <option value="Online">Online</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Location</label>
                        <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="Physical Address" style={{
                            width: '93%',
                            padding: '0.75rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '0.5rem',
                            color: 'var(--text-color)',
                            outline: 'none',
                            marginBottom: '0.5rem'
                        }} />

                        {(formData.meeting_type === 'Online' || formData.meeting_type === 'Hybrid') && (
                            <input type="url" value={formData.meeting_link} onChange={e => setFormData({ ...formData, meeting_link: e.target.value })} placeholder="Meeting Link (Zoom, Meet, etc.)" style={{
                                width: '93%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.5rem',
                                color: 'var(--text-color)',
                                outline: 'none'
                            }} />
                        )}
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={onClose} style={{
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            border: '1px solid var(--border-color)',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} style={{
                            background: 'var(--primary)',
                            color: 'var(--bg-color)',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}>
                            {loading ? 'Creating...' : 'Create Meeting'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const CreateEventModal = ({ onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(18, 13, 32, 0.8)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000
        }}>
            <div style={{
                background: 'var(--surface-1)',
                borderRadius: '1.5rem',
                border: '1px solid var(--border-color)',
                width: '90%',
                maxWidth: '500px',
                padding: '2rem',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ color: 'var(--text-color)', margin: 0, fontSize: '1.25rem' }}>Create New Event</h3>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    alert("Event creation will be connected to the Events module soon!");
                    onClose();
                }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Event Title</label>
                        <input type="text" placeholder="e.g. Community Outreach" style={{
                            width: '93%',
                            padding: '0.75rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '0.5rem',
                            color: 'var(--text-color)',
                            outline: 'none'
                        }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Date</label>
                            <input type="date" style={{
                                width: '85%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.5rem',
                                color: 'var(--text-color)',
                                outline: 'none'
                            }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Time</label>
                            <input type="time" style={{
                                width: '85%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.5rem',
                                color: 'var(--text-color)',
                                outline: 'none'
                            }} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Location</label>
                        <input type="text" placeholder="Location" style={{
                            width: '93%',
                            padding: '0.75rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '0.5rem',
                            color: 'var(--text-color)',
                            outline: 'none'
                        }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Description</label>
                        <textarea placeholder="Event details..." style={{
                            width: '93%',
                            padding: '0.75rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '0.5rem',
                            color: 'var(--text-color)',
                            outline: 'none',
                            minHeight: '80px',
                            fontFamily: 'inherit'
                        }} />
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={onClose} style={{
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            border: '1px solid var(--border-color)',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>
                            Cancel
                        </button>
                        <button type="submit" style={{
                            background: 'var(--primary)',
                            color: 'var(--bg-color)',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const RecordGivingModal = ({ onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(18, 13, 32, 0.8)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000
        }}>
            <div style={{
                background: 'var(--surface-1)',
                borderRadius: '1.5rem',
                border: '1px solid var(--border-color)',
                width: '90%',
                maxWidth: '500px',
                padding: '2rem',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ color: 'var(--text-color)', margin: 0, fontSize: '1.25rem' }}>Record Giving</h3>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    alert("Giving functionality will be connected to the Finance module soon!");
                    onClose();
                }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Donor Name</label>
                        <input type="text" placeholder="Search member..." style={{
                            width: '93%',
                            padding: '0.75rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '0.5rem',
                            color: 'var(--text-color)',
                            outline: 'none'
                        }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Amount</label>
                            <input type="number" placeholder="0.00" style={{
                                width: '85%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.5rem',
                                color: 'var(--text-color)',
                                outline: 'none'
                            }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Date</label>
                            <input type="date" style={{
                                width: '85%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.5rem',
                                color: 'var(--text-color)',
                                outline: 'none'
                            }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Type</label>
                            <select style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.5rem',
                                color: 'var(--text-color)',
                                outline: 'none'
                            }}>
                                <option>Tithes</option>
                                <option>Offering</option>
                                <option>Thanksgiving</option>
                                <option>Project Support</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Method</label>
                            <select style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.5rem',
                                color: 'var(--text-color)',
                                outline: 'none'
                            }}>
                                <option>M-Pesa</option>
                                <option>Cash</option>
                                <option>Bank Transfer</option>
                                <option>Check</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Reference / Notes</label>
                        <input type="text" placeholder="Transaction ID or notes" style={{
                            width: '93%',
                            padding: '0.75rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '0.5rem',
                            color: 'var(--text-color)',
                            outline: 'none'
                        }} />
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={onClose} style={{
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            border: '1px solid var(--border-color)',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>
                            Cancel
                        </button>
                        <button type="submit" style={{
                            background: 'var(--primary)',
                            color: 'var(--bg-color)',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>
                            Record Contribution
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const QuickActionsWidget = ({ latestMeetings, cellMembersList, meetingCategories }) => {
    const [showMeetings, setShowMeetings] = useState(false);
    const [showCreateMeeting, setShowCreateMeeting] = useState(false);
    const [showCreateEvent, setShowCreateEvent] = useState(false);
    const [showRecordGiving, setShowRecordGiving] = useState(false);

    const handleCopyLink = () => {
        // Find the first upcoming or recent meeting to get a real join link
        const latestMeeting = (latestMeetings && latestMeetings.length > 0) ? latestMeetings[0] : null;

        let link = '';
        if (latestMeeting && latestMeeting.portal_link) {
            const portalPath = latestMeeting.portal_link.startsWith('/') ? latestMeeting.portal_link : `/${latestMeeting.portal_link}`;
            link = `${window.location.origin}${portalPath}`;
        } else {
            // Fallback to the general portal meetings page
            link = `${window.location.origin}/portal/meetings`;
        }

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

        copyToClipboard(link)
            .then(() => alert(latestMeeting ? "Latest meeting join link copied!" : "Meetings portal link copied!"))
            .catch(() => alert("Failed to copy link. Please go to the Meetings page to copy."));
    };

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            height: '100%'
        }}>
            <h3 style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                📌 Quick Actions
            </h3>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: '1rem'
            }}>
                <QuickActionItem icon="📅" label="Latest Meetings" onClick={() => setShowMeetings(true)} />
                <QuickActionItem icon="🔗" label="Copy Meeting Link" primary={true} onClick={handleCopyLink} />
                <QuickActionItem icon="➕" label="Create Meeting" onClick={() => setShowCreateMeeting(true)} />
                <QuickActionItem icon="🎉" label="Create Event" onClick={() => setShowCreateEvent(true)} />
                <QuickActionItem icon="💰" label="Record Giving" onClick={() => setShowRecordGiving(true)} />
            </div>

            {showMeetings && <LatestMeetingsModal onClose={() => setShowMeetings(false)} meetings={latestMeetings} />}
            {showCreateMeeting && <CreateMeetingModal onClose={() => setShowCreateMeeting(false)} meetingCategories={meetingCategories} />}
            {showCreateEvent && <CreateEventModal onClose={() => setShowCreateEvent(false)} />}
            {showRecordGiving && <RecordGivingModal onClose={() => setShowRecordGiving(false)} />}
        </div>
    );
};

export default QuickActionsWidget;
