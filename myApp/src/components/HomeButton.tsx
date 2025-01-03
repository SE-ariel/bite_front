import { IonButton, IonIcon } from "@ionic/react";
import { homeOutline } from "ionicons/icons";

const HomeButton: React.FC = () => {
  return (
    <IonButton fill="outline" slot="start" href="/home">
      <IonIcon icon={homeOutline} size="large" />
    </IonButton>
  );
};

export default HomeButton;
