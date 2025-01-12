import React from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonList, IonText, IonButton } from "@ionic/react";
import { saveRecipeToUser } from "../logics/RecipeActions"; 
import ImageDisplay from "../components/ImageDisplay";
import Rate from "../components/Rate";

export interface RecipeData {
  recipeId: string; // ה-ID של המתכון
  title: string;
  creatorId: string;
  ingredients: string[];
  instructions: string[];
  imageId?: string; // תמונה אופציונלית
}

interface Props {
  recipeData: RecipeData;
}

const Recipe: React.FC<Props> = ({ recipeData }) => {
  const handleSaveRecipe = async () => {
    console.log("Saving recipe with ID:", recipeData.recipeId); // לוג לבדיקת ה-ID
    await saveRecipeToUser(recipeData.recipeId); // שמירת המתכון לפי ה-ID
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
        {recipeData.imageId && recipeData.imageId.length > 0 && (
          <ImageDisplay documentId={recipeData.imageId} />
        )}
      </IonCard>
      <IonButton expand="block" href={`/creator/${recipeData.creatorId}`}>
        Go to Creator Page
      </IonButton>
      <Rate recipeId={recipeData.recipeId} />
    </IonContent>
  );
};

export default Recipe;
