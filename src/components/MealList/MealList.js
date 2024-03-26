import "./MealList.scss";
import MealItem from "../MealItem/MealItem";

function MealList({ meals }) {
  // Group meals by date
  const mealsByDate = {};

  meals.forEach((meal) => {
    const dateKey = meal.date; // Extract date without time

    if (!mealsByDate[dateKey]) {
      mealsByDate[dateKey] = [];
    }

    mealsByDate[dateKey].push(meal);
  });

  //   console.log(mealsByDate);

  return (
    <section className="home">
      <h1>Easy Meal Map</h1>
      <section className="board">
        {/* Render meals grouped by date */}
        {Object.keys(mealsByDate).map((date) => (
          <div key={date}>
            <p>{date.split("T")[0]}</p>

            {mealsByDate[date].map((meal) => (
              <MealItem meal={meal} key={meal.meal_id} />
            ))}
          </div>
        ))}
      </section>
    </section>
  );
  //   return (
  //     <section className="meal__list">
  //       {meals.map((meal, index) => (
  //         <MealItem meal={meal} key={index} />
  //       ))}
  //     </section>
  //   );
}

export default MealList;
