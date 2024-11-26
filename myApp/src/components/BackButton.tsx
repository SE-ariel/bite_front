import { IonButton } from "@ionic/react";
import "./BackButton.css";

const BackButton: React.FC = () => {
  return (
    <IonButton fill="solid" color="danger" onClick={() => history.back()}>
      Go Back
    </IonButton>
  );
};

export default BackButton;
