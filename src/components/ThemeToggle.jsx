import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div
            onClick={toggleTheme}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'var(--surface-2)',
                padding: '0.4rem 0.5rem 0.4rem 1rem',
                borderRadius: '2rem',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                userSelect: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                minWidth: '120px'
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            }}
        >
            <span style={{
                fontSize: '0.85rem',
                fontWeight: '700',
                color: 'var(--text-color)',
                letterSpacing: '0.02em',
                flex: 1
            }}>
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </span>

            <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: theme === 'dark' ? '#2c3e50' : '#f1c40f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: theme === 'dark'
                    ? 'inset 0 2px 4px rgba(0,0,0,0.3), 0 0 10px rgba(44, 62, 80, 0.2)'
                    : '0 0 10px rgba(241, 196, 15, 0.4)',
                transform: `rotate(${theme === 'dark' ? '360deg' : '0deg'})`
            }}>
                {theme === 'dark' ? '🌙' : '☀️'}
            </div>
        </div>
    );
};

export default ThemeToggle;
