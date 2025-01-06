import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { RecipeData } from "./RecipeData";

export const data = async (uid: string) => {
  try {
    const docRef = doc(db, "recipes", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No recipe document found");
      return null;
    }
  } catch (error) {
    console.error("Error checking role status:", error);
    return null;
  }
};

export const useRecipe = (id: string) => {
  const [recipeData, setRecipeData] = useState<RecipeData>({
    creator: "",
    ingredients: [], // Initialize as an array
    instructions: [],
    title: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const result: DocumentData | null = await data(id || "");
        if (result) {
          setRecipeData({
            creator: result.creator || "",
            ingredients: Array.isArray(result.ingredients)
              ? result.ingredients
              : result.ingredients.split(",").map((item: string) => item.trim()), // Normalize ingredients to an array
            instructions: result.instructions || [],
            title: result.title || "",
          });
        }
        setIsChecked(true);
      } catch (error) {
        console.error("Failed to fetch recipe data:", error);
      }
    };
    fetchRecipeData();
  }, [id]);

  return { recipeData, isChecked };
};

