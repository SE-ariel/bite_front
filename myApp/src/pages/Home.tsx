import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import ToolBar from "../components/ToolBar";
import { makeUserRole, useRoleStatus } from "../logics/Role";
//import { getAdditionalUserInfo, getAuth } from 'firebase/auth';
import { auth } from "../firebaseConfig";

const Home: React.FC = () => {
  const role = useRoleStatus();

  return (
    <IonPage>
      <IonHeader>
        <ToolBar title="Home" />
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardContent>
            <IonTitle>make user an admin</IonTitle>
            <IonInput
              onIonInput={(e) => makeUserRole(e.detail.value || "", "")}
              placeholder="email"
            />
          </IonCardContent>
        </IonCard>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
