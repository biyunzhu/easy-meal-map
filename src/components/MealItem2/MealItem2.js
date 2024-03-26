import "./MealItem2.scss";
import MealUnit from "../MealUnit2/MealUnit2";
import { Droppable } from "react-beautiful-dnd";

function MealItem2({ meal }) {
  //   const { date } = meal;
  return (
    <div>
      <div>{`Type: ${meal.type}`}</div>
      <Droppable droppableId={`${meal.meal_id}`}>
        {(provided) => {
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {meal.recipe_id.map((id, index) => (
              <MealUnit id={id} key={index} index={index} />
            ))}
            {provided.placeholder}
          </div>;
        }}
      </Droppable>
    </div>
  );
}

export default MealItem2;

{
  /* <section className="meal__item">
      <p>{date.split("T")[0]}</p>
      <MealUnit meal={meal} />
    </section> */
}
