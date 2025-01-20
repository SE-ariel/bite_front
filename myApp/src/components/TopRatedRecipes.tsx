import React, { useEffect, useState } from "react";
import {
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonToast,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonCardHeader,
} from "@ionic/react";
import { starOutline } from "ionicons/icons";
import {
  Recipe,
  fetchTopRatedRecipes,
  handleRefresh,
  formatDate,
} from "../logics/GetTopRatedRecipes";

const TopRatedRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopRatedRecipes(setRecipes, setLoading, setError);
  }, []);

  return (
    <IonCard>
        <IonCardHeader><IonCardTitle>Top Rated Recipes</IonCardTitle></IonCardHeader>
        
        <IonCardContent>
      <IonRefresher
        slot="fixed"
        onIonRefresh={(e) =>
          handleRefresh(e, setRecipes, setLoading, setError)
        }
      >
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      {loading && <IonSpinner />}

      {error && (
        <IonToast
          isOpen={!!error}
          message={error || ""}
          duration={3000}
          color="danger"
          onDidDismiss={() => setError(null)}
        />
      )}

      <IonList>
        {recipes.map((recipe) => {
          const linkToRecipe = `/recipe/${recipe.id}`;
          return (
            <IonItem href={linkToRecipe} key={recipe.id}>
              <IonIcon icon={starOutline} slot="start" />
              <IonLabel>
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
              </IonLabel>
              <IonNote slot="end">{formatDate(recipe.createdAt)}</IonNote>
            </IonItem>
          );
        })}
      </IonList>

      {recipes.length === 0 && !loading && (
        <IonTitle>No top rated recipes</IonTitle>
      )}
      </IonCardContent>
    </IonCard>
  );
};

export default TopRatedRecipes;