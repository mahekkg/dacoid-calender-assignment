import React, { useState } from "react";
import { CalendarGrid } from "./CalenderGrid";
import { EventModal } from "./EventModal";
import { Event } from "../types/calendar";
import { useCalendar } from "../context/CalenderContext";
import { EventList } from "./EventList";

export const CalendarPage: React.FC = () => {
  const { selectedDate, setSelectedDate } = useCalendar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(
    undefined
  );
  const [filterKeyword, setFilterKeyword] = useState("");

  const handlePrevMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    );
  };

  const handleAddEvent = () => {
    setSelectedEvent(undefined);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {selectedDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h1>
        <div>
          <button
            onClick={handlePrevMonth}
            className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 mr-2"
          >
            Previous
          </button>
          <button
            onClick={handleNextMonth}
            className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-grow">
          <CalendarGrid
            year={selectedDate.getFullYear()}
            month={selectedDate.getMonth()}
          />
        </div>
        <div className="w-1/3">
          <button
            onClick={handleAddEvent}
            className="w-full mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Event
          </button>
          <input
            type="text"
            placeholder="Filter events..."
            value={filterKeyword}
            onChange={(e) => setFilterKeyword(e.target.value)}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <EventList
            onEditEvent={handleEditEvent}
            filterKeyword={filterKeyword}
          />
        </div>
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};
