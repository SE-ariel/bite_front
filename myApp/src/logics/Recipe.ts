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

    // Get the user's document
    const userDocRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      throw new Error("User document does not exist");
    }



    // Add creator's name to the recipe data
    const completeRecipeData = {
      ...recipeData,
      creatorId: user.uid,
      createdAt: serverTimestamp()
    };

    // Add the recipe to the "recipes" collection
    const recipeRef = await addDoc(collection(db, "recipes"), completeRecipeData);

    // Update the user's document with the new recipe ID
    await updateDoc(userDocRef, {
      recipes: arrayUnion(recipeRef.id),
    });


    return recipeRef.id;// Return the unique ID for further use
  } catch (error) {
    console.error("Error creating recipe document:", error);
    throw error;
  }
};

export const handlePostUpload = async (
    title: string,
    ingredients: string,
    instructions: string,
    imageId: string,
    setError: (error: string | null) => void,
    postId?: string // Optional postId for updating an existing post
) => {
  if (!title || !ingredients || !instructions) {
    setError("Title, ingredients, and instructions are required!");
    return;
  }

  try {
    const recipeData = {
      title,
      ingredients: ingredients.split("\n"),
      instructions: instructions.split("\n"),
      imageId,
    };

    if (postId) {
      // Update existing post
      const postRef = doc(db, "recipes", postId);
      await updateDoc(postRef, recipeData);
      console.log(`Recipe "${title}" updated successfully!`);
  } else {
      // Create a new post
      await makeRecipe(recipeData);
  }
    history.back();
  } catch (error) {
    console.error("Error uploading post:", error);
    setError("Failed to upload post. Please try again.");
  }
};

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


