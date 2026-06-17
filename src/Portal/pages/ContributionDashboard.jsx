import React, { useState } from 'react';
import RecordIncomeModal from '../components/contributions/RecordIncomeModal';
import RecordExpenseModal from '../components/contributions/RecordExpenseModal';
import RecordContributionModal from '../components/contributions/RecordContributionModal';
import MakePledgeModal from '../components/contributions/MakePledgeModal';
import CreateBudgetModal from '../components/contributions/CreateBudgetModal';

const ContributionDashboard = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [showRecordIncome, setShowRecordIncome] = useState(false);
    const [showRecordExpense, setShowRecordExpense] = useState(false);
    const [showRecordContribution, setShowRecordContribution] = useState(false);
    const [showMakePledge, setShowMakePledge] = useState(false);
    const [showCreateBudget, setShowCreateBudget] = useState(false);

    const stats = [
        { title: 'Total Income', amount: 'KES 0', subtitle: 'All income streams', icon: '💰' },
        { title: 'Total Expenses', amount: 'KES 400', subtitle: 'All expenditures', icon: '🧾' },
        { title: 'Contributions', amount: 'KES 0', subtitle: 'Member giving', icon: '🤝' },
        { title: 'Active Pledges', amount: 'KES 575,300', subtitle: '81,500 redeemed', icon: '📝' },
        { title: 'Net Balance', amount: 'KES -400', subtitle: 'Income - Expenses', icon: '📊' }
    ];

    const transactions = [
        { id: 1, date: '2024-05-01', description: 'vf', category: 'mail', type: 'Expense', amount: '-KES 100', method: '—' },
        { id: 2, date: '2024-05-01', description: 'gff', category: 'mail', type: 'Expense', amount: '-KES 100', method: '—' },
        { id: 3, date: '2024-04-03', description: 'dvdd', category: 'mail', type: 'Expense', amount: '-KES 100', method: '—' },
        { id: 4, date: '2024-04-02', description: 'ddd', category: 'Cleaning supplies', type: 'Expense', amount: '-KES 100', method: '—' }
    ];

    const StatItem = ({ title, amount, subtitle, icon }) => (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', minWidth: '220px', flex: '1 1 220px' }}>
            <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{title}</div>
                <div style={{ color: 'var(--text-color)', fontSize: '1.8rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '0.25rem' }}>{amount}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{subtitle}</div>
            </div>
            <div style={{ 
                width: '42px', 
                height: '42px', 
                borderRadius: '0.5rem', 
                background: 'var(--border-color)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '1.2rem',
                flexShrink: 0
            }}>
                {icon}
            </div>
        </div>
    );

    const actionButtonStyle = (isPrimary) => ({
        padding: '0.6rem 1.2rem',
        borderRadius: '0.4rem',
        border: 'none',
        background: isPrimary ? 'var(--primary)' : 'transparent',
        color: 'var(--text-color)',
        fontWeight: '700',
        cursor: 'pointer',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    });

    const tabStyle = (isActive) => ({
        padding: '0.5rem 1.2rem',
        borderRadius: '0.4rem',
        border: 'none',
        background: isActive ? 'var(--primary)' : 'transparent',
        color: isActive ? 'white' : 'var(--text-muted)',
        fontWeight: isActive ? '700' : '600',
        cursor: 'pointer',
        fontSize: '0.85rem',
        transition: 'all 0.2s'
    });

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '3rem' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    Financial Management
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                    Track income, expenses, contributions, pledges, and budgets.
                </p>
            </div>

            {/* Stats Overview Grid */}
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '3rem 2rem', 
                marginBottom: '4rem' 
            }}>
                {stats.slice(0, 4).map((stat, i) => <StatItem key={i} {...stat} />)}
                <div style={{ flexBasis: '100%', height: 0 }}></div> {/* Line break for Net Balance */}
                <StatItem {...stats[4]} />
            </div>

            {/* Action Buttons */}
            <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                flexWrap: 'wrap',
                marginBottom: '3rem' 
            }}>
                <button style={actionButtonStyle(true)} onClick={() => setShowRecordIncome(true)}>💰 Record Income</button>
                <button style={actionButtonStyle(false)} onClick={() => setShowRecordExpense(true)}>🧾 Record Expense</button>
                <button style={actionButtonStyle(false)} onClick={() => setShowRecordContribution(true)}>🤝 Record Contribution</button>
                <button style={actionButtonStyle(false)} onClick={() => setShowMakePledge(true)}>🙏 Make Pledge</button>
                <button style={actionButtonStyle(false)} onClick={() => setShowCreateBudget(true)}>📝 Create Budget</button>
            </div>

            {/* Transactions Section */}
            <div>
                {/* Filters Row */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '2rem' 
                }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button style={tabStyle(activeTab === 'all')} onClick={() => setActiveTab('all')}>All Transactions</button>
                        <button style={tabStyle(activeTab === 'income')} onClick={() => setActiveTab('income')}>Income</button>
                        <button style={tabStyle(activeTab === 'expenses')} onClick={() => setActiveTab('expenses')}>Expenses</button>
                        <button style={tabStyle(activeTab === 'contributions')} onClick={() => setActiveTab('contributions')}>Contributions</button>
                    </div>
                    
                    <input 
                        type="text" 
                        placeholder="Search transactions..." 
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
                            <tr style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ padding: '1rem 0', fontWeight: '600' }}>Date</th>
                                <th style={{ padding: '1rem 0', fontWeight: '600' }}>Description</th>
                                <th style={{ padding: '1rem 0', fontWeight: '600' }}>Category</th>
                                <th style={{ padding: '1rem 0', fontWeight: '600' }}>Type</th>
                                <th style={{ padding: '1rem 0', fontWeight: '600' }}>Amount</th>
                                <th style={{ padding: '1rem 0', fontWeight: '600' }}>Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((t) => (
                                <tr key={t.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                                    <td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>{t.date}</td>
                                    <td style={{ padding: '1rem 0', color: 'var(--text-color)', fontWeight: '700' }}>{t.description}</td>
                                    <td style={{ padding: '1rem 0', color: 'var(--primary)' }}>{t.category}</td>
                                    <td style={{ padding: '1rem 0' }}>
                                        <span style={{ 
                                            padding: '0.25rem 0.6rem', 
                                            background: 'rgba(239, 68, 68, 0.15)', 
                                            color: '#ef4444', 
                                            borderRadius: '0.2rem',
                                            fontSize: '0.75rem',
                                            fontWeight: '600'
                                        }}>
                                            {t.type}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 0', color: '#ef4444', fontWeight: '800' }}>{t.amount}</td>
                                    <td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>{t.method}</td>
                                </tr>
                            ))}
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
                    <div>Showing 1 to 4 of 4 entries</div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <span style={{ cursor: 'pointer', opacity: 0.5 }}>&lt; Prev</span>
                        <span style={{ color: 'var(--text-color)' }}>Page 1 of 1</span>
                        <span style={{ cursor: 'pointer', opacity: 0.5 }}>Next &gt;</span>
                    </div>
                </div>
            </div>

            {showRecordIncome && <RecordIncomeModal onClose={() => setShowRecordIncome(false)} />}
            {showRecordExpense && <RecordExpenseModal onClose={() => setShowRecordExpense(false)} />}
            {showRecordContribution && <RecordContributionModal onClose={() => setShowRecordContribution(false)} />}
            {showMakePledge && <MakePledgeModal onClose={() => setShowMakePledge(false)} />}
            {showCreateBudget && <CreateBudgetModal onClose={() => setShowCreateBudget(false)} />}
        </div>
    );
};

export default ContributionDashboard;
