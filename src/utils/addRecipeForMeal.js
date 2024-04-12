function addRecipeForMeal(mealList, meal_id, new_recipe) {
  for (const date in mealList) {
    if (mealList.hasOwnProperty(date)) {
      const meals = mealList[date].meals;
      meals.forEach((meal) => {
        if (meal.meal_id === meal_id && meal.recipes) {
          meal.recipes.splice(meal.recipes.length - 1, 0, new_recipe);
        }
      });
    }
  }
  return mealList;
}

export default addRecipeForMeal;
