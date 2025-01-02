import { IonButton } from "@ionic/react";

const HomeButton: React.FC = () => {
  return (
    <IonButton fill="outline" slot="start" href="/private">
      private zone
    </IonButton>
  );
};

export default HomeButton;
