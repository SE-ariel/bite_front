import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonItem,
  IonText,
} from "@ionic/react";
import "./Home.css";
import { RecipeData } from "../logics/GetRecipe";

interface Props {
    recipeData: RecipeData;
}

const Recipe: React.FC<Props> = (props) => {
  return (
    <IonContent fullscreen>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>recipeData</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
        <IonItem>
            <IonText>recipeData.title: {props.recipeData.title}</IonText>
          </IonItem>
          <IonItem>
            <IonText>recipeData.creator: {props.recipeData.creator}</IonText>
          </IonItem>
        </IonCardContent>
      </IonCard>
    </IonContent>
  );
};

export default Recipe;
