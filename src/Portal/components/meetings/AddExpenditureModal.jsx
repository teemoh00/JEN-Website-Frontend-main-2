import React, { useState } from 'react';
import axios from '../../../api/axios';

const AddExpenditureModal = ({ budgetItemId, onClose, onAdd }) => {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState('kgs');
    const [pricePerUnit, setPricePerUnit] = useState('');
    const [vendor, setVendor] = useState('');
    const [dateIncurred, setDateIncurred] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);

    const totalAmount = (parseFloat(quantity || 0) * parseFloat(pricePerUnit || 0)).toFixed(2);

    const handleSubmit = async () => {
        if (!description || !quantity || !pricePerUnit) {
            return alert("Description, quantity, and price per unit are required.");
        }

        setLoading(true);
        try {
            await axios.post('events/budgets/items/expenditures/', {
                budget_item_id: budgetItemId,
                description: description,
                quantity: parseFloat(quantity),
                unit: unit,
                price_per_unit: parseFloat(pricePerUnit),
                vendor: vendor,
                date_incurred: dateIncurred
            });
            onAdd();
            onClose();
        } catch (err) {
            console.error('Failed to add expenditure:', err);
            alert('Failed to add expenditure');
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
                <h2 style={{ margin: '0 0 2rem 0', color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: '800' }}>Add Expenditure</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Description */}
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Description *</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Receipt #405 - Water Bottles" style={{
                            width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                        }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Quantity *</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="e.g. 50" min="0.01" step="0.01" style={{
                                    width: '70%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                                }} />
                                <select value={unit} onChange={(e) => setUnit(e.target.value)} style={{
                                    width: '30%', padding: '0.8rem 0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box', appearance: 'none', cursor: 'pointer'
                                }}>
                                    <option value="kgs" style={{ background: '#1a1a24' }}>kgs</option>
                                    <option value="pcs" style={{ background: '#1a1a24' }}>pcs</option>
                                    <option value="liters" style={{ background: '#1a1a24' }}>liters</option>
                                    <option value="packs" style={{ background: '#1a1a24' }}>packs</option>
                                    <option value="boxes" style={{ background: '#1a1a24' }}>boxes</option>
                                    <option value="days" style={{ background: '#1a1a24' }}>days</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Price per Unit *</label>
                            <input type="number" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} placeholder="e.g. 100" min="0" step="0.01" style={{
                                width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                            }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'flex-end' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Vendor (Optional)</label>
                            <input type="text" value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="Supplier name" style={{
                                width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                            }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Date Incurred *</label>
                            <input type="date" value={dateIncurred} onChange={(e) => setDateIncurred(e.target.value)} style={{
                                width: '100%', padding: '0.8rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box'
                            }} />
                        </div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase' }}>Total Amount:</span>
                        <span style={{ color: '#ef4444', fontSize: '1.2rem', fontWeight: '800' }}>KES {parseFloat(totalAmount).toLocaleString()}</span>
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
                            {loading ? 'Adding...' : 'Add Expense'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddExpenditureModal;
