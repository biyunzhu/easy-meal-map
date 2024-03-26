import "./MealUnit.scss";

function MealUnit({ meal }) {
  const { meal_id, type, recipe_id: recipes } = meal;
  return (
    <section className="meal__unit">
      <p>type: {type}</p>
      <p>meal_id: {meal_id}</p>
      {recipes.map((recipe, index) => (
        <p key={index}>recipes: {recipe}</p>
      ))}
    </section>
  );
}

export default MealUnit;
