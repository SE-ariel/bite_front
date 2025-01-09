import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonItem,
  IonList,
  IonText,
} from "@ionic/react";
import ImageDisplay from "../components/ImageDisplay";
import Rate from "../components/Rate";

export interface RecipeData {
  recipeId: string;
  title: string;
  creatorId: string;
  ingredients: string[];
  instructions: string[];
  imageId: string;
}

interface Props {
  recipeData: RecipeData;
}

const Recipe: React.FC<Props> = ({ recipeData }) => {
  const linkToCreator = "/profile/" + recipeData.creatorId;
  console.log(linkToCreator);
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
        </IonCardContent>
        {recipeData.imageId && recipeData.imageId.length > 0 && (
          <ImageDisplay documentId={recipeData.imageId} />
        )}
      </IonCard>
      <IonButton expand="block" href={linkToCreator}>
        go to creator page
      </IonButton>
      <Rate recipeId={recipeData.recipeId} />
    </IonContent>
  );
};

export default Recipe;
