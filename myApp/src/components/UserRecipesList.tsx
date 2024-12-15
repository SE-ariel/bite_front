import { IonList, IonItem, IonLabel } from "@ionic/react";

interface Recipe {
  recipeId: string;
  title: string;
}

interface UserRecipesListProps {
  recipes: Recipe[]; 
}

//function that receives a list of recipes and represents them

const GetUserRecipesList: React.FC<UserRecipesListProps> = ({ recipes }) => {
    
  return (
    <IonList>
      {recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <IonItem key={index}>
            <IonLabel>
              <h2>{recipe.title}</h2>
              <p>Recipe ID: {recipe.recipeId}</p>
            </IonLabel>
          </IonItem>
        ))
      ) : (
        <p>No recipes available.</p> 
      )}
    </IonList>
  );
};

export default GetUserRecipesList;
