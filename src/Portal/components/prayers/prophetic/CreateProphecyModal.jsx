import React, { useState } from 'react';
import api from '../../../../api/axios';

const CreateProphecyModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        purpose: '',
        date: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('prayers/prophetic', {
                title: formData.title,
                purpose: formData.purpose,
                date: formData.date
            });
            alert('Prophetic instruction added successfully!');
            onClose();
        } catch (error) {
            console.error('Error creating prophecy', error);
            alert('Failed to create prophecy');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '0.5rem 0',
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--border-color)',
        color: 'var(--text-color)',
        fontSize: '0.9rem',
        marginTop: '0.4rem',
        outline: 'none'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        fontWeight: '600'
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100
        }}>
            <div style={{
                background: 'var(--surface-1)', padding: '2.5rem', borderRadius: '1rem',
                width: '100%', maxWidth: '520px', border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.4rem', color: 'var(--text-color)', margin: 0, fontWeight: '700' }}>New Prophecy / Instruction</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={labelStyle}>Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} style={inputStyle} required />
                    </div>
                    <div>
                        <label style={labelStyle}>Purpose</label>
                        <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Date Received</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} required />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '0.5rem 1rem', border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer'
                        }}>Cancel</button>
                        <button type="submit" disabled={loading} style={{
                            padding: '0.6rem 1.2rem', borderRadius: '0.4rem', border: 'none',
                            background: 'var(--primary)', color: 'white', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer'
                        }}>{loading ? 'Saving...' : 'Save Instruction'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProphecyModal;
