import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';

const CreateCellModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        cellName: '',
        leader: ''
    });
    const [committedMembers, setCommittedMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingMembers, setFetchingMembers] = useState(true);
    const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchCommittedMembers = async () => {
            try {
                const response = await api.get('church/members/?commitment=Committed Member');
                const results = response.data.results || response.data;
                setCommittedMembers(Array.isArray(results) ? results : []);
            } catch (err) {
                console.error('Error fetching committed members:', err);
            } finally {
                setFetchingMembers(false);
            }
        };
        fetchCommittedMembers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('loading');
        try {
            await api.post('church/cells/', {
                name: formData.cellName,
                leader_name: formData.leader
            });
            setStatus('success');
            // Auto-close after a few seconds or let user click
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err) {
            console.error('Error creating cell:', err);
            const msg = err.response?.data ? JSON.stringify(err.response.data) : 'Failed to create cell. Please try again.';
            setErrorMsg(msg);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        background: 'var(--bg-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '0.5rem',
        color: 'var(--text-color)',
        fontSize: '0.9rem',
        marginTop: '0.5rem'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        fontWeight: '500'
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100
        }}>
            <div style={{
                background: 'var(--surface-1)',
                padding: '2rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '450px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-color)', margin: 0 }}>Create New Cell</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                {status === 'success' ? (
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <div style={{
                            width: '70px',
                            height: '70px',
                            background: 'rgba(34, 197, 94, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: '#4ade80',
                            fontSize: '2.5rem'
                        }}>
                            ✓
                        </div>
                        <h3 style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>Cell Created!</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>The cell has been successfully registered in the system.</p>
                        <button
                            onClick={onClose}
                            style={{
                                marginTop: '1.5rem',
                                padding: '0.75rem 2rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                                color: 'white',
                                fontWeight: '700',
                                cursor: 'pointer'
                            }}
                        >
                            Back to Dashboard
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                        {status === 'error' && (
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: '0.5rem',
                                color: '#f87171',
                                fontSize: '0.85rem'
                            }}>
                                <strong>Setup Error:</strong> {errorMsg}
                            </div>
                        )}
                        <div>
                            <label style={labelStyle}>Cell Name</label>
                            <input
                                type="text"
                                name="cellName"
                                value={formData.cellName}
                                onChange={handleChange}
                                placeholder="e.g. Goshen Alpha"
                                style={inputStyle}
                                required
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Cell Leader</label>
                            <select
                                name="leader"
                                value={formData.leader}
                                onChange={handleChange}
                                style={inputStyle}
                                required
                                disabled={fetchingMembers}
                            >
                                <option value="">{fetchingMembers ? 'Loading members...' : '-- Select a Lead --'}</option>
                                {committedMembers.map(member => (
                                    <option key={member.id} value={member.profile_full_name || member.full_name}>
                                        {member.profile_full_name || member.full_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                            <button
                                type="button"
                                onClick={onClose}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border-color)',
                                    background: 'transparent',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    border: 'none',
                                    background: 'var(--primary)',
                                    color: 'var(--bg-color)',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontWeight: '700',
                                    opacity: loading ? 0.7 : 1
                                }}
                            >
                                {loading ? 'Creating...' : 'Create Cell'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CreateCellModal;
