import React from "react";
import { DayCell } from "./DayCell";
import { getMonthData } from "../utils/dateUtils";

interface CalendarGridProps {
  year: number;
  month: number;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ year, month }) => {
  const monthData = getMonthData(year, month);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="grid grid-cols-7 gap-1">
      {weekdays.map((day) => (
        <div key={day} className="text-center font-semibold p-2">
          {day}
        </div>
      ))}
      {monthData.map((date, index) => (
        <DayCell
          key={index}
          date={date}
          isCurrentMonth={date ? date.getMonth() === month : false}
        />
      ))}
    </div>
  );
};
