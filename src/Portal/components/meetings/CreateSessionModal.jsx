import React, { useState } from 'react';
import axios from '../../../api/axios';

const CreateSessionModal = ({ eventId, onClose }) => {
    const [isNewDay, setIsNewDay] = useState(false);
    const [isNewType, setIsNewType] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        day_name: 'Day 1',
        session_type: 'Other',
        start_time: '09:00',
        end_time: '10:00',
        speaker: '',
        location: '',
        description: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await axios.post('events/sessions/', {
                ...formData,
                event_id: eventId
            });
            onClose(); // This will trigger fetchSessions in parent
        } catch (err) {
            console.error('Error creating session:', err);
            setError(err.response?.data?.error || 'Failed to create session');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: '#1a1a24',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '500px',
                padding: '2.5rem 2rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <h2 style={{ margin: '0 0 2rem 0', color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: '800' }}>Add New Session</h2>

                {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Session Title */}
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Session Title *</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Opening Worship" required style={{
                            width: '100%', padding: '0 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', height: '2.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem'
                        }} />
                    </div>

                    {/* Day & Type */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <label style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', margin: 0 }}>Day *</label>
                                <span onClick={() => {
                                    setIsNewDay(!isNewDay);
                                    setFormData({...formData, day_name: !isNewDay ? '' : 'Day 1'});
                                }} style={{ color: '#0ea5e9', fontSize: '0.7rem', fontWeight: '600', cursor: 'pointer' }}>
                                    {isNewDay ? 'Cancel' : '+ Add New'}
                                </span>
                            </div>
                            <div style={{ position: 'relative', height: '2.5rem', display: 'flex', alignItems: 'center' }}>
                                {isNewDay ? (
                                    <input type="text" name="day_name" value={formData.day_name} onChange={handleChange} placeholder="e.g. Day 4" required style={{
                                        width: '100%', padding: '0 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', height: '100%'
                                    }} />
                                ) : (
                                    <>
                                        <select name="day_name" value={formData.day_name} onChange={handleChange} style={{
                                            width: '100%', padding: '0 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', appearance: 'none', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', height: '100%'
                                        }}>
                                            <option value="Day 1" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Day 1</option>
                                            <option value="Day 2" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Day 2</option>
                                            <option value="Day 3" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Day 3</option>
                                        </select>
                                        <span style={{ position: 'absolute', right: '1rem', pointerEvents: 'none', color: 'var(--text-color)', fontSize: '0.8rem' }}>▼</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <label style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', margin: 0 }}>Session Type *</label>
                                <span onClick={() => {
                                    setIsNewType(!isNewType);
                                    setFormData({...formData, session_type: !isNewType ? '' : 'Other'});
                                }} style={{ color: '#0ea5e9', fontSize: '0.7rem', fontWeight: '600', cursor: 'pointer' }}>
                                    {isNewType ? 'Cancel' : '+ Add New'}
                                </span>
                            </div>
                            <div style={{ position: 'relative', height: '2.5rem', display: 'flex', alignItems: 'center' }}>
                                {isNewType ? (
                                    <input type="text" name="session_type" value={formData.session_type} onChange={handleChange} placeholder="e.g. Workshop" required style={{
                                        width: '100%', padding: '0 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', height: '100%'
                                    }} />
                                ) : (
                                    <>
                                        <select name="session_type" value={formData.session_type} onChange={handleChange} style={{
                                            width: '100%', padding: '0 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', appearance: 'none', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', height: '100%'
                                        }}>
                                            <option value="Other" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Other</option>
                                            <option value="Meal" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Meal</option>
                                            <option value="Prayer" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Prayer</option>
                                            <option value="Teaching" style={{ color: 'var(--text-color)', background: '#1a1a24' }}>Teaching</option>
                                        </select>
                                        <span style={{ position: 'absolute', right: '1rem', pointerEvents: 'none', color: 'var(--text-color)', fontSize: '0.8rem' }}>▼</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Time */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Start Time *</label>
                            <div style={{ position: 'relative' }}>
                                <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} required style={{
                                    width: '100%', padding: '0 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', height: '2.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', fontWeight: '600', fontFamily: 'monospace'
                                }} />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>End Time *</label>
                            <div style={{ position: 'relative' }}>
                                <input type="time" name="end_time" value={formData.end_time} onChange={handleChange} required style={{
                                    width: '100%', padding: '0 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', height: '2.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', fontWeight: '600', fontFamily: 'monospace'
                                }} />
                            </div>
                        </div>
                    </div>

                    {/* Speaker */}
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Speaker</label>
                        <input type="text" name="speaker" value={formData.speaker} onChange={handleChange} placeholder="e.g. Pastor John" style={{
                            width: '100%', padding: '0 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', height: '2.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem'
                        }} />
                    </div>

                    {/* Location */}
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Location / Room</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Main Auditorium" style={{
                            width: '100%', padding: '0 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', height: '2.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem'
                        }} />
                    </div>

                    {/* Description */}
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Brief session description..." rows="3" style={{
                            width: '100%', padding: '0.75rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'var(--text-color)', outline: 'none', fontSize: '0.9rem', resize: 'vertical'
                        }}></textarea>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} disabled={loading} style={{
                            background: 'transparent', border: 'none', color: 'var(--text-color)', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer'
                        }}>
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} style={{
                            background: '#a855f7', color: 'var(--text-color)', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1
                        }}>
                            {loading ? 'Adding...' : 'Add Session'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSessionModal;
