const mealsByDate = {};
meals.forEach((meal) => {
  const dateKey = meal.date;

  if (!mealsByDate[dateKey]) {
    mealsByDate[dateKey] = [];
  }

  mealsByDate[dateKey].push(meal);
});
