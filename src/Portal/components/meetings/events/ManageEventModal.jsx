import React, { useState } from 'react';

const ManageEventModal = ({ event, onClose, onUpdate }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [formData, setFormData] = useState({ ...event });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSave = () => {
        onUpdate(formData);
        onClose();
    };

    const copyLink = () => {
        const url = `${window.location.origin}/events/${event.id}/register`;
        navigator.clipboard.writeText(url);
        alert('Registration link copied to clipboard!');
    };

    const exportToCSV = () => {
        if (!event.registrations || event.registrations.length === 0) return;

        const headers = ['Name', 'Email', 'Phone', 'Date Registered'];
        const rows = event.registrations.map(reg => [
            reg.full_name,
            reg.email,
            reg.phone_number,
            new Date(reg.registered_at).toLocaleDateString()
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `registrants_${event.name.replace(/\s+/g, '_')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToPDF = () => {
        const printWindow = window.open('', '_blank');
        const content = `
            <html>
                <head>
                    <title>Registrants - ${event.name}</title>
                    <style>
                        body { font-family: sans-serif; padding: 20px; }
                        h1 { color: #22c1e6; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <h1>Registrants: ${event.name}</h1>
                    <p>Total Registrants: ${event.registrations?.length || 0}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Date Registered</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${event.registrations.map(reg => `
                                <tr>
                                    <td>${reg.full_name}</td>
                                    <td>${reg.email}</td>
                                    <td>${reg.phone_number}</td>
                                    <td>${new Date(reg.registered_at).toLocaleDateString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `;
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.print();
    };

    const tabStyle = (isActive) => ({
        padding: '0.75rem 1.5rem',
        cursor: 'pointer',
        borderBottom: isActive ? '2px solid #22c1e6' : '2px solid transparent',
        color: isActive ? 'var(--text-color)' : 'var(--text-muted)',
        background: 'transparent',
        border: 'none',
        fontSize: '1rem',
        fontWeight: '600'
    });

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        background: 'var(--bg-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '0.5rem',
        color: 'var(--text-color)',
        fontSize: '0.9rem',
        marginTop: '0.4rem'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        fontWeight: '500'
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
            <div className="manage-event-modal-content" style={{
                background: 'var(--surface-1)',
                padding: '2rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '700px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                <style>{`
                    @media (max-width: 640px) {
                        .manage-event-modal-content {
                            padding: 1.25rem !important;
                            width: 95% !important;
                            max-height: 85vh !important;
                        }
                        .modal-title {
                            font-size: 1.1rem !important;
                        }
                        .modal-tabs {
                            margin-bottom: 1rem !important;
                        }
                        .modal-tab-btn {
                            padding: 0.5rem 0.75rem !important;
                            font-size: 0.85rem !important;
                        }
                        .modal-grid-2 {
                            grid-template-columns: 1fr !important;
                            gap: 0.75rem !important;
                        }
                        .modal-input {
                            padding: 0.6rem !important;
                            font-size: 0.85rem !important;
                        }
                    }
                `}</style>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 className="modal-title" style={{ fontSize: '1.5rem', color: 'var(--text-color)', margin: 0 }}>Manage Event: {event.name}</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <div className="modal-tabs" style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                    <button className="modal-tab-btn" style={tabStyle(activeTab === 'overview')} onClick={() => setActiveTab('overview')}>Overview</button>
                    <button className="modal-tab-btn" style={tabStyle(activeTab === 'registration')} onClick={() => setActiveTab('registration')}>Registration</button>
                    <button className="modal-tab-btn" style={tabStyle(activeTab === 'registrants')} onClick={() => setActiveTab('registrants')}>Registrants ({event.registrations?.length || 0})</button>
                </div>

                {activeTab === 'overview' && (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Event Name</label>
                            <input className="modal-input" type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} />
                        </div>
                        <div className="modal-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={labelStyle}>Date</label>
                                <input className="modal-input" type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Time</label>
                                <input className="modal-input" type="time" name="time" value={formData.time} onChange={handleChange} style={inputStyle} />
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Location</label>
                            <input className="modal-input" type="text" name="location" value={formData.location} onChange={handleChange} style={inputStyle} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                            <button onClick={handleSave} style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: 'var(--primary)',
                                color: 'var(--bg-color)',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}>Save Changes</button>
                        </div>
                    </div>
                )}

                {activeTab === 'registration' && (
                    <div>
                        <div style={{ background: 'rgba(34, 193, 230, 0.1)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid rgba(34, 193, 230, 0.2)' }}>
                            <h4 style={{ color: 'var(--primary)', margin: '0 0 0.5rem 0' }}>Shareable Link</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Share this link with attendees to let them register for the event.</p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input className="modal-input" type="text" value={`${window.location.origin}/events/${event.id}/register`} readOnly style={{ ...inputStyle, marginTop: 0 }} />
                                <button onClick={copyLink} style={{
                                    background: 'var(--primary)',
                                    color: 'var(--bg-color)',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    padding: '0 1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}>Copy</button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <label style={{ color: 'var(--text-color)', fontWeight: '500' }}>Registration Status: </label>
                            <select className="modal-input" name="status" value={formData.status} onChange={handleChange} style={{ ...inputStyle, width: 'auto', marginTop: 0 }}>
                                <option value="Upcoming">Upcoming (Closed)</option>
                                <option value="Registration Open">Open</option>
                                <option value="Closed">Closed</option>
                            </select>
                            <button onClick={handleSave} style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: 'var(--primary)',
                                color: 'var(--bg-color)',
                                fontWeight: '600',
                                cursor: 'pointer',
                                marginLeft: 'auto'
                            }}>Update Status</button>
                        </div>
                    </div>
                )}

                {activeTab === 'registrants' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <button
                                onClick={exportToCSV}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #10b981',
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    color: '#10b981',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                📊 Export Excel
                            </button>
                            <button
                                onClick={exportToPDF}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #ef4444',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                📄 Export PDF
                            </button>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-color)', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                                        <th style={{ padding: '0.75rem' }}>Name</th>
                                        <th style={{ padding: '0.75rem' }}>Email</th>
                                        <th style={{ padding: '0.75rem' }}>Phone</th>
                                        <th style={{ padding: '0.75rem' }}>Date Registered</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {event.registrations && event.registrations.length > 0 ? (
                                        event.registrations.map((reg, index) => (
                                            <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                <td style={{ padding: '0.75rem' }}>{reg.full_name}</td>
                                                <td style={{ padding: '0.75rem' }}>{reg.email}</td>
                                                <td style={{ padding: '0.75rem' }}>{reg.phone_number}</td>
                                                <td style={{ padding: '0.75rem' }}>{new Date(reg.registered_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No registrations yet.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageEventModal;
