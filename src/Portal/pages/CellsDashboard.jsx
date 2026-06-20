import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import CellStatsCards from '../components/cells/CellStatsCards';
import CellsList from '../components/cells/CellsList';
import CreateCellModal from '../components/cells/CreateCellModal';
import api from '../../api/axios';
import { addLogoToDoc } from '../../utils/pdfHelper';

const CellsDashboard = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [cells, setCells] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCells = async () => {
        try {
            setLoading(true);
            const response = await api.get('cells');
            setCells(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching cells:", err);
            setError("Failed to load cells data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCells();
    }, []);

    const handleExport = async (type) => {
        if (!cells || cells.length === 0) {
            alert('No cells data available to export.');
            return;
        }

        const header = ["Cell ID", "Cell Name", "Leader", "Members", "Status"];
        const tableData = cells.map(c => [
            `CEL-${c.id.toString().padStart(3, '0')}`,
            c.name,
            c.leader_name || 'N/A',
            c.member_count?.toString() || '0',
            c.member_count > 0 ? 'Active' : 'Empty'
        ]);

        if (type === 'Excel') {
            try {
                const XLSX = await import('xlsx');
                const worksheet = XLSX.utils.aoa_to_sheet([header, ...tableData]);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Cells");
                XLSX.writeFile(workbook, "jen_cells_export.xlsx");
            } catch (err) {
                console.error('Export to Excel failed', err);
                alert('Failed to export Excel.');
            }
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
                doc.text("List Of Cells", 32, 24);

                // Add Table
                autoTable(doc, {
                    startY: 35,
                    head: [header],
                    body: tableData,
                    theme: 'grid',
                    styles: { fontSize: 8, cellPadding: 3 },
                    headStyles: { fillColor: [34, 193, 230], textColor: [255, 255, 255], fontStyle: 'bold' },
                    alternateRowStyles: { fillColor: [245, 247, 250] },
                });

                doc.save("jen_cells_report.pdf");
            } catch (err) {
                console.error("PDF generation failed:", err);
                alert("Failed to generate PDF. Make sure you are connected to the internet to load libraries if needed.");
            }
            return;
        }
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header Area */}
            <div className="section-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1.5rem'
            }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Cells Management</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Oversee and manage all cell groups, leaders, and engagement.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => handleExport('PDF')}
                        style={{
                            background: 'transparent',
                            color: 'var(--primary)',
                            border: '1px solid var(--primary)',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1rem',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        📄 Export PDF
                    </button>
                    <button
                        onClick={() => handleExport('Excel')}
                        style={{
                            background: 'transparent',
                            color: '#10b981',
                            border: '1px solid #10b981',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1rem',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        📊 Export Excel
                    </button>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        style={{
                            background: 'var(--primary)',
                            color: 'var(--bg-color)',
                            border: 'none',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            fontSize: '0.95rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 15px rgba(34, 193, 230, 0.3)',
                            width: 'auto'
                        }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>+</span> Create New Cell
                    </button>
                </div>
            </div>

            <style>{`
                @media (max-width: 640px) {
                    .section-header {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                    }
                    .section-header button {
                        width: 100% !important;
                        justify-content: center !important;
                    }
                    h1 {
                        fontSize: 1.5rem !important;
                    }
                }
            `}</style>



            {/* Statistics */}
            <CellStatsCards cells={cells} loading={loading} />

            {/* Listing & Management */}
            <CellsList cells={cells} loading={loading} error={error} onRefresh={fetchCells} />

            {/* Modals */}
            {isCreateModalOpen && (
                <CreateCellModal 
                    onClose={() => setIsCreateModalOpen(false)} 
                    onSuccess={() => {
                        setIsCreateModalOpen(false);
                        fetchCells();
                    }}
                />
            )}
        </div>
    );
};

export default CellsDashboard;
