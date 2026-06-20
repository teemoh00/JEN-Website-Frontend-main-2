import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { addLogoToDoc } from '../../../utils/pdfHelper';

const MeetingAttendeesModal = ({ meeting, onClose }) => {
    const [attendees, setAttendees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAttendees = async () => {
            setLoading(true);
            setError(null);
            try {
                // Dedicated endpoint: returns flat, de-duplicated list for this specific meeting
                const response = await axios.get(`attendance/sessions/attendees/?meeting=${meeting.id}`);
                const data = Array.isArray(response.data) ? response.data : response.data.results || [];
                setAttendees(data);
            } catch (err) {
                console.error('Error fetching attendees:', err);
                setError('Could not load attendees. Please check your connection and try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchAttendees();
    }, [meeting.id]);

    const filtered = attendees.filter(a => {
        const name = (a.member_name || '').toLowerCase();
        const phone = a.member_phone || '';
        const term = searchTerm.toLowerCase();
        return name.includes(term) || phone.includes(searchTerm);
    });

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    // ─── Export Functions ────────────────────────────────────────────────────
    const exportToExcel = () => {
        if (attendees.length === 0) return;
        const data = attendees.map((a, i) => ({
            '#': i + 1,
            'Full Name': a.member_name || 'Unknown',
            'Phone Number': a.member_phone || 'N/A',
            'Cell Group': a.member_cell_group || 'N/A',
            'Status': a.status || 'Present'
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendees');

        // Auto-size columns
        const colWidths = [{ wch: 4 }, { wch: 25 }, { wch: 18 }, { wch: 20 }, { wch: 10 }];
        ws['!cols'] = colWidths;

        const filename = `Attendees_${meeting.title.replace(/\s+/g, '_')}_${meeting.date}.xlsx`;
        XLSX.writeFile(wb, filename);
    };

    const exportToPDF = async () => {
        if (attendees.length === 0) return;
        const doc = new jsPDF();

        await addLogoToDoc(doc);

        // Header
        doc.setFontSize(16);
        doc.setTextColor(34, 193, 230);
        doc.text('Meeting Attendees Report', 14, 18);

        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
        doc.text(`Meeting: ${meeting.title}`, 14, 28);
        doc.text(`Date: ${meeting.date}`, 14, 35);
        doc.text(`Total Attendees: ${attendees.length}`, 14, 42);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 49);

        autoTable(doc, {
            startY: 58,
            head: [['#', 'Full Name', 'Phone Number', 'Cell Group', 'Status']],
            body: attendees.map((a, i) => [
                i + 1,
                a.member_name || 'Unknown',
                a.member_phone || 'N/A',
                a.member_cell_group || 'N/A',
                a.status || 'Present'
            ]),
            styles: { fontSize: 9, cellPadding: 4 },
            headStyles: {
                fillColor: [34, 193, 230],
                textColor: 255,
                fontStyle: 'bold'
            },
            alternateRowStyles: { fillColor: [245, 250, 255] },
            columnStyles: {
                0: { halign: 'center', cellWidth: 10 },
                4: { halign: 'center', cellWidth: 22 }
            }
        });

        const filename = `Attendees_${meeting.title.replace(/\s+/g, '_')}_${meeting.date}.pdf`;
        doc.save(filename);
    };
    // ────────────────────────────────────────────────────────────────────────

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <div
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1200, padding: '1rem'
            }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div style={{
                background: 'var(--surface-1)',
                borderRadius: '1.25rem',
                width: '100%',
                maxWidth: '650px',
                maxHeight: '88vh',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--border-color)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexShrink: 0
                }}>
                    <div>
                        <h2 style={{ margin: 0, color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: '700' }}>
                            👥 Meeting Attendees
                        </h2>
                        <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            {meeting.title} &bull; {meeting.date}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'var(--surface-2)', border: '1px solid var(--border-color)',
                            borderRadius: '50%', width: '32px', height: '32px',
                            color: 'var(--text-muted)', cursor: 'pointer',
                            fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0
                        }}
                    >×</button>
                </div>

                {/* Stats bar + Export buttons */}
                {!loading && !error && (
                    <div style={{
                        padding: '0.75rem 1.5rem',
                        background: 'var(--surface-2)',
                        borderBottom: '1px solid var(--border-color)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.75rem',
                        flexWrap: 'wrap',
                        flexShrink: 0
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ fontSize: '1rem' }}>✅</span>
                            <span style={{ fontWeight: '700', color: '#4ade80', fontSize: '1rem' }}>{attendees.length}</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                                {attendees.length === 1 ? 'member attended' : 'members attended'}
                            </span>
                        </div>

                        {attendees.length > 0 && (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={exportToExcel}
                                    style={{
                                        padding: '0.45rem 0.9rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #10b981',
                                        background: 'rgba(16, 185, 129, 0.1)',
                                        color: '#10b981',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        display: 'flex', alignItems: 'center', gap: '0.35rem',
                                        transition: 'all 0.15s'
                                    }}
                                    onMouseOver={e => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'; e.currentTarget.style.color = '#10b981'; }}
                                    title="Export to Excel"
                                >
                                    📊 Excel
                                </button>
                                <button
                                    onClick={exportToPDF}
                                    style={{
                                        padding: '0.45rem 0.9rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #ef4444',
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        color: '#ef4444',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        display: 'flex', alignItems: 'center', gap: '0.35rem',
                                        transition: 'all 0.15s'
                                    }}
                                    onMouseOver={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.color = '#ef4444'; }}
                                    title="Export to PDF"
                                >
                                    📄 PDF
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Search */}
                {!loading && !error && attendees.length > 0 && (
                    <div style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--border-color)', flexShrink: 0 }}>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: '0.9rem' }}>🔍</span>
                            <input
                                type="text"
                                placeholder="Search by name or phone..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.6rem 1rem 0.6rem 2.25rem',
                                    background: 'var(--bg-color)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '0.5rem',
                                    color: 'var(--text-color)',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Content */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {loading ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⏳</div>
                            <div style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.25rem' }}>Loading attendees...</div>
                            <div style={{ fontSize: '0.85rem' }}>Fetching check-in records from the backend</div>
                        </div>
                    ) : error ? (
                        <div style={{
                            margin: '1.5rem',
                            padding: '1.25rem',
                            background: 'rgba(239,68,68,0.08)',
                            border: '1px solid rgba(239,68,68,0.25)',
                            borderRadius: '0.75rem',
                            color: '#fca5a5',
                            fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚠️</div>
                            {error}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                                {attendees.length === 0 ? '📭' : '🔍'}
                            </div>
                            <div style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.25rem' }}>
                                {attendees.length === 0 ? 'No check-ins yet' : 'No results found'}
                            </div>
                            <div style={{ fontSize: '0.85rem' }}>
                                {attendees.length === 0
                                    ? 'No members have checked in yet. Share the join link so members can register their attendance.'
                                    : 'Try a different name or phone number.'}
                            </div>
                        </div>
                    ) : (
                        <div>
                            {filtered.map((attendee, index) => {
                                const name = attendee.member_name || 'Unknown Member';
                                const phone = attendee.member_phone || '';
                                const cell = attendee.member_cell_group || '';

                                return (
                                    <div
                                        key={attendee.id || index}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.85rem',
                                            padding: '0.9rem 1.5rem',
                                            borderBottom: index < filtered.length - 1 ? '1px solid var(--border-color)' : 'none',
                                            transition: 'background 0.15s'
                                        }}
                                        onMouseOver={e => e.currentTarget.style.background = 'var(--surface-2)'}
                                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <div style={{
                                            width: '24px', fontSize: '0.75rem',
                                            color: 'var(--text-muted)', fontWeight: '600',
                                            flexShrink: 0, textAlign: 'center'
                                        }}>
                                            {index + 1}
                                        </div>

                                        <div style={{
                                            width: '42px', height: '42px', borderRadius: '50%',
                                            background: 'linear-gradient(135deg, var(--primary), #6366f1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: 'var(--text-color)', fontWeight: '700', fontSize: '0.9rem',
                                            flexShrink: 0
                                        }}>
                                            {getInitials(name)}
                                        </div>

                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontWeight: '600', color: 'var(--text-color)', fontSize: '0.9rem' }}>
                                                {name}
                                            </div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.1rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                                                {phone && <span>📞 {phone}</span>}
                                                {cell && <span>🏘️ {cell}</span>}
                                            </div>
                                        </div>

                                        <div style={{
                                            background: 'rgba(74, 222, 128, 0.1)',
                                            border: '1px solid rgba(74, 222, 128, 0.3)',
                                            color: '#4ade80',
                                            fontSize: '0.72rem',
                                            fontWeight: '700',
                                            padding: '0.25rem 0.6rem',
                                            borderRadius: '2rem',
                                            flexShrink: 0
                                        }}>
                                            ✅ Present
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '1rem 1.5rem',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexShrink: 0
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.6rem 1.5rem',
                            borderRadius: '0.5rem',
                            background: 'var(--surface-2)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-color)',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '0.9rem'
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MeetingAttendeesModal;
