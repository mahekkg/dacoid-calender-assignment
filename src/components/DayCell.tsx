import React from "react";
import { useCalendar } from "../context/CalenderContext";
import { formatDate } from "../utils/dateUtils";

interface DayCellProps {
  date: Date | null;
  isCurrentMonth: boolean;
}

export const DayCell: React.FC<DayCellProps> = ({ date, isCurrentMonth }) => {
  const { events, selectedDate, setSelectedDate } = useCalendar();

  if (!date) return <div className="h-24 bg-gray-100"></div>;

  const isToday = formatDate(date) === formatDate(new Date());
  const isSelected = formatDate(date) === formatDate(selectedDate);
  const dateEvents = events[formatDate(date)] || [];

  return (
    <button
      className={`h-24 w-full p-1 border ${
        isCurrentMonth ? "bg-white" : "bg-gray-100"
      } ${isToday ? "bg-blue-100" : ""} ${
        isSelected ? "ring-2 ring-blue-500" : ""
      } hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      onClick={() => setSelectedDate(date)}
    >
      <div className="flex flex-col h-full">
        <span
          className={`text-sm font-semibold ${
            isCurrentMonth ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {date.getDate()}
        </span>
        <div className="flex-grow overflow-hidden">
          {dateEvents.slice(0, 2).map((event, index) => (
            <div
              key={index}
              className={`text-xs truncate mt-1 ${event.color} text-white rounded px-1`}
            >
              {event.name}
            </div>
          ))}
          {dateEvents.length > 2 && (
            <div className="text-xs text-gray-500 mt-1">
              +{dateEvents.length - 2} more
            </div>
          )}
        </div>
      </div>
    </button>
  );
};
