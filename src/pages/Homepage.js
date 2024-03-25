import "./Homepage.scss";

import RecipeList from "../components/RecipeList/RecipeList";
import MealList from "../components/MealList/MealList";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constant-variables";

function Homepage() {
  const [recipeList, setRecipeList] = useState([]);
  const [mealList, setMealList] = useState([]);

  useEffect(() => {
    const getRecipeList = async () => {
      const recipeListData = await axios.get(`${BASE_URL}/recipes`);
      try {
        setRecipeList(recipeListData.data);
        // console.log(recipeListData.data);
      } catch (error) {
        console.error(error);
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
      }
    };
    getMealList();
  }, []);

  return (
    <section className="home">
      <h1>Easy Meal Map</h1>
      <section className="board">
        <RecipeList recipes={recipeList} className="borad__recipes" />
        <MealList meals={mealList} className="board__meals" />
      </section>
    </section>
  );
}

export default Homepage;
