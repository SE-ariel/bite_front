import { IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import BackButton from "./BackButton";
import PrivateZoneButton from "./PrivateZoneButton";
interface Props {
  title: string;
}

const Header: React.FC<Props> = (props) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons>
          <BackButton />
          <IonTitle slot="end" size="large">
            {props.title}
          </IonTitle>
          <PrivateZoneButton />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
