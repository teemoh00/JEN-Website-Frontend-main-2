import React, { useState } from 'react';

const AddBudgetItemModal = ({ onClose }) => {
    const [isNewCategory, setIsNewCategory] = useState(false);

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
                <h2 style={{ margin: '0 0 2rem 0', color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: '800' }}>Add Budget Item</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Row 1: Category & Estimated Amount */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <label style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', textTransform: 'capitalize', margin: 0 }}>Category *</label>
                                <span onClick={() => setIsNewCategory(!isNewCategory)} style={{ color: '#0ea5e9', fontSize: '0.7rem', fontWeight: '600', cursor: 'pointer' }}>
                                    {isNewCategory ? 'Cancel' : '+ Add New'}
                                </span>
                            </div>
                            <div style={{ position: 'relative', height: '2.5rem', display: 'flex', alignItems: 'center' }}>
                                {isNewCategory ? (
                                    <input type="text" placeholder="e.g. Travel" style={{
                                        width: '100%', padding: '0 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', height: '100%', boxSizing: 'border-box'
                                    }} />
                                ) : (
                                    <>
                                        <select style={{
                                            width: '100%', padding: '0 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', appearance: 'none', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', height: '100%', boxSizing: 'border-box'
                                        }}>
                                            <option value="Miscellaneous" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Miscellaneous</option>
                                            <option value="Venue" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Venue</option>
                                            <option value="Catering" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Catering</option>
                                            <option value="Equipment" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Equipment</option>
                                            <option value="Marketing" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Marketing</option>
                                        </select>
                                        <span style={{ position: 'absolute', right: '1rem', pointerEvents: 'none', color: 'var(--text-color)', fontSize: '0.8rem' }}>▼</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'capitalize' }}>Estimated Amount (KES) *</label>
                            <input type="number" defaultValue="0" style={{
                                width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                            }} />
                        </div>
                    </div>

                    {/* Row 2: Description */}
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'capitalize' }}>Description *</label>
                        <input type="text" placeholder="e.g. Main venue hire for 3 days" style={{
                            width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                        }} />
                    </div>

                    {/* Row 3: Vendor & Notes */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'capitalize' }}>Vendor</label>
                            <input type="text" placeholder="Supplier name" style={{
                                width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                            }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'capitalize' }}>Notes</label>
                            <input type="text" placeholder="Optional" style={{
                                width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                            }} />
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button onClick={onClose} style={{
                            background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-color)', padding: '0.6rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer'
                        }}>
                            Cancel
                        </button>
                        <button onClick={onClose} style={{
                            background: '#7c3aed', color: 'var(--text-color)', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer'
                        }}>
                            Add Item
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBudgetItemModal;
