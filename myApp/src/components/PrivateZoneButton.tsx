import { IonButton } from "@ionic/react";

const PrivateZoneButton: React.FC = () => {
  return (
    <IonButton fill="outline" slot="start" href="/private">
      private zone
    </IonButton>
  );
};

export default PrivateZoneButton;
