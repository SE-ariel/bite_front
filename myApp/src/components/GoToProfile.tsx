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
        <IonCardTitle>User Data Lookup</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonInput
          value={userEmail}
          placeholder="Enter User ID"
          onIonChange={(e) => setUserEmail(e.detail.value!)}
        />
        <IonButton onClick={handleRoute}>Fetch Data</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default GoToProfile;
