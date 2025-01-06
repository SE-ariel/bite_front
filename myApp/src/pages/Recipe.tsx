import React, { useEffect, useState } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonList, IonText, IonButton } from "@ionic/react";
import { useParams } from "react-router-dom"; // הוספת שימוש ב-react-router
import { saveRecipeToUser, getRecipeIdByTitle } from "../logics/RecipeActions"; 

export interface RecipeData {
  title: string;
  creator: string;
  ingredients: string[];
  instructions: string[];
  id: string; // ה-ID של המתכון
}

interface Props {
  recipeData: RecipeData;
}

const Recipe: React.FC<Props> = ({ recipeData }) => {
  const { recipeId } = useParams<{ recipeId: string }>(); // שליפת ה-ID מה-URL
  const [idToSave, setIdToSave] = useState<string | null>(null);

  useEffect(() => {
    console.log("Recipe ID from URL:", recipeId); // לוג לבדוק אם ה-ID נכנס כראוי מה-URL
    if (recipeId) {
      setIdToSave(recipeId); // אם ה-ID נמצא ב-URL, נעדכן את ה-ID לשמירה
    } else {
      console.log("Recipe ID not found in URL, attempting to fetch by title...");
      // אם אין ID ב-URL, ננסה לשלוף אותו לפי כותרת
      const fetchIdByTitle = async () => {
        const fetchedId = await getRecipeIdByTitle(recipeData.title);
        setIdToSave(fetchedId);
      };
      fetchIdByTitle();
    }
  }, [recipeId, recipeData.title]);

  const handleSaveRecipe = async () => {
    if (idToSave) {
      console.log("Saving recipe with ID:", idToSave); // לוג לבדיקת ה-ID
      await saveRecipeToUser(idToSave); // שמירת המתכון לפי ה-ID
    } else {
      console.error("Recipe ID could not be found!"); // הודעת שגיאה אם ה-ID לא נמצא
    }
  };

  return (
    <IonContent fullscreen>
      <IonCard>
        <IonCardHeader>
          <IonText className="ion-text-center">
            <IonCardTitle>{recipeData.title}</IonCardTitle>
          </IonText>
        </IonCardHeader>
        <IonCardContent>
          <IonItem>
            <IonText>Recipe Creator: {recipeData.creator}</IonText>
          </IonItem>
          <IonItem>
            <IonText>
              <strong>Ingredients:</strong>
            </IonText>
          </IonItem>
          <IonList>
            {recipeData.ingredients.map((ingredient, index) => (
              <IonItem key={index}>
                <IonText>• {ingredient}</IonText>
              </IonItem>
            ))}
          </IonList>
          <IonItem>
            <IonText>
              <strong>Instructions:</strong>
            </IonText>
          </IonItem>
          <IonList>
            {recipeData.instructions.map((instruction, index) => (
              <IonItem key={index}>
                <IonText>
                  {index + 1}. {instruction}
                </IonText>
              </IonItem>
            ))}
          </IonList>
          <IonButton expand="block" onClick={handleSaveRecipe}>
            Save Recipe
          </IonButton>
        </IonCardContent>
      </IonCard>
    </IonContent>
  );
};

export default Recipe;
