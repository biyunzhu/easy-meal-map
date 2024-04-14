function trackerDataFormater(meals) {
  // Function to get day name from day number
  function getDayName(dayNumber) {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return daysOfWeek[dayNumber];
  }

  // Iterate over dates
  return meals.reduce((acc, meal) => {
    let date = meal.date.split("T")[0]; // Extracting date in YYYY-MM-DD format
    const dayName = getDayName(new Date(date).getDay());
    if (!acc[date]) {
      acc[date] = {
        day: dayName,
        meals: [],
      };
    }

    acc[date].meals.push({
      meal_id: meal.meal_id,
      type: meal.type,
      recipes: meal.recipes,
    });

    return acc;
  }, {});
}

export default trackerDataFormater;
