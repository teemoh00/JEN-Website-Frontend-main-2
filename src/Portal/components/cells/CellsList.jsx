import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import CellDetailsModal from './CellDetailsModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const CellsList = () => {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
    const [searchTerm, setSearchTerm] = useState('');
    const [cells, setCells] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCell, setSelectedCell] = useState(null);
    const [cellToDelete, setCellToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const fetchCells = async () => {
        setLoading(true);
        try {
            const response = await api.get('church/cells/');
            // Handle DRF pagination if present
            const results = response.data.results || response.data;
            setCells(Array.isArray(results) ? results : []);
            setError(null);
        } catch (err) {
            console.error('Error fetching cells:', err);
            setError('Failed to load cell groups. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id, name) => {
        setCellToDelete({ id, name });
    };

    const confirmDelete = async () => {
        if (!cellToDelete) return;
        setDeleting(true);
        try {
            await api.delete(`church/cells/${cellToDelete.id}/`);
            setCellToDelete(null);
            fetchCells();
        } catch (err) {
            console.error('Error deleting cell:', err);
            alert('Failed to delete cell. Please try again.');
        } finally {
            setDeleting(false);
        }
    };

    useEffect(() => {
        fetchCells();
    }, []);

    const filteredCells = cells.filter(cell =>
        cell.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cell.leader_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Toolbar */}
            <div style={{
                padding: '1.5rem 0',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '1.2rem', fontWeight: '800' }}>All Cells</h3>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{filteredCells.length}</span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flex: 1, justifyContent: 'flex-end', minWidth: '300px' }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '300px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ position: 'absolute', left: '0.5rem', opacity: 0.6, fontSize: '0.9rem' }}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search cells..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem 1rem 0.5rem 2rem',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-color)',
                                fontSize: '0.85rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => setViewMode('grid')}
                            style={{
                                background: viewMode === 'grid' ? '#a855f7' : 'transparent',
                                border: 'none',
                                color: viewMode === 'grid' ? 'white' : 'var(--text-muted)',
                                padding: '0.3rem 0.4rem',
                                borderRadius: '0.25rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            🔲
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            style={{
                                background: viewMode === 'table' ? '#a855f7' : 'transparent',
                                border: 'none',
                                color: viewMode === 'table' ? 'white' : 'var(--text-muted)',
                                padding: '0.3rem 0.4rem',
                                borderRadius: '0.25rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            ≣
                        </button>
                    </div>
                </div>
            </div>

            {/* List Content */}
            <div style={{ padding: '0 0 1.5rem 0', overflowX: 'auto' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading cell data...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#ef4444' }}>{error}</div>
                ) : filteredCells.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No cells found matching your search.</div>
                ) : viewMode === 'grid' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {filteredCells.map(cell => (
                            <div key={cell.id} style={{
                                background: 'var(--bg-color)',
                                borderRadius: '0.75rem',
                                padding: '1.25rem',
                                border: '1px solid var(--border-color)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div style={{ fontWeight: '700', color: 'var(--text-color)', fontSize: '1.1rem' }}>{cell.name}</div>
                                    <span style={{
                                        background: cell.member_count > 0 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                                        color: cell.member_count > 0 ? '#4ade80' : 'var(--text-muted)',
                                        fontSize: '0.7rem',
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '0.25rem',
                                        textTransform: 'uppercase',
                                        fontWeight: '600'
                                    }}>
                                        {cell.member_count > 0 ? 'Active' : 'Empty'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                        {cell.leader_name?.charAt(0) || '?'}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-color)', fontWeight: '600' }}>{cell.leader_name || 'No Leader'}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Leader</div>
                                    </div>
                                </div>
                                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Members</div>
                                        <div style={{ color: 'var(--text-color)' }}>{cell.member_count}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Meeting</div>
                                        <div style={{ color: 'var(--text-color)', fontSize: '0.9rem' }}>{cell.meeting_day || 'Not set'}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <button
                                        onClick={() => setSelectedCell(cell)}
                                        style={{ flex: 1, padding: '0.5rem', background: 'var(--border-color)', border: 'none', borderRadius: '0.5rem', color: 'var(--primary)', fontSize: '0.85rem', cursor: 'pointer' }}
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(cell.id, cell.name)}
                                        style={{ flex: 1, padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '0.5rem', color: '#f87171', fontSize: '0.85rem', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-color)' }}>
                        <thead>
                            <tr style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Name</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Leader</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Members</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Location</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Schedule</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Status</th>
                                <th style={{ textAlign: 'right', padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCells.map(cell => (
                                <tr key={cell.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '500' }}>{cell.name}</td>
                                    <td style={{ padding: '1rem' }}>{cell.leader_name || 'N/A'}</td>
                                    <td style={{ padding: '1rem' }}>{cell.member_count}</td>
                                    <td style={{ padding: '1rem' }}>{cell.location || 'N/A'}</td>
                                    <td style={{ padding: '1rem' }}>{cell.meeting_day || 'Not set'}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            background: cell.member_count > 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                                            color: cell.member_count > 0 ? '#4ade80' : 'var(--text-muted)',
                                            fontSize: '0.75rem',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '0.25rem'
                                        }}>
                                            {cell.member_count > 0 ? 'Active' : 'Empty'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button
                                            onClick={() => setSelectedCell(cell)}
                                            style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginRight: '0.75rem', fontWeight: '600' }}
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(cell.id, cell.name)}
                                            style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', fontWeight: '600' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Cell Details Modal */}
            {selectedCell && (
                <CellDetailsModal
                    cell={selectedCell}
                    onClose={() => setSelectedCell(null)}
                />
            )}

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                isOpen={!!cellToDelete}
                title="Delete Cell"
                message={`Are you sure you want to delete "${cellToDelete?.name}"? This action cannot be undone.`}
                onConfirm={confirmDelete}
                onCancel={() => setCellToDelete(null)}
                loading={deleting}
            />
        </div>
    );
};

export default CellsList;
