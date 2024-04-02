import "./MealRecipe.scss";
import axios from "axios";
import { Draggable } from "react-beautiful-dnd";
import { BASE_URL } from "../../constant-variables";
import findRecipeIdByUUID from "../../utils/findRecipeIdByUuid";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";

function MealRecipe({
  recipe,
  index,
  mealList,
  meal_id,
  setMealList,
  buttonStatus,
  setButtonStatus,
}) {
  const handleDelete = () => {
    const recipeToDelete = findRecipeIdByUUID(mealList, recipe.recipe_uuid);

    // remove recipe from meal
    for (const date in mealList) {
      if (mealList.hasOwnProperty(date)) {
        const meals = mealList[date].meals;
        meals.forEach((meal) => {
          if (
            meal.meal_id === meal_id &&
            meal.recipes &&
            meal.recipes.length > index
          ) {
            meal.recipes.splice(index, 1)[0];
          }
        });
      }
    }
    setMealList(mealList);

    // Remove old meal & recipe pair from database
    const removeRcipeFromMeal = async () => {
      try {
        const response = await axios.delete(
          `${BASE_URL}/meals?meal_id=${meal_id}&recipe_id=${recipeToDelete}`
        );
        setButtonStatus(!buttonStatus);
      } catch (error) {
        console.error(error);
      }
    };
    removeRcipeFromMeal();
  };
  return (
    <Draggable
      draggableId={`${recipe.recipe_uuid}`}
      key={recipe.recipe_uuid}
      index={index}
    >
      {(provided) => (
        <div
          className="meal-recipe"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <a href={recipe.recipe_url} target="_blank">
            {recipe.recipe_name}
          </a>
          <img
            src={deleteIcon}
            onClick={handleDelete}
            className="meal-recipe__delete"
          />
        </div>
      )}
    </Draggable>
  );
}

export default MealRecipe;
