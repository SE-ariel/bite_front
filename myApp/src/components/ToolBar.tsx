import { IonButton, IonButtons, IonTitle, IonToolbar } from "@ionic/react";
import "./ToolBar.css";
import BackButton from "./BackButton";
import LogOut from "./LogOutButton";
import { auth } from "../firebaseConfig";
import { useRoleStatus, makeUserRole } from "../logics/Role";
interface Props {
  title: string;
}

const ToolBar: React.FC<Props> = (props) => {
  return (
    <IonToolbar>
      <IonButtons>
        <BackButton />
        <IonTitle slot="end" size="large">
          {props.title}
        </IonTitle>
        <IonButton
          onClick={() => makeUserRole("Admin", auth.currentUser?.uid || "")}
        >
          be admin
        </IonButton>
        <IonButton
          onClick={() =>
            makeUserRole("ContentCreator", auth.currentUser?.uid || "")
          }
        >
          be content creator
        </IonButton>
        <LogOut />
      </IonButtons>
    </IonToolbar>
  );
};

export default ToolBar;
