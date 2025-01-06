import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const useRecipe = (recipeId: string) => {
  const [recipe, setRecipe] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!recipeId) {
      setError("Recipe ID is required");
      return;
    }

    const docRef = doc(db, "recipes", recipeId);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setRecipe(docSnap.data());
          setError(null);
        } else {
          setRecipe(null);
          setError("Recipe not found");
        }
      },
      (err) => {
        console.error("Error fetching recipe:", err);
        setError("Error fetching recipe");
      }
    );

    return () => unsubscribe();
  }, [recipeId]);

  return { recipe, error };
};

// Utility function to generate a custom ID
const generateCustomId = (title: string): string => {
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "-"); // Replace spaces and special chars with "-"
    const timestamp = Date.now(); // Get the current timestamp
    return `${sanitizedTitle}-${timestamp}`;
};

// Updated makeRecipe function
export const makeRecipe = async (recipeData: {
    title: string;
    ingredients: string[];
    instructions: string[];
    photoBase64?: string; // Optional field for photo
}) => {
    try {
        const customId = generateCustomId(recipeData.title); // Generate custom ID

        const recipeDocRef = doc(db, "recipes", customId); // Use custom ID for the recipe
        await setDoc(recipeDocRef, {
            title: recipeData.title,
            ingredients: recipeData.ingredients,
            instructions: recipeData.instructions,
        });

        // If there is a photo, save it as a separate field in the "images" collection
        if (recipeData.photoBase64) {
            const imageDocRef = doc(db, "images", customId); // Use the same ID for the image
            await setDoc(imageDocRef, {
                imageBase64: recipeData.photoBase64, // Base64 image data
            });
        }

        console.log(`Recipe uploaded with ID: ${customId}`);
        return customId; // Return the custom ID
    } catch (error) {
        console.error("Error uploading recipe:", error);
        throw error;
    }
};
