import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // לקבלת ה- ID מה- URL
import { useUserRecipes } from "../logics/GetRecipesList"; // ייבוא הפונקציה לשליפת המזהים של המתכונים השמורים
import RecipeList from "../components/UserRecipesList"; // ייבוא הקומפוננטה שמציגה את המתכונים

const SavedRecipes: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // קבלת ה- ID מה- URL
  const { recipes, error } = useUserRecipes(id, "saved"); // קריאה לפונקציה לשליפת המזהים של המתכונים השמורים

  return (
    <div>
      {error && <p>{error}</p>}
      <RecipeList recipeIds={recipes} /> 
    </div>
  );
};

export default SavedRecipes;
