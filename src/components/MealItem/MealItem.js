import "./MealItem.scss";
import MealUnit from "../MealUnit/MealUnit";

function MealItem({ meal }) {
  //   const { date } = meal;
  return (
    <div>
      {/* Render meal information */}
      {/* <div>{`Meal ID: ${meal.meal_id}`}</div> */}
      <div>{`Type: ${meal.type}`}</div>
      {/* <div>{`Recipe IDs: ${meal.recipe_id}`}</div> */}
      {meal.recipe_id.map((id, index) => (
        <MealUnit id={id} key={index} />
      ))}
    </div>
  );
}

export default MealItem;

{
  /* <section className="meal__item">
      <p>{date.split("T")[0]}</p>
      <MealUnit meal={meal} />
    </section> */
}
