function mealsDataFormater(meals) {
  //   const mealsByDate = {};
  //   meals.forEach((meal) => {
  //     const dateKey = meal.date;

  //     if (!mealsByDate[dateKey]) {
  //       mealsByDate[dateKey] = [];
  //     }

  //     mealsByDate[dateKey].push(meal);

  //     return mealsByDate;
  //   });
  // }

  const datesForThisWeek = [
    "2024-03-20",
    "2024-03-21",
    "2024-07-03",
    "2024-08-12",
    "2024-09-25",
  ];

  // Initialize mealsByDate with each date having placeholders for each meal type
  let mealsByDate = datesForThisWeek.reduce((acc, date) => {
    acc[date] = [{ type: 1 }, { type: 2 }, { type: 3 }]; // Assuming types 1, 2, 3 as placeholders
    return acc;
  }, {});

  // Function to extract just the date part from the datetime string
  const extractDate = (datetime) => datetime.split("T")[0];

  // Populate the mealsByDate object with actual meals data
  meals.forEach((meal) => {
    const mealDate = extractDate(meal.date);
    if (mealsByDate.hasOwnProperty(mealDate)) {
      // Check if the meal type already exists in the array for this date
      const index = mealsByDate[mealDate].findIndex(
        (placeHolder) => placeHolder.type === meal.type
      );
      if (index !== -1) {
        // Replace the placeholder with the actual meal data
        mealsByDate[mealDate][index] = {
          meal_id: meal.meal_id,
          type: meal.type,
          recipe_id: meal.recipe_id,
        };
      } else {
        // This case handles if you have more meal types than placeholders
        mealsByDate[mealDate].push({
          meal_id: meal.meal_id,
          type: meal.type,
          recipe_id: meal.recipe_id,
        });
      }
    }
  });

  // Clean up: Remove placeholders for dates where meals are available but keep placeholders for empty dates
  Object.keys(mealsByDate).forEach((date) => {
    if (mealsByDate[date].every((meal) => meal.hasOwnProperty("meal_id"))) {
      // All meals for this date are actual meals, not placeholders
      mealsByDate[date] = mealsByDate[date].filter((meal) =>
        meal.hasOwnProperty("meal_id")
      );
    }
  });

  return mealsByDate;
}

export default mealsDataFormater;
