import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
} from "@ionic/react";
import "./Home.css";
import Header from "../components/Header";

const PrivateZone: React.FC = () => {
  return (
    <IonPage>
      <Header title="Private Zone" />
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
    </IonPage>
  );
};

export default PrivateZone;
