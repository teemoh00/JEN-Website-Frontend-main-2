import React, { useState, useEffect } from 'react';
import AddBudgetItemModal from '../components/meetings/AddBudgetItemModal';
import CreateNewVersionModal from '../components/meetings/CreateNewVersionModal';
import AddExpenditureModal from '../components/meetings/AddExpenditureModal';
import EditBudgetItemModal from '../components/meetings/EditBudgetItemModal';
import EditBudgetVersionModal from '../components/meetings/EditBudgetVersionModal';
import axios from '../../api/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { addLogoToDoc } from '../../utils/pdfHelper';

const EventBudget = () => {
    const [activeTab, setActiveTab] = useState('Line Items');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
    const [isExpenditureModalOpen, setIsExpenditureModalOpen] = useState(false);
    const [activeBudgetItemId, setActiveBudgetItemId] = useState(null);
    const [expandedItemIds, setExpandedItemIds] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [isEditVersionModalOpen, setIsEditVersionModalOpen] = useState(false);
    
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    
    const [budgets, setBudgets] = useState([]);
    const [selectedBudget, setSelectedBudget] = useState(''); // version id
    
    const [items, setItems] = useState([]);
    const [expenditures, setExpenditures] = useState([]);
    const [loadingItems, setLoadingItems] = useState(false);

    // Fetch Events on mount
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('events');
                const fetchedEvents = Array.isArray(res.data) ? res.data : (res.data.results || []);
                setEvents(fetchedEvents);
                if (fetchedEvents.length > 0) {
                    setSelectedEvent(fetchedEvents[0].id.toString());
                }
            } catch (err) {
                console.error('Error fetching events:', err);
            }
        };
        fetchEvents();
    }, []);

    // Fetch budget versions when event changes
    useEffect(() => {
        if (selectedEvent) {
            fetchBudgets(selectedEvent);
        } else {
            setBudgets([]);
            setSelectedBudget('');
        }
    }, [selectedEvent]);

    const fetchBudgets = async (eventId) => {
        try {
            const res = await axios.get(`events/budgets/?event=${eventId}`);
            const data = Array.isArray(res.data) ? res.data : [];
            setBudgets(data);
            if (data.length > 0) {
                setSelectedBudget(data[0].id.toString()); // select newest version
            } else {
                setSelectedBudget('');
            }
        } catch (err) {
            console.error('Error fetching budgets:', err);
        }
    };

    // Fetch items when budget version changes
    useEffect(() => {
        if (selectedBudget) {
            fetchItems(selectedBudget);
            fetchExpenditures(selectedBudget);
        } else {
            setItems([]);
            setExpenditures([]);
            setExpandedItemIds([]);
        }
    }, [selectedBudget]);

    const fetchItems = async (budgetId) => {
        setLoadingItems(true);
        try {
            const res = await axios.get(`events/budgets/items/?budget=${budgetId}`);
            setItems(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error('Error fetching items:', err);
        } finally {
            setLoadingItems(false);
        }
    };

    const fetchExpenditures = async (budgetId) => {
        try {
            const res = await axios.get(`events/budgets/items/expenditures/?budget=${budgetId}`);
            setExpenditures(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error('Error fetching expenditures:', err);
        }
    };

    const toggleExpand = (itemId) => {
        setExpandedItemIds(prev => prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]);
    };

    const handleDeleteExpenditure = async (id) => {
        if(!window.confirm('Are you sure you want to delete this expenditure?')) return;
        try {
            await axios.delete(`events/budgets/items/expenditures/?id=${id}`);
            fetchItems(selectedBudget);
            fetchExpenditures(selectedBudget);
        } catch (err) {
            alert('Failed to delete expenditure');
        }
    };

    const handleDeleteItem = async (itemId) => {
        if(!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            await axios.delete(`events/budgets/items/?id=${itemId}`);
            fetchItems(selectedBudget);
        } catch (err) {
            alert('Failed to delete item');
        }
    };

    // Calculate Stats
    const estimatedBudget = items.reduce((sum, item) => sum + parseFloat(item.estimated_amount), 0);
    const totalSpent = items.reduce((sum, item) => sum + parseFloat(item.actual_amount), 0);
    const remaining = estimatedBudget - totalSpent;
    
    // Variance percentage: If estimated is > 0, how much over/under spent relative to total estimated?
    let variance = 0;
    if (estimatedBudget > 0) {
        variance = ((totalSpent - estimatedBudget) / estimatedBudget) * 100;
    }
    const varianceColor = variance > 0 ? '#ef4444' : '#22c55e'; // Red if overspent, green if underspent
    
    const executionProgress = estimatedBudget > 0 ? Math.min((totalSpent / estimatedBudget) * 100, 100) : 0;

    // Derived category summary
    const categoryMap = {};
    items.forEach(i => {
        if (!categoryMap[i.category]) {
            categoryMap[i.category] = { estimated: 0, actual: 0, count: 0 };
        }
        categoryMap[i.category].estimated += parseFloat(i.estimated_amount);
        categoryMap[i.category].actual += parseFloat(i.actual_amount);
        categoryMap[i.category].count += 1;
    });

    const activeBudget = budgets.find(b => b.id.toString() === selectedBudget);

    const exportPDF = async () => {
        if (!activeBudget) return alert("No active budget to export.");
        
        const doc = new jsPDF();
        const eventName = events.find(e => e.id.toString() === selectedEvent)?.name || 'Event';
        
        // Brand styling
        doc.setFillColor(34, 40, 49);
        doc.rect(0, 0, doc.internal.pageSize.width, 35, 'F');
        
        await addLogoToDoc(doc);
        
        // Header Text
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text("EVENT BUDGET REPORT", 14, 23);
        
        // Event Title & Details
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`${eventName.toUpperCase()} - ${activeBudget.name}`, 14, 50);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Version: v${activeBudget.version_number}`, 14, 60);
        doc.text(`Status: ${activeBudget.is_active ? 'Active' : 'Archived'}`, 14, 66);
        doc.text(`Estimated: KES ${estimatedBudget.toLocaleString()}`, 120, 60);
        doc.text(`Total Spent: KES ${totalSpent.toLocaleString()}`, 120, 66);
        doc.text(`Remaining: KES ${remaining.toLocaleString()}`, 120, 72);

        const tableBody = items.map(i => [
            i.category,
            i.description,
            i.vendor || '-',
            `KES ${parseFloat(i.estimated_amount).toLocaleString()}`,
            `KES ${parseFloat(i.actual_amount).toLocaleString()}`,
            `KES ${(parseFloat(i.estimated_amount) - parseFloat(i.actual_amount)).toLocaleString()}`
        ]);

        autoTable(doc, {
            startY: 85,
            head: [['Category', 'Description', 'Vendor', 'Estimated', 'Spent', 'Remaining']],
            body: tableBody,
            theme: 'grid',
            styles: { fontSize: 9, cellPadding: 4 },
            headStyles: { fillColor: [124, 58, 237], textColor: 255, fontStyle: 'bold' }
        });

        // Add Expenditures Breakdown
        if (expenditures.length > 0) {
            doc.addPage();
            doc.setFillColor(34, 40, 49);
            doc.rect(0, 0, doc.internal.pageSize.width, 35, 'F');

            await addLogoToDoc(doc);

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text("DETAILED EXPENDITURES", 14, 23);

            const expBody = expenditures.map(exp => {
                const parentItem = items.find(i => i.id === exp.budget_item_id);
                return [
                    parentItem ? parentItem.category : '-',
                    exp.description,
                    exp.vendor || '-',
                    exp.date_incurred,
                    `${exp.quantity} ${exp.unit || 'pcs'} @ ${parseFloat(exp.price_per_unit).toLocaleString()}`,
                    `KES ${parseFloat(exp.amount).toLocaleString()}`
                ];
            });

            autoTable(doc, {
                startY: 35,
                head: [['Category', 'Item/Description', 'Vendor', 'Date', 'Qty/Price', 'Total Amount']],
                body: expBody,
                theme: 'grid',
                styles: { fontSize: 9, cellPadding: 4 },
                headStyles: { fillColor: [168, 85, 247], textColor: 255, fontStyle: 'bold' }
            });
        }

        doc.save(`${eventName.replace(/[^a-zA-Z0-9]/g, '_')}_Budget_v${activeBudget.version_number}.pdf`);
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Event Budget & Expenditure</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>Plan budgets, track expenses, and generate financial reports</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative' }}>
                        <select 
                            value={selectedEvent}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '0.5rem',
                            color: 'var(--text-color)',
                            padding: '0.6rem 2.5rem 0.6rem 1rem',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            outline: 'none',
                            cursor: 'pointer',
                            appearance: 'none'
                        }}>
                            <option value="" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Select an event...</option>
                            {events.map(ev => (
                                <option key={ev.id} value={ev.id} style={{ color: 'var(--text-color)', background: '#1a1a24' }}>
                                    {ev.name}
                                </option>
                            ))}
                        </select>
                        <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-color)', fontSize: '0.7rem' }}>▼</span>
                    </div>
                    {budgets.length > 0 && (
                        <div style={{ position: 'relative' }}>
                            <select 
                                value={selectedBudget}
                                onChange={(e) => setSelectedBudget(e.target.value)}
                                style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '0.5rem',
                                color: 'var(--text-color)',
                                padding: '0.6rem 2.5rem 0.6rem 1rem',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                outline: 'none',
                                cursor: 'pointer',
                                appearance: 'none'
                            }}>
                                {budgets.map(b => (
                                    <option key={b.id} value={b.id} style={{ background: '#1a1a24' }}>
                                        v{b.version_number} — {b.is_active ? 'Active' : 'Archived'}
                                    </option>
                                ))}
                            </select>
                            <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-color)', fontSize: '0.7rem' }}>▼</span>
                        </div>
                    )}
                </div>
            </div>

            {selectedEvent ? (
                budgets.length === 0 ? (
                    <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '4rem 2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>💰</div>
                        <p style={{ color: 'var(--text-color)', fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>No budget initialized for this event.</p>
                        <button onClick={() => setIsVersionModalOpen(true)} style={{ background: '#7c3aed', color: '#ffffff', border: 'none', borderRadius: '0.5rem', padding: '0.8rem 1.5rem', fontSize: '1rem', fontWeight: '700', cursor: 'pointer' }}>
                            + Create First Budget Version
                        </button>
                    </div>
                ) : (
                <>
                    {/* Budget Container Header */}
                    <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <h2 style={{ color: 'var(--text-color)', margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>{activeBudget?.name}</h2>
                            <button onClick={() => setIsEditVersionModalOpen(true)} style={{ background: 'transparent', border: 'none', color: '#a855f7', cursor: 'pointer', fontSize: '1rem', padding: 0 }} title="Edit Budget Version">
                                ✏️
                            </button>
                            <span style={{ background: activeBudget?.is_active ? '#22c55e' : '#64748b', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', fontWeight: '700' }}>
                                {activeBudget?.is_active ? 'Active' : 'Archived'}
                            </span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}>v{activeBudget?.version_number}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <button onClick={() => setIsModalOpen(true)} style={{ background: '#7c3aed', color: 'var(--text-color)', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                + Add Item
                            </button>
                            <button onClick={exportPDF} style={{ background: 'var(--border-color)', color: 'var(--text-color)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                📄 PDF Report
                            </button>
                            <button onClick={() => setIsVersionModalOpen(true)} style={{ background: 'var(--border-color)', color: 'var(--text-color)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                + New Version
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ fontSize: '1.5rem' }}>📋</div>
                            <div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.2rem' }}>Estimated Budget</div>
                                <div style={{ color: '#3b82f6', fontSize: '1.25rem', fontWeight: '700' }}>KES {estimatedBudget.toLocaleString()}</div>
                            </div>
                        </div>
                        <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ fontSize: '1.5rem' }}>💸</div>
                            <div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.2rem' }}>Total Spent</div>
                                <div style={{ color: '#22c55e', fontSize: '1.25rem', fontWeight: '700' }}>KES {totalSpent.toLocaleString()}</div>
                            </div>
                        </div>
                        <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ fontSize: '1.5rem' }}>💰</div>
                            <div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.2rem' }}>Remaining</div>
                                <div style={{ color: remaining < 0 ? '#ef4444' : '#22c55e', fontSize: '1.25rem', fontWeight: '700' }}>KES {remaining.toLocaleString()}</div>
                            </div>
                        </div>
                        <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ fontSize: '1.5rem' }}>📉</div>
                            <div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.2rem' }}>Variance</div>
                                <div style={{ color: varianceColor, fontSize: '1.25rem', fontWeight: '700' }}>
                                    {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Execution Progress */}
                    <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <span style={{ color: 'var(--text-color)', fontSize: '0.85rem', fontWeight: '700' }}>Budget Execution</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>{executionProgress.toFixed(1)}%</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                            <div style={{ width: `${executionProgress}%`, height: '100%', background: '#7c3aed', borderRadius: '4px' }}></div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <button
                            onClick={() => setActiveTab('Line Items')}
                            style={{
                                background: activeTab === 'Line Items' ? '#7c3aed' : 'var(--border-color)',
                                color: 'var(--text-color)',
                                border: 'none',
                                borderRadius: '0.5rem',
                                padding: '0.6rem 1.25rem',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Line Items ({items.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('Category Summary')}
                            style={{
                                background: activeTab === 'Category Summary' ? '#7c3aed' : 'var(--border-color)',
                                color: 'var(--text-color)',
                                border: 'none',
                                borderRadius: '0.5rem',
                                padding: '0.6rem 1.25rem',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Category Summary
                        </button>
                    </div>

                    {/* Content Area */}
                    {activeTab === 'Line Items' && (
                        items.length === 0 ? (
                            <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '4rem 2rem', textAlign: 'center' }}>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>No items yet. Add budget line items to get started.</p>
                            </div>
                        ) : (
                            <div style={{ background: 'var(--border-color)', borderRadius: '1rem', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead style={{ background: 'rgba(255,255,255,0.05)' }}>
                                        <tr>
                                            <th style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Category</th>
                                            <th style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Description</th>
                                            <th style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Estimated</th>
                                            <th style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Spent</th>
                                            <th style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Remaining</th>
                                            <th style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map(item => (
                                            <React.Fragment key={item.id}>
                                                <tr onClick={() => toggleExpand(item.id)} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', background: expandedItemIds.includes(item.id) ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                                                    <td style={{ padding: '1rem', color: 'var(--text-color)', fontSize: '0.9rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{expandedItemIds.includes(item.id) ? '▼' : '▶'}</span>
                                                            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: '600' }}>
                                                                {item.category}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <div style={{ color: 'var(--text-color)', fontSize: '0.9rem', fontWeight: '600' }}>{item.description}</div>
                                                        {item.vendor && <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.2rem' }}>Vendor: {item.vendor}</div>}
                                                    </td>
                                                    <td style={{ padding: '1rem', color: 'var(--text-color)', fontSize: '0.9rem', fontWeight: '600' }}>KES {parseFloat(item.estimated_amount).toLocaleString()}</td>
                                                    <td style={{ padding: '1rem', color: '#ef4444', fontSize: '0.9rem', fontWeight: '600' }}>KES {parseFloat(item.actual_amount).toLocaleString()}</td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{
                                                            color: (parseFloat(item.estimated_amount) - parseFloat(item.actual_amount)) < 0 ? '#ef4444' : '#22c55e',
                                                            fontSize: '0.9rem',
                                                            fontWeight: '700'
                                                        }}>
                                                            KES {(parseFloat(item.estimated_amount) - parseFloat(item.actual_amount)).toLocaleString()}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActiveBudgetItemId(item.id);
                                                                setIsExpenditureModalOpen(true);
                                                            }} 
                                                            style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '0.25rem', fontSize: '0.75rem', cursor: 'pointer', marginRight: '0.5rem' }}>
                                                            + Add Expense
                                                        </button>
                                                        <button onClick={(e) => { e.stopPropagation(); setItemToEdit(item); setIsEditModalOpen(true); }} style={{ background: 'transparent', color: '#3b82f6', border: '1px solid #3b82f6', padding: '0.4rem 0.8rem', borderRadius: '0.25rem', fontSize: '0.75rem', cursor: 'pointer', marginRight: '0.5rem' }}>
                                                            Edit
                                                        </button>
                                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }} style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '0.4rem 0.8rem', borderRadius: '0.25rem', fontSize: '0.75rem', cursor: 'pointer' }}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                                {expandedItemIds.includes(item.id) && (
                                                    <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
                                                        <td colSpan="6" style={{ padding: '1rem 2rem' }}>
                                                            {expenditures.filter(e => e.budget_item_id === item.id).length === 0 ? (
                                                                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>No expenditures recorded for this item yet.</p>
                                                            ) : (
                                                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                                    <thead style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                                                        <tr>
                                                                            <th style={{ padding: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'left' }}>Description</th>
                                                                            <th style={{ padding: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'left' }}>Vendor</th>
                                                                            <th style={{ padding: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'left' }}>Date</th>
                                                                            <th style={{ padding: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>Qty</th>
                                                                            <th style={{ padding: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>Unit Price</th>
                                                                            <th style={{ padding: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>Total</th>
                                                                            <th style={{ padding: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {expenditures.filter(e => e.budget_item_id === item.id).map(exp => (
                                                                            <tr key={exp.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                                                <td style={{ padding: '0.5rem', color: 'var(--text-color)', fontSize: '0.85rem' }}>{exp.description}</td>
                                                                                <td style={{ padding: '0.5rem', color: 'var(--text-color)', fontSize: '0.85rem' }}>{exp.vendor || '-'}</td>
                                                                                <td style={{ padding: '0.5rem', color: 'var(--text-color)', fontSize: '0.85rem' }}>{exp.date_incurred}</td>
                                                                                <td style={{ padding: '0.5rem', color: 'var(--text-color)', fontSize: '0.85rem', textAlign: 'center' }}>{exp.quantity} {exp.unit || 'pcs'}</td>
                                                                                <td style={{ padding: '0.5rem', color: 'var(--text-color)', fontSize: '0.85rem', textAlign: 'right' }}>{parseFloat(exp.price_per_unit).toLocaleString()}</td>
                                                                                <td style={{ padding: '0.5rem', color: '#22c55e', fontSize: '0.85rem', fontWeight: '600', textAlign: 'right' }}>KES {parseFloat(exp.amount).toLocaleString()}</td>
                                                                                <td style={{ padding: '0.5rem', textAlign: 'right' }}>
                                                                                    <button onClick={(e) => { e.stopPropagation(); handleDeleteExpenditure(exp.id); }} style={{ background: 'transparent', color: '#ef4444', border: 'none', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}>Remove</button>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    )}

                    {activeTab === 'Category Summary' && (
                        <div style={{ background: 'var(--border-color)', borderRadius: '1rem', overflow: 'hidden', padding: '2rem' }}>
                            {Object.keys(categoryMap).length === 0 ? (
                                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No categories to summarize yet.</p>
                            ) : (
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {Object.entries(categoryMap).map(([cat, stats]) => (
                                        <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div>
                                                <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-color)' }}>{cat}</h4>
                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{stats.count} item(s)</span>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Est: KES {stats.estimated.toLocaleString()}</div>
                                                <div style={{ color: '#22c55e', fontSize: '0.9rem', fontWeight: '700' }}>Spent: KES {stats.actual.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </>
                )
            ) : (
                <div style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '4rem 2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-color)', fontSize: '1.1rem', fontWeight: '600' }}>Please select an event to view its budget.</p>
                </div>
            )}

            {isModalOpen && <AddBudgetItemModal budgetId={selectedBudget} onClose={() => setIsModalOpen(false)} onAdd={() => fetchItems(selectedBudget)} />}
            {isVersionModalOpen && <CreateNewVersionModal eventId={selectedEvent} onClose={() => setIsVersionModalOpen(false)} onCreated={() => fetchBudgets(selectedEvent)} />}
            {isExpenditureModalOpen && <AddExpenditureModal budgetItemId={activeBudgetItemId} onClose={() => setIsExpenditureModalOpen(false)} onAdd={() => { fetchItems(selectedBudget); fetchExpenditures(selectedBudget); }} />}
            {isEditModalOpen && <EditBudgetItemModal item={itemToEdit} onClose={() => { setIsEditModalOpen(false); setItemToEdit(null); }} onUpdate={() => fetchItems(selectedBudget)} />}
            {isEditVersionModalOpen && <EditBudgetVersionModal budget={activeBudget} onClose={() => setIsEditVersionModalOpen(false)} onUpdate={() => fetchBudgets(selectedEvent)} />}
        </div>
    );
};

export default EventBudget;
