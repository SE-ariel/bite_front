import { IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import BackButton from "./BackButton";
import PrivateZoneButton from "./PrivateZoneButton";
import HomeButton from "./HomeButton";
import NotificationsButton from "./NotificationsButton";
import CreatePostButton from "./CreatePostButton";
import { useRoleStatus } from "../logics/Role";
interface Props {
  title: string;
}

const Header: React.FC<Props> = (props) => {
  const role = useRoleStatus();

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons>
          <BackButton />
          <IonTitle slot="end" size="large">
            {props.title}
          </IonTitle>
          {props.title !== "private zone" && <PrivateZoneButton />}
          {props.title !== "home" && <HomeButton />}
          {props.title !== "notifications" && <NotificationsButton />}
          {(role === "Admin" || role === "ContentCreator") &&
            props.title !== "create post" && <CreatePostButton />}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
