import { IonButton, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";

const CreatePostButton: React.FC = () => {
  return (
    <IonButton fill="outline" slot="start" href="/create">
      <IonIcon icon={addOutline} size="large" />
    </IonButton>
  );
};

export default CreatePostButton;
