import "./MealList.scss";
import { BASE_URL } from "../../constant-variables";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import axios from "axios";
import mealsDataFormater from "../../utils/mealsDataFormator";
import moveRecipeToNewMeal from "../../utils/moveRecipeToNewMeal";
import findRecipeIdByUUID from "../../utils/findRecipeIdByUuid";
import MealUnit from "../MealUnit/MealUnit";

function MealList({ meals }) {
  console.log(meals);

  const [mealList, setMealList] = useState({});
  // const [generatedMealList, setGeneratedMealList] = useState({});
  const [buttonStatus, setButtonStatus] = useState(false);

  useEffect(() => {
    if (!!meals) {
      setMealList(mealsDataFormater(meals));
    }
  }, []);
  // console.log(buttonStatus);
  useEffect(() => {}, [buttonStatus]);

  const handleClick = () => {
    const autoGenerateMeals = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/meals/auto`);
        setMealList(mealsDataFormater(response.data));
        setButtonStatus(!buttonStatus);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    autoGenerateMeals();
    // const getMealList = async () => {
    //   try {
    //     const mealListData = await axios.get(`${BASE_URL}/meals`);
    //     setMealList(mealsDataFormater(mealListData.data));
    //     setButtonStatus(!buttonStatus);
    //     // setMealList(mealListData.data);
    //     // setLoading(false); // Set loading state to false regardless of success or failure
    //     // console.log(mealListData.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // getMealList();
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
    <section className="meal-planner">
      <h2>This Week</h2>
      <button onClick={handleClick} className="meal-planner__button">
        Auto generate
      </button>
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <section className="meal__table">
          {/* Render meals grouped by date */}
          {Object.keys(mealList).map((date) => (
            <div key={date} className="meal__column">
              <p>{date}</p>
              <p>{mealList[date].day}</p>
              <ul>
                {mealList[date].meals.map((meal) => (
                  <MealUnit meal={meal} />
                  // <Droppable
                  //   droppableId={`${meal.meal_id}`}
                  //   type="meal"
                  //   key={meal.meal_uuid}
                  // >
                  //   {(provided) => (
                  //     <div {...provided.droppableProps} ref={provided.innerRef}>
                  //       <li key={meal.meal_id}>
                  //         <div className="meal__type">{meal.type}</div>
                  //         {meal.recipes.map((recipe, index) => (
                  //           <Draggable
                  //             draggableId={`${recipe.recipe_uuid}`}
                  //             key={recipe.recipe_uuid}
                  //             index={index}
                  //           >
                  //             {(provided) => (
                  //               <div
                  //                 className="recipe"
                  //                 {...provided.dragHandleProps}
                  //                 {...provided.draggableProps}
                  //                 ref={provided.innerRef}
                  //               >
                  //                 <a href={recipe.recipe_url} target="_blank">
                  //                   {recipe.recipe_id}
                  //                 </a>
                  //               </div>
                  //             )}
                  //           </Draggable>
                  //         ))}
                  //         {provided.placeholder}
                  //       </li>
                  //     </div>
                  //   )}
                  // </Droppable>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </DragDropContext>
    </section>
  );
}

export default MealList;

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
