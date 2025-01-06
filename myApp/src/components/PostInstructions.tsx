import React from 'react';
import { IonItem, IonLabel, IonTextarea } from '@ionic/react';

interface RecipeInstructionsFieldProps {
    instructions: string;
    setInstructions: (instructions: string) => void;
}

const RecipeInstructionsField: React.FC<RecipeInstructionsFieldProps> = ({ instructions, setInstructions }) => {
    return (
        <IonItem lines="full">
            <IonLabel position="stacked" color="primary">
                Recipe Instructions
            </IonLabel>
            <IonTextarea
                value={instructions}
                onIonChange={(e) => setInstructions(e.detail.value!)}
                placeholder="Enter instructions, one per line"
                autoGrow={true}
            />
        </IonItem>
    );
};

export default RecipeInstructionsField;
