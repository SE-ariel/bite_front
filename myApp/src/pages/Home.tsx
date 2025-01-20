import { IonContent } from "@ionic/react";
import "./Home.css";
import GoToProfile from "../components/GoToProfile";
import TopRatedRecipes from "../components/TopRatedRecipes";

const Home: React.FC = () => {
  return (
    <IonContent fullscreen>
      <GoToProfile />
      <TopRatedRecipes />
    </IonContent>
  );
};

export default Home;
