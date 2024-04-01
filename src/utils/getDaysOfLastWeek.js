function getDaysStartingFromDate(startDate) {
  const daysOfWeek = [];
  const start = new Date(startDate);

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(start);
    nextDay.setDate(start.getDate() + i);
    daysOfWeek.push(nextDay.toISOString().split("T")[0]); // Format date as 'YYYY-MM-DD'
  }

  return daysOfWeek;
}

export default getDaysStartingFromDate;
