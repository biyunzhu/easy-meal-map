import "./RecipeList.scss";
// import RecipeItem from "../RecipeItem/RecipeItem";
import React, { useState } from "react";

function RecipeList({ recipes }) {
  return (
    <>
      <section className="recipe__nav">
        {recipes.map((recipe) => (
          <RecipeItem recipe={recipe} key={recipe.id} />
        ))}
      </section>
    </>
  );
}

export default RecipeList;
