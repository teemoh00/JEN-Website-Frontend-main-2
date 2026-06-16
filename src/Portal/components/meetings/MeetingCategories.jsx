import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import NewCategoryModal from './NewCategoryModal';

const MeetingCategories = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [deletePrompt, setDeletePrompt] = useState({ isOpen: false, categoryId: null, categoryName: '', error: null });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('meetings/categories/');
                setCategories(Array.isArray(response.data) ? response.data : response.data.results || []);
            } catch (error) {
                console.error('Error fetching meeting categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleDelete = (categoryId, categoryName) => {
        setDeletePrompt({ isOpen: true, categoryId, categoryName, error: null });
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`meetings/categories/${deletePrompt.categoryId}/`);
            setCategories(categories.filter(c => c.id !== deletePrompt.categoryId));
            setDeletePrompt({ isOpen: false, categoryId: null, categoryName: '', error: null });
        } catch (error) {
            console.error('Error deleting category:', error);
            setDeletePrompt(prev => ({ ...prev, error: 'Failed to delete category. It may still have meetings assigned to it.' }));
        }
    };

    const getColor = (idx) => {
        const colors = ['var(--primary)', 'var(--secondary)', '#f59e0b', '#ef4444', '#4ade80', '#a855f7'];
        return colors[idx % colors.length];
    };

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--border-color)'
        }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-color)', fontSize: '1rem' }}>Categories</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
                {categories.map((cat, idx) => (
                    <div key={cat.id} style={{
                        background: 'var(--surface-2)',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        borderLeft: `3px solid ${getColor(idx)}`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => handleDelete(cat.id, cat.name)}
                            style={{
                                position: 'absolute',
                                top: '0.5rem',
                                right: '0.5rem',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                            }}
                            title="Delete Category"
                            onMouseOver={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}
                        >
                            ✕
                        </button>
                        <div style={{ color: 'var(--text-color)', fontWeight: '500', fontSize: '0.9rem', paddingRight: '1rem' }}>{cat.name}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>{cat.meeting_count || 0} Meetings</div>
                    </div>
                ))}
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        background: 'transparent',
                        border: '1px dashed rgba(255,255,255,0.2)',
                        borderRadius: '0.75rem',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        minHeight: '70px'
                    }}>
                    + Add New
                </button>
            </div>

            {isModalOpen && <NewCategoryModal onClose={() => setIsModalOpen(false)} />}

            {deletePrompt.isOpen && (
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
                        maxWidth: '400px',
                        border: '1px solid var(--border-color)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        textAlign: 'center',
                        animation: 'fadeIn 0.2s ease-out'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
                        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-color)', margin: '0 0 1rem 0' }}>Delete Category?</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                            Are you sure you want to delete the category <strong style={{ color: 'var(--text-color)' }}>"{deletePrompt.categoryName}"</strong>? This action cannot be undone.
                        </p>

                        {deletePrompt.error && (
                            <div style={{
                                padding: '0.8rem 1rem',
                                borderRadius: '0.75rem',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid #ef4444',
                                color: '#fca5a5',
                                fontSize: '0.85rem',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <span style={{ fontSize: '1.1rem' }}>⚠️</span>
                                <span>{deletePrompt.error}</span>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => setDeletePrompt({ isOpen: false, categoryId: null, categoryName: '', error: null })}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--surface-2)',
                                    color: 'var(--text-color)',
                                    border: '1px solid var(--border-color)',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'background 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.background = 'var(--border-color)'}
                                onMouseOut={(e) => e.target.style.background = 'var(--surface-2)'}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    background: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    transition: 'opacity 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.opacity = '0.9'}
                                onMouseOut={(e) => e.target.style.opacity = '1'}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MeetingCategories;
