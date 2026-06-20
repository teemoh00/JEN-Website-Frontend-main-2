import React, { useState, useEffect } from 'react';
import DaysBadge from './DaysBadge';
import api from '../../../../api/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { addLogoToDoc } from '../../../../utils/pdfHelper';

const FastingTable = ({ refreshTrigger, filters }) => {
    const [commitments, setCommitments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCommitments = async () => {
            try {
                setLoading(true);
                const response = await api.get(`prayers/fasting/commitments?t=${new Date().getTime()}`);
                const mapped = response.data.map(item => {
                    let parsedDays = [];
                    let daysArray = [];
                    try {
                        daysArray = JSON.parse(item.days_fasting);
                        // Map Mon, Tue, etc to 0, 1, ...
                        const dayMap = { 'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5, 'Sunday': 6 };
                        parsedDays = daysArray.map(d => dayMap[d]).filter(d => d !== undefined);
                    } catch (e) {
                        parsedDays = [];
                    }

                    return {
                        id: item.id,
                        eventId: item.fasting_event_id,
                        name: item.full_name,
                        email: item.email || '—',
                        phone: item.phone || '—',
                        memberId: item.event_title || 'General',
                        days: parsedDays,
                        rawDays: daysArray,
                        date: new Date(item.created_at).toLocaleDateString(),
                        isoDate: item.created_at.split(' ')[0], // YYYY-MM-DD format for filtering
                        time: new Date(item.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                    };
                });
                setCommitments(mapped);
            } catch (err) {
                console.error("Error fetching commitments", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCommitments();
    }, [refreshTrigger]);

    const filteredCommitments = commitments.filter(item => {
        if (!filters) return true;
        
        // Filter by Event
        if (filters.eventId !== 'all' && String(item.eventId) !== String(filters.eventId)) {
            return false;
        }

        return true;
    });

    const exportToExcel = () => {
        import('xlsx').then(XLSX => {
            const headers = ['ID', 'Name', 'Email', 'Phone', 'Event', 'Days Fasting', 'Date Submitted'];
            const rows = filteredCommitments.map(item => [
                item.id,
                item.name,
                item.email,
                item.phone,
                item.memberId,
                item.rawDays ? item.rawDays.join(', ') : '',
                item.date
            ]);
            const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Fasting Commitments");
            XLSX.writeFile(workbook, "jen_fasting_commitments.xlsx");
        });
    };

    const exportToPDF = async () => {
        try {
            const doc = new jsPDF();
            await addLogoToDoc(doc, 14, 10, 15, 15);

            doc.setFontSize(20);
            doc.setTextColor(34, 193, 230);
            doc.text("Jesus Enthroned Network", 32, 18);
            
            doc.setFontSize(12);
            doc.setTextColor(100, 100, 100);
            doc.text("Prayer & Fasting Commitments", 32, 24);

            const headers = ['ID', 'Name', 'Email', 'Phone', 'Event', 'Days Fasting', 'Date Submitted'];
            const rows = filteredCommitments.map(item => [
                item.id,
                item.name,
                item.email,
                item.phone,
                item.memberId,
                item.rawDays ? item.rawDays.join(', ') : '',
                item.date
            ]);

            autoTable(doc, {
                startY: 35,
                head: [headers],
                body: rows,
                theme: 'grid',
                styles: { fontSize: 8, cellPadding: 3 },
                headStyles: { fillColor: [34, 193, 230], textColor: 255, fontStyle: 'bold' },
                alternateRowStyles: { fillColor: [245, 247, 250] },
            });

            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150);
                doc.text(
                    `Page ${i} of ${pageCount}`,
                    doc.internal.pageSize.width - 20,
                    doc.internal.pageSize.height - 10,
                    { align: 'right' }
                );
            }

            doc.save("jen_fasting_commitments.pdf");
        } catch (error) {
            console.error("PDF Export failed:", error);
            alert("Failed to export PDF. Please try again.");
        }
    };

    return (
        <div className="fasting-table-container">
            <style>{`
                .fasting-table-container {
                    background: var(--surface-1);
                    border-radius: 1.5rem;
                    border: 1px solid var(--border-color);
                    overflow: hidden;
                    margin-bottom: 2rem;
                }
                .fasting-table th, 
                .fasting-table td {
                    padding: 1rem 1.5rem;
                    text-align: left;
                }
                
                @media (max-width: 768px) {
                    .fasting-table th, 
                    .fasting-table td {
                        padding: 0.75rem 1rem !important;
                    }
                    .fasting-table th {
                        font-size: 0.65rem !important;
                    }
                    .fasting-table td {
                        font-size: 0.75rem !important;
                    }
                    .fasting-name {
                        font-size: 0.85rem !important;
                    }
                    .fasting-pagination-info {
                        font-size: 0.75rem !important;
                    }
                    .fasting-pagination-btn {
                        padding: 0.4rem 0.6rem !important;
                        font-size: 0.75rem !important;
                    }
                }
            `}</style>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <button
                    onClick={exportToExcel}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #10b981',
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#10b981',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    📊 Export Excel
                </button>
                <button
                    onClick={exportToPDF}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #ef4444',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    📄 Export PDF
                </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table className="fasting-table" style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-color)' }}>
                    <thead>
                        <tr style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border-color)' }}>
                            <th style={headerStyle}>ID</th>
                            <th style={headerStyle}>Name</th>
                            <th style={headerStyle}>Email</th>
                            <th style={headerStyle}>Phone</th>
                            <th style={headerStyle}>Event</th>
                            <th style={headerStyle}>Days</th>
                            <th style={headerStyle}>Date Submitted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading...</td></tr>
                        ) : filteredCommitments.length === 0 ? (
                            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No commitments found for the selected filters</td></tr>
                        ) : filteredCommitments.map((item, index) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} className="table-row-hover">
                                <td style={cellStyle}>{item.id}</td>
                                <td style={cellStyle}>
                                    <div className="fasting-name" style={{ fontWeight: '600', color: 'var(--text-color)' }}>{item.name}</div>
                                </td>
                                <td style={cellStyle}>{item.email}</td>
                                <td style={cellStyle}>{item.phone}</td>
                                <td style={cellStyle}>
                                    <span style={{
                                        background: item.memberId === 'General' ? 'transparent' : 'rgba(34, 193, 230, 0.1)',
                                        color: item.memberId === 'General' ? 'var(--text-muted)' : 'var(--primary)',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '0.25rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        {item.memberId}
                                    </span>
                                </td>
                                <td style={cellStyle}>
                                    <DaysBadge days={item.days} />
                                </td>
                                <td style={cellStyle}>
                                    <div style={{ fontWeight: '500' }}>{item.date}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.time}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Placeholder mainly */}
            <div className="fasting-pagination-info" style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.875rem'
            }}>
                <div>Showing 1-5 of 20</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="fasting-pagination-btn" style={paginationBtnStyle}>Previous</button>
                    <button className="fasting-pagination-btn" style={{ ...paginationBtnStyle, background: 'var(--primary)', color: 'var(--btn-text)', border: 'none' }}>1</button>
                    <button className="fasting-pagination-btn" style={paginationBtnStyle}>2</button>
                    <button className="fasting-pagination-btn" style={paginationBtnStyle}>3</button>
                    <button className="fasting-pagination-btn" style={paginationBtnStyle}>Next</button>
                </div>
            </div>

            <style>{`
                .table-row-hover:hover {
                    background: var(--surface-2);
                }
            `}</style>
        </div>
    );
};

// Styles
const headerStyle = {
    padding: '1rem 1.5rem',
    textAlign: 'left',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
};

const cellStyle = {
    padding: '1rem 1.5rem',
    fontSize: '0.875rem',
    color: 'var(--text-color)'
};

const paginationBtnStyle = {
    padding: '0.5rem 1rem',
    background: 'transparent',
    border: '1px solid var(--border-color)',
    borderRadius: '0.5rem',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    fontSize: '0.875rem'
};

export default FastingTable;
