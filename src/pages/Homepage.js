import "./Homepage.scss";
import RecipeList from "../components/RecipeList/RecipeList";
import RecipeList2 from "../components/RecipeList2/RecipeList2";
import MealList from "../components/MealList/MealList";
import MealList2 from "../components/MealList2/MealList2";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constant-variables";

function Homepage() {
  const [recipeList, setRecipeList] = useState([]);
  const [mealList, setMealList] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const getRecipeList = async () => {
      const recipeListData = await axios.get(`${BASE_URL}/recipes`);
      try {
        setRecipeList(recipeListData.data);
        // console.log(recipeListData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading state to false regardless of success or failure
      }
    };
    getRecipeList();
  }, []);

  useEffect(() => {
    const getMealList = async () => {
      const mealListData = await axios.get(`${BASE_URL}/meals`);
      try {
        setMealList(mealListData.data);
        // console.log(mealListData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading state to false regardless of success or failure
      }
    };
    getMealList();
  }, []);

  // useEffect(() => {
  //   const addMealRecipe = async () => {
  //     const newMealRecipe = {
  //       "meal_id": 19,
  //       "recipe_id": 70
  //     }
  //     const response = await axios.post(`${BASE_URL}/meals`,newMealRecipe);
  //     try {
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   addMealRecipe();
  // }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message if an error occurs
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="home">
      <h1>Easy Meal Map</h1>
      <section className="board">
        {/* <RecipeList recipes={recipeList} className="borad__recipes" /> */}
        {/* <RecipeList2 recipes2={recipeList} className="borad__recipes" /> */}
        {/* <RecipeList2 DATA={recipeList} /> */}
        {/* <MealList meals={mealList} className="board__meals" /> */}
        <MealList2 meals={mealList} className="board__meals" />
      </section>
    </section>
  );
}

export default Homepage;
