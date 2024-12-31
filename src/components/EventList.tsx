import React from "react";
import { useCalendar } from "../context/CalenderContext";
import { formatDate } from "../utils/dateUtils";
import { Event } from "../types/calendar";

interface EventListProps {
  onEditEvent: (event: Event) => void;
  filterKeyword: string;
}

export const EventList: React.FC<EventListProps> = ({
  onEditEvent,
  filterKeyword,
}) => {
  const { events, selectedDate } = useCalendar();
  const dateEvents = events[formatDate(selectedDate)] || [];

  const filteredEvents = dateEvents.filter((event) =>
    event.name.toLowerCase().includes(filterKeyword.toLowerCase())
  );

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">
        Events for {selectedDate.toDateString()}
      </h2>
      <div className="max-h-[300px] overflow-y-auto">
        {filteredEvents.length === 0 ? (
          <p>No events for this day.</p>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`mb-2 p-2 border rounded ${event.color}`}
            >
              <h3 className="font-semibold text-white">{event.name}</h3>
              <p className="text-sm text-white">
                {event.startTime} - {event.endTime}
              </p>
              {event.description && (
                <p className="text-sm mt-1 text-white">{event.description}</p>
              )}
              <button
                className="mt-2 px-2 py-1 bg-white text-gray-800 rounded text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-current focus:ring-white"
                onClick={() => onEditEvent(event)}
              >
                Edit
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
