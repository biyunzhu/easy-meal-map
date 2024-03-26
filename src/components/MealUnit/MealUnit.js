import "./MealUnit.scss";

function MealUnit({ id }) {
  //   const { meal_id, type, recipe_id: recipes } = meal;
  return <p>{id}</p>;
}

export default MealUnit;

{
  /* <section className="meal__unit">
      <p>type: {type}</p>
      <p>meal_id: {meal_id}</p>
      {recipes.map((recipe, index) => (
        <p key={index}>recipes: {recipe}</p>
      ))}
    </section> */
}
