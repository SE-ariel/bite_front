import { IonContent } from "@ionic/react";
import "./Home.css";
import GoToProfile from "../components/GoToProfile";
import UploadImage from "../components/UploadImage";
import ImageDisplay from "../components/ImageDisplay";

const Home: React.FC = () => {
  return (
    <IonContent fullscreen>
      <GoToProfile />
      <UploadImage id="yYRqmvJzEmOsY6J9aMTt" />
      <ImageDisplay documentId="yYRqmvJzEmOsY6J9aMTt" />
    </IonContent>
  );
};

export default Home;
