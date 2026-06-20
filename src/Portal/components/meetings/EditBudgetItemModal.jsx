import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';

const EditBudgetItemModal = ({ item, onClose, onUpdate }) => {
    const [category, setCategory] = useState(item?.category || '');
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [description, setDescription] = useState(item?.description || '');
    const [estimatedAmount, setEstimatedAmount] = useState(item?.estimated_amount || '');
    const [vendor, setVendor] = useState(item?.vendor || '');
    const [loading, setLoading] = useState(false);

    // Categories list based on what we had before
    const defaultCategories = ['Venue', 'Catering', 'Marketing', 'Logistics', 'Speaker Fees', 'Technology', 'Decorations', 'Miscellaneous'];

    const handleSubmit = async () => {
        const finalCategory = isNewCategory ? newCategory : category;
        if (!finalCategory || !description || !estimatedAmount) {
            return alert("Category, description, and estimated amount are required.");
        }

        setLoading(true);
        try {
            await axios.put('events/budgets/items/', {
                id: item.id,
                category: finalCategory,
                description: description,
                estimated_amount: parseFloat(estimatedAmount),
                vendor: vendor
            });
            onUpdate();
            onClose();
        } catch (err) {
            console.error('Failed to update item:', err);
            alert('Failed to update budget item');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: '#1a1a24',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '500px',
                padding: '2.5rem 2rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <h2 style={{ margin: '0 0 2rem 0', color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: '800' }}>Edit Budget Item</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Category */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase' }}>Category *</label>
                            <label style={{ color: 'var(--text-muted)', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <input type="checkbox" checked={isNewCategory} onChange={(e) => setIsNewCategory(e.target.checked)} />
                                Custom Category
                            </label>
                        </div>
                        {isNewCategory ? (
                            <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Enter new category" style={{
                                width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                            }} />
                        ) : (
                            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{
                                width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box', appearance: 'none', cursor: 'pointer'
                            }}>
                                <option value="" style={{ background: '#1a1a24' }}>Select a category</option>
                                {defaultCategories.map(cat => (
                                    <option key={cat} value={cat} style={{ background: '#1a1a24' }}>{cat}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Description *</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Lunch for 50 people" style={{
                            width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                        }} />
                    </div>

                    {/* Amount & Vendor */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Estimated Amount *</label>
                            <input type="number" value={estimatedAmount} onChange={(e) => setEstimatedAmount(e.target.value)} placeholder="e.g. 50000" style={{
                                width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                            }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Vendor (Optional)</label>
                            <input type="text" value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="Supplier name" style={{
                                width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                            }} />
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button onClick={onClose} disabled={loading} style={{
                            background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-color)', padding: '0.6rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer'
                        }}>
                            Cancel
                        </button>
                        <button onClick={handleSubmit} disabled={loading} style={{
                            background: '#7c3aed', color: 'var(--text-color)', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', opacity: loading ? 0.7 : 1
                        }}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBudgetItemModal;
