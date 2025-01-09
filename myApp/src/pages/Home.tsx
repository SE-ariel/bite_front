import { IonContent } from "@ionic/react";
import "./Home.css";
import GoToProfile from "../components/GoToProfile";
import Rate from "../components/Rate";

const Home: React.FC = () => {
  return (
    <IonContent fullscreen>
      <GoToProfile />
      <Rate recipeId="2QiCuwFoB3Buyj8NT3I0"/>
    </IonContent>
  );
};

export default Home;