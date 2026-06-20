import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import DeleteConfirmModal from './DeleteConfirmModal';

const CellDetailsModal = ({ cell, onClose }) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await api.get(`members?cell_id=${cell.id}`);
                const results = response.data.results || response.data;
                setMembers(Array.isArray(results) ? results : []);
            } catch (err) {
                console.error('Error fetching cell members:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, [cell.id]);

    const modalStyle = {
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
        zIndex: 1200,
        padding: '1rem'
    };

    const containerStyle = {
        background: 'var(--surface-1)',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '700px',
        maxHeight: '90vh',
        overflowY: 'auto',
        border: '1px solid var(--border-color)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative'
    };

    return (
        <div style={modalStyle} onClick={onClose}>
            <div style={containerStyle} onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div>
                        <div style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                            Cell Group Details
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-color)', margin: 0 }}>{cell.name}</h2>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#f87171', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '700' }}
                        >
                            Delete Cell
                        </button>
                        <button onClick={onClose} style={{ background: 'var(--border-color)', border: 'none', color: 'var(--text-color)', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    <div style={{ background: 'var(--bg-color)', padding: '1.25rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Cell Leader</div>
                        <div style={{ color: 'var(--text-color)', fontWeight: '700', fontSize: '1.1rem' }}>{cell.leader_name || 'Not assigned'}</div>
                    </div>
                    <div style={{ background: 'var(--bg-color)', padding: '1.25rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Total Members</div>
                        <div style={{ color: 'var(--text-color)', fontWeight: '700', fontSize: '1.1rem' }}>{cell.member_count} Members</div>
                    </div>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span>👥</span> Members in this Cell
                </h3>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Fetching members...</div>
                ) : members.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-color)', borderRadius: '1rem', color: 'var(--text-muted)' }}>
                        No members currently assigned to this cell.
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {members.map(member => (
                            <div key={member.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.25rem',
                                padding: '1rem',
                                background: 'var(--bg-color)',
                                borderRadius: '1rem',
                                border: '1px solid var(--border-color)',
                                transition: 'all 0.3s'
                            }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    background: 'var(--surface-2)',
                                    flexShrink: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-muted)',
                                    fontSize: '1.2rem'
                                }}>
                                    👤
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '700', color: 'var(--text-color)' }}>{member.full_name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{member.commitment_status} • {member.category}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-color)' }}>{member.phone_number}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}>Active</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Premium Delete Confirmation */}
            <DeleteConfirmModal
                isOpen={showDeleteConfirm}
                title="Delete Cell Group"
                message={`Are you sure you want to delete "${cell.name}"? This will unlink all members and cannot be undone.`}
                onConfirm={async () => {
                    setDeleting(true);
                    try {
                        await api.delete(`cells/${cell.id}`);
                        onClose();
                        window.location.reload();
                    } catch (err) {
                        alert('Failed to delete cell');
                    } finally {
                        setDeleting(false);
                    }
                }}
                onCancel={() => setShowDeleteConfirm(false)}
                loading={deleting}
            />
        </div>
    );
};

export default CellDetailsModal;
