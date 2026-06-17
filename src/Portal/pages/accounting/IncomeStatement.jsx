import React from 'react';

const IncomeStatement = () => {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem', color: 'var(--text-color)' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    Income Statement
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                    Profit & Loss report showing revenue and expenses for a period.
                </p>
            </div>

            {/* Filter Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', fontSize: '0.85rem' }}>
                <input type="date" defaultValue="2026-01-01" style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', outline: 'none', fontFamily: 'inherit', fontWeight: '700' }} />
                <span style={{ color: 'var(--text-muted)' }}>to</span>
                <input type="date" defaultValue="2026-06-17" style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', outline: 'none', fontFamily: 'inherit', fontWeight: '700' }} />
                <button style={{ background: 'transparent', color: 'var(--text-color)', border: 'none', fontWeight: '800', cursor: 'pointer', marginLeft: '0.5rem' }}>Generate</button>
            </div>

            {/* Content Section */}
            <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
                {/* Statement Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>Income Statement</h2>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        For the period 2026-01-01 to 2026-06-17
                    </div>
                </div>

                {/* Revenue Section */}
                <div style={{ marginBottom: '3rem' }}>
                    <h3 style={{ 
                        color: '#10b981', 
                        fontSize: '1rem', 
                        fontWeight: '700', 
                        margin: '0 0 1rem 0',
                        paddingBottom: '0.5rem',
                        borderBottom: '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                        REVENUE
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', fontSize: '0.9rem', borderBottom: '1px solid var(--border-color)' }}>
                        <span>4030 — Pledges Revenue</span>
                        <span style={{ color: '#10b981', fontWeight: '600' }}>KES 440,500.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 0', fontSize: '1.1rem', fontWeight: '800' }}>
                        <span>Total Revenue</span>
                        <span style={{ color: '#10b981' }}>KES 440,500.00</span>
                    </div>
                </div>

                {/* Expenses Section */}
                <div style={{ marginBottom: '3rem' }}>
                    <h3 style={{ 
                        color: '#ef4444', 
                        fontSize: '1rem', 
                        fontWeight: '700', 
                        margin: '0 0 1rem 0',
                        paddingBottom: '0.5rem',
                        borderBottom: '1px solid rgba(239, 68, 68, 0.3)'
                    }}>
                        EXPENSES
                    </h3>
                    <div style={{ padding: '1rem 0', fontSize: '0.9rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                        No expenses recorded
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 0', fontSize: '1.1rem', fontWeight: '800' }}>
                        <span>Total Expenses</span>
                        <span style={{ color: '#ef4444' }}>KES 0.00</span>
                    </div>
                </div>

                {/* Net Surplus/Deficit Section */}
                <div style={{ 
                    background: 'rgba(16, 185, 129, 0.05)', 
                    border: '1px solid rgba(16, 185, 129, 0.1)', 
                    borderRadius: '0.5rem', 
                    padding: '1.5rem',
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginTop: '2rem'
                }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>NET SURPLUS</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#10b981' }}>KES 440,500.00</span>
                </div>
            </div>
        </div>
    );
};

export default IncomeStatement;
