import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonButton,
} from "@ionic/react";
import { getUserIdByEmail } from "../logics/Profile";
import { useHistory } from "react-router-dom";

const GoToProfile: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const history = useHistory();

  const handleRoute = async () => {
    const userId = await getUserIdByEmail(userEmail);
    history.push(`/profile/${userId}`);
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Find User</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonInput
          value={userEmail}
          placeholder="Enter User email"
          onIonChange={(e) => setUserEmail(e.detail.value!)}
        />
        <IonButton onClick={handleRoute}>Take me to their profile!</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default GoToProfile;
