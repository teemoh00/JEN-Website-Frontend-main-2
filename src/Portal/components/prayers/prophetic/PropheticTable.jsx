import React from 'react';

const PropheticTable = () => {
    // Dummy Data matching the image
    const instructions = [
        { id: 1, title: 'Instructions on The December Conference', purpose: 2, date: '2025-08-14', status: 'Not Fulfilled' },
        { id: 2, title: 'Instructions on The December Conference', purpose: 2, date: '2025-08-14', status: 'Not Fulfilled' },
        { id: 3, title: 'Purpose', purpose: 1, date: '2025-05-11', status: 'Not Fulfilled' },
    ];

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
                        {instructions.map((item, index) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)', height: '70px' }} className="table-row-hover">
                                <td style={cellStyle}>
                                    <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)' }}>
                                        <span style={{ cursor: 'pointer' }}>⚙️</span>
                                        <span style={{ cursor: 'pointer' }}>⋮</span>
                                    </div>
                                </td>
                                <td className="prophetic-id-cell" style={{ ...cellStyle, fontWeight: '700' }}>{item.id}</td>
                                <td className="prophetic-title-cell" style={cellStyle}>{item.title}</td>
                                <td style={cellStyle}>{item.purpose}</td>
                                <td style={cellStyle}>{item.date}</td>
                                <td style={cellStyle}>
                                    <span style={{ color: 'var(--text-muted)' }}>{item.status}</span>
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
