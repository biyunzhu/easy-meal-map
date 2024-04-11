import "./MealRecipe.scss";
import axios from "axios";
import { Draggable } from "react-beautiful-dnd";
import { BASE_URL } from "../../constant-variables";
import changeIcon from "../../assets/icons/refresh_reload_repeat_rotate_sync_icon.svg";
import deleteIcon from "../../assets/icons/delete_dustbin_garbage_recycle bin_trash can_icon.svg";
import removeRcipeFromMealList from "../../utils/removeRecipeFromMealList";
import changeRecipeForMeal from "../../utils/changeRecipeForMeal";

function MealRecipe({
  recipe,
  index,
  mealList,
  meal_id,
  setMealList,
  buttonStatus,
  setButtonStatus,
}) {
  const handleChange = () => {
    // remove recipe from meal
    // const mealList = removeRcipeFromMealList(mealList, meal_id, index);

    // Remove old meal & recipe pair from database
    const removeRcipeFromMeal = async () => {
      try {
        const response = await axios.delete(
          `${BASE_URL}/meals?meal_id=${meal_id}&recipe_id=${recipe.recipe_id}`
        );
      } catch (error) {
        console.error(error);
      }
    };
    removeRcipeFromMeal();

    const addRandomRecipe = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/meals/auto/${meal_id}`);
        const newRecipe = response.data;
        //
        const newMealList = changeRecipeForMeal(
          mealList,
          meal_id,
          index,
          newRecipe
        );
        setMealList(newMealList);
        setButtonStatus(!buttonStatus);
      } catch (error) {
        console.error(error);
      }
    };
    addRandomRecipe();
  };
  const handleDelete = () => {
    // remove recipe from meal
    const newMealList = removeRcipeFromMealList(mealList, meal_id, index);

    // Remove old meal & recipe pair from database
    const removeRcipeFromMeal = async () => {
      try {
        const response = await axios.delete(
          `${BASE_URL}/meals?meal_id=${meal_id}&recipe_id=${recipe.recipe_id}`
        );
        setMealList(newMealList);
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
          <div className="meal-recipe__icons">
            <img
              src={changeIcon}
              onClick={handleChange}
              className="meal-recipe__icon"
            />
            <img
              src={deleteIcon}
              onClick={handleDelete}
              className="meal-recipe__icon"
            />
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default MealRecipe;
