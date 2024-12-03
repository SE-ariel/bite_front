import React from "react";
import { IonButton } from "@ionic/react";
import "./LogOutButton.css";
import { useLogout } from "../logics/LoginLogout";

const LogOutButton: React.FC = () => {
  const { handleLogout } = useLogout();

  return (
    <IonButton
      slot="start"
      size="large"
      fill="outline"
      onClick={handleLogout}
      style={{ textTransform: "none" }}
    >
      Logout
    </IonButton>
  );
};

export default LogOutButton;
