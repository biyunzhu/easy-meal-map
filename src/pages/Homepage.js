import "./Homepage.scss";

import RecipeList from "../components/RecipeList/RecipeList";
import RecipeItem from "../components/RecipeItem/RecipeItem";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constant-variables";

function Homepage() {
  const [recipeList, setRecipeList] = useState([]);

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
  return (
    <>
      <h1>Home page</h1>
      <RecipeList recipes={recipeList} />
    </>
  );
}

export default Homepage;
