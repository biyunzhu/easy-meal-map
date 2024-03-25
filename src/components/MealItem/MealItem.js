import "./MealItem.scss";
import MealUnit from "../MealUnit/MealUnit";

function MealItem({ meal }) {
  const { date } = meal;
  return (
    <section className="meal__item">
      <p>{date.split("T")[0]}</p>
      <MealUnit meal={meal} />
    </section>
  );
}

export default MealItem;
