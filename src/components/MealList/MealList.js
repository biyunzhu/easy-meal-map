import "./MealList.scss";
import MealItem from "../MealItem/MealItem";

function MealList({ meals }) {
  return (
    <section className="meal__list">
      {meals.map((meal, index) => (
        <MealItem meal={meal} key={index} />
      ))}
    </section>
  );
}

export default MealList;
