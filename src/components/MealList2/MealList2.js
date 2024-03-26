import "./MealList2.scss";
import MealItem from "../MealItem2/MealItem2";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function MealList2({ meals }) {
  // Group meals by date
  const mealsByDate = {};

  meals.forEach((meal) => {
    const dateKey = meal.date; // Extract date without time

    if (!mealsByDate[dateKey]) {
      mealsByDate[dateKey] = [];
    }

    mealsByDate[dateKey].push(meal);
  });

  //   console.log(mealsByDate);

  return (
    <DragDropContext
      onDragEnd={() => {
        console.log("dragged");
      }}
    >
      <section className="board">
        {/* Render meals grouped by date */}
        {Object.keys(mealsByDate).map((date) => (
          <div key={date}>
            <p>{date.split("T")[0]}</p>
            <ul>
              {mealsByDate[date].map((meal) => (
                <Droppable droppableId={`${meal.meal_id}`} key={meal.meal_id}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <li key={meal.meal_id}>
                        {/* Render meal information */}
                        {/* <div>{`Meal ID: ${meal.meal_id}`}</div> */}
                        <div>{`Type: ${meal.type}`}</div>
                        {/* <div>{`Recipe IDs: ${meal.recipe_id}`}</div> */}
                        {meal.recipe_id.map((id, index) => (
                          <Draggable
                            draggableId={`${id}`}
                            key={index}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                              >
                                {id}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </li>
                    </div>
                  )}
                </Droppable>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </DragDropContext>
  );
}

export default MealList2;

//   return (
//     <section className="meal__list">
//       {meals.map((meal, index) => (
//         <MealItem meal={meal} key={index} />
//       ))}
//     </section>
//   );

{
  /* <DragDropContext
      onDragEnd={() => {
        console.log("dragged");
      }}
    >
      <section className="meal__list">
        {Object.keys(mealsByDate).map((date) => (
          <div key={date}>
            <p>{date.split("T")[0]}</p>

            {mealsByDate[date].map((meal) => (
              <MealItem meal={meal} key={meal.meal_id} />
            ))}
          </div>
        ))}
      </section>
    </DragDropContext> */
}
