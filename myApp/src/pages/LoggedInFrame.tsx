import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import Header from "../components/Header";

interface Props {
  title: string;
  wrappedContent: React.ComponentType;
}

const LoggedInFrame: React.FC<Props> = (props) => {
  return (
    <IonPage>
      <Header title={props.title} />
      <IonContent>
        <props.wrappedContent />
      </IonContent>
    </IonPage>
  );
};

export default LoggedInFrame;
