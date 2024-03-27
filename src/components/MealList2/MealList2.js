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
    const dateKey = meal.date;

    if (!mealsByDate[dateKey]) {
      mealsByDate[dateKey] = [];
    }

    mealsByDate[dateKey].push(meal);
  });

  //   console.log(mealsByDate);
  const [mealList, setMealList] = useState(mealsByDate);
  // console.log(mealList);
  // console.log(meals);

  const handleDragAndDrop = (results) => {
    const { source, destination, draggableId } = results;
    // console.log(source);
    // console.log(destination);
    console.log(results);

    // return when draggable is dropped outside of the droppable area
    if (!destination) return;

    // return when draggable is dropped at the same place as before
    if (
      source.droppableId === destination.droppableId
      // && source.index === destination.index
    )
      return;

    const recipeToAdd = {
      recipe_id: draggableId,
      meal_id: destination.droppableId,
    };
    const recipeToRemove = {
      recipe_id: draggableId,
      meal_id: source.droppableId,
    };
    const sourceMeal = meals.find(
      // (meal) => meal.meal_id === recipeToRemove.meal_id
      (meal) => meal.meal_id === Number(source.droppableId)
    );
    const destinationMeal = meals.find(
      (meal) => meal.meal_id === Number(recipeToAdd.meal_id)
    );
    // console.log("oldMeals: ", meals);
    const newMeals = meals
      .filter((meal) => meal.meal_id !== Number(recipeToRemove.meal_id))
      .filter((meal) => meal.meal_id !== Number(recipeToAdd.meal_id));
    // console.log("oldMeals after filter: ", meals);
    // console.log("newMeals: ", newMeals);
    // Safety checks
    if (!sourceMeal || !destinationMeal) {
      console.error("Source or destination meal not found.");
      return;
    }

    // const newMeals = [...meals];

    // Remove recipeId from sourceMeal
    const sourceRecipeIndex = sourceMeal.recipe_id.indexOf(
      Number(recipeToRemove.recipe_id)
    );

    const destinationRecipeIndex = destination.index;
    // console.log("sourceRecipeIndex: ", sourceRecipeIndex);
    // console.log("destinationRecipeIndex: ", destinationRecipeIndex);
    // console.log("sourceMeal before splice: ", sourceMeal);
    // console.log("destinationMeal before splice: ", destinationMeal);
    const [removedRecipe] = sourceMeal.recipe_id.splice(sourceRecipeIndex, 1);
    // console.log("removedRecipe :", removedRecipe);
    // console.log("sourceMeal after splice: ", sourceMeal);
    // if (sourceRecipeIndex > -1) {
    // sourceMeal.recipe_id.splice(sourceRecipeIndex, 1);
    // } else {
    // console.error("Recipe not found in source meal.");
    // }

    // Add recipeId to destinationMeal if not already present
    if (!destinationMeal.recipe_id.includes(Number(recipeToAdd.recipe_id))) {
      // destinationMeal.recipe_id.push(Number(recipeToAdd.recipe_id));
      destinationMeal.recipe_id.splice(
        destinationRecipeIndex,
        0,
        removedRecipe
      );
    } else {
      console.error("Recipe already exists in destination meal.");
    }
    // console.log("destinationMeal after splice: ", destinationMeal);

    // console.log(sourceMeal);
    // console.log(destinationMeal);

    newMeals.push(sourceMeal);
    newMeals.push(destinationMeal);
    // console.log("newMeals after push: ", newMeals);

    const newMealsByDate = {};
    newMeals.forEach((meal) => {
      const dateKey = meal.date; // Extract date without time

      if (!newMealsByDate[dateKey]) {
        newMealsByDate[dateKey] = [];
      }

      newMealsByDate[dateKey].push(meal);
    });
    setMealList(newMealsByDate);
    // console.log(typeof source.droppableId);
    // const recipeSourceIndex = source.index;
    // const sourceMealRecipes = [...mealList];
    // const recipeDestinationIndex = destination.index;
    // const [removedRecipe] = reorderedMealList.splice

    // const mealSourceIndex = source.droppableId;

    // const mealDestinationIndex = destination.droppableId;

    // const mealForAddedRecipe = destination.droppableId;

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
