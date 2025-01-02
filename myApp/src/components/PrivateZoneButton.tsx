import { IonButton, IonIcon } from "@ionic/react";
import { personOutline } from "ionicons/icons";

const PrivateZoneButton: React.FC = () => {
  return (
    <IonButton fill="outline" slot="start" href="/private">
      <IonIcon icon={personOutline} size="large" />
    </IonButton>
  );
};

export default PrivateZoneButton;
