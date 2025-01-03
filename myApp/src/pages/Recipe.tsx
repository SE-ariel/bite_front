import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonItem,
  IonList,
  IonText,
} from "@ionic/react";

export interface RecipeData {
  title: string;
  creator: string;
  ingredients: string[];
  instructions: string[];
}

interface Props {
  recipeData: RecipeData;
}

const Recipe: React.FC<Props> = ({ recipeData }) => {
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
        </IonCardContent>
      </IonCard>
    </IonContent>
  );
};

export default Recipe;
