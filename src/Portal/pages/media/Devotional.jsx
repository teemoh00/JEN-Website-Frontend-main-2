import React, { useState } from 'react';
import AddDevotionalModal from '../../components/media/AddDevotionalModal';

const Devotional = () => {
    const [showAddModal, setShowAddModal] = useState(false);

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
                    color: 'white',
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
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', lineHeight: 1 }}>0</div>
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
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', lineHeight: 1 }}>0</div>
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
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', lineHeight: 1 }}>0</div>
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
                    placeholder="Search devotionals..."
                    style={{
                        flex: 1,
                        padding: '0.75rem 1rem',
                        background: 'transparent',
                        border: '1px solid var(--border-color)',
                        borderRadius: '0.4rem',
                        color: 'white',
                        outline: 'none',
                        fontSize: '0.9rem'
                    }}
                />
                <select style={{
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.4rem',
                    color: 'white',
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

            {/* Empty State Content */}
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
                <h3 style={{ color: 'white', fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                    No devotionals found
                </h3>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
                    Add your first devotional to get started
                </p>
            </div>

            {showAddModal && <AddDevotionalModal onClose={() => setShowAddModal(false)} />}

        </div>
    );
};

export default Devotional;
