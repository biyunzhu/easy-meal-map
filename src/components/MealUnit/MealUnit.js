import MealRecipe from "../MealRecipe/MealRecipe";
import "./MealUnit.scss";
import { Droppable } from "react-beautiful-dnd";

function MealUnit({ meal }) {
  //   const { meal_id, type, recipe_id: recipes } = meal;
  return (
    <Droppable droppableId={`${meal.meal_id}`} type="meal" key={meal.meal_uuid}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <li key={meal.meal_id}>
            <div className="meal__type">{meal.type}</div>
            {meal.recipes.map((recipe, index) => (
              <MealRecipe recipe={recipe} index={index} />
              // <Draggable
              //   draggableId={`${recipe.recipe_uuid}`}
              //   key={recipe.recipe_uuid}
              //   index={index}
              // >
              //   {(provided) => (
              //     <div
              //       className="recipe"
              //       {...provided.dragHandleProps}
              //       {...provided.draggableProps}
              //       ref={provided.innerRef}
              //     >
              //       <a href={recipe.recipe_url} target="_blank">
              //         {recipe.recipe_id}
              //       </a>
              //     </div>
              //   )}
              // </Draggable>
            ))}
            {provided.placeholder}
          </li>
        </div>
      )}
    </Droppable>
  );
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
