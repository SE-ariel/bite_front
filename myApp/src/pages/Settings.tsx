import { IonContent } from "@ionic/react";
import "./Home.css";
import { useRoleStatus } from "../logics/Role";
import MakeAdmin from "../components/MakeAdmin";
import UpdatePasswordCard from "../components/UpdatePaswordCard";
import LogOutCard from "../components/LogOutCard";

const Settings: React.FC = () => {
  const role = useRoleStatus();
  return (
    <IonContent fullscreen>
      {role == "Admin" && <MakeAdmin />}
      <UpdatePasswordCard />
      <LogOutCard />
    </IonContent>
  );
};

export default Settings;
