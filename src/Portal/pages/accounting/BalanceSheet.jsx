import React from 'react';

const BalanceSheet = () => {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem', color: 'var(--text-color)' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    Balance Sheet
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                    Snapshot of assets, liabilities, and equity at a point in time.
                </p>
            </div>

            {/* Filter Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>As of:</span>
                <input type="date" defaultValue="2026-06-17" style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', outline: 'none', fontFamily: 'inherit', fontWeight: '700' }} />
                <button style={{ background: 'transparent', color: 'var(--text-color)', border: 'none', fontWeight: '800', cursor: 'pointer', marginLeft: '0.5rem' }}>Generate</button>
            </div>

            {/* Content Section */}
            <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                {/* Statement Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>Balance Sheet</h2>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                        As of 2026-06-17
                    </div>
                    <div style={{ 
                        background: 'rgba(16, 185, 129, 0.1)', 
                        color: '#10b981', 
                        padding: '0.4rem 0.8rem', 
                        borderRadius: '1rem', 
                        fontSize: '0.8rem', 
                        fontWeight: '600',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                    }}>
                        <span>✓</span> Balanced
                    </div>
                </div>

                {/* Two Column Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '3rem' }}>
                    
                    {/* Left Column (Assets) */}
                    <div>
                        <h3 style={{ 
                            color: '#0ea5e9', 
                            fontSize: '1rem', 
                            fontWeight: '700', 
                            margin: '0 0 1rem 0',
                            paddingBottom: '0.5rem',
                            borderBottom: '1px solid rgba(14, 165, 233, 0.3)'
                        }}>
                            ASSETS
                        </h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                                <span>1000 — Cash on Hand</span>
                                <span style={{ color: '#0ea5e9', fontWeight: '600' }}>KES 2,000.00</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                                <span>1030 — Online Payments</span>
                                <span style={{ color: '#0ea5e9', fontWeight: '600' }}>KES 54,500.00</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                                <span>1100 — Pledges Receivable</span>
                                <span style={{ color: '#0ea5e9', fontWeight: '600' }}>KES 384,000.00</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem 0', fontSize: '1.1rem', fontWeight: '800' }}>
                            <span>Total ASSETS</span>
                            <span style={{ color: '#0ea5e9' }}>KES 440,500.00</span>
                        </div>
                    </div>

                    {/* Right Column (Liabilities & Equity) */}
                    <div>
                        {/* Liabilities */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ 
                                color: '#ef4444', 
                                fontSize: '1rem', 
                                fontWeight: '700', 
                                margin: '0 0 1rem 0',
                                paddingBottom: '0.5rem',
                                borderBottom: '1px solid rgba(239, 68, 68, 0.3)'
                            }}>
                                LIABILITIES
                            </h3>
                            <div style={{ padding: '1rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                No items
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 0', fontSize: '1.1rem', fontWeight: '800' }}>
                                <span>Total LIABILITIES</span>
                                <span style={{ color: '#ef4444' }}>KES 0.00</span>
                            </div>
                        </div>

                        {/* Equity */}
                        <div>
                            <h3 style={{ 
                                color: '#a855f7', 
                                fontSize: '1rem', 
                                fontWeight: '700', 
                                margin: '0 0 1rem 0',
                                paddingBottom: '0.5rem',
                                borderBottom: '1px solid rgba(168, 85, 247, 0.3)'
                            }}>
                                EQUITY
                            </h3>
                            <div style={{ padding: '1rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                No items
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 0', fontSize: '1.1rem', fontWeight: '800' }}>
                                <span>Total EQUITY</span>
                                <span style={{ color: '#a855f7' }}>KES 0.00</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', fontSize: '0.9rem', borderTop: '1px solid var(--border-color)', marginTop: '1rem' }}>
                                <span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Net Income (Current Period)</span>
                                <span style={{ color: '#10b981', fontWeight: '600' }}>KES 440,500.00</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Final Totals Row */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '4rem', 
                    marginTop: '2rem',
                    paddingTop: '2rem'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '800' }}>
                        <span>Total Assets</span>
                        <span style={{ color: '#0ea5e9' }}>KES 440,500.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '800' }}>
                        <span>Liabilities + Equity</span>
                        <span style={{ color: '#a855f7' }}>KES 440,500.00</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalanceSheet;
