import React from 'react';

const TrialBalance = () => {
    // Data based on the mock image
    const trialBalanceData = [
        { isGroup: true, label: 'Asset' },
        { code: '1000', name: 'Cash on Hand', debit: '2,000.00', credit: '-' },
        { code: '1030', name: 'Online Payments', debit: '54,500.00', credit: '-' },
        { code: '1100', name: 'Pledges Receivable', debit: '384,000.00', credit: '-' },
        { isGroup: true, label: 'Revenue' },
        { code: '4030', name: 'Pledges Revenue', debit: '-', credit: '440,500.00' }
    ];

    const totals = {
        debit: '440,500.00',
        credit: '440,500.00'
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem', color: 'var(--text-color)' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    Trial Balance
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                    Verify that total debits equal total credits across all accounts.
                </p>
            </div>

            {/* Filter Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', fontSize: '0.85rem' }}>
                <input type="date" defaultValue="2026-01-01" style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', outline: 'none', fontFamily: 'inherit', fontWeight: '700' }} />
                <span style={{ color: 'var(--text-muted)' }}>to</span>
                <input type="date" defaultValue="2026-06-17" style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', outline: 'none', fontFamily: 'inherit', fontWeight: '700' }} />
                <button style={{ background: 'transparent', color: 'var(--text-color)', border: 'none', fontWeight: '800', cursor: 'pointer', marginLeft: '0.5rem' }}>Generate</button>
            </div>

            {/* Trial Balance Content Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>Trial Balance</h2>
                <div style={{ 
                    background: 'rgba(16, 185, 129, 0.1)', 
                    color: '#10b981', 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '1rem', 
                    fontSize: '0.8rem', 
                    fontWeight: '600',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                }}>
                    <span>✓</span> Balanced
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '15%' }}>Code</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500', width: '45%' }}>Account Name</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500', textAlign: 'right', width: '20%' }}>Debit (KES)</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500', textAlign: 'right', width: '20%' }}>Credit (KES)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trialBalanceData.map((row, index) => {
                            if (row.isGroup) {
                                return (
                                    <tr key={`group-${index}`}>
                                        <td colSpan="4" style={{ padding: '1.5rem 0 0.5rem 0', fontWeight: '800', fontSize: '0.9rem', color: 'var(--text-color)' }}>
                                            {row.label}
                                        </td>
                                    </tr>
                                );
                            }
                            return (
                                <tr key={row.code} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem 0', fontWeight: '700' }}>{row.code}</td>
                                    <td style={{ padding: '1rem 0' }}>{row.name}</td>
                                    <td style={{ padding: '1rem 0', textAlign: 'right' }}>{row.debit}</td>
                                    <td style={{ padding: '1rem 0', textAlign: 'right' }}>{row.credit}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr style={{ borderTop: '2px solid rgba(255,255,255,0.1)' }}>
                            <td colSpan="2" style={{ padding: '1.5rem 0', fontWeight: '800', fontSize: '0.95rem' }}>TOTALS</td>
                            <td style={{ padding: '1.5rem 0', textAlign: 'right', fontWeight: '800', fontSize: '0.95rem' }}>KES {totals.debit}</td>
                            <td style={{ padding: '1.5rem 0', textAlign: 'right', fontWeight: '800', fontSize: '0.95rem' }}>KES {totals.credit}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default TrialBalance;
