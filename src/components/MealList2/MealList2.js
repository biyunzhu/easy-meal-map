import "./MealList2.scss";
import MealItem from "../MealItem2/MealItem2";
import { BASE_URL } from "../../constant-variables";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import axios from "axios";

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
  const [mealList, setMealList] = useState(mealsByDate);

  const handleDragAndDrop = (results) => {
    const { source, destination, draggableId } = results;
    // console.log(source);
    // console.log(destination);
    console.log(results);

    // return when draggable is dropped outside of the droppable area
    if (!destination) return;

    // return when draggable is dropped at the same place as before
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // const recipeSourceIndex = source.index;
    // const recipeDestinationIndex = destination.index;
    // const reorderedMealList = [...mealList];

    // const mealSourceIndex = source.droppableId;

    // const mealDestinationIndex = destination.droppableId;

    // const mealForAddedRecipe = destination.droppableId;

    const addRcipeToMeal = async () => {
      const recipeToAdd = {
        recipe_id: draggableId,
        meal_id: destination.droppableId,
      };
      // console.log(recipeToAdd);
      const response = await axios.post(`${BASE_URL}/meals`, recipeToAdd);
      try {
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    addRcipeToMeal();

    const removeRcipeFromMeal = async () => {
      const recipeToRemove = {
        recipe_id: draggableId,
        meal_id: source.droppableId,
      };
      // console.log(recipeToRemove);

      const response = await axios.delete(
        `${BASE_URL}/meals?meal_id=${recipeToRemove.meal_id}&recipe_id=${recipeToRemove.recipe_id}`
      );
      try {
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    removeRcipeFromMeal();
  };

  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <section className="board">
        {/* Render meals grouped by date */}
        {Object.keys(mealList).map((date) => (
          <div key={date}>
            <p>{date.split("T")[0]}</p>
            <ul>
              {mealList[date].map((meal) => (
                <Droppable
                  droppableId={`${meal.meal_id}`}
                  type="meal"
                  key={meal.meal_id}
                >
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
