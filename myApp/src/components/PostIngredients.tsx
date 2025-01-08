import React from 'react';
import { IonItem, IonLabel, IonTextarea } from '@ionic/react';

interface RecipeIngredientsFieldProps {
    ingredients: string;
    setIngredients: (ingredients: string) => void;
}

const RecipeIngredientsField: React.FC<RecipeIngredientsFieldProps> = ({ ingredients, setIngredients }) => {
    return (
        <IonItem lines="full">
            <IonLabel position="stacked" color="primary">
                Recipe Ingredients
            </IonLabel>
            <IonTextarea
                value={ingredients}
                onIonChange={(e) => setIngredients(e.detail.value!)}
                placeholder="Enter ingredients, one per line"
                autoGrow={true}
            />
        </IonItem>
    );
};

export default RecipeIngredientsField;