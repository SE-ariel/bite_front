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


  