import { IonButton, IonCard, IonCardContent, IonContent } from "@ionic/react";
import "./Home.css";

const PrivateZone: React.FC = () => {
  return (
    <IonContent>
      <IonCard>
        <IonCardContent>
          <IonButton href="settings">settings</IonButton>
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardContent>
          <IonButton href="saved_recipes">saved recipes</IonButton>
        </IonCardContent>
      </IonCard>
    </IonContent>
  );
};

export default PrivateZone;
