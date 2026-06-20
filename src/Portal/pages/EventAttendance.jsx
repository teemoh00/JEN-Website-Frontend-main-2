import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import RegisterNewAttendeeModal from '../components/events/RegisterNewAttendeeModal';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { addLogoToDoc } from '../../utils/pdfHelper';

const EventAttendance = () => {
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState('');
    const [attendees, setAttendees] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // UI states
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All');

    // Fetch Events on mount
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('events');
                setEvents(Array.isArray(res.data) ? res.data : (res.data.results || []));
            } catch (err) {
                console.error('Error fetching events:', err);
            }
        };
        fetchEvents();
    }, []);

    // Fetch Attendees when event changes
    useEffect(() => {
        if (selectedEventId) {
            fetchAttendees(selectedEventId);
        } else {
            setAttendees([]);
        }
    }, [selectedEventId]);

    const fetchAttendees = async (eventId) => {
        try {
            setLoading(true);
            const res = await axios.get(`events/attendance/?event=${eventId}`);
            setAttendees(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error('Error fetching attendees:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckIn = async (memberId) => {
        try {
            await axios.post('events/attendance/check-in/', {
                event_id: selectedEventId,
                member_id: memberId
            });
            fetchAttendees(selectedEventId);
        } catch (err) {
            alert('Failed to check in: ' + (err.response?.data?.error || err.message));
        }
    };

    const handleUndoCheckIn = async (memberId) => {
        try {
            await axios.post('events/attendance/undo/', {
                event_id: selectedEventId,
                member_id: memberId
            });
            fetchAttendees(selectedEventId);
        } catch (err) {
            alert('Failed to undo check-in: ' + (err.response?.data?.error || err.message));
        }
    };

    const handleActionClick = (actionName) => {
        alert(`${actionName} feature is a placeholder. Add external API/Service to enable.`);
    };

    const selectedEvent = events.find(e => e.id.toString() === selectedEventId);

    const generatePDF = async () => {
        if (!selectedEvent) return;

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        
        // 1. Header
        doc.setFillColor(26, 27, 46); // Dark purple background
        doc.rect(0, 0, pageWidth, 40, 'F');
        
        await addLogoToDoc(doc);
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text('ATTENDANCE REPORT', 14, 20);
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(selectedEvent.name.toUpperCase(), 14, 28);
        
        doc.setFontSize(9);
        doc.setTextColor(156, 163, 175);
        const formattedDate = new Date(selectedEvent.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        doc.text(`${formattedDate}  |  ${selectedEvent.venue.toUpperCase()}`, 14, 34);
        
        doc.text(`Generated: ${new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}`, 14, 38);
        
        // Purple separator
        doc.setFillColor(139, 92, 246);
        doc.rect(0, 40, pageWidth, 2, 'F');
        
        // 2. Event Summary
        doc.setTextColor(55, 65, 81);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text('EVENT SUMMARY', 14, 52);
        
        const cardWidth = 42;
        const cardHeight = 18;
        let startX = 14;
        const startY = 56;
        
        const checkedInCount = attendees.filter(a => a.status === 'Checked In').length;
        const pendingCount = attendees.filter(a => a.status === 'Pending').length;
        const rate = attendees.length > 0 ? ((checkedInCount / attendees.length) * 100).toFixed(1) : '0.0';
        
        const summaryData = [
            { title: 'Registered', val: attendees.length.toString(), color: [14, 165, 233] },
            { title: 'Checked In', val: checkedInCount.toString(), color: [34, 197, 94] },
            { title: 'Pending', val: pendingCount.toString(), color: [245, 158, 11] },
            { title: 'Rate', val: `${rate}%`, color: [168, 85, 247] }
        ];

        summaryData.forEach((item, i) => {
            const x = startX + (i * (cardWidth + 4));
            doc.setFillColor(243, 244, 246);
            doc.rect(x, startY, cardWidth, cardHeight, 'F');
            doc.setFillColor(...item.color);
            doc.rect(x, startY, cardWidth, 1.5, 'F');
            doc.setTextColor(...item.color);
            doc.setFontSize(16);
            doc.setFont("helvetica", "bold");
            doc.text(item.val, x + (cardWidth/2), startY + 10, { align: 'center' });
            doc.setTextColor(107, 114, 128);
            doc.setFontSize(7);
            doc.setFont("helvetica", "normal");
            doc.text(item.title, x + (cardWidth/2), startY + 15, { align: 'center' });
        });

        // 3. Check-in Progress Bar
        const barY = 80;
        doc.setTextColor(107, 114, 128);
        doc.setFontSize(9);
        doc.text('Check-in:', 14, barY + 4);
        
        const manualCount = attendees.filter(a => a.status === 'Checked In' && (!a.check_in_method || a.check_in_method === 'Manual')).length;
        const qrCount = attendees.filter(a => a.status === 'Checked In' && a.check_in_method === 'QR').length;
        const totalCheckedIn = manualCount + qrCount || 1;
        
        const barX = 35;
        const barWidth = pageWidth - 14 - barX;
        
        const manualW = (manualCount / totalCheckedIn) * barWidth;
        if (manualW > 0) {
            doc.setFillColor(6, 182, 212);
            doc.rect(barX, barY, manualW, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(7);
            doc.text(`Manual ${manualCount}`, barX + (manualW/2), barY + 4, { align: 'center' });
        }
        
        const qrW = (qrCount / totalCheckedIn) * barWidth;
        if (qrW > 0) {
            doc.setFillColor(139, 92, 246);
            doc.rect(barX + manualW, barY, qrW, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(7);
            doc.text(`QR ${qrCount}`, barX + manualW + (qrW/2), barY + 4, { align: 'center' });
        }

        // 4. Insights & Analysis
        const insightsY = 96;
        doc.setTextColor(55, 65, 81);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text('INSIGHTS & ANALYSIS', 14, insightsY);
        
        doc.setFillColor(250, 245, 255);
        doc.rect(14, insightsY + 4, pageWidth - 28, 32, 'F');
        doc.setFillColor(168, 85, 247);
        doc.rect(14, insightsY + 4, 2, 32, 'F');
        
        const males = attendees.filter(a => a.gender === 'Male' && a.status === 'Checked In').length;
        const females = attendees.filter(a => a.gender === 'Female' && a.status === 'Checked In').length;
        const totalGender = males + females || 1;
        
        const insights = [
            `1. Strong attendance at ${rate}%. ${parseFloat(rate) > 80 ? 'The majority of registrants followed through, reflecting healthy event planning.' : 'Consider follow-up strategies to improve turn-out.'}`,
            `2. Target reached: ${checkedInCount}/${attendees.length}.`,
            `3. Manual check-in was more common (${((manualCount/totalCheckedIn)*100).toFixed(0)}%). Consider better QR code distribution to streamline future events.`,
            `4. Gender split of checked-in attendees: ${((males/totalGender)*100).toFixed(0)}% male, ${((females/totalGender)*100).toFixed(0)}% female.`,
            `5. ${pendingCount} registered attendees did not check in. Follow-up outreach may help retain them for future events.`
        ];
        
        doc.setTextColor(55, 65, 81);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        insights.forEach((ins, idx) => {
            doc.text(ins, 20, insightsY + 10 + (idx * 5));
        });

        // 5. Check-In Timeline
        const timelineY = 140;
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text('CHECK-IN TIMELINE', 14, timelineY);
        
        const checkInTimes = attendees
            .filter(a => a.check_in_time)
            .map(a => new Date(a.check_in_time))
            .sort((a, b) => a - b);
            
        let firstCheckIn = '-', lastCheckIn = '-', avgArrival = '-', peakHourStr = '-';
        
        if (checkInTimes.length > 0) {
            firstCheckIn = checkInTimes[0].toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
            lastCheckIn = checkInTimes[checkInTimes.length - 1].toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
            
            const hours = {};
            checkInTimes.forEach(t => {
                const h = t.getHours();
                hours[h] = (hours[h] || 0) + 1;
            });
            let maxHour = -1, maxCount = 0;
            for (const h in hours) {
                if (hours[h] > maxCount) {
                    maxCount = hours[h];
                    maxHour = parseInt(h);
                }
            }
            const ampm = maxHour >= 12 ? 'PM' : 'AM';
            const hr12 = maxHour % 12 || 12;
            peakHourStr = `${hr12} ${ampm} (${maxCount} arrivals)`;
            
            const medianTime = checkInTimes[Math.floor(checkInTimes.length / 2)];
            avgArrival = medianTime.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' });
        }
        
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text('First Check-in:', 14, timelineY + 8);
        doc.text('Last Check-in:', 14, timelineY + 14);
        doc.text('Average Arrival:', 14, timelineY + 20);
        doc.text('Peak Hour:', 14, timelineY + 26);
        
        doc.setFont("helvetica", "normal");
        doc.text(firstCheckIn, 50, timelineY + 8);
        doc.text(lastCheckIn, 50, timelineY + 14);
        doc.text(avgArrival, 50, timelineY + 20);
        doc.text(peakHourStr, 50, timelineY + 26);

        // 6. Daily Check-in Breakdown
        const breakdownY = 176;
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text('DAILY CHECK-IN BREAKDOWN', 14, breakdownY);
        
        const dailyCounts = {};
        checkInTimes.forEach(t => {
            const d = t.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
            dailyCounts[d] = (dailyCounts[d] || 0) + 1;
        });
        
        let maxDaily = 0;
        let peakDay = '';
        Object.keys(dailyCounts).forEach(k => {
            if (dailyCounts[k] > maxDaily) {
                maxDaily = dailyCounts[k];
                peakDay = k;
            }
        });
        
        const tableRows = [];
        Object.keys(dailyCounts).forEach(dateStr => {
            tableRows.push([
                dateStr + (dateStr === peakDay ? ' *' : ''),
                dailyCounts[dateStr].toString(),
                '' // placeholder for bar chart
            ]);
        });
        
        tableRows.push(['TOTAL', checkedInCount.toString(), '* = Peak day']);

        autoTable(doc, {
            head: [['Date', 'Check-ins', '']],
            body: tableRows,
            startY: breakdownY + 4,
            theme: 'plain',
            headStyles: { fillColor: [30, 27, 46], textColor: [255, 255, 255], fontSize: 9 },
            bodyStyles: { fontSize: 8 },
            columnStyles: {
                0: { cellWidth: 50 },
                1: { cellWidth: 30, halign: 'center' },
                2: { cellWidth: 100 }
            },
            willDrawCell: function(data) {
                if (data.row.index === tableRows.length - 1 && data.section === 'body') {
                    doc.setFillColor(250, 245, 255);
                    doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
                    doc.setFont("helvetica", "bold");
                }
            },
            didDrawCell: function(data) {
                if (data.column.index === 2 && data.section === 'body' && data.row.index < tableRows.length - 1) {
                    const count = parseInt(data.row.raw[1]);
                    if (count > 0 && maxDaily > 0) {
                        const barW = (count / maxDaily) * 80;
                        if (data.row.raw[0].includes('*')) {
                            doc.setFillColor(139, 92, 246);
                        } else {
                            doc.setFillColor(167, 139, 250);
                        }
                        doc.rect(data.cell.x + 5, data.cell.y + 2, barW, data.cell.height - 4, 'F');
                    }
                }
            }
        });

        // 7. Demographics
        const finalY = doc.lastAutoTable.finalY + 15;
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(55, 65, 81);
        doc.text('DEMOGRAPHICS', 14, finalY);
        
        doc.setFontSize(9);
        doc.text('Gender Distribution', 14, finalY + 8);
        doc.text('Top Locations', 120, finalY + 8);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text(`Female`, 14, finalY + 14);
        doc.text(`${females}  (${(females/totalGender*100).toFixed(0)}%)`, 50, finalY + 14);
        doc.text(`Male`, 14, finalY + 19);
        doc.text(`${males}  (${(males/totalGender*100).toFixed(0)}%)`, 50, finalY + 19);
        
        const locs = {};
        attendees.forEach(a => {
            if (a.residence && a.status === 'Checked In') {
                locs[a.residence] = (locs[a.residence] || 0) + 1;
            }
        });
        const sortedLocs = Object.keys(locs).sort((a,b) => locs[b] - locs[a]).slice(0, 5);
        
        sortedLocs.forEach((l, idx) => {
            doc.text(l, 120, finalY + 14 + (idx * 5));
            doc.text(locs[l].toString(), 170, finalY + 14 + (idx * 5));
        });

        doc.save(`${selectedEvent.name}_Attendance_Report.pdf`);
    };

    // Derived Data
    let filteredAttendees = attendees.filter(a => 
        a.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.phone_number?.includes(searchTerm)
    );

    if (activeTab === 'Checked In') {
        filteredAttendees = filteredAttendees.filter(a => a.status === 'Checked In');
    } else if (activeTab === 'Pending') {
        filteredAttendees = filteredAttendees.filter(a => a.status === 'Pending');
    }

    const checkedInCount = attendees.filter(a => a.status === 'Checked In').length;
    const pendingCount = attendees.filter(a => a.status === 'Pending').length;
    
    // New stats
    const attendanceRate = attendees.length > 0 ? ((checkedInCount / attendees.length) * 100).toFixed(1) : '0.0';
    const qrScansCount = attendees.filter(a => a.status === 'Checked In' && a.check_in_method === 'QR').length;
    const manualCount = attendees.filter(a => a.status === 'Checked In' && (a.check_in_method === 'Manual' || !a.check_in_method)).length;

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Event Attendance</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>Register attendees and manually check them in.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button 
                        disabled={!selectedEvent}
                        onClick={() => setIsRegisterModalOpen(true)}
                        style={{ background: selectedEvent ? '#22c55e' : 'gray', color: 'var(--text-color)', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: selectedEvent ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <span>+</span> Register Attendee
                    </button>
                    <button onClick={() => handleActionClick('Email QR Codes')} style={{ background: '#0ea5e9', color: 'var(--text-color)', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>✉️</span> Email All QR Codes
                    </button>
                    <button onClick={() => handleActionClick('Scan QR Code')} style={{ background: '#a855f7', color: 'var(--text-color)', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>🔲</span> Scan QR Code
                    </button>
                    <button 
                        onClick={generatePDF}
                        disabled={!selectedEvent || attendees.length === 0}
                        style={{ background: (!selectedEvent || attendees.length === 0) ? 'gray' : '#ef4444', color: 'var(--text-color)', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: (!selectedEvent || attendees.length === 0) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <span>📄</span> PDF Report
                    </button>
                </div>
            </div>

            {/* Select Event */}
            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Select Event</label>
                <div style={{ position: 'relative' }}>
                    <select
                        value={selectedEventId}
                        onChange={(e) => setSelectedEventId(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'transparent',
                            border: '1px solid #ffffff',
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
                                {ev.name.toUpperCase()} — {ev.start_date} ({ev.venue})
                            </option>
                        ))}
                    </select>
                    <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-color)', fontSize: '0.8rem' }}>▼</span>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'white' }}>Loading attendees...</div>
            ) : selectedEvent ? (
                <>
                    {/* Stats Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>📄</div>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>{attendees.length}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Registered</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>✅</div>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>{checkedInCount}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Checked In</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>⏳</div>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>{pendingCount}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Pending</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>📊</div>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>{attendanceRate}%</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Attendance Rate</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>🔲</div>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>{qrScansCount}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>QR Scans</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>✋</div>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: 1 }}>{manualCount}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Manual Check-ins</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Check-In Bar */}
                    <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', marginRight: '1rem' }}>QUICK CHECK-IN:</span>
                        <input type="text" placeholder="Enter phone number or email..." style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', outline: 'none', flex: 1, fontSize: '0.9rem' }} />
                        <button onClick={() => handleActionClick('Quick Check-In')} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>Check In</button>
                    </div>

                    {/* Search & Filter Tabs */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <input 
                            type="text" 
                            placeholder="Search attendees..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', width: '250px' }} 
                        />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {[`All`, `Checked In`, `Pending`].map(tab => {
                                const count = tab === 'All' ? attendees.length : (tab === 'Checked In' ? checkedInCount : pendingCount);
                                return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    style={{
                                        background: 'transparent',
                                        border: activeTab === tab ? '1px solid var(--primary)' : '1px solid transparent',
                                        color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {tab} ({count})
                                </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Table Area */}
                    <div>
                        <h3 style={{ color: 'var(--text-color)', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Attendees</h3>
                        {filteredAttendees.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No attendees found.</div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                                    <thead>
                                        <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
                                            <th style={{ padding: '1rem 0', width: '40px' }}>#</th>
                                            <th style={{ padding: '1rem 0' }}>Name</th>
                                            <th style={{ padding: '1rem 0' }}>Phone</th>
                                            <th style={{ padding: '1rem 0' }}>Email</th>
                                            <th style={{ padding: '1rem 0' }}>Status</th>
                                            <th style={{ padding: '1rem 0' }}>Check-In Time</th>
                                            <th style={{ padding: '1rem 0', textAlign: 'right' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAttendees.map((attendee, index) => (
                                            <tr key={attendee.member_id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                <td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>{index + 1}</td>
                                                <td style={{ padding: '1rem 0', color: 'var(--text-color)', fontWeight: '600' }}>{attendee.full_name}</td>
                                                <td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>{attendee.phone_number}</td>
                                                <td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>{attendee.email}</td>
                                                <td style={{ padding: '1rem 0' }}>
                                                    <span style={{
                                                        background: attendee.status === 'Checked In' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                                        color: attendee.status === 'Checked In' ? '#4ade80' : '#f59e0b',
                                                        padding: '0.2rem 0.6rem',
                                                        borderRadius: '1rem',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '600',
                                                        display: 'inline-block'
                                                    }}>
                                                        {attendee.status}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>
                                                    {attendee.check_in_time ? new Date(attendee.check_in_time).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '-'}
                                                </td>
                                                <td style={{ padding: '1rem 0', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                    {attendee.status === 'Pending' ? (
                                                        <button onClick={() => handleCheckIn(attendee.member_id)} style={{ background: 'transparent', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#4ade80', borderRadius: '0.25rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', cursor: 'pointer' }}>Check In</button>
                                                    ) : (
                                                        <button onClick={() => handleUndoCheckIn(attendee.member_id)} style={{ background: 'transparent', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', borderRadius: '0.25rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', cursor: 'pointer' }}>Undo</button>
                                                    )}
                                                    <button onClick={() => handleActionClick('QR')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', borderRadius: '0.25rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', cursor: 'pointer' }}>QR</button>
                                                    <button onClick={() => handleActionClick('Email Ticket')} style={{ background: 'transparent', border: '1px solid rgba(14, 165, 233, 0.3)', color: '#0ea5e9', borderRadius: '0.25rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', cursor: 'pointer' }}>✉</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '4rem', padding: '3rem', background: 'var(--border-color)', borderRadius: '1rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📅</div>
                    <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Please select an event to view attendance details.</p>
                </div>
            )}

            {isRegisterModalOpen && selectedEvent && (
                <RegisterNewAttendeeModal 
                    event={selectedEvent} 
                    onClose={() => setIsRegisterModalOpen(false)}
                    onRegisterSuccess={() => {
                        setIsRegisterModalOpen(false);
                        fetchAttendees(selectedEvent.id); // Refresh
                    }}
                />
            )}
        </div>
    );
};

export default EventAttendance;
