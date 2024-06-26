import { v4 as uuid } from "uuid";
import getDaysOfWeekStartingFromMonday from "./getDaysOfWeek";

function mealsDataFormater(meals) {
  const mealsByDate = {};
  const datesForThisWeek = getDaysOfWeekStartingFromMonday();

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

  // Iterate over dates for this week
  datesForThisWeek.forEach((date) => {
    const matchingMeals = meals.filter(
      (meal) => meal.date.split("T")[0] === date
    );
    if (matchingMeals.length > 0) {
      // If meals exist for the current date
      const dayName = getDayName(new Date(date).getDay());
      if (!mealsByDate[date]) {
        mealsByDate[date] = {
          // date: new Date(date),
          date_uuid: uuid(),
          day: dayName,
          meals: [],
        };
      }
      for (let type = 1; type <= 3; type++) {
        const matchingMeal = matchingMeals.find((meal) => meal.type === type);
        if (matchingMeal) {
          // If meal of current type exists, add it to mealsByDate
          const transformedRecipes = matchingMeal.recipes.map((recipe) => ({
            ...recipe,
            recipe_uuid: uuid(), // Generate UUID for each recipe
          }));
          mealsByDate[date].meals.push({
            meal_id: matchingMeal.meal_id,
            type: getTypeName(matchingMeal.type),
            recipes: transformedRecipes,
          });
        } else {
          // If meal of current type doesn't exist, add a placeholder
          mealsByDate[date].meals.push({
            meal_id: null,
            type: getTypeName(type),
            recipes: [],
          });
        }
      }
    } else {
      // If no meals exist for the current date, add placeholders for all types
      const dayName = getDayName(new Date(date).getDay());
      mealsByDate[date] = {
        date_uuid: uuid(),
        day: dayName,
        meals: [],
      };
      for (let type = 1; type <= 3; type++) {
        mealsByDate[date].meals.push({
          meal_id: null,
          type: getTypeName(type),
          recipes: [],
        });
      }
    }
  });

  return mealsByDate;
}

export default mealsDataFormater;
