import React from 'react';

const Contributions = () => {
    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '3rem' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    Contributions
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                    Track and manage member contributions, tithes, and offerings.
                </p>
            </div>

            {/* Main Content Area */}
            <div style={{ background: 'transparent' }}>
                {/* Filters Row */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '2rem' 
                }}>
                    <h2 style={{ fontSize: '1.1rem', color: 'var(--text-color)', margin: 0, fontWeight: '700' }}>
                        Contributions
                    </h2>
                    
                    <input 
                        type="text" 
                        placeholder="Search contributions..." 
                        style={{
                            padding: '0.5rem',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-color)',
                            outline: 'none',
                            fontSize: '0.85rem',
                            minWidth: '200px'
                        }}
                    />
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ color: 'var(--primary)', fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: 'none' }}>
                                <th style={{ padding: '1rem 0', fontWeight: '600', color: '#60a5fa' }}>Date</th>
                                <th style={{ padding: '1rem 0', fontWeight: '600', color: '#60a5fa' }}>Member</th>
                                <th style={{ padding: '1rem 0', fontWeight: '600', color: '#60a5fa' }}>Type</th>
                                <th style={{ padding: '1rem 0', fontWeight: '600', color: '#60a5fa' }}>Fund</th>
                                <th style={{ padding: '1rem 0', fontWeight: '600', color: '#60a5fa' }}>Amount</th>
                                <th style={{ padding: '1rem 0', fontWeight: '600', color: '#60a5fa' }}>Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="6" style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No contributions found
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginTop: '2rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)'
                }}>
                    <div>Page 1 of 1 (0 total)</div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <span style={{ cursor: 'pointer', opacity: 0.5 }}>&lt; Prev</span>
                        <span style={{ cursor: 'pointer', opacity: 0.5 }}>Next &gt;</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contributions;
