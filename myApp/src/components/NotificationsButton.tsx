import { IonButton, IonIcon } from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";

const NotificationsButton: React.FC = () => {
  return (
    <IonButton fill="outline" slot="start" href="/notifications">
      <IonIcon icon={notificationsOutline} size="large" />
    </IonButton>
  );
};

export default NotificationsButton;
