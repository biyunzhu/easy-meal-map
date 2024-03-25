import "./MealUnit.scss";

function MealUnit({ meal }) {
  const { meal_id, type, recipe_id: recipes } = meal;
  return (
    <section className="meal__unit">
      <p>{type}</p>
      <p>{meal_id}</p>
      <p>{recipes}</p>
    </section>
  );
}

export default MealUnit;
