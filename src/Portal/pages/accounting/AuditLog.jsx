import React from 'react';

const AuditLog = () => {
    const logs = [
        { timestamp: '6/3/2026, 11:18:41 PM', user: 'User #0', table: 'pledge', action: 'create', recordId: '#70', details: '{"date":"2026-06-03","amount":200000,"source":"Public Form","p...' },
        { timestamp: '6/3/2026, 10:53:43 PM', user: 'User #0', table: 'pledge', action: 'create', recordId: '#69', details: '{"date":"2026-06-03","amount":10000,"source":"Public Form","pu...' },
        { timestamp: '5/29/2026, 9:00:23 PM', user: 'User #0', table: 'pledge', action: 'create', recordId: '#68', details: '{"date":"2026-05-29","amount":500,"source":"Public Form","purp...' },
        { timestamp: '5/18/2026, 10:16:22 PM', user: 'User #0', table: 'pledge', action: 'create', recordId: '#67', details: '{"date":"2026-05-18","amount":5000,"source":"Public Form","pur...' },
        { timestamp: '5/18/2026, 6:43:09 PM', user: 'User #0', table: 'pledge', action: 'create', recordId: '#66', details: '{"date":"2026-05-18","amount":35000,"source":"Public Form","pu...' },
        { timestamp: '4/30/2026, 9:51:23 PM', user: 'User #0', table: 'pledge', action: 'create', recordId: '#65', details: '{"date":"2026-04-30","amount":5000,"source":"Public Form","pur...' },
        { timestamp: '4/29/2026, 6:53:11 PM', user: 'User #0', table: 'pledge', action: 'create', recordId: '#64', details: '{"date":"2026-04-29","amount":25000,"source":"Public Form","pu...' },
        { timestamp: '4/27/2026, 10:43:58 PM', user: 'jamesmbugua349@gmail.com', table: 'pledge_redeem', action: 'create', recordId: '#5', details: '{"amount":2000,"pledger":"Purity Nyambura kimani ","pledge_id":...' },
        { timestamp: '4/27/2026, 10:43:46 PM', user: 'jamesmbugua349@gmail.com', table: 'pledge_redeem', action: 'create', recordId: '#4', details: '{"amount":10000,"pledger":"MIRIAM NKIROTE ","pledge_id":14,"p...' },
        { timestamp: '4/27/2026, 10:43:21 PM', user: 'jamesmbugua349@gmail.com', table: 'pledge_redeem', action: 'create', recordId: '#3', details: '{"amount":27500,"pledger":"BENJAMIN KIMANI","pledge_id":12,"...' },
        { timestamp: '4/27/2026, 10:35:30 PM', user: 'jamesmbugua349@gmail.com', table: 'pledge_redeem', action: 'create', recordId: '#2', details: '{"amount":15000,"pledger":"James Kiarie","pledge_id":42,"payme...' },
        { timestamp: '4/27/2026, 9:18:02 PM', user: 'User #0', table: 'pledge', action: 'create', recordId: '#63', details: '{"date":"2026-04-27","amount":35000,"source":"Public Form","pu...' },
        { timestamp: '4/27/2026, 2:28:28 PM', user: 'User #0', table: 'pledge', action: 'create', recordId: '#62', details: '{"date":"2026-04-27","amount":10000,"source":"Public Form","pu...' },
        { timestamp: '4/25/2026, 10:09:40 PM', user: 'User #0', table: 'pledge', action: 'create', recordId: '#61', details: '{"date":"2026-04-25","amount":50000,"source":"Public Form","pu...' },
        { timestamp: '4/25/2026, 4:20:00 PM', user: 'User #0', table: 'pledge', action: 'create', recordId: '#60', details: '{"date":"2026-04-25","amount":10000,"source":"Public Form","pu...' },
        { timestamp: '4/25/2026, 12:07:39 PM', user: 'User #0', table: 'pledge', action: 'create', recordId: '#59', details: '{"date":"2026-04-25","amount":5000,"source":"Public Form","pur...' },
        { timestamp: '4/24/2026, 2:05:19 PM', user: 'jamesmbugua349@gmail.com', table: 'pledge', action: 'create', recordId: '#58', details: '{"date":"2026-04-24","amount":50000,"purpose":"Conference","fu...' },
        { timestamp: '4/6/2026, 10:23:54 PM', user: 'jamesmbugua349@gmail.com', table: 'pledge_redeem', action: 'create', recordId: '#1', details: '{"amount":2000,"pledger":"LEWIS MURIMI MURITHI","pledge_id":...' },
    ];

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '3rem', color: 'var(--text-color)' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    Audit Log
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                    Complete audit trail of all financial transactions and changes.
                </p>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '700' }}>
                    All Tables
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '700' }}>
                    All Actions
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '15%' }}>Timestamp</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '15%' }}>User</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '10%' }}>Table</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '10%' }}>Action</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '10%' }}>Record ID</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '40%' }}>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr key={index} style={{ borderBottom: 'none' }}>
                                <td style={{ padding: '1rem 0', fontWeight: '700' }}>{log.timestamp}</td>
                                <td style={{ padding: '1rem 0', fontWeight: '700' }}>{log.user}</td>
                                <td style={{ padding: '1rem 0', fontWeight: '700' }}>{log.table}</td>
                                <td style={{ padding: '1rem 0' }}>
                                    <span style={{ 
                                        padding: '0.2rem 0.6rem', 
                                        borderRadius: '1rem', 
                                        border: '1px solid rgba(16, 185, 129, 0.3)',
                                        color: '#10b981',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        display: 'inline-block'
                                    }}>
                                        {log.action}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem 0', fontWeight: '700' }}>{log.recordId}</td>
                                <td style={{ padding: '1rem 0', color: 'var(--text-muted)', fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>{log.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuditLog;
