import React from 'react';
import { IonItem, IonLabel, IonInput } from '@ionic/react';

interface PostTitleFieldProps {
    title: string;
    setTitle: (title: string) => void;
}

const PostTitleField: React.FC<PostTitleFieldProps> = ({ title, setTitle }) => {
    return (
        <IonItem lines="full">
            <IonLabel position="stacked" color="primary">
                Recipe Title
            </IonLabel>
            <IonInput
                value={title}
                onIonChange={(e) => setTitle(e.detail.value!)}
                placeholder="Enter the recipe title"
                className="ion-input"
            />
        </IonItem>
    );
};

export default PostTitleField;

