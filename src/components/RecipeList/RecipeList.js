import "./RecipeList.scss";
import RecipeItem from "../RecipeItem/RecipeItem";

function RecipeList({ recipes }) {
  return (
    <section className="recipe__nav">
      {recipes.map((recipe) => (
        <RecipeItem recipe={recipe} key={recipe.id} />
      ))}
    </section>
  );
}

export default RecipeList;
