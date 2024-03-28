function findRecipeIdByUUID(mealsByDate, recipeUUID) {
  for (const date in mealsByDate) {
    if (mealsByDate.hasOwnProperty(date)) {
      const meals = mealsByDate[date];
      for (const meal of meals) {
        if (meal.recipes) {
          for (const recipe of meal.recipes) {
            if (recipe.recipe_uuid === recipeUUID) {
              return recipe.recipe_id;
            }
          }
        }
      }
    }
  }
  return null; // Return null if recipe with given UUID is not found
}

export default findRecipeIdByUUID;
