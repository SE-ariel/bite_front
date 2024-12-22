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

export const makeRecipe = async (recipeData: {
  title: string;
  instructions: string[];
  ingredients: string[];
}) => {
  try {
    const user = auth.currentUser; // Get the currently logged-in user
    if (!user) {
      throw new Error("No user is currently logged in.");
    }

    // Get the user's document
    const userDocRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDocRef);
    console.log("User document data:", userSnapshot.data()); // Debugging log

    if (!userSnapshot.exists()) {
      throw new Error("User document does not exist.");
    }

    const userName = userSnapshot.data()?.SurName || "Unknown User";
    
    // Add creator's name to the recipe data
    const completeRecipeData = {
      ...recipeData,
      creator: userName,
    };

    console.log("Recipe data to be added:", completeRecipeData); // Debugging log

    // Add the recipe to the "recipes" collection
    const recipeRef = await addDoc(collection(db, "recipes"), completeRecipeData);

    // Add the recipe ID to the user's "recipes" array
    await updateDoc(userDocRef, {
      recipes: arrayUnion(recipeRef.id), // Add the recipe ID to the array
    });

    console.log(
      `Recipe "${recipeData.title}" created successfully by ${userName}. Recipe ID: ${recipeRef.id}`
    );
    return recipeRef.id; // Return the unique ID for further use
  } catch (error) {
    console.error("Error creating recipe document: ", error);
    throw error;
  }
};
