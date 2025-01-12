import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  doc,
  getDoc,
  onSnapshot,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Fetch a single recipe by ID
export const fetchRecipe = async (recipeId: string) => {
  if (!recipeId) throw new Error("Recipe ID is required");

  try {
    const docRef = doc(db, "recipes", recipeId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Recipe not found");
    }

    return docSnap.data();
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};

// Create a new recipe
export const makeRecipe = async (recipeData: {
  title: string;
  instructions: string[];
  ingredients: string[];
}) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user is currently logged in.");
    }

    // Get the user's document reference
    const userDocRef = doc(db, "users", user.uid);

    // Fetch the user's data
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      throw new Error("User document does not exist.");
    }

    const userName = userSnapshot.data()?.SurName || "Unknown User";

    // Add creator's name to the recipe data
    const completeRecipeData = {
      ...recipeData,
      creator: userName,
      createdAt: new Date().toISOString(), // Add timestamp for creation
    };

    // Add the recipe to the "recipes" collection
    const recipeRef = await addDoc(collection(db, "recipes"), completeRecipeData);

    // Update the user's document with the new recipe ID
    await updateDoc(userDocRef, {
      recipes: arrayUnion(recipeRef.id),
    });

    console.log(
      `Recipe "${recipeData.title}" created successfully by ${userName}. Recipe ID: ${recipeRef.id}`
    );
    return recipeRef.id;
  } catch (error) {
    console.error("Error creating recipe document:", error);
    throw error;
  }
};

// Optional: A hook for real-time updates for a single recipe
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
        console.error("Error fetching recipe in real-time:", err);
        setError("Error fetching recipe");
      }
    );

    return () => unsubscribe();
  }, [recipeId]);

  return { recipe, error };
};
