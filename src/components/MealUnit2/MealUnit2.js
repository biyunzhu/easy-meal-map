import "./MealUnit2.scss";
import { Draggable } from "react-beautiful-dnd";

function MealUnit2({ id, index }) {
  //   const { meal_id, type, recipe_id: recipes } = meal;
  return (
    <Draggable draggableId={`${id}`} key={id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <p>{id}</p>
        </div>
      )}
    </Draggable>
  );
}

export default MealUnit2;

{
  /* <section className="meal__unit">
      <p>type: {type}</p>
      <p>meal_id: {meal_id}</p>
      {recipes.map((recipe, index) => (
        <p key={index}>recipes: {recipe}</p>
      ))}
    </section> */
}
