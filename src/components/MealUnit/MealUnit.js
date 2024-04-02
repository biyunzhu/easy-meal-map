import "./MealUnit.scss";
import MealRecipe from "../MealRecipe/MealRecipe";
import { Droppable } from "react-beautiful-dnd";

function MealUnit({
  meal,
  mealList,
  setMealList,
  buttonStatus,
  setButtonStatus,
}) {
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
          </li>
        </div>
      )}
    </Droppable>
  );
}

export default MealUnit;
