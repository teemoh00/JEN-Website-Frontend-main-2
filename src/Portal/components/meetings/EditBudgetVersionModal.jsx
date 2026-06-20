import React, { useState } from 'react';
import axios from '../../../api/axios';

const EditBudgetVersionModal = ({ budget, onClose, onUpdate }) => {
    const [name, setName] = useState(budget?.name || '');
    const [notes, setNotes] = useState(budget?.notes || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!name) return alert("Budget name is required.");

        setLoading(true);
        try {
            await axios.put('events/budgets/', {
                id: budget.id,
                name: name,
                notes: notes
            });
            onUpdate();
            onClose();
        } catch (err) {
            console.error('Failed to update budget version:', err);
            alert('Failed to update budget version');
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
                <h2 style={{ margin: '0 0 2rem 0', color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: '800' }}>Edit Budget Properties</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Version Name *</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Pre-Event Draft" style={{
                            width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                        }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Notes (Optional)</label>
                        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" placeholder="Any internal notes for this budget..." style={{
                            width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box', resize: 'vertical'
                        }}></textarea>
                    </div>

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

export default EditBudgetVersionModal;
