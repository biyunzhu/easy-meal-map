import "./Tracker.scss";
import { useEffect, useState } from "react";
import mealsDataFormater from "../../utils/mealsDataFormator";

function Tracker({ meals }) {
  const [mealList, setMealList] = useState({});
  // const [buttonStatus, setButtonStatus] = useState(false);
  // get meals data on mount
  useEffect(() => {
    if (!!meals) {
      setMealList(mealsDataFormater(meals));
    }
  }, []);
  return (
    <section className="tracker">
      <h1 className="tracker__title">Meal Tracker</h1>
      <section className="tracker__table">
        {/* Render meals grouped by date */}
        <div className="tracker__header">
          <p className="tracker__heading">Breakfast</p>
          <p className="tracker__heading">Lunch</p>
          <p className="tracker__heading">Dinner</p>
        </div>
        {Object.keys(mealList).map((date) => (
          <div key={date} className="meal__row">
            <div className="meal__date-container">
              <p className="meal__date">{date}</p>
              <p>{mealList[date].day}</p>
            </div>
            <ul className="meal__list">
              {mealList[date].meals.map((meal) => (
                <li key={meal.meal_id} className="meal__item">
                  {meal.recipes.map((recipe, index) => (
                    <div className="meal-recipe" key={recipe.recipe_uuid}>
                      <a href={recipe.recipe_url} target="_blank">
                        {recipe.recipe_name}
                      </a>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </section>
  );
}

export default Tracker;
