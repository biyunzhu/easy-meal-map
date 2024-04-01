function moveRecipeToNewMeal(
  mealsByDate,
  sourceMealId,
  sourceRecipeIndex,
  destinationMealId,
  destinationRecipeIndex
) {
  let sourceRecipe;
  let destinationMeal;

  // Find the recipe in the source meal
  for (const date in mealsByDate) {
    if (mealsByDate.hasOwnProperty(date)) {
      const meals = mealsByDate[date].meals;
      meals.forEach((meal) => {
        if (
          meal.meal_id === sourceMealId &&
          meal.recipes &&
          meal.recipes.length > sourceRecipeIndex
        ) {
          sourceRecipe = meal.recipes.splice(sourceRecipeIndex, 1)[0];
          console.log(sourceRecipe);
        }
      });
    }
  }

  // Find the destination meal
  for (const date in mealsByDate) {
    if (mealsByDate.hasOwnProperty(date)) {
      const meals = mealsByDate[date].meals;
      meals.forEach((meal) => {
        if (meal.meal_id === destinationMealId) {
          destinationMeal = meal;
          console.log(destinationMeal);
        }
      });
    }
  }

  // Insert the recipe into the destination meal at the new index
  if (sourceRecipe && destinationMeal) {
    destinationMeal.recipes.splice(destinationRecipeIndex, 0, sourceRecipe);
  }

  return mealsByDate;
}

export default moveRecipeToNewMeal;
