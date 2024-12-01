import { IonButton } from "@ionic/react";
import "./LogOutButton.css";

const LogOutButton: React.FC = () => {
  return (
    <IonButton slot='start' size="large" fill='outline' color="danger" href="/login" style={{textTransform: 'none'}}>
        {'LogoutButton'}
    </IonButton>
  );
};

export default LogOutButton;
