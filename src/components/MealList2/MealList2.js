import "./MealList2.scss";
import MealItem from "../MealItem2/MealItem2";
import { BASE_URL } from "../../constant-variables";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import axios from "axios";
import mealsDataFormater from "../../utils/mealsDataFormator";
import moveRecipeToNewMeal from "../../utils/moveRecipeToNewMeal";
import findRecipeIdByUUID from "../../utils/findRecipeIdByUuid";

function MealList2({ meals }) {
  console.log(meals);

  const [mealList, setMealList] = useState({});

  // useEffect(() => {
  //   if (!!meals) {
  //     setMealList(mealsDataFormater(meals));
  //   }
  // }, []);

  const handleClick = () => {
    setMealList(mealsDataFormater(meals));
  };

  const handleDragAndDrop = (results) => {
    const { source, destination, draggableId } = results;
    console.log(mealList);

    // return when draggable is dropped outside of the droppable area
    if (!destination) return;

    // return when draggable is dropped at the same place as before
    if (
      source.droppableId === destination.droppableId
      // && source.index === destination.index
    )
      return;

    // get new data for the changed position of recipe
    const newMealList = moveRecipeToNewMeal(
      mealList,
      Number(source.droppableId),
      source.index,
      Number(destination.droppableId),
      destination.index
    );

    // update state for the front-end
    setMealList(newMealList);

    const recipeMoved = findRecipeIdByUUID(mealList, draggableId);

    // data to post for backend
    const recipeToAdd = {
      recipe_id: recipeMoved,
      meal_id: destination.droppableId,
    };
    const recipeToRemove = {
      recipe_id: recipeMoved,
      meal_id: source.droppableId,
    };

    // Add new meal & recipe pair in database
    const addRcipeToMeal = async () => {
      // console.log(recipeToAdd);
      try {
        const response = await axios.post(`${BASE_URL}/meals`, recipeToAdd);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    addRcipeToMeal();

    // Remove old meal & recipe pair from database
    const removeRcipeFromMeal = async () => {
      // console.log(recipeToRemove);

      try {
        const response = await axios.delete(
          `${BASE_URL}/meals?meal_id=${recipeToRemove.meal_id}&recipe_id=${recipeToRemove.recipe_id}`
        );
        console.log("Deleted");
      } catch (error) {
        console.error(error);
      }
    };
    removeRcipeFromMeal();
  };

  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <button onClick={handleClick}>Auto generate</button>
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
                  key={meal.meal_uuid}
                >
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <li key={meal.meal_id}>
                        <div>{meal.type}</div>
                        {meal.recipes.map((recipe, index) => (
                          <Draggable
                            draggableId={`${recipe.recipe_uuid}`}
                            key={recipe.recipe_uuid}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                              >
                                {recipe.recipe_id}
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
