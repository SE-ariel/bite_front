import React, { useState, useEffect } from "react";
import { fetchRecipe } from "../logics/Recipe"; // ייבוא הפונקציה לשליפת מתכון
import { Link } from "react-router-dom"; // ייבוא Link מ-react-router-dom

interface RecipeListProps {
  recipeIds: string[]; // מזהי המתכונים
}

const UserRecipesList: React.FC<RecipeListProps> = ({ recipeIds }) => {
  const [recipes, setRecipes] = useState<any[]>([]); // אחסון המתכונים
  const [error, setError] = useState<string | null>(null); // אחסון שגיאות
  const [loading, setLoading] = useState<boolean>(true); // מצב טעינה

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true); // התחלת טעינה
        const recipesData = await Promise.all(
          recipeIds.map(async (recipeId) => {
            try {
              const recipe = await fetchRecipe(recipeId); // שליפת המידע עבור כל מזהה
              return { id: recipeId, ...recipe }; // הוספת המזהה למידע המתכון
            } catch (error) {
              console.error(`Error fetching recipe ${recipeId}:`, error);
              return null; // במקרה של שגיאה למתכון מסוים
            }
          })
        );
        setRecipes(recipesData.filter((recipe) => recipe !== null)); // סינון מתכונים תקינים
        setError(null);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Error fetching recipes");
      } finally {
        setLoading(false); // סיום טעינה
      }
    };

    if (recipeIds.length > 0) {
      fetchRecipes();
    } else {
      setRecipes([]); // איפוס במקרה שאין מזהים
    }
  }, [recipeIds]); // תלות ב-recipeIds

  return (
    <div>
      {loading && <p>Loading recipes...</p>} {/* הודעת טעינה */}
      {error && <p>{error}</p>} {/* הצגת שגיאות */}
      {!loading && recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`} style={{ fontSize: "2em", fontWeight: "bold" }}>
                {recipe.title} {/* הצגת שם המתכון עם גודל גופן גדול יותר */}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserRecipesList;
