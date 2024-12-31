import React, { useState, useEffect } from "react";
import { useCalendar } from "../context/CalenderContext";
import { Event } from "../types/calendar";
import { formatDate } from "../utils/dateUtils";

const colorOptions = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
];

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: Event;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const { addEvent, updateEvent, deleteEvent, selectedDate } = useCalendar();
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(colorOptions[0]);

  useEffect(() => {
    if (event) {
      setName(event.name);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setDescription(event.description || "");
      setColor(event.color);
    } else {
      setName("");
      setStartTime("");
      setEndTime("");
      setDescription("");
      setColor(colorOptions[0]);
    }
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: Event = {
      id: event ? event.id : Date.now().toString(),
      name,
      startTime,
      endTime,
      description,
      color,
    };

    if (event) {
      updateEvent(formatDate(selectedDate), newEvent);
    } else {
      addEvent(formatDate(selectedDate), newEvent);
    }
    onClose();
  };

  const handleDelete = () => {
    if (event) {
      deleteEvent(formatDate(selectedDate), event.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {event ? "Edit Event" : "Add Event"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="start-time"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <input
              type="time"
              id="start-time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="end-time"
              className="block text-sm font-medium text-gray-700"
            >
              End Time
            </label>
            <input
              type="time"
              id="end-time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <div className="mt-2 flex space-x-2">
              {colorOptions.map((colorOption) => (
                <button
                  key={colorOption}
                  type="button"
                  className={`w-6 h-6 rounded-full ${colorOption} ${
                    color === colorOption
                      ? "ring-2 ring-offset-2 ring-indigo-500"
                      : ""
                  }`}
                  onClick={() => setColor(colorOption)}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            {event && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {event ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
