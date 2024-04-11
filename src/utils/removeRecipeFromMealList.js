function removeRcipeFromMealList(mealList, meal_id, index) {
  for (const date in mealList) {
    if (mealList.hasOwnProperty(date)) {
      const meals = mealList[date].meals;
      meals.forEach((meal) => {
        if (
          meal.meal_id === meal_id &&
          meal.recipes &&
          meal.recipes.length > index
        ) {
          meal.recipes.splice(index, 1)[0];
        }
      });
    }
  }
  return mealList;
}

export default removeRcipeFromMealList;
