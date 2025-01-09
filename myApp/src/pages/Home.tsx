import { IonContent } from "@ionic/react";
import "./Home.css";
import GoToProfile from "../components/GoToProfile";

const Home: React.FC = () => {
  return (
    <IonContent fullscreen>
      <GoToProfile />
    </IonContent>
  );
};

export default Home;
