import "./MealItem.scss";

function MealItem({ meal }) {
  const { meal_id, date, type, recipe_id } = meal;
  return (
    <>
      <p>{meal_id}</p>
      <p>{date}</p>
      <p>{type}</p>
      <p>{recipe_id}</p>
    </>
  );
}

export default MealItem;
