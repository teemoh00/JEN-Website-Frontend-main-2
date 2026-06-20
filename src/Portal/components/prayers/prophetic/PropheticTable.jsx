import React, { useState, useEffect } from 'react';
import api from '../../../../api/axios';

const PropheticTable = () => {
    const [instructions, setInstructions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstructions = async () => {
            try {
                const response = await api.get('prayers/prophetic');
                setInstructions(response.data);
            } catch (err) {
                console.error("Error fetching prophetic instructions", err);
            } finally {
                setLoading(false);
            }
        };
        fetchInstructions();
    }, []);

    return (
        <div className="prophetic-table-wrapper" style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            border: '1px solid var(--border-color)',
            overflow: 'hidden'
        }}>
            <style>{`
                @media (max-width: 768px) {
                    .prophetic-table th, 
                    .prophetic-table td {
                        padding: 0.75rem 1rem !important;
                        font-size: 0.75rem !important;
                    }
                    .prophetic-table th {
                        font-size: 0.65rem !important;
                    }
                    .prophetic-id-cell {
                        width: 30px !important;
                    }
                    .prophetic-title-cell {
                        width: auto !important;
                        max-width: 150px !important;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            `}</style>
            <div style={{ overflowX: 'auto' }}>
                <table className="prophetic-table" style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-color)' }}>
                    <thead>
                        <tr style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border-color)' }}>
                            <th style={headerStyle}>ACTION</th>
                            <th className="prophetic-id-cell" style={{ ...headerStyle, width: '50px' }}>#</th>
                            <th className="prophetic-title-cell" style={{ ...headerStyle, width: '40%' }}>TITLE</th>
                            <th style={headerStyle}>PURPOSE</th>
                            <th style={headerStyle}>DATE</th>
                            <th style={headerStyle}>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading...</td></tr>
                        ) : instructions.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No prophetic instructions found</td></tr>
                        ) : instructions.map((item, index) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)', height: '70px' }} className="table-row-hover">
                                <td style={cellStyle}>
                                    <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)' }}>
                                        <span style={{ cursor: 'pointer' }}>⚙️</span>
                                        <span style={{ cursor: 'pointer' }}>⋮</span>
                                    </div>
                                </td>
                                <td className="prophetic-id-cell" style={{ ...cellStyle, fontWeight: '700' }}>{item.id}</td>
                                <td className="prophetic-title-cell" style={cellStyle}>{item.title}</td>
                                <td style={cellStyle}>{item.purpose || 'General'}</td>
                                <td style={cellStyle}>{new Date(item.date).toLocaleDateString()}</td>
                                <td style={cellStyle}>
                                    <span style={{ color: item.status === 'Fulfilled' ? '#22c55e' : 'var(--text-muted)' }}>{item.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Styles
const headerStyle = {
    padding: '1.5rem',
    textAlign: 'left',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
};

const cellStyle = {
    padding: '1.5rem',
    fontSize: '0.9rem',
    color: 'var(--text-color)',
    fontWeight: '500'
};

export default PropheticTable;
