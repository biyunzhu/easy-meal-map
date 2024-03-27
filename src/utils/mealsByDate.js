function mealsByDate(meals) {
  const mealsByDate = {};
  meals.forEach((meal) => {
    const dateKey = meal.date;

    if (!mealsByDate[dateKey]) {
      mealsByDate[dateKey] = [];
    }

    mealsByDate[dateKey].push(meal);

    return mealsByDate;
  });
}

export default mealsByDate;
