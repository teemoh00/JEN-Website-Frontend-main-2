import React from 'react';

const Payroll = () => {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem', color: 'var(--text-color)', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    Payroll
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                    Create, approve, and process payroll runs for staff.
                </p>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', fontSize: '0.85rem' }}>
                <div style={{ color: 'var(--text-muted)' }}>
                    0 payroll run(s)
                </div>

                <button style={{ background: 'transparent', color: 'var(--text-color)', border: 'none', fontWeight: '800', cursor: 'pointer' }}>
                    + New Payroll Run
                </button>
            </div>

            {/* Empty State Content */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2rem' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    No payroll runs yet
                </div>
            </div>
        </div>
    );
};

export default Payroll;
