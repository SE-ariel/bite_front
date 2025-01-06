import React from 'react';
import { IonItem, IonLabel, IonTextarea } from '@ionic/react';

interface PostContentFieldProps {
    content: string;
    setContent: (content: string) => void;
}

const PostContentField: React.FC<PostContentFieldProps> = ({ content, setContent }) => {
    return (
        <IonItem lines="full">
            <IonLabel position="stacked" color="primary">
                Recipe Content
            </IonLabel>
            <IonTextarea
                value={content}
                onIonChange={(e) => setContent(e.detail.value!)}
                placeholder="Enter ingredients and directions"
                autoGrow={true} // Allows the textarea to grow with content
                className="ion-textarea"
            />
        </IonItem>
    );
};

export default PostContentField;
