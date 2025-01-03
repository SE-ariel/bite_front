import { IonContent } from "@ionic/react";
import "./Home.css";
import GoToProfile from "../components/GoToProfile";
import UploadImage from "../components/UploadImage";

const Home: React.FC = () => {
  return (
    <IonContent fullscreen>
      <GoToProfile />
      <UploadImage id="O6rVwgcwRw3gLdr0SZ5v" />
    </IonContent>
  );
};

export default Home;
