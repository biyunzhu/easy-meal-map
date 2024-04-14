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
  const [mealList, setMealList] = useState({});
  // detect button clicks for page re-render
  const [buttonStatus, setButtonStatus] = useState(false);

  // get meals data on mount
  useEffect(() => {
    if (!!meals) {
      setMealList(mealsDataFormater(meals));
    }
  }, []);

  // render page when button is clicked
  useEffect(() => {}, [buttonStatus]);

  const handleClick = () => {
    const autoGenerateMeals = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/meals/auto`);
        setMealList(mealsDataFormater(response.data));
        setButtonStatus(!buttonStatus);
      } catch (error) {
        console.error(error);
      }
    };
    autoGenerateMeals();
  };

  const handleDragAndDrop = (results) => {
    const { source, destination, draggableId } = results;

    // return when draggable is dropped outside of the droppable area
    if (!destination) return;

    // return when draggable is dropped at the same meal
    if (source.droppableId === destination.droppableId) return;

    // get new data for the changed position of recipe to display on page
    const newMealList = moveRecipeToNewMeal(
      mealList,
      Number(source.droppableId),
      source.index,
      Number(destination.droppableId),
      destination.index
    );

    // update state for the front-end
    setMealList(newMealList);

    // get recipe id by uuid for change in database
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
      try {
        const response = await axios.post(`${BASE_URL}/meals`, recipeToAdd);
      } catch (error) {
        console.error(error);
      }
    };
    addRcipeToMeal();

    // Remove old meal & recipe pair from database
    const removeRcipeFromMeal = async () => {
      try {
        const response = await axios.delete(
          `${BASE_URL}/meals?meal_id=${recipeToRemove.meal_id}&recipe_id=${recipeToRemove.recipe_id}`
        );
      } catch (error) {
        console.error(error);
      }
    };
    removeRcipeFromMeal();
  };

  return (
    <section className="meal-planner">
      <h1 className="meal-planner__title">This Week</h1>
      <button onClick={handleClick} className="meal-planner__button">
        Auto generate
      </button>
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <section className="meal__table">
          {/* Render meals grouped by date */}
          {Object.keys(mealList).map((date) => (
            <div key={date} className="meal__column">
              <p className="meal__date">{date}</p>
              <p>{mealList[date].day}</p>
              <ul>
                {mealList[date].meals.map((meal) => (
                  <MealUnit
                    meal={meal}
                    mealList={mealList}
                    setMealList={setMealList}
                    buttonStatus={buttonStatus}
                    setButtonStatus={setButtonStatus}
                  />
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
