import React, { useState, useEffect } from 'react';
import AddDevotionalModal from '../../components/media/AddDevotionalModal';
import api from '../../../api/axios';

const Devotional = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [devotionals, setDevotionals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const fetchDevotionals = async () => {
            try {
                setLoading(true);
                const response = await api.get('devotionals');
                setDevotionals(response.data);
            } catch (err) {
                console.error("Error fetching devotionals", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDevotionals();
    }, [refreshTrigger]);

    const filteredDevotionals = devotionals.filter(d => {
        const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              d.author?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || d.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const totalStats = devotionals.length;
    const publishedStats = devotionals.filter(d => d.status === 'Published').length;
    const draftStats = devotionals.filter(d => d.status === 'Draft').length;

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '4rem' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem',
                paddingTop: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '2rem' }}>📖</span>
                    <div>
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            color: 'var(--primary)',
                            lineHeight: 1.2,
                            margin: 0
                        }}>
                            Devotionals
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem', margin: 0 }}>
                            Manage daily devotional content
                        </p>
                    </div>
                </div>
                <button 
                    onClick={() => setShowAddModal(true)}
                    style={{
                    padding: '0.6rem 1.2rem',
                    background: 'var(--primary)',
                    color: 'var(--text-color)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    + Add Devotional
                </button>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                {/* Total */}
                <div style={{
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '0.5rem',
                        background: 'rgba(34, 193, 230, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                    }}>📖</div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-color)', lineHeight: 1 }}>{totalStats}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Total Devotionals</div>
                    </div>
                </div>

                {/* Published */}
                <div style={{
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '0.5rem',
                        background: 'rgba(34, 197, 94, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                    }}>✅</div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-color)', lineHeight: 1 }}>{publishedStats}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Published</div>
                    </div>
                </div>

                {/* Drafts */}
                <div style={{
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '0.5rem',
                        background: 'rgba(245, 158, 11, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                    }}>📝</div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-color)', lineHeight: 1 }}>{draftStats}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Drafts</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search devotionals..."
                    style={{
                        flex: 1,
                        padding: '0.75rem 1rem',
                        background: 'transparent',
                        border: '1px solid var(--border-color)',
                        borderRadius: '0.4rem',
                        color: 'var(--text-color)',
                        outline: 'none',
                        fontSize: '0.9rem'
                    }}
                />
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.4rem',
                    color: 'var(--text-color)',
                    outline: 'none',
                    minWidth: '150px',
                    fontSize: '0.9rem',
                    colorScheme: 'dark',
                    cursor: 'pointer'
                }}>
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="drafts">Drafts</option>
                </select>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading devotionals...</div>
            ) : filteredDevotionals.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {filteredDevotionals.map(devotional => (
                        <div key={devotional.id} style={{
                            background: 'var(--surface-1)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '0.8rem',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {devotional.featured_image ? (
                                <img src={devotional.featured_image} alt={devotional.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100%', height: '160px', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                                    📖
                                </div>
                            )}
                            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <span style={{ 
                                        padding: '0.2rem 0.5rem', 
                                        borderRadius: '0.2rem', 
                                        fontSize: '0.7rem', 
                                        fontWeight: '700',
                                        background: devotional.status === 'Published' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                        color: devotional.status === 'Published' ? '#22c55e' : '#f59e0b'
                                    }}>
                                        {devotional.status}
                                    </span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(devotional.date).toLocaleDateString()}</span>
                                </div>
                                <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', color: 'var(--text-color)' }}>{devotional.title}</h3>
                                <div style={{ fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: '600' }}>{devotional.scripture_reference}</div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {devotional.message}
                                </p>
                                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>By {devotional.author || 'Unknown'}</span>
                                    <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>Edit</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    padding: '6rem 2rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span style={{ fontSize: '3rem', marginBottom: '1rem', display: 'inline-block', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>📖</span>
                    <h3 style={{ color: 'var(--text-color)', fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                        No devotionals found
                    </h3>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
                        {searchQuery || statusFilter !== 'all' ? 'Try adjusting your filters.' : 'Add your first devotional to get started'}
                    </p>
                </div>
            )}

            {showAddModal && <AddDevotionalModal onClose={() => setShowAddModal(false)} onSuccess={() => setRefreshTrigger(prev => prev + 1)} />}

        </div>
    );
};

export default Devotional;
