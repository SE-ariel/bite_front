import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import Header from "../components/Header";
import { useRoleStatus } from "../logics/Role";
import MakeAdmin from "../components/MakeAdmin";
import UpdatePasswordCard from "../components/UpdatePaswordCard";
import LogOutCard from "../components/LogOutCard";

const Settings: React.FC = () => {
  const role = useRoleStatus();
  return (
    <IonPage>
      <Header title="Private Zone" />
      <IonContent fullscreen>
        {role == "Admin" && <MakeAdmin />}
        <UpdatePasswordCard />
        <LogOutCard />
      </IonContent>
    </IonPage>
  );
};

export default Settings;
