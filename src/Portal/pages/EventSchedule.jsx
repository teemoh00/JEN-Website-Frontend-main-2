import React, { useState, useEffect } from 'react';
import CreateSessionModal from '../components/meetings/CreateSessionModal';
import axios from '../../api/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { addLogoToDoc } from '../../utils/pdfHelper';

const EventSchedule = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [sessions, setSessions] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch Events on mount
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('events');
                const fetchedEvents = Array.isArray(res.data) ? res.data : (res.data.results || []);
                setEvents(fetchedEvents);
                if (fetchedEvents.length > 0) {
                    setSelectedEvent(fetchedEvents[0].id.toString());
                }
            } catch (err) {
                console.error('Error fetching events:', err);
            }
        };
        fetchEvents();
    }, []);

    // Fetch sessions when event changes
    useEffect(() => {
        if (selectedEvent) {
            fetchSessions(selectedEvent);
        } else {
            setSessions([]);
        }
    }, [selectedEvent]);

    const fetchSessions = async (eventId) => {
        try {
            setLoading(true);
            const res = await axios.get(`events/sessions/?event=${eventId}`);
            const data = Array.isArray(res.data) ? res.data : [];
            setSessions(data);
            
            // Set active tab to first available day if data exists
            const uniqueDays = [...new Set(data.map(s => s.day_name))];
            if (uniqueDays.length > 0 && !uniqueDays.includes(activeTab)) {
                setActiveTab(uniqueDays[0]);
            }
        } catch (err) {
            console.error('Error fetching sessions:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this session?')) return;
        try {
            await axios.delete(`events/sessions/?id=${id}`);
            fetchSessions(selectedEvent);
        } catch (err) {
            alert('Failed to delete session');
            console.error(err);
        }
    };

    // Derived Stats
    const uniqueDays = [...new Set(sessions.map(s => s.day_name))];
    const uniqueSpeakers = [...new Set(sessions.map(s => s.speaker).filter(s => s))];
    
    // Calculate total hours
    let totalMinutes = 0;
    sessions.forEach(s => {
        if (s.start_time && s.end_time) {
            const [sH, sM] = s.start_time.split(':').map(Number);
            const [eH, eM] = s.end_time.split(':').map(Number);
            let diff = (eH * 60 + eM) - (sH * 60 + sM);
            if (diff < 0) diff += 24 * 60; // handle cross-midnight
            totalMinutes += diff;
        }
    });
    const totalHours = Math.round(totalMinutes / 60);

    // Filter sessions by active tab
    const filteredSessions = sessions.filter(s => s.day_name === activeTab);

    const getTypeColor = (type) => {
        const t = type.toUpperCase();
        if (t === 'MEAL') return '#f59e0b';
        if (t === 'PRAYER') return '#22c55e';
        if (t === 'TEACHING') return '#3b82f6';
        return '#9ca3af'; // OTHER
    };

    const formatTime = (timeStr) => {
        if (!timeStr) return '';
        const [h, m] = timeStr.split(':');
        let hours = parseInt(h, 10);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        return `${hours}:${m} ${ampm}`;
    };

    const getDuration = (start, end) => {
        if (!start || !end) return '';
        const [sH, sM] = start.split(':').map(Number);
        const [eH, eM] = end.split(':').map(Number);
        let diff = (eH * 60 + eM) - (sH * 60 + sM);
        if (diff < 0) diff += 24 * 60;
        return `${diff} min`;
    };

    const exportPDF = async () => {
        if (!selectedEvent) {
            alert("Please select an event first.");
            return;
        }

        const currentEvent = events.find(ev => ev.id.toString() === selectedEvent);
        const eventName = currentEvent ? currentEvent.name.toUpperCase() : 'EVENT SCHEDULE';

        const doc = new jsPDF();
        
        // Brand styling
        doc.setFillColor(34, 40, 49);
        doc.rect(0, 0, doc.internal.pageSize.width, 35, 'F');
        
        await addLogoToDoc(doc);
        
        // Header Text
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text("EVENT SCHEDULE REPORT", 14, 23);
        
        // Event Title & Details
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(eventName, 14, 50);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Total Days: ${uniqueDays.length}`, 14, 60);
        doc.text(`Total Sessions: ${sessions.length}`, 14, 66);
        doc.text(`Unique Speakers: ${uniqueSpeakers.length}`, 80, 60);
        doc.text(`Total Scheduled Time: ${totalHours} hours`, 80, 66);

        // Group Sessions by Day for the Table
        const tableBody = [];
        
        uniqueDays.forEach(day => {
            // Add Day Header row
            // To make object rows work, we must structure it correctly. For simple rows, it's an array.
            // When using content/colSpan, it's objects in the array.
            tableBody.push([{ content: day.toUpperCase(), colSpan: 6, styles: { fillColor: [240, 240, 240], fontStyle: 'bold', textColor: [0, 0, 0] } }]);
            
            const daySessions = sessions.filter(s => s.day_name === day);
            daySessions.forEach(s => {
                tableBody.push([
                    s.session_type,
                    formatTime(s.start_time),
                    formatTime(s.end_time),
                    s.title,
                    s.speaker || '-',
                    s.location || '-'
                ]);
            });
        });

        autoTable(doc, {
            startY: 75,
            head: [['Type', 'Start', 'End', 'Title', 'Speaker', 'Location/Room']],
            body: tableBody,
            theme: 'grid',
            styles: { fontSize: 9, cellPadding: 4 },
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' }
        });

        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(`Generated on ${new Date().toLocaleString()}  |  Page ${i} of ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
        }

        doc.save(`${eventName.replace(/[^a-zA-Z0-9]/g, '_')}_Schedule.pdf`);
    };

    const printTimetable = () => {
        if (!selectedEvent) {
            alert("Please select an event first.");
            return;
        }

        const currentEvent = events.find(ev => ev.id.toString() === selectedEvent);
        const eventName = currentEvent ? currentEvent.name.toUpperCase() : 'EVENT SCHEDULE';

        let htmlContent = `
        <html>
        <head>
            <title>${eventName} - Timetable</title>
            <style>
                body { font-family: 'Arial', sans-serif; padding: 20px; color: #333; }
                h1 { text-align: center; color: #1e293b; text-transform: uppercase; margin-bottom: 5px; }
                p.meta { text-align: center; color: #64748b; font-size: 14px; margin-bottom: 30px; }
                .day-container { margin-bottom: 40px; page-break-inside: avoid; }
                h2 { color: #0ea5e9; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 15px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
                th { background-color: #f8fafc; font-weight: bold; color: #475569; text-transform: uppercase; font-size: 12px; }
                td { font-size: 14px; }
                .time-col { width: 15%; font-weight: bold; color: #0f172a; }
                .title-col { width: 35%; font-weight: bold; }
                .speaker-col { width: 25%; color: #475569; }
                .location-col { width: 15%; color: #475569; }
                .type-col { width: 10%; }
                .pill { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
                .pill-meal { background-color: #fef3c7; color: #d97706; }
                .pill-prayer { background-color: #dcfce7; color: #16a34a; }
                .pill-teaching { background-color: #dbeafe; color: #2563eb; }
                .pill-other { background-color: #f1f5f9; color: #475569; }
                @media print {
                    body { -webkit-print-color-adjust: exact; padding: 0; }
                    .day-container { page-break-inside: avoid; }
                }
            </style>
        </head>
        <body>
            <h1>${eventName}</h1>
            <p class="meta">Official Event Timetable &bull; Generated on ${new Date().toLocaleDateString()}</p>
        `;

        uniqueDays.forEach(day => {
            htmlContent += `
            <div class="day-container">
                <h2>${day.toUpperCase()}</h2>
                <table>
                    <thead>
                        <tr>
                            <th class="time-col">Time</th>
                            <th class="title-col">Session</th>
                            <th class="speaker-col">Speaker</th>
                            <th class="location-col">Location</th>
                            <th class="type-col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            const daySessions = sessions.filter(s => s.day_name === day);
            daySessions.forEach(s => {
                const typeClass = s.session_type.toLowerCase() === 'meal' ? 'pill-meal' : 
                                  s.session_type.toLowerCase() === 'prayer' ? 'pill-prayer' : 
                                  s.session_type.toLowerCase() === 'teaching' ? 'pill-teaching' : 'pill-other';

                htmlContent += `
                        <tr>
                            <td class="time-col">${formatTime(s.start_time)} - ${formatTime(s.end_time)}</td>
                            <td class="title-col">${s.title}</td>
                            <td class="speaker-col">${s.speaker || '-'}</td>
                            <td class="location-col">${s.location || '-'}</td>
                            <td class="type-col"><span class="pill ${typeClass}">${s.session_type}</span></td>
                        </tr>
                `;
            });

            htmlContent += `
                    </tbody>
                </table>
            </div>
            `;
        });

        htmlContent += `
        </body>
        </html>
        `;

        const printWindow = window.open('', '', 'width=900,height=700');
        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        // Wait for styles to load then print
        setTimeout(() => {
            printWindow.print();
        }, 250);
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Event Schedule</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>Plan and manage your event program — sessions, speakers, and timing.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button onClick={() => {
                        if (!selectedEvent) return alert('Please select an event first');
                        setIsModalOpen(true);
                    }} style={{ background: '#22c55e', color: 'var(--text-color)', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>+</span> Add Session
                    </button>
                    <button onClick={exportPDF} style={{ background: '#ef4444', color: 'var(--text-color)', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>📄</span> PDF Report
                    </button>
                    <button onClick={printTimetable} style={{ background: '#a855f7', color: 'var(--text-color)', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>📅</span> Timetable
                    </button>
                </div>
            </div>

            {/* Select Event */}
            <div style={{ marginBottom: '3rem' }}>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Select Event</label>
                <div style={{ position: 'relative' }}>
                    <select
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '0.5rem',
                            color: 'var(--text-color)',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            outline: 'none',
                            appearance: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Select an event...</option>
                        {events.map(ev => (
                            <option key={ev.id} value={ev.id} style={{ color: 'var(--text-color)', background: '#1a1a24' }}>
                                {ev.name.toUpperCase()}
                            </option>
                        ))}
                    </select>
                    <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-color)', fontSize: '0.8rem' }}>▼</span>
                </div>
            </div>

            {selectedEvent ? (
                <>
                    {/* Stats Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📅</div>
                            <div>
                                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>{uniqueDays.length}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Days</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📋</div>
                            <div>
                                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>{sessions.length}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Sessions</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🎤</div>
                            <div>
                                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>{uniqueSpeakers.length}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Speakers</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>⏱️</div>
                            <div>
                                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>{totalHours}h</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Total Time</div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                        {uniqueDays.map(day => {
                            const count = sessions.filter(s => s.day_name === day).length;
                            return (
                                <button
                                    key={day}
                                    onClick={() => setActiveTab(day)}
                                    style={{
                                        background: 'transparent',
                                        border: activeTab === day ? '1px solid #0ea5e9' : '1px solid transparent',
                                        color: activeTab === day ? '#ffffff' : 'var(--text-muted)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {day}
                                    <span style={{
                                        background: activeTab === day ? '#0ea5e9' : 'rgba(255,255,255,0.1)',
                                        color: activeTab === day ? '#ffffff' : 'var(--text-muted)',
                                        borderRadius: '50%',
                                        minWidth: '20px',
                                        height: '20px',
                                        padding: '0 6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.7rem'
                                    }}>{count}</span>
                                </button>
                            );
                        })}
                        {uniqueDays.length === 0 && !loading && (
                            <div style={{ color: 'var(--text-muted)' }}>No sessions found. Click 'Add Session' to get started.</div>
                        )}
                    </div>

                    {/* Timeline List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingLeft: '1rem' }}>
                        {loading ? (
                            <div style={{ color: 'var(--text-muted)' }}>Loading sessions...</div>
                        ) : filteredSessions.map((session) => (
                            <div key={session.id} style={{ display: 'flex', gap: '2rem', position: 'relative' }}>
                                {/* Start Time & Dot */}
                                <div style={{ width: '80px', textAlign: 'right', flexShrink: 0, position: 'relative' }}>
                                    <div style={{ color: 'var(--text-color)', fontWeight: '700', fontSize: '0.9rem' }}>{formatTime(session.start_time)}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '0.2rem' }}>{formatTime(session.end_time)}</div>
                                    {/* Dot indicator */}
                                    <div style={{
                                        position: 'absolute',
                                        right: '-1.3rem',
                                        top: '0.4rem',
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        background: getTypeColor(session.session_type),
                                        zIndex: 2
                                    }}></div>
                                </div>

                                {/* Content Body */}
                                <div style={{ flex: 1, paddingBottom: '1rem' }}>
                                    {/* Type Pill & Duration */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                        <span style={{
                                            background: 'var(--border-color)',
                                            color: getTypeColor(session.session_type),
                                            padding: '0.15rem 0.5rem',
                                            borderRadius: '0.25rem',
                                            fontSize: '0.65rem',
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            border: `1px solid var(--border-color)`
                                        }}>
                                            {session.session_type}
                                        </span>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{getDuration(session.start_time, session.end_time)}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 style={{ color: 'var(--text-color)', fontSize: '1rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>{session.title}</h3>

                                    {/* Speaker & Location */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.75rem' }}>
                                        {session.speaker && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                                <span>🎤</span> {session.speaker}
                                            </div>
                                        )}
                                        {session.location && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                                <span style={{ color: '#ef4444' }}>📍</span> {session.location}
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0, lineHeight: '1.4' }}>{session.description}</p>
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', gap: '0.75rem', paddingRight: '1rem' }}>
                                    <button onClick={() => handleDelete(session.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1rem' }} title="Delete Session">🗑️</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '4rem', padding: '3rem', background: 'var(--border-color)', borderRadius: '1rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📅</div>
                    <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Please select an event to view its schedule.</p>
                </div>
            )}

            {isModalOpen && <CreateSessionModal eventId={selectedEvent} onClose={() => { setIsModalOpen(false); fetchSessions(selectedEvent); }} />}
        </div>
    );
};

export default EventSchedule;
