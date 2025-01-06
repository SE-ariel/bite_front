import { db, auth } from "../firebaseConfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { IonAlert } from "@ionic/react"; // הייבוא של IonAlert


export const saveRecipeToUser = async (recipeId: string) => {
  const user = auth.currentUser;
  
  if (!user) {
    console.error("User not authenticated");
    return;
  }

  try {
    console.log("Saving recipe with ID:", recipeId); // להוסיף לוג כדי לוודא שהפונקציה נקראת
    const userDocRef = doc(db, "users", user.uid); // קבלת מסמך המשתמש ב-Firestore
    await updateDoc(userDocRef, {
      savedRecipes: arrayUnion(recipeId), // הוספת המתכון לרשימת המתכונים השמורים
    });

    // יצירת הודעת alert שמראה למי המתכון נשמר
    alert("Recipe has been saved to your profile!"); // החלפת alertController ב- alert

    console.log("Recipe saved successfully!");
  } catch (error) {
    console.error("Error saving recipe: ", error);
  }
};


import { collection, query, where, getDocs } from "firebase/firestore";

export const getRecipeIdByTitle = async (title: string): Promise<string | null> => {
  const recipesRef = collection(db, "recipes");
  const q = query(recipesRef, where("title", "==", title.trim().toLowerCase()));

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const recipe = querySnapshot.docs[0]; // נבחר את המסמך הראשון שמתאים לשאילתה
      return recipe.id; // מחזירים את ה-ID
    }
    return null; // אם לא נמצא מסמך מתאים
  } catch (error) {
    console.error("Error fetching recipe ID by title:", error);
    return null;
  }
};

export const getRecipeById = async (id: string) => {
    const response = await fetch(`/api/recipes/${id}`);
    const data = await response.json();
    return data;
  };
  