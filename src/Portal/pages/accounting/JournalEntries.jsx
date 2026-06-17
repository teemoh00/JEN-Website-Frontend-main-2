import React from 'react';

const JournalEntries = () => {
    const entries = [
        { id: 'PLG-2026-00018', date: '2026-06-03', desc: 'Pledge from Stephen Njiu', type: 'pledge' },
        { id: 'PLG-2026-00017', date: '2026-06-03', desc: 'Pledge from Timothy Mutisya', type: 'pledge' },
        { id: 'PLG-2026-00016', date: '2026-05-29', desc: 'Pledge from Kuria Teresiah Wanjiru', type: 'pledge' },
        { id: 'PLG-2026-00015', date: '2026-05-18', desc: 'Pledge from Paul Muyu', type: 'pledge' },
        { id: 'PLG-2026-00014', date: '2026-05-18', desc: 'Pledge from John Ngugi', type: 'pledge' },
        { id: 'PLG-2026-00013', date: '2026-04-30', desc: 'Pledge from James Kiarie', type: 'pledge' },
        { id: 'PLG-2026-00012', date: '2026-04-29', desc: 'Pledge from Miriam Nkirote', type: 'pledge' },
        { id: 'PLR-2026-00011', date: '2026-04-27', desc: 'Pledge redeemed by Purity Nyambura kimani', type: 'pledge_redeem' },
        { id: 'PLR-2026-00010', date: '2026-04-27', desc: 'Pledge redeemed by MIRIAM NKIROTE', type: 'pledge_redeem' },
        { id: 'PLR-2026-00009', date: '2026-04-27', desc: 'Pledge redeemed by BENJAMIN KIMANI', type: 'pledge_redeem' },
        { id: 'PLG-2026-00007', date: '2026-04-27', desc: 'Pledge from Joy Ngugi', type: 'pledge' },
        { id: 'PLG-2026-00006', date: '2026-04-27', desc: 'Pledge from VICTOR MUTINDA', type: 'pledge' },
        { id: 'PLG-2026-00005', date: '2026-04-25', desc: 'Pledge from BENJAMIN KIMANI', type: 'pledge' },
        { id: 'PLG-2026-00004', date: '2026-04-25', desc: 'Pledge from Naomi Mwihaki', type: 'pledge' },
        { id: 'PLG-2026-00003', date: '2026-04-25', desc: 'Pledge from James Kiarie', type: 'pledge' },
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem', color: 'var(--text-color)' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    Journal Entries
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                    View, create, and reverse double-entry journal entries.
                </p>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '700' }}>
                        All Sources
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <input 
                            type="text" 
                            placeholder="Search ref/desc..." 
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', outline: 'none', fontFamily: 'inherit' }} 
                        />
                        <button style={{ background: 'transparent', color: 'var(--text-color)', border: 'none', fontWeight: '800', cursor: 'pointer' }}>Search</button>
                    </div>
                </div>

                <button style={{ background: 'transparent', color: 'var(--text-color)', border: 'none', fontWeight: '800', cursor: 'pointer' }}>
                    + Manual Entry
                </button>
            </div>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                {entries.map((entry, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                        <div style={{ width: '150px', fontWeight: '800', fontSize: '0.85rem' }}>{entry.id}</div>
                        <div style={{ width: '100px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{entry.date}</div>
                        <div style={{ flex: 1, fontSize: '0.85rem' }}>{entry.desc}</div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ 
                                padding: '0.2rem 0.6rem', 
                                borderRadius: '1rem', 
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                color: '#10b981',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {entry.type}
                            </div>
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.9rem', fontWeight: '800' }}>
                <span style={{ color: 'var(--text-color)', cursor: 'pointer' }}>1</span>
                <span style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>2</span>
            </div>
        </div>
    );
};

export default JournalEntries;
