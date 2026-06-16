// ============================================================
// Central Mock Data — replaces all backend API responses
// ============================================================

// ── Auth / User ─────────────────────────────────────────────
export const MOCK_USER = {
    id: 1,
    username: 'demo@jenkenya.org',
    email: 'demo@jenkenya.org',
    first_name: 'Jane',
    last_name: 'Wanjiku',
    phone_number: '0712 345 678',
    date_of_birth: '1995-06-14',
    residence: 'Westlands, Nairobi',
    employment_status: 'Employed',
    profile_picture: null,
    is_staff: true,
    cell_group: 'Alpha Cell',
    date_joined: '2023-01-15',
};

// ── Members ─────────────────────────────────────────────────
export const MOCK_MEMBERS = [
    { id: 1, first_name: 'Jane',    last_name: 'Wanjiku',  email: 'jane@jenkenya.org',   phone_number: '0712345678', residence: 'Westlands', employment_status: 'Employed',     cell_group: 'Alpha Cell',   date_joined: '2023-01-15', profile_picture: null },
    { id: 2, first_name: 'Brian',   last_name: 'Otieno',   email: 'brian@jenkenya.org',  phone_number: '0723456789', residence: 'Kasarani',   employment_status: 'Student',      cell_group: 'Beta Cell',    date_joined: '2023-03-20', profile_picture: null },
    { id: 3, first_name: 'Grace',   last_name: 'Muthoni',  email: 'grace@jenkenya.org',  phone_number: '0734567890', residence: 'Karen',      employment_status: 'Employed',     cell_group: 'Alpha Cell',   date_joined: '2023-05-10', profile_picture: null },
    { id: 4, first_name: 'David',   last_name: 'Kariuki',  email: 'david@jenkenya.org',  phone_number: '0745678901', residence: 'Kiambu',     employment_status: 'Self-Employed',cell_group: 'Gamma Cell',   date_joined: '2023-07-01', profile_picture: null },
    { id: 5, first_name: 'Faith',   last_name: 'Achieng',  email: 'faith@jenkenya.org',  phone_number: '0756789012', residence: 'Langata',    employment_status: 'Unemployed',   cell_group: null,           date_joined: '2024-01-08', profile_picture: null },
    { id: 6, first_name: 'Peter',   last_name: 'Mwangi',   email: 'peter@jenkenya.org',  phone_number: '0767890123', residence: 'Embakasi',   employment_status: 'Employed',     cell_group: 'Beta Cell',    date_joined: '2024-02-14', profile_picture: null },
    { id: 7, first_name: 'Mary',    last_name: 'Njeri',    email: 'mary@jenkenya.org',   phone_number: '0778901234', residence: 'Ruiru',      employment_status: 'Student',      cell_group: null,           date_joined: '2024-03-22', profile_picture: null },
    { id: 8, first_name: 'Samuel',  last_name: 'Kamau',    email: 'samuel@jenkenya.org', phone_number: '0789012345', residence: 'Thika',      employment_status: 'Employed',     cell_group: 'Gamma Cell',   date_joined: '2024-04-05', profile_picture: null },
];

export const MOCK_MEMBER_STATS = {
    total_members: 215,
    active_members: 198,
    new_this_month: 7,
    inactive_members: 17,
};

// ── Cells ─────────────────────────────────────────────────────
export const MOCK_CELLS = [
    { id: 1, name: 'Alpha Cell',  leader_name: 'James Ngugi',  location: 'Westlands',   member_count: 14, meeting_day: 'Wednesday', meeting_time: '18:30', description: 'Active cell focused on prayer and discipleship.' },
    { id: 2, name: 'Beta Cell',   leader_name: 'Ruth Wambua',  location: 'Kasarani',    member_count: 11, meeting_day: 'Thursday',  meeting_time: '19:00', description: 'Youth-led cell with evangelism focus.' },
    { id: 3, name: 'Gamma Cell',  leader_name: 'Paul Kibet',   location: 'Karen',       member_count: 9,  meeting_day: 'Tuesday',   meeting_time: '18:00', description: 'Families cell with community activities.' },
    { id: 4, name: 'Delta Cell',  leader_name: 'Esther Odhiambo', location: 'Embakasi', member_count: 12, meeting_day: 'Friday',    meeting_time: '19:30', description: 'Mixed professionals cell.' },
];

export const MOCK_CELL_STATS = {
    total_cells: 4,
    total_assigned: 46,
    total_unassigned: 5,
    average_cell_size: 11,
};

export const MOCK_MY_CELL = {
    id: 1,
    name: 'Alpha Cell',
    leader_name: 'James Ngugi',
    location: 'Westlands, Nairobi',
    meeting_day: 'Wednesday',
    meeting_time: '18:30',
    member_count: 14,
    members: MOCK_MEMBERS.filter(m => m.cell_group === 'Alpha Cell'),
};

// Unassigned members (no cell group)
export const MOCK_UNASSIGNED_MEMBERS = MOCK_MEMBERS.filter(m => !m.cell_group);

// ── Audio Sermons ─────────────────────────────────────────────
export const MOCK_AUDIO_SERMONS = [
    { id: 1, title: 'Walking in Faith',          preacher: 'Pastor John Mwenda',  date: '2026-02-23', audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: '42:15' },
    { id: 2, title: 'The Power of Prayer',        preacher: 'Pastor Sarah Kimani', date: '2026-02-16', audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', duration: '38:52' },
    { id: 3, title: 'Grace Sufficient',           preacher: 'Pastor John Mwenda',  date: '2026-02-09', audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', duration: '45:10' },
    { id: 4, title: 'Purpose & Calling',          preacher: 'Elder Mark Oduya',    date: '2026-02-02', audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', duration: '33:28' },
    { id: 5, title: 'Renewing the Mind',          preacher: 'Pastor Sarah Kimani', date: '2026-01-26', audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', duration: '40:05' },
    { id: 6, title: 'The Fruit of the Spirit',   preacher: 'Pastor John Mwenda',  date: '2026-01-19', audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', duration: '37:44' },
];

// ── Video Sermons ─────────────────────────────────────────────
export const MOCK_VIDEO_SERMONS = [
    { id: 1, title: 'Walking in Faith',        preacher: 'Pastor John Mwenda',  date: '2026-02-23', video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', thumbnail: null },
    { id: 2, title: 'The Power of Prayer',     preacher: 'Pastor Sarah Kimani', date: '2026-02-16', video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', thumbnail: null },
    { id: 3, title: 'Grace Sufficient',        preacher: 'Pastor John Mwenda',  date: '2026-02-09', video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', thumbnail: null },
];

// ── Photo Albums ──────────────────────────────────────────────
export const MOCK_PHOTO_ALBUMS = [
    { id: 1, name: 'Annual Thanksgiving Service', photo_count: 24, cover_photo: null, date: '2025-12-15' },
    { id: 2, name: 'Youth Camp 2025',              photo_count: 48, cover_photo: null, date: '2025-08-10' },
    { id: 3, name: 'Community Outreach — March',   photo_count: 16, cover_photo: null, date: '2025-03-22' },
];

// ── Media Stats ───────────────────────────────────────────────
export const MOCK_MEDIA_STATS = {
    total_audio: MOCK_AUDIO_SERMONS.length,
    total_video: MOCK_VIDEO_SERMONS.length,
    total_photos: 88,
    total_albums: MOCK_PHOTO_ALBUMS.length,
    latest_sermon: MOCK_AUDIO_SERMONS[0],
};

// ── Events ────────────────────────────────────────────────────
const now = new Date();
const y = now.getFullYear();
const m = String(now.getMonth() + 1).padStart(2, '0');

export const MOCK_EVENTS = [
    { id: 1, title: 'Sunday Service',       start: `${y}-${m}-09T09:00:00`, location: 'Main Sanctuary',  color: '#22c1e6', slug: 'sunday-service-1',   description: 'Weekly Sunday worship service.' },
    { id: 2, title: 'Prayer Night',          start: `${y}-${m}-12T19:00:00`, location: 'Conference Room', color: '#a78bfa', slug: 'prayer-night-1',     description: 'Monthly all-night prayer vigil.' },
    { id: 3, title: 'Sunday Service',       start: `${y}-${m}-16T09:00:00`, location: 'Main Sanctuary',  color: '#22c1e6', slug: 'sunday-service-2',   description: 'Weekly Sunday worship service.' },
    { id: 4, title: 'Youth Conference',     start: `${y}-${m}-21T08:00:00`, location: 'KICC Hall',       color: '#f59e0b', slug: 'youth-conference-1', description: 'Annual youth empowerment conference.' },
    { id: 5, title: 'Sunday Service',       start: `${y}-${m}-23T09:00:00`, location: 'Main Sanctuary',  color: '#22c1e6', slug: 'sunday-service-3',   description: 'Weekly Sunday worship service.' },
    { id: 6, title: 'Community Outreach',   start: `${y}-${m}-27T07:00:00`, location: 'Kibera',          color: '#10b981', slug: 'outreach-1',         description: 'Monthly community feeding programme.' },
    { id: 7, title: 'Birthday: Jane W.',    start: `${y}-${m}-14T00:00:00`, location: '',                color: '#ec4899', slug: 'birthday-jane',      description: 'Happy birthday!' },
];

// ── Dashboard Summary ─────────────────────────────────────────
export const MOCK_DASHBOARD_SUMMARY = {
    attendance_trend: [65, 72, 78, 70, 82, 88, 85, 91, 87, 93, 95, 89],
    participation_health: 78,
    recent_attendance: [
        { id: 1, date: '2026-03-02', meeting_type: 'Sunday Service',  attended: true  },
        { id: 2, date: '2026-02-26', meeting_type: 'Prayer Night',    attended: true  },
        { id: 3, date: '2026-02-23', meeting_type: 'Sunday Service',  attended: false },
        { id: 4, date: '2026-02-19', meeting_type: 'Bible Study',     attended: true  },
    ],
    upcoming_birthday: { name: 'Jane Wanjiku', date: 'June 14', days_until: 101 },
    member_birthdays: [
        { id: 1, name: 'Jane Wanjiku',  date: 'June 14',    days_until: 101, profile_picture: null },
        { id: 2, name: 'Brian Otieno',  date: 'August 3',   days_until: 151, profile_picture: null },
        { id: 3, name: 'Grace Muthoni', date: 'October 22', days_until: 231, profile_picture: null },
    ],
    upcoming_events: MOCK_EVENTS.slice(0, 4),
    cell_overview: {
        cell_name: 'Alpha Cell',
        leader: 'James Ngugi',
        member_count: 14,
        next_meeting: 'Wednesday @ 6:30 PM',
        location: 'Westlands',
    },
    total_members: 215,
    active_cells: 4,
    events_this_month: MOCK_EVENTS.length,
    attendance_rate: 87,
};

// ── Attendance Analytics ──────────────────────────────────────
export const MOCK_ATTENDANCE_ANALYTICS = {
    period: 'This Month',
    total_meetings: 8,
    attended: 7,
    percentage: 87.5,
    trend: [80, 85, 90, 87, 92, 88, 95, 87],
    records: [
        { id: 1, date: '2026-03-02', meeting: 'Sunday Service',  type: 'Service',     attended: true  },
        { id: 2, date: '2026-02-26', meeting: 'Prayer Night',    type: 'Prayer',      attended: true  },
        { id: 3, date: '2026-02-23', meeting: 'Sunday Service',  type: 'Service',     attended: false },
        { id: 4, date: '2026-02-19', meeting: 'Bible Study',     type: 'Study',       attended: true  },
        { id: 5, date: '2026-02-16', meeting: 'Sunday Service',  type: 'Service',     attended: true  },
        { id: 6, date: '2026-02-12', meeting: 'Cell Meeting',    type: 'Cell',        attended: true  },
        { id: 7, date: '2026-02-09', meeting: 'Sunday Service',  type: 'Service',     attended: true  },
        { id: 8, date: '2026-02-05', meeting: 'Youth Meeting',   type: 'Youth',       attended: true  },
    ],
};

// ── Meeting Categories ────────────────────────────────────────
export const MOCK_MEETING_CATEGORIES = [
    { id: 1, name: 'Sunday Service' },
    { id: 2, name: 'Bible Study' },
    { id: 3, name: 'Prayer Meeting' },
    { id: 4, name: 'Cell Meeting' },
    { id: 5, name: 'Youth Meeting' },
    { id: 6, name: 'Leadership Meeting' },
];

// ── Assignment Stats ──────────────────────────────────────────
export const MOCK_ASSIGNMENT_STATS = {
    total_members: MOCK_MEMBERS.length,
    assigned: MOCK_MEMBERS.filter(m => m.cell_group).length,
    unassigned: MOCK_MEMBERS.filter(m => !m.cell_group).length,
    total_cells: MOCK_CELLS.length,
};
