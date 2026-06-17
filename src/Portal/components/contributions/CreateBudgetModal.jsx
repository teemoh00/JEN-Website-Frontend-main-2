import React, { useState } from 'react';

const CreateBudgetModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        budgetName: '',
        purpose: ''
    });
    
    const [lineItems, setLineItems] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddItem = () => {
        setLineItems([...lineItems, { description: '', amount: '' }]);
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...lineItems];
        newItems[index][field] = value;
        setLineItems(newItems);
    };

    const handleRemoveItem = (index) => {
        const newItems = lineItems.filter((_, i) => i !== index);
        setLineItems(newItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Budget created!');
        onClose();
    };

    const totalAmount = lineItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

    const inputStyle = {
        width: '100%',
        padding: '0.5rem 0',
        background: 'transparent',
        border: 'none',
        color: 'var(--text-color)',
        fontSize: '0.9rem',
        marginTop: '0.25rem',
        outline: 'none',
        fontWeight: '600'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        fontWeight: '600',
        display: 'block'
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
            zIndex: 1100,
            padding: '1rem'
        }}>
            <div style={{
                background: '#1A1625',
                borderRadius: '0.8rem',
                width: '100%',
                maxWidth: '500px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh'
            }}>
                <div style={{ 
                    padding: '1.5rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexShrink: 0
                }}>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--text-color)', margin: 0, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>📝</span> Create Budget
                    </h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer', padding: 0 }}>×</button>
                </div>

                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', overflowY: 'auto' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        
                        <div>
                            <label style={labelStyle}>Budget Name *</label>
                            <input type="text" name="budgetName" value={formData.budgetName} onChange={handleChange} placeholder="e.g. Q2 2026 Budget" style={inputStyle} required />
                        </div>

                        <div>
                            <label style={labelStyle}>Purpose</label>
                            <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} placeholder="e.g. Operational expenses" style={inputStyle} />
                        </div>

                        {/* Budget Line Items Section */}
                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <label style={labelStyle}>Budget Line Items</label>
                                <button type="button" onClick={handleAddItem} style={{
                                    background: 'var(--primary)',
                                    color: 'var(--text-color)',
                                    border: 'none',
                                    borderRadius: '0.25rem',
                                    padding: '0.3rem 0.6rem',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    cursor: 'pointer'
                                }}>+ Add Item</button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 30px', gap: '1rem', marginBottom: '0.5rem' }}>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Description</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Amount</div>
                                <div></div>
                            </div>

                            {lineItems.map((item, index) => (
                                <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 30px', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <input 
                                        type="text" 
                                        value={item.description} 
                                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                        placeholder="Item desc..."
                                        style={{ ...inputStyle, marginTop: 0, padding: '0.4rem 0', fontSize: '0.85rem' }} 
                                        required
                                    />
                                    <input 
                                        type="number" 
                                        value={item.amount} 
                                        onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                                        placeholder="0"
                                        style={{ ...inputStyle, marginTop: 0, padding: '0.4rem 0', fontSize: '0.85rem' }} 
                                        required
                                    />
                                    <button type="button" onClick={() => handleRemoveItem(index)} style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#ef4444',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        padding: 0
                                    }}>×</button>
                                </div>
                            ))}

                            <div style={{ textAlign: 'right', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>
                                Total: <span style={{ color: 'var(--text-color)' }}>KES {totalAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        <div style={{ marginTop: '0.5rem' }}>
                            <button type="submit" style={{
                                width: '100%',
                                padding: '0.875rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: 'var(--primary)',
                                color: 'var(--text-color)',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontSize: '0.95rem'
                            }}>Create Budget</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBudgetModal;
