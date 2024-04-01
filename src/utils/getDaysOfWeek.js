function getDaysOfWeekStartingFromMonday() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const monday = new Date(today); // Copy the current date

  // Find the date of the Monday of the current week
  monday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));

  const daysOfWeek = [];
  // Loop to generate dates for the next 7 days
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(monday);
    nextDay.setDate(monday.getDate() + i);
    daysOfWeek.push(nextDay.toISOString().split("T")[0]); // Format date as 'YYYY-MM-DD'
  }
  return daysOfWeek;
}

export default getDaysOfWeekStartingFromMonday;
