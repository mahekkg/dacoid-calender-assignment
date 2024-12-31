export function getDaysInMonth(year: number, month: number): Date[] {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export function getMonthData(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = getDaysInMonth(year, month);

  const startPadding = Array(firstDay.getDay()).fill(null);
  const endPadding = Array(6 - lastDay.getDay()).fill(null);

  return [...startPadding, ...daysInMonth, ...endPadding];
}

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}
