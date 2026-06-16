import React, { createContext, useState } from 'react';
import { MOCK_EVENTS } from '../mockData';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState(MOCK_EVENTS);
    const [loading] = useState(false);
    const [error] = useState(null);

    const addEvent = (newEvent) => {
        const event = { ...newEvent, id: Date.now(), slug: `event-${Date.now()}` };
        setEvents(prev => [event, ...prev]);
        return event;
    };

    const updateEvent = (updatedEvent) => {
        setEvents(prev => prev.map(e => e.id === updatedEvent.id ? { ...e, ...updatedEvent } : e));
        return updatedEvent;
    };

    const deleteEvent = (eventSlug) => {
        setEvents(prev => prev.filter(e => e.slug !== eventSlug));
    };

    const registerForEvent = (registrationData) => {
        // In frontend-only mode, just return a mock success response
        return Promise.resolve({ data: { id: Date.now(), ...registrationData } });
    };

    const getEventById = (eventId) => events.find(e => e.id === parseInt(eventId));

    return (
        <EventContext.Provider value={{
            events,
            loading,
            error,
            addEvent,
            updateEvent,
            deleteEvent,
            registerForEvent,
            getEventById,
            refreshEvents: () => { }
        }}>
            {children}
        </EventContext.Provider>
    );
};
