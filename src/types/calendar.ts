export interface Event {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  description?: string;
  color: string;
}

export interface CalendarContextType {
  events: Record<string, Event[]>;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  addEvent: (date: string, event: Event) => void;
  updateEvent: (date: string, event: Event) => void;
  deleteEvent: (date: string, eventId: string) => void;
}
