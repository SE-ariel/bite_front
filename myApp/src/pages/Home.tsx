import { IonContent, IonText } from "@ionic/react";
import "./Home.css";
import GoToProfile from "../components/GoToProfile";
import UploadImage from "../components/UploadImage";
import { useState } from "react";
import ImageDisplay from "../components/ImageDisplay";

const Home: React.FC = () => {

  // this is a usage example of the UploadImage component
  // now the image reference stored in the imageId hook

  // copy this in the beginning of the file
  const [imageId, setImageId] = useState<string>("");
  // until here

  return (
    <IonContent fullscreen>
      <GoToProfile />

      {/* copy this to the button location */}
      <UploadImage onUpload={setImageId} />
      {/* until here */}

      {imageId && (
        <>
        <IonText>
          <p>Image ID: {imageId}</p>
        </IonText>
        <ImageDisplay documentId={imageId} />
        </>
      )}
    </IonContent>
  );
};

export default Home;