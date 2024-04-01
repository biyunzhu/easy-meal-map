import "./MealRecipe.scss";
import { Draggable } from "react-beautiful-dnd";

function MealRecipe({ recipe, index }) {
  return (
    <Draggable
      draggableId={`${recipe.recipe_uuid}`}
      key={recipe.recipe_uuid}
      index={index}
    >
      {(provided) => (
        <div
          className="recipe"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <a href={recipe.recipe_url} target="_blank">
            {recipe.recipe_id}
          </a>
        </div>
      )}
    </Draggable>
  );
}

export default MealRecipe;
