import { v4 as uuid } from "uuid";

function mealsDataFormater(meals) {
  const mealsByDate = {};
  function getTypeName(type) {
    switch (type) {
      case 1:
        return "Breakfast";
      case 2:
        return "Lunch";
      case 3:
        return "Dinner";
      default:
        return "Unknown";
    }
  }

  meals.forEach((meal) => {
    const { meal_id, date, type, recipes } = meal;
    // Extracting date part only
    // const mealDate = date.split("T")[0];
    const mealDate = date;

    if (!mealsByDate.hasOwnProperty(mealDate)) {
      mealsByDate[mealDate] = [];
    }

    const transformedRecipes = recipes.map((recipe) => ({
      ...recipe,
      recipe_uuid: uuid(), // Generate UUID for each recipe
    }));

    mealsByDate[mealDate].push({
      date_uuid: uuid(),
      meal_id,
      date,
      type: getTypeName(type),
      recipes: transformedRecipes,
    });
  });

  return mealsByDate;
}

export default mealsDataFormater;
