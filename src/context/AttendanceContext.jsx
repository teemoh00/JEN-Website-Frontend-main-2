import React, { createContext, useState } from 'react';
import { MOCK_ATTENDANCE_ANALYTICS } from '../mockData';

export const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
    const [analyticsData] = useState(MOCK_ATTENDANCE_ANALYTICS);
    const [loading] = useState(false);
    const [error] = useState(null);
    const [period, setPeriod] = useState('This Month');

    const refreshAnalytics = () => {
        // No-op in frontend-only mode
    };

    return (
        <AttendanceContext.Provider value={{
            analyticsData,
            loading,
            error,
            period,
            setPeriod,
            refreshAnalytics
        }}>
            {children}
        </AttendanceContext.Provider>
    );
};
