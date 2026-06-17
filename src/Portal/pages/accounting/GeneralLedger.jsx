import React, { useState } from 'react';

const GeneralLedger = () => {
    const [selectedAccount, setSelectedAccount] = useState(null);

    const accounts = [
        { code: '1000', name: 'Cash on Hand', type: 'Asset' },
        { code: '1010', name: 'Bank Account - Main', type: 'Asset' },
        { code: '1020', name: 'M-Pesa Float', type: 'Asset' },
        { code: '1030', name: 'Online Payments', type: 'Asset' },
        { code: '1100', name: 'Pledges Receivable', type: 'Asset' },
        { code: '1200', name: 'Prepaid Expenses', type: 'Asset' },
        { code: '2000', name: 'Accounts Payable', type: 'Liability' },
        { code: '2010', name: 'Salaries Payable', type: 'Liability' },
        { code: '2020', name: 'Taxes Payable', type: 'Liability' },
        { code: '3000', name: 'General Fund Balance', type: 'Equity' },
        { code: '3010', name: 'Building Fund Balance', type: 'Equity' },
        { code: '3020', name: 'Missions Fund Balance', type: 'Equity' },
        { code: '3030', name: 'Youth Fund Balance', type: 'Equity' },
        { code: '3100', name: 'Retained Surplus', type: 'Equity' },
        { code: '4000', name: 'Tithes', type: 'Revenue' },
        { code: '4010', name: 'Offerings', type: 'Revenue' },
        { code: '4020', name: 'Donations', type: 'Revenue' },
        { code: '4030', name: 'Pledges Revenue', type: 'Revenue' },
        { code: '4040', name: 'Event Registration Fees', type: 'Revenue' },
        { code: '4050', name: 'Welfare Offerings', type: 'Revenue' },
        { code: '4060', name: 'Partnership Income', type: 'Revenue' },
        { code: '4070', name: 'Interest Income', type: 'Revenue' },
        { code: '4080', name: 'Other Income', type: 'Revenue' },
        { code: '5000', name: 'Ministry Expenses', type: 'Expense' },
        { code: '5010', name: 'Rent & Utilities', type: 'Expense' },
        { code: '5020', name: 'Salaries & Wages', type: 'Expense' },
        { code: '5030', name: 'Event Expenses', type: 'Expense' },
        { code: '50301', name: 'Event - Miscellaneous', type: 'Expense' },
        { code: '5031', name: 'Event - Venue & Facilities', type: 'Expense' },
        { code: '5032', name: 'Event - Catering', type: 'Expense' },
        { code: '5033', name: 'Event - Transport & Logistics', type: 'Expense' },
        { code: '5034', name: 'Event - Sound & AV', type: 'Expense' },
        { code: '5035', name: 'Event - Printing & Stationery', type: 'Expense' },
        { code: '5036', name: 'Event - Decoration', type: 'Expense' },
        { code: '5037', name: 'Event - Speaker Honorarium', type: 'Expense' },
        { code: '5038', name: 'Event - Marketing & Publicity', type: 'Expense' },
        { code: '5039', name: 'Event - Accommodation', type: 'Expense' },
        { code: '5040', name: 'Transport & Travel', type: 'Expense' },
        { code: '5050', name: 'Office & Supplies', type: 'Expense' },
        { code: '5060', name: 'Communication', type: 'Expense' },
        { code: '5070', name: 'Cleaning & Maintenance', type: 'Expense' },
        { code: '5080', name: 'Missions & Outreach', type: 'Expense' },
        { code: '5090', name: 'Benevolence & Welfare', type: 'Expense' },
        { code: '5100', name: 'Equipment & Assets', type: 'Expense' },
        { code: '5110', name: 'Professional Services', type: 'Expense' },
        { code: '5120', name: 'Bank Charges', type: 'Expense' },
        { code: '5130', name: 'Depreciation', type: 'Expense' },
        { code: '5140', name: 'Other Expenses', type: 'Expense' }
    ];

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '3rem', color: 'var(--text-color)', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    General Ledger
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                    View transaction history and running balances for each account.
                </p>
            </div>

            <div style={{ display: 'flex', flex: 1, gap: '2rem' }}>
                {/* Left Column: Accounts List */}
                <div style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '1rem' }}>Accounts</div>
                    
                    {/* Scrollable list container */}
                    <div style={{ 
                        flex: 1,
                        overflowY: 'auto',
                        maxHeight: '600px',
                        paddingRight: '0.5rem'
                    }} className="ledger-scroll">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {accounts.map(acc => (
                                <div 
                                    key={acc.code}
                                    onClick={() => setSelectedAccount(acc)}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        background: selectedAccount?.code === acc.code ? 'var(--border-color)' : 'transparent',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                                        {acc.code} — {acc.name}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        {acc.type}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Ledger View */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {selectedAccount ? (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.3s ease-out' }}>
                            {/* Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem', color: 'var(--text-color)' }}>
                                        {selectedAccount.code} — {selectedAccount.name}
                                    </h2>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        {selectedAccount.type} | {['Asset', 'Expense'].includes(selectedAccount.type) ? 'Debit' : 'Credit'} balance
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                                    <input type="date" defaultValue="2026-01-01" style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', outline: 'none', fontFamily: 'inherit', fontWeight: '600' }} />
                                    <span style={{ color: 'var(--text-muted)' }}>to</span>
                                    <input type="date" defaultValue="2026-06-17" style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', outline: 'none', fontFamily: 'inherit', fontWeight: '600' }} />
                                    <button style={{ background: 'transparent', color: 'var(--text-color)', border: 'none', fontWeight: '700', cursor: 'pointer', marginLeft: '0.5rem' }}>Apply</button>
                                </div>
                            </div>

                            {/* Summary Row */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Opening</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-color)' }}>KES 0.00</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Debits</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-color)' }}>KES 0.00</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Credits</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-color)' }}>KES 0.00</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Closing</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-color)' }}>KES 0.00</div>
                                </div>
                            </div>

                            {/* Table */}
                            <div style={{ flex: 1, overflowX: 'auto', marginTop: '1rem' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                                    <thead>
                                        <tr style={{ color: 'var(--text-muted)' }}>
                                            <th style={{ padding: '0.75rem 0', fontWeight: '500' }}>Date</th>
                                            <th style={{ padding: '0.75rem 0', fontWeight: '500' }}>Reference</th>
                                            <th style={{ padding: '0.75rem 0', fontWeight: '500' }}>Description</th>
                                            <th style={{ padding: '0.75rem 0', fontWeight: '500' }}>Debit</th>
                                            <th style={{ padding: '0.75rem 0', fontWeight: '500' }}>Credit</th>
                                            <th style={{ padding: '0.75rem 0', fontWeight: '500', textAlign: 'right' }}>Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                                                No transactions in this period
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                            Select an account to view its ledger
                        </div>
                    )}
                </div>
            </div>
            
            <style>{`
                /* Custom Scrollbar for Ledger List to match mockups */
                .ledger-scroll::-webkit-scrollbar {
                    width: 8px;
                }
                .ledger-scroll::-webkit-scrollbar-track {
                    background: var(--border-color);
                    border-radius: 4px;
                }
                .ledger-scroll::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 4px;
                }
                .ledger-scroll::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </div>
    );
};

export default GeneralLedger;
