import "./RecipeItem.scss";

function RecipeItem({ recipe }) {
  const { name } = recipe;
  return <p className="recipe__item">{name}</p>;
}

export default RecipeItem;
