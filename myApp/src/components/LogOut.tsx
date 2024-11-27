import { IonButton } from "@ionic/react";
import "./LogOut.css";

const LogOut: React.FC = () => {
  return (
    <IonButton slot='start' size="large" fill='outline' color="danger" href="/login" style={{textTransform: 'none'}}>
        {'Logout'}
    </IonButton>
  );
};

export default LogOut;
