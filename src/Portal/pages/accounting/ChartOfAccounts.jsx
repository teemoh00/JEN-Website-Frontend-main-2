import React, { useState } from 'react';

const ChartOfAccounts = () => {
    const [activeTab, setActiveTab] = useState('All');

    const accounts = [
        { code: '1000', name: 'Cash on Hand', desc: 'Physical cash held by the church', type: 'Asset', normalBalance: 'Debit', status: 'Active' },
        { code: '1010', name: 'Bank Account - Main', desc: 'Primary bank account', type: 'Asset', normalBalance: 'Debit', status: 'Active' },
        { code: '1020', name: 'M-Pesa Float', desc: 'Mobile money account (Till 3548432)', type: 'Asset', normalBalance: 'Debit', status: 'Active' },
        { code: '1030', name: 'Online Payments', desc: 'Online payment gateway balance', type: 'Asset', normalBalance: 'Debit', status: 'Active' },
        { code: '1100', name: 'Pledges Receivable', desc: 'Outstanding pledges from members', type: 'Asset', normalBalance: 'Debit', status: 'Active' },
        { code: '1200', name: 'Prepaid Expenses', desc: 'Expenses paid in advance', type: 'Asset', normalBalance: 'Debit', status: 'Active' },
        { code: '2000', name: 'Accounts Payable', desc: 'Amounts owed to suppliers/vendors', type: 'Liability', normalBalance: 'Credit', status: 'Active' },
        { code: '2010', name: 'Salaries Payable', desc: 'Accrued salaries pending payment', type: 'Liability', normalBalance: 'Credit', status: 'Active' },
        { code: '2020', name: 'Taxes Payable', desc: 'Tax obligations', type: 'Liability', normalBalance: 'Credit', status: 'Active' },
        { code: '3000', name: 'General Fund Balance', desc: 'Unrestricted net assets', type: 'Equity', normalBalance: 'Credit', status: 'Active' },
    ];

    const stats = [
        { label: 'Asset', count: 6, color: '#34d399' },
        { label: 'Liability', count: 3, color: '#f87171' },
        { label: 'Equity', count: 5, color: '#a78bfa' },
        { label: 'Revenue', count: 9, color: '#60a5fa' },
        { label: 'Expense', count: 25, color: '#fbbf24' }
    ];

    const tabs = ['All', 'Asset', 'Liability', 'Equity', 'Revenue', 'Expense'];

    const getTypeColor = (type) => {
        switch (type) {
            case 'Asset': return { color: '#34d399', bg: 'rgba(52, 211, 153, 0.1)' };
            case 'Liability': return { color: '#f87171', bg: 'rgba(248, 113, 113, 0.1)' };
            case 'Equity': return { color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.1)' };
            case 'Revenue': return { color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.1)' };
            case 'Expense': return { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)' };
            default: return { color: 'var(--text-color)', bg: 'rgba(255, 255, 255, 0.1)' };
        }
    };

    const filteredAccounts = activeTab === 'All' ? accounts : accounts.filter(acc => acc.type === activeTab);

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '3rem', color: 'var(--text-color)' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    Chart of Accounts
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                    Manage your organization's accounts for double-entry bookkeeping.
                </p>
            </div>

            {/* Stats Row */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(5, 1fr)', 
                gap: '1rem', 
                marginBottom: '3rem' 
            }}>
                {stats.map((stat, idx) => (
                    <div key={idx} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: stat.color, marginBottom: '0.25rem' }}>{stat.count}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Filters Row */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '1.5rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '1rem'
            }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    {tabs.map(tab => (
                        <div 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{ 
                                fontSize: '0.85rem', 
                                fontWeight: activeTab === tab ? '700' : '500', 
                                color: activeTab === tab ? 'white' : 'var(--text-muted)',
                                cursor: 'pointer',
                                transition: 'color 0.2s',
                                paddingBottom: '1rem',
                                marginBottom: '-1rem',
                                borderBottom: activeTab === tab ? '2px solid white' : '2px solid transparent'
                            }}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
                <button style={{ 
                    background: 'transparent', 
                    color: 'var(--text-color)', 
                    border: 'none', 
                    fontSize: '0.85rem', 
                    fontWeight: '600', 
                    cursor: 'pointer' 
                }}>
                    + Add Account
                </button>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-muted)', fontSize: '0.8rem', borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '1rem 0', fontWeight: '500' }}>Code</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500' }}>Account Name</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500' }}>Type</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500' }}>Normal Balance</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500' }}>Status</th>
                            <th style={{ padding: '1rem 0', fontWeight: '500' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAccounts.map((acc, index) => {
                            const typeStyle = getTypeColor(acc.type);
                            return (
                                <tr key={index} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                                    <td style={{ padding: '1.25rem 0', fontWeight: '700' }}>{acc.code}</td>
                                    <td style={{ padding: '1.25rem 0' }}>
                                        <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{acc.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{acc.desc}</div>
                                    </td>
                                    <td style={{ padding: '1.25rem 0' }}>
                                        <span style={{ 
                                            display: 'inline-block',
                                            padding: '0.25rem 0.75rem', 
                                            borderRadius: '1rem', 
                                            background: typeStyle.bg, 
                                            color: typeStyle.color,
                                            fontSize: '0.75rem',
                                            fontWeight: '600'
                                        }}>
                                            {acc.type}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem 0' }}>{acc.normalBalance}</td>
                                    <td style={{ padding: '1.25rem 0' }}>
                                        <span style={{ 
                                            display: 'inline-block',
                                            padding: '0.25rem 0.75rem', 
                                            borderRadius: '1rem', 
                                            background: 'rgba(52, 211, 153, 0.1)', 
                                            color: '#34d399',
                                            border: '1px solid rgba(52, 211, 153, 0.2)',
                                            fontSize: '0.75rem',
                                            fontWeight: '600'
                                        }}>
                                            {acc.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem 0', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                        Deactivate
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChartOfAccounts;
