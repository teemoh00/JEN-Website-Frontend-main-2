import React, { useState } from 'react';

const CreateCellModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        cellName: '',
        category: 'General',
        leader: '',
        meetingDay: 'Wednesday',
        time: '06:00 PM',
        location: '',
        maxCapacity: '15'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Cell creation simulated: ' + JSON.stringify(formData));
        onClose();
    };

    const inputStyle = {
        width: '100%',
        padding: '0.5rem 0',
        background: 'transparent',
        border: 'none',
        color: 'var(--text-color)',
        fontSize: '0.9rem',
        marginTop: '0.4rem',
        outline: 'none',
        fontWeight: '600'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        fontWeight: '600'
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
                padding: '2.5rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '480px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.4rem', color: 'var(--text-color)', margin: 0, fontWeight: '700' }}>Create New Cell</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer', padding: 0 }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <label style={labelStyle}>Cell Name</label>
                            <input
                                type="text"
                                name="cellName"
                                value={formData.cellName}
                                onChange={handleChange}
                                placeholder="e.g. Goshen Alpha"
                                style={{ ...inputStyle, color: formData.cellName ? 'white' : 'var(--text-muted)', fontWeight: formData.cellName ? '600' : 'normal' }}
                            />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <label style={labelStyle}>Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                style={{ ...inputStyle, appearance: 'none', color: 'var(--text-color)' }}
                            >
                                <option>General</option>
                                <option>Youth</option>
                                <option>Young Adults</option>
                                <option>Couples</option>
                            </select>
                            <span style={{ position: 'absolute', right: '0', top: '2rem', pointerEvents: 'none', fontSize: '0.8rem', color: 'var(--text-color)', fontWeight: 'bold' }}>v</span>
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Cell Leader</label>
                        <input
                            type="text"
                            name="leader"
                            value={formData.leader}
                            onChange={handleChange}
                            placeholder="Search member..."
                            style={{ ...inputStyle, color: formData.leader ? 'white' : 'var(--text-muted)', fontWeight: formData.leader ? '600' : 'normal' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div style={{ position: 'relative' }}>
                            <label style={labelStyle}>Meeting Day</label>
                            <select
                                name="meetingDay"
                                value={formData.meetingDay}
                                onChange={handleChange}
                                style={{ ...inputStyle, appearance: 'none', color: 'var(--text-color)' }}
                            >
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>
                                <option>Sunday</option>
                            </select>
                            <span style={{ position: 'absolute', right: '0', top: '2rem', pointerEvents: 'none', fontSize: '0.8rem', color: 'var(--text-color)', fontWeight: 'bold' }}>v</span>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <label style={labelStyle}>Time</label>
                            <input
                                type="text"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                style={{ ...inputStyle, color: 'var(--text-color)' }}
                            />
                            <span style={{ position: 'absolute', right: '0', top: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem', opacity: 0.5 }}>🕒</span>
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Location / Area</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. Westlands, Nairobi"
                            style={{ ...inputStyle, color: formData.location ? 'white' : 'var(--text-muted)', fontWeight: formData.location ? '600' : 'normal' }}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Max Capacity</label>
                        <input
                            type="text"
                            name="maxCapacity"
                            value={formData.maxCapacity}
                            onChange={handleChange}
                            style={{ ...inputStyle, color: 'var(--text-color)' }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '0.5rem',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}>Cancel</button>
                        <button type="submit" style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '0.4rem',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'var(--text-color)',
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}>Create Cell</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCellModal;
