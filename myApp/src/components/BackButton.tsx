import { IonButton, IonIcon } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";

const BackButton: React.FC = () => {
  return (
    <IonButton slot="start" onClick={() => history.back()}>
      <IonIcon icon={chevronBackOutline} size="large" />
    </IonButton>
  );
};

export default BackButton;
