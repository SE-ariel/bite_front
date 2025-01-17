import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc, DocumentData } from "firebase/firestore";

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

export interface RecipeData {
  recipeId: string;
  creatorId: string; // Corrected casing to camelCase
  ingredients: string; // Replaced SurName with standard lastName
  instructions: string;
  title: string;
  imageId: string;
}

export const useRecipe = (id: string) => {
  const [recipeData, setRecipeData] = useState<RecipeData>({
    recipeId: "",
    creatorId: "",
    ingredients: "",
    instructions: "",
    title: "",
    imageId: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const result: DocumentData | null = await data(id || "");
        console.log;
        if (result) {
          // Type assertion or mapping
          setRecipeData({
            recipeId: id,
            creatorId: result.creatorId || "",
            ingredients: result.ingredients || "",
            instructions: result.instructions || "",
            title: result.title || "",
            imageId: result.imageId || "",
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
