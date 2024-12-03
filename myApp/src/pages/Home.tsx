import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import Header from "../components/Header";

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header title="home" />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Home;
