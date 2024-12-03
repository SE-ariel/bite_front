import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonContent fullscreen>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>you are in the home page</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>content</IonCardContent>
      </IonCard>
    </IonContent>
  );
};

export default Home;
