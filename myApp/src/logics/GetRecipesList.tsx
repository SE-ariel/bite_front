import { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const useUserRecipes = (userId: string, listType: string) => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRecipes = async (userId: string) => {
      try {
        console.log("UID passed to fetchUserRecipes:", userId); // UID שנשלח לפונקציה
        console.log("Connected user UID:", auth.currentUser?.uid); // UID של המשתמש המחובר כרגע

        // שליפת דוקומנט של המשתמש
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();

          if (listType === "saved") {
            const savedRecipes = userData?.savedRecipes || [];
            console.log("Saved Recipes:", savedRecipes); // הדפסת המתכונים השמורים
            setRecipes(savedRecipes);
          } else if (listType === "created") {
            const createdRecipes = userData?.recipes || [];
            console.log("Created Recipes:", createdRecipes); // הדפסת המתכונים שנוצרו
            setRecipes(createdRecipes);
          } else {
            throw new Error("Invalid listType");
          }
        } else {
          console.error("User document does not exist.");
          setError("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user recipes:", error);
        setError("Error fetching user recipes");
      }
    };

    // התחברות למשתמש
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Authenticated user detected:", user.uid); // הדפסת UID של המשתמש המחובר
        fetchUserRecipes(userId); // קריאה לפונקציה עם ה-UID שנשלח כפרמטר
      } else {
        console.error("No authenticated user.");
        setError("User not logged in.");
      }
    });

    return () => unsubscribe(); // ביטול המעקב כאשר הרכיב מבוטל
  }, [userId, listType]);

  return { recipes, error };
};
