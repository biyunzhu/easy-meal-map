import "./Tracker.scss";
import axios from "axios";
import { BASE_URL } from "../../constant-variables";
import { useEffect, useState } from "react";
import trackerDataFormater from "../../utils/trackerDataFormator";

function Tracker() {
  const [mealList, setMealList] = useState({});
  // get meals data on mount
  useEffect(() => {
    const getMealList = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/meals`);
        setMealList(trackerDataFormater(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    getMealList();
  }, []);
  return (
    <section className="tracker">
      <h1 className="tracker__title">Meal Tracker</h1>
      <section className="tracker__table">
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
                    <div className="meal-recipe" key={index}>
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
