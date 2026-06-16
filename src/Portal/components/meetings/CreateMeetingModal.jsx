import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';

const CreateMeetingModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        time: '',
        location: '',
        date: '',
        end_date: '',
        type: 'Physical',
        facilitator: ''
    });

    const [categories, setCategories] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [createdMeeting, setCreatedMeeting] = useState(null);
    const [copied, setCopied] = useState(false);
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [isNewType, setIsNewType] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                console.log('Fetching categories...');
                const res = await axios.get('meetings/categories/');
                console.log('Categories response:', res.data);

                // Handle both raw list and {results: []} format
                const data = res.data;
                const cats = Array.isArray(data) ? data : (data.results || []);

                setCategories(cats);
                if (cats.length > 0) {
                    setFormData(prev => ({ ...prev, category: cats[0].id }));
                }
            } catch (err) {
                console.error('Error loading categories:', err);
            }
        };

        const fetchMembers = async () => {
            try {
                console.log('Fetching committed members...');
                // CORRECTED URL: church/members/
                const res = await axios.get('church/members/?commitment=Committed Member');
                console.log('Members response:', res.data);

                const data = res.data;
                const mems = Array.isArray(data) ? data : (data.results || []);

                setMembers(mems);
            } catch (err) {
                console.error('Error loading members (facilitators):', err);
            }
        };

        fetchCategories();
        fetchMembers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                title: formData.title,
                category: formData.category,
                meeting_type: formData.type,
                date: formData.date,
                end_date: formData.end_date || null,
                time: formData.time,
                location: formData.location,
                meeting_link: formData.googleMeetLink,
                facilitator: (formData.type === 'Online' || formData.type === 'Hybrid') ? formData.facilitator : null
            };
            const response = await axios.post('meetings/meetings/', payload);
            setCreatedMeeting(response.data);
        } catch (error) {
            console.error('Error creating meeting:', error);
            alert('Failed to create meeting. Please check the logs.');
        } finally {
            setLoading(false);
        }
    };

    const getShareLink = () => {
        if (!createdMeeting) return '';
        // Use the generated join portal link from the backend
        return `${window.location.origin}${createdMeeting.portal_link}`;
    };

    const handleCopy = () => {
        const link = getShareLink();

        const copyToClipboard = (text) => {
            if (navigator.clipboard && window.isSecureContext) {
                return navigator.clipboard.writeText(text);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                return new Promise((res, rej) => {
                    document.execCommand('copy') ? res() : rej();
                    textArea.remove();
                });
            }
        };

        copyToClipboard(link).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
            alert("Failed to copy. Please copy the link manually from the input field.");
        });
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        background: 'var(--bg-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '0.5rem',
        color: 'var(--text-color)',
        fontSize: '0.9rem',
        marginTop: '0.4rem'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        fontWeight: '500'
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100
        }}>
            <div style={{
                background: 'var(--surface-1)',
                padding: '2rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '600px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-color)', margin: 0 }}>Create New Meeting</h2>
                    <button onClick={() => {
                        if (createdMeeting) window.location.reload();
                        onClose();
                    }} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Meeting Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Weekly Prayer" style={inputStyle} required />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={labelStyle}>Category</label>
                                <span onClick={() => setIsNewCategory(!isNewCategory)} style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}>
                                    {isNewCategory ? 'Cancel' : '+ Add New'}
                                </span>
                            </div>
                            {isNewCategory ? (
                                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Special Meeting" style={inputStyle} />
                            ) : (
                                <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id} style={{ color: '#ffffff', background: '#1a1a24' }}>{cat.name}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={labelStyle}>Type</label>
                                <span onClick={() => setIsNewType(!isNewType)} style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}>
                                    {isNewType ? 'Cancel' : '+ Add New'}
                                </span>
                            </div>
                            {isNewType ? (
                                <input type="text" name="type" value={formData.type} onChange={handleChange} placeholder="e.g. Webinar" style={inputStyle} />
                            ) : (
                                <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                                    <option value="Physical" style={{ color: '#ffffff', background: '#1a1a24' }}>Physical</option>
                                    <option value="Online" style={{ color: '#ffffff', background: '#1a1a24' }}>Online</option>
                                    <option value="Hybrid" style={{ color: '#ffffff', background: '#1a1a24' }}>Hybrid</option>
                                </select>
                            )}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Start Date</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} required />
                        </div>
                        <div>
                            <label style={labelStyle}>End Date (Optional)</label>
                            <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} style={inputStyle} min={formData.date} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Start Time</label>
                            <input type="time" name="time" value={formData.time} onChange={handleChange} style={inputStyle} required />
                        </div>
                    </div>


                    {(formData.type === 'Online' || formData.type === 'Hybrid') && (
                        <div>
                            <label style={labelStyle}>Facilitator</label>
                            <select name="facilitator" value={formData.facilitator} onChange={handleChange} style={inputStyle} required>
                                <option value="" style={{ color: '#ffffff', background: '#1a1a24' }}>Select a Facilitator</option>
                                {members.map(member => (
                                    <option key={member.id} value={member.id} style={{ color: '#ffffff', background: '#1a1a24' }}>{member.full_name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {(formData.type === 'Physical' || formData.type === 'Hybrid') && (
                        <div>
                            <label style={labelStyle}>Meeting Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Main Sanctuary, Room 101"
                                style={inputStyle}
                                required={formData.type === 'Physical'}
                            />
                        </div>
                    )}

                    {(formData.type === 'Online' || formData.type === 'Hybrid') && (
                        <div>
                            <label style={labelStyle}>Google Meet Link</label>
                            <input
                                type="url"
                                name="googleMeetLink"
                                value={formData.googleMeetLink || ''}
                                onChange={handleChange}
                                placeholder="https://meet.google.com/..."
                                style={inputStyle}
                            />
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            cursor: 'pointer'
                        }}>Cancel</button>
                        <button type="submit" disabled={loading} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'var(--bg-color)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}>{loading ? 'Saving...' : 'Save Meeting'}</button>
                    </div>
                </form>

                {createdMeeting && (
                    <div style={{
                        marginTop: '2rem',
                        padding: '1.5rem',
                        background: 'rgba(34, 193, 230, 0.1)',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(34, 193, 230, 0.2)'
                    }}>
                        <h3 style={{ color: 'var(--primary)', marginTop: 0, fontSize: '1.1rem' }}>Meeting Saved!</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Share the link below with participants:</p>

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <input
                                readOnly
                                value={getShareLink()}
                                style={{
                                    flex: 1,
                                    padding: '0.6rem',
                                    background: 'var(--bg-color)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '0.4rem',
                                    color: 'var(--text-color)',
                                    fontSize: '0.85rem'
                                }}
                            />
                            <button
                                onClick={handleCopy}
                                style={{
                                    padding: '0 1rem',
                                    background: 'var(--primary)',
                                    color: 'var(--bg-color)',
                                    border: 'none',
                                    borderRadius: '0.4rem',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                            {createdMeeting.meeting_type === 'Online' ? 'This is the direct join link.' : 'This link allows members to register for the meeting.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateMeetingModal;
