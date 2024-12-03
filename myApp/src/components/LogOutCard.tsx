import React from "react";
import { IonButton, IonCard, IonCardContent } from "@ionic/react";
import { useLogout } from "../logics/LoginLogout";

const LogOutCard: React.FC = () => {
  const { handleLogout } = useLogout();

  return (
    <IonCard>
      <IonCardContent>
        <IonButton onClick={handleLogout}>Logout</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default LogOutCard;
