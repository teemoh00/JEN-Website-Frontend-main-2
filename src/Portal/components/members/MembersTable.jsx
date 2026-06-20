import React, { useState } from 'react';
import { MOCK_MEMBERS } from '../../../mockData';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { addLogoToDoc } from '../../../utils/pdfHelper';

const MembersTable = ({ members = [], loading, error }) => {
    const [activeTab, setActiveTab] = useState('regular'); // regular | committed
    const [searchTerm, setSearchTerm] = useState('');
    
    // Derived state from props
    const formattedMembers = members.map(m => ({
        ...m,
        profile_full_name: m.full_name || 'Unnamed Member',
        full_name: m.full_name || 'Unnamed Member',
        user_phone_number: m.phone_number,
        cell_group_name: m.cell_group,
        category: m.commitment_status === 'Committed Member' ? 'Committed Member' : 'Regular Member',
        created_at: m.date_joined,
    }));

    const regularMembers = formattedMembers.filter(m => m.commitment_status !== 'Committed Member');
    const committedMembers = formattedMembers.filter(m => m.commitment_status === 'Committed Member');

    let displayedMembers = activeTab === 'regular' ? regularMembers : committedMembers;

    if (searchTerm.trim() !== '') {
        const lowerSearch = searchTerm.toLowerCase();
        displayedMembers = displayedMembers.filter(m => 
            (m.full_name && m.full_name.toLowerCase().includes(lowerSearch)) ||
            (m.email && m.email.toLowerCase().includes(lowerSearch)) ||
            (m.phone_number && m.phone_number.includes(lowerSearch)) ||
            (m.id && m.id.toString().includes(lowerSearch))
        );
    }

    const totalCount = formattedMembers.length;
    const tabStats = { regular: regularMembers.length, committed: committedMembers.length };
    const [selectedMember, setSelectedMember] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const formatNum = (num) => num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num;

    const ExportButton = ({ color, label, onClick }) => (
        <button
            onClick={onClick}
            style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                padding: '0.3rem 0.6rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
            }}
        >
            <span style={{ display: 'inline-block', width: '10px', height: '10px', background: color, borderRadius: '2px' }}></span> {label}
        </button>
    );

    const handleExport = async (type) => {
        if (type === 'Print') {
            window.print();
            return;
        }

        const tableData = displayedMembers.map(m => [
            `MEM-${m.id.toString().padStart(3, '0')}`,
            m.full_name || 'Unnamed',
            m.phone_number || '-',
            m.email || '-',
            m.cell_group_name || '-',
            m.category
        ]);
        const header = ["Member ID", "Full Name", "Phone", "Email", "Cell Group", "Status"];

        if (type === 'Copy') {
            const data = displayedMembers.map(m => `MEM-${m.id.toString().padStart(3, '0')}\t${m.full_name}\t${m.phone_number}\t${m.email}\t${m.cell_group_name}\t${m.category}`).join('\n');
            const headerStr = header.join("\t") + "\n";
            navigator.clipboard.writeText(headerStr + data);
            alert('Table data copied to clipboard!');
            return;
        }

        if (type === 'CSV') {
            const csvContent = "data:text/csv;charset=utf-8," 
                + header.join(",") + "\n"
                + tableData.map(e => e.join(",")).join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "jen_members_export.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return;
        }

        if (type === 'Excel') {
            import('xlsx').then(XLSX => {
                const worksheet = XLSX.utils.aoa_to_sheet([header, ...tableData]);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
                XLSX.writeFile(workbook, "jen_members_export.xlsx");
            });
            return;
        }

        if (type === 'PDF') {
            try {
                const doc = new jsPDF();
                
                await addLogoToDoc(doc, 14, 10, 15, 15);

                // Add Title
                doc.setFontSize(20);
                doc.setTextColor(34, 193, 230); // Primary color
                doc.text("Jesus Enthroned Network", 32, 18);
                
                doc.setFontSize(12);
                doc.setTextColor(100, 100, 100);
                doc.text(`Members Database Export (${activeTab === 'regular' ? 'Regular' : 'Committed'})`, 32, 24);

                // Add Table
                autoTable(doc, {
                    startY: 35,
                    head: [header],
                    body: tableData,
                    theme: 'grid',
                    styles: { fontSize: 8, cellPadding: 3 },
                    headStyles: { fillColor: [34, 193, 230], textColor: 255, fontStyle: 'bold' },
                    alternateRowStyles: { fillColor: [245, 247, 250] },
                });

                // Add Footer
                const pageCount = doc.internal.getNumberOfPages();
                for (let i = 1; i <= pageCount; i++) {
                    doc.setPage(i);
                    doc.setFontSize(8);
                    doc.setTextColor(150);
                    doc.text(`Generated on ${new Date().toLocaleString()} - Page ${i} of ${pageCount}`, 14, doc.internal.pageSize.height - 10);
                }

                doc.save("jen_members_report.pdf");
            } catch (err) {
                console.error("PDF generation failed:", err);
                alert("Failed to generate PDF. Check console for details.");
            }
        }
    };

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            border: '1px solid var(--border-color)',
            overflow: 'hidden'
        }}>
            {/* Tabs & Filters Header */}
            <div style={{ borderBottom: '1px solid var(--border-color)', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>

                    {/* Tabs */}
                    <div className="members-tabs" style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => setActiveTab('regular')}
                            style={{
                                background: activeTab === 'regular' ? 'var(--primary)' : 'transparent',
                                color: activeTab === 'regular' ? 'var(--bg-color)' : 'var(--text-muted)',
                                border: 'none',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '0.4rem',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Regular Members <span style={{ fontSize: '0.75rem', opacity: 0.8, marginLeft: '4px' }}>({formatNum(tabStats.regular)})</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('committed')}
                            style={{
                                background: activeTab === 'committed' ? 'var(--primary)' : 'transparent',
                                color: activeTab === 'committed' ? 'var(--bg-color)' : 'var(--text-muted)',
                                border: 'none',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '0.4rem',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Committed Members <span style={{ fontSize: '0.75rem', opacity: 0.8, marginLeft: '4px' }}>({formatNum(tabStats.committed)})</span>
                        </button>
                    </div>

                    {/* Search */}
                    <div className="members-search" style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                        <input
                            type="text"
                            placeholder="Search members..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-color)',
                                padding: '0.6rem 1rem 0.6rem 2.2rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.9rem',
                                width: '100%'
                            }}
                        />
                        <span style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                    </div>
                </div>

                {/* Export Tools */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>Export:</span>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <ExportButton color="#d1d5db" label="Copy" onClick={() => handleExport('Copy')} />
                        <ExportButton color="#fcd34d" label="CSV" onClick={() => handleExport('CSV')} />
                        <ExportButton color="#4ade80" label="Excel" onClick={() => handleExport('Excel')} />
                        <ExportButton color="#f87171" label="PDF" onClick={() => handleExport('PDF')} />
                        <ExportButton color="#a78bfa" label="Print" onClick={() => handleExport('Print')} />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-color)', fontSize: '0.85rem', fontWeight: '700' }}>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>ID</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Full Name</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Phone</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Email</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Invited By</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Status</th>
                            <th style={{ textAlign: 'right', padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading members...</td></tr>}
                        {error && <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>{error}</td></tr>}
                        {!loading && !error && displayedMembers.map(member => (
                            <tr key={member.id} style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                <td style={{ padding: '1.5rem 1rem' }}>{member.id}</td>
                                <td style={{ padding: '1.5rem 1rem', color: 'var(--text-color)' }}>
                                    {member.profile_full_name || member.full_name}
                                </td>
                                <td style={{ padding: '1.5rem 1rem' }}>
                                    {member.user_phone_number || member.phone_number}
                                </td>
                                <td style={{ padding: '1.5rem 1rem', color: 'var(--text-color)' }}>
                                    {member.email || ''}
                                </td>
                                <td style={{ padding: '1.5rem 1rem' }}>-</td>
                                <td style={{ padding: '1.5rem 1rem' }}>
                                    <span style={{ color: '#4ade80' }}>● Active</span>
                                </td>
                                <td style={{ padding: '1.5rem 1rem', textAlign: 'right' }}>
                                    <button
                                        onClick={() => {
                                            setSelectedMember(member);
                                            setShowDetailModal(true);
                                        }}
                                        style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination ... */}
            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <div>Showing {displayedMembers.length} entries</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ background: 'var(--border-color)', border: 'none', color: 'var(--text-color)', padding: '0.3rem 0.6rem', borderRadius: '0.3rem', cursor: 'pointer' }}>Previous</button>
                    <button style={{ background: 'var(--primary)', border: 'none', color: 'var(--bg-color)', padding: '0.3rem 0.6rem', borderRadius: '0.3rem', cursor: 'pointer', fontWeight: 'bold' }}>1</button>
                    <button style={{ background: 'var(--border-color)', border: 'none', color: 'var(--text-color)', padding: '0.3rem 0.6rem', borderRadius: '0.3rem', cursor: 'pointer' }}>2</button>
                    <button style={{ background: 'var(--border-color)', border: 'none', color: 'var(--text-color)', padding: '0.3rem 0.6rem', borderRadius: '0.3rem', cursor: 'pointer' }}>Next</button>
                </div>
            </div>

            {/* Member Detail Modal */}
            {showDetailModal && selectedMember && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 20000,
                    padding: '2rem'
                }} onClick={() => setShowDetailModal(false)}>
                    <div
                        style={{
                            background: 'var(--surface-1)',
                            borderRadius: '1.5rem',
                            maxWidth: '700px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            position: 'relative'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '2rem',
                            background: 'linear-gradient(135deg, rgba(34, 193, 230, 0.1) 0%, transparent 100%)',
                            borderBottom: '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '1rem',
                                background: 'var(--surface-2)',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid var(--primary)'
                            }}>
                                {selectedMember.avatar_url ? (
                                    <img src={`${selectedMember.avatar_url}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ fontSize: '2rem', opacity: 0.5 }}>👤</span>
                                )}
                            </div>
                            <div>
                                <h2 style={{ margin: 0, color: 'var(--text-color)', fontSize: '1.5rem', fontWeight: '800' }}>
                                    {selectedMember.profile_full_name || selectedMember.full_name}
                                </h2>
                                <p style={{ margin: '0.3rem 0 0 0', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '600' }}>
                                    Member ID: MEM-{selectedMember.id.toString().padStart(3, '0')}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    background: 'var(--surface-2)',
                                    border: 'none',
                                    color: 'var(--text-color)',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem'
                                }}
                            >
                                ×
                            </button>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                            <div>
                                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Contact Info</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone</div>
                                        <div style={{ color: 'var(--text-color)', fontWeight: '600' }}>{selectedMember.user_phone_number || selectedMember.phone_number || 'Not provided'}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email</div>
                                        <div style={{ color: 'var(--text-color)', fontWeight: '600' }}>{selectedMember.email || 'Not provided'}</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Church Roles</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cell Group</div>
                                        <div style={{ color: 'var(--primary)', fontWeight: '700' }}>{selectedMember.cell_group_name || 'Not Assigned'}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Category</div>
                                        <div style={{ color: 'var(--text-color)', fontWeight: '600' }}>{selectedMember.category}</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Account Status</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Commitment</div>
                                        <span style={{
                                            background: selectedMember.commitment_status === 'Committed Member' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                            color: selectedMember.commitment_status === 'Committed Member' ? '#4ade80' : '#f59e0b',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.75rem',
                                            fontWeight: '700'
                                        }}>
                                            {selectedMember.commitment_status}
                                        </span>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Joined At</div>
                                        <div style={{ color: 'var(--text-color)', fontWeight: '600' }}>{new Date(selectedMember.created_at).toLocaleDateString()}</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Personal Profile</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Residence</div>
                                        <div style={{ color: 'var(--text-color)', fontWeight: '600' }}>{selectedMember.residence || 'Not provided'}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Employment</div>
                                        <div style={{ color: 'var(--text-color)', fontWeight: '600' }}>{selectedMember.employment_status || 'Not provided'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                style={{
                                    padding: '0.6rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border-color)',
                                    background: 'transparent',
                                    color: 'var(--text-color)',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    flex: 1,
                                    minWidth: '120px'
                                }}
                            >
                                Close
                            </button>
                            <button
                                style={{
                                    padding: '0.6rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    border: 'none',
                                    background: 'var(--primary)',
                                    color: 'var(--text-color)',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    flex: 1,
                                    minWidth: '120px'
                                }}
                            >
                                Edit Member
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @media (max-width: 768px) {
                    .members-tabs {
                        width: 100%;
                        justify-content: stretch;
                    }
                    .members-tabs button {
                        flex: 1;
                        padding: 0.5rem 0.5rem !important;
                        font-size: 0.75rem !important;
                    }
                    .members-search {
                        width: 100%;
                    }
                    th, td {
                        padding: 0.75rem 0.5rem !important;
                        font-size: 0.8rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default MembersTable;
