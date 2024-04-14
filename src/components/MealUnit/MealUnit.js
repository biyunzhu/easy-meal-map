import "./MealUnit.scss";
import axios from "axios";
import MealRecipe from "../MealRecipe/MealRecipe";
import { BASE_URL } from "../../constant-variables";
import { Droppable } from "react-beautiful-dnd";
import addIcon from "../../assets/icons/add_create_new_plus_positive_icon.svg";
import addRecipeForMeal from "../../utils/addRecipeForMeal";

function MealUnit({
  meal,
  mealList,
  setMealList,
  buttonStatus,
  setButtonStatus,
}) {
  const handleAdd = () => {
    // Add new random recipe to meal
    const addRandomRecipe = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/meals/auto/${meal.meal_id}`
        );
        const newRecipe = response.data;
        // Update meal list
        const newMealList = addRecipeForMeal(mealList, meal.meal_id, newRecipe);
        setMealList(newMealList);
        setButtonStatus(!buttonStatus);
      } catch (error) {
        console.error(error);
      }
    };
    addRandomRecipe();
  };
  return (
    <Droppable droppableId={`${meal.meal_id}`} type="meal" key={meal.meal_uuid}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <li key={meal.meal_id}>
            <div className="meal__type">{meal.type}</div>
            {meal.recipes.map((recipe, index) => (
              <MealRecipe
                recipe={recipe}
                index={index}
                mealList={mealList}
                meal_id={meal.meal_id}
                setMealList={setMealList}
                buttonStatus={buttonStatus}
                setButtonStatus={setButtonStatus}
              />
            ))}
            {provided.placeholder}
            <div className="meal-add-recipe" onClick={handleAdd}>
              <img
                src={addIcon}
                alt="generate recipe"
                className="meal-add-recipe__icon"
              />
              <p className="meal-add-recipe__message">Add random recipe</p>
            </div>
          </li>
        </div>
      )}
    </Droppable>
  );
}

export default MealUnit;
