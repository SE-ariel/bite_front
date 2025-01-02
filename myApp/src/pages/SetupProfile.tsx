import { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useRegister } from "../logics/Register";

const SetupProfile: React.FC = () => {
  const [error] = useState<string | null>(null);

  const {
    role,
    setRole,
    surName,
    setSurName,
    firstName,
    setFirstName,
    handleSubmit,
  } = useRegister();

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Complete Your Setup</h2>

        <IonInput
          label="First Name"
          labelPlacement="floating"
          value={firstName}
          onIonInput={(e) => setFirstName(e.detail.value || "")}
        />
        <IonInput
          label="Last Name"
          labelPlacement="floating"
          value={surName}
          onIonInput={(e) => setSurName(e.detail.value || "")}
        />

        <IonSelect
          value={role}
          onIonChange={(e) => setRole(e.detail.value)}
          placeholder="Select your role"
        >
          <IonSelectOption value="Admin">Admin</IonSelectOption>
          <IonSelectOption value="User">User</IonSelectOption>
        </IonSelect>

        {error && <IonText color="danger">{error}</IonText>}

        <IonButton expand="block" onClick={handleSubmit}>
          Save Details
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SetupProfile;
