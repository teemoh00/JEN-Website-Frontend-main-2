import React, { useState, useEffect } from 'react';
import api from '../../../../api/axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AttendanceTrackingList = ({ members = [] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [sortOrder, setSortOrder] = useState('rate_desc');
    const [meetingsList, setMeetingsList] = useState([]);
    const [selectedMeeting, setSelectedMeeting] = useState('all');

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await api.get('meetings/meetings/');
                setMeetingsList(Array.isArray(response.data) ? response.data : response.data.results || []);
            } catch (error) {
                console.error('Error fetching meetings list:', error);
            }
        };
        fetchMeetings();
    }, []);

    const filteredAndSorted = members
        .filter(m => {
            const matchesSearch = m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.phone?.includes(searchTerm);
            const matchesStatus = statusFilter === 'All Status' || m.status === statusFilter;
            // Optionally could filter by meeting here if the API supported returning attendance per session mapped per member
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortOrder === 'rate_desc') return b.rate - a.rate;
            if (sortOrder === 'rate_asc') return a.rate - b.rate;
            if (sortOrder === 'name') return a.name?.localeCompare(b.name);
            return 0;
        });

    const exportToExcel = () => {
        const exportData = filteredAndSorted.map(member => ({
            'Name': member.name,
            'Phone Number': member.phone || 'N/A',
            'Cell Group': member.cell_group,
            'Attendance Rate': `${member.rate}%`,
            'Sessions Attended': `${member.attended} / ${member.total_sessions}`,
            'Status': member.status
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

        let filename = "Attendance_Report";
        if (selectedMeeting !== 'all') {
            const meetingTitle = meetingsList.find(m => m.id === parseInt(selectedMeeting))?.title;
            if (meetingTitle) filename += `_${meetingTitle.replace(/\s+/g, '_')}`;
        }
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();

        let title = "Attendance Report";
        if (selectedMeeting !== 'all') {
            const meetingTitle = meetingsList.find(m => m.id === parseInt(selectedMeeting))?.title;
            if (meetingTitle) title += ` - ${meetingTitle}`;
        }

        doc.setFontSize(14);
        doc.text(title, 14, 15);
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

        const tableColumn = ["Name", "Phone", "Cell Group", "Rate", "Attended", "Status"];
        const tableRows = [];

        filteredAndSorted.forEach(member => {
            const memberData = [
                member.name,
                member.phone || 'N/A',
                member.cell_group,
                `${member.rate}%`,
                `${member.attended}/${member.total_sessions}`,
                member.status
            ];
            tableRows.push(memberData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [34, 193, 230] } // Theme primary color
        });

        doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Regular':
                return { bg: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', text: 'Regular Member' };
            case 'Irregular':
                return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', text: 'Irregular' };
            case 'Needs Follow-up':
                return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', text: 'Needs Follow-Up' };
            default:
                return { bg: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)', text: 'Unknown' };
        }
    };

    return (
        <div className="attendance-list-container">
            <style>{`
                .attendance-list-container {
                    background: var(--surface-1);
                    border-radius: 1rem;
                    border: 1px solid var(--border-color);
                    overflow: hidden;
                    margin-top: 2rem;
                }
                .attendance-list-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid var(--border-color);
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-between;
                }
                .member-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--border-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-muted);
                    font-size: 1.2rem;
                    flex-shrink: 0;
                }
                .member-name {
                    color: var(--text-color);
                    font-weight: 600;
                    font-size: 0.95rem;
                }
                .rate-text {
                    font-size: 1.1rem;
                    font-weight: 700;
                    width: 45px;
                }
                .progress-bar-wrapper {
                    flex: 1;
                    height: 6px;
                    background: var(--surface-2);
                    border-radius: 3px;
                    overflow: hidden;
                    min-width: 100px;
                }

                @media (max-width: 768px) {
                    .attendance-list-header {
                        padding: 1rem !important;
                        flex-direction: column !important;
                        align-items: stretch !important;
                        gap: 1.25rem !important;
                    }
                    .attendance-filter-group {
                        flex-direction: column !important;
                    }
                    .attendance-search-group {
                        width: 100% !important;
                        align-items: stretch !important;
                    }
                    .attendance-search-wrapper {
                        width: 100% !important;
                    }
                    .attendance-list-table th, 
                    .attendance-list-table td {
                        padding: 0.75rem 1rem !important;
                    }
                    .member-avatar {
                        width: 32px !important;
                        height: 32px !important;
                        font-size: 1rem !important;
                    }
                    .member-name {
                        font-size: 0.85rem !important;
                    }
                    .rate-text {
                        font-size: 0.95rem !important;
                        width: 40px !important;
                    }
                    .progress-bar-wrapper {
                        min-width: 60px !important;
                    }
                    .status-badge {
                        padding: 0.2rem 0.6rem !important;
                        font-size: 0.7rem !important;
                    }
                    .view-profile-btn {
                        padding: 0.3rem 0.75rem !important;
                        font-size: 0.75rem !important;
                    }
                }
            `}</style>
            {/* Header & Filters */}
            <div className="attendance-list-header">
                <div className="attendance-filter-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flex: 1 }}>
                    <div style={{ minWidth: '180px', flex: 1 }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '500' }}>Select Meeting</div>
                        <select
                            value={selectedMeeting}
                            onChange={(e) => setSelectedMeeting(e.target.value)}
                            style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '0.5rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)', appearance: 'none' }}
                        >
                            <option value="all">All Meetings</option>
                            {meetingsList.map(m => (
                                <option key={m.id} value={m.id}>{m.title}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ minWidth: '180px', flex: 1 }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '500' }}>Attendance Status</div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '0.5rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)', appearance: 'none' }}
                        >
                            <option value="All Status">All Status</option>
                            <option value="Regular">Regular Member (&gt;70%)</option>
                            <option value="Irregular">Irregular (45-69%)</option>
                            <option value="Needs Follow-up">Needs Follow-Up (&lt;45%)</option>
                        </select>
                    </div>
                </div>

                <div className="attendance-search-group" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                    <div className="attendance-search-wrapper" style={{ position: 'relative', width: '250px' }}>
                        <div style={{ position: 'absolute', top: '-1.8rem', left: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>Search Member</div>
                        <input
                            type="text"
                            placeholder="Search by name or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '0.5rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
                        />
                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: '0.9rem' }}>🔍</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={exportToExcel} style={{
                            background: '#10b981', color: 'var(--text-color)', border: 'none', padding: '0.6rem 0.8rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', height: '38px'
                        }}>
                            📊 Export
                        </button>
                        <button onClick={exportToPDF} style={{
                            background: '#ef4444', color: 'var(--text-color)', border: 'none', padding: '0.6rem 0.8rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', height: '38px'
                        }}>
                            📄 PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* List */}
            <div style={{ overflowX: 'auto' }}>
                <table className="attendance-list-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'var(--surface-2)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Member Profile</th>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Cell Group</th>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Attendance Rate</th>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Status Overview</th>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600', textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSorted.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No members found matching filters.
                                </td>
                            </tr>
                        ) : (
                            filteredAndSorted.map(member => {
                                const st = getStatusStyle(member.status);
                                return (
                                    <tr key={member.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}
                                        onMouseOver={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
                                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div className="member-avatar">
                                                    👤
                                                </div>
                                                <div>
                                                    <div className="member-name">{member.name}</div>
                                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{member.phone || 'No phone'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', color: 'var(--text-color)', fontSize: '0.85rem' }}>
                                            {member.cell_group}
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div className="rate-text" style={{ color: st.color }}>{member.rate}%</div>
                                                <div className="progress-bar-wrapper">
                                                    <div style={{ height: '100%', width: `${member.rate}%`, background: st.color, borderRadius: '3px' }} />
                                                </div>
                                            </div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '0.2rem' }}>
                                                {member.attended}/{member.total_sessions} sessions
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <span className="status-badge" style={{
                                                background: st.bg,
                                                color: st.color,
                                                padding: '0.3rem 0.7rem',
                                                borderRadius: '2rem',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                display: 'inline-block'
                                            }}>
                                                {st.text}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                            <button className="view-profile-btn" style={{
                                                background: 'transparent',
                                                border: '1px solid var(--border-color)',
                                                color: 'var(--text-color)',
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '0.5rem',
                                                fontSize: '0.8rem',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                                onMouseOver={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                                                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-color)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceTrackingList;
