"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { Event, CalendarContextType } from "../types/calendar";
import { formatDate } from "../utils/dateUtils";

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<Record<string, Event[]>>({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const addEvent = (date: string, event: Event) => {
    setEvents((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), event],
    }));
  };

  const updateEvent = (date: string, updatedEvent: Event) => {
    setEvents((prev) => ({
      ...prev,
      [date]: prev[date].map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      ),
    }));
  };

  const deleteEvent = (date: string, eventId: string) => {
    setEvents((prev) => ({
      ...prev,
      [date]: prev[date].filter((event) => event.id !== eventId),
    }));
  };

  return (
    <CalendarContext.Provider
      value={{
        events,
        selectedDate,
        setSelectedDate,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};
