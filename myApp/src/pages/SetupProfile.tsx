import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useSetup } from "../logics/SetUp";

const SetupProfile: React.FC = () => {
  const {
    firstName,
    setFirstName,
    surName,
    setSurName,
    role,
    setRole,
    email,
    setEmail,
    error,
    isSubmitting,
    handleSubmit,
  } = useSetup();

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Complete Your Setup</h2>

        <IonInput
          label="First Name"
          labelPlacement="floating"
          value={firstName}
          onIonInput={(e) => setFirstName(e.detail.value || "")}
          placeholder="Enter your first name"
        />
        <IonInput
          label="Last Name"
          labelPlacement="floating"
          value={surName}
          onIonInput={(e) => setSurName(e.detail.value || "")}
          placeholder="Enter your last name"
        />
        <IonInput
          label="Email"
          labelPlacement="floating"
          type="email"
          value={email}
          onIonInput={(e) => setEmail(e.detail.value || "")}
          placeholder="Enter your email"
        />
        <IonSelect
          value={role}
          onIonChange={(e) => setRole(e.detail.value)}
          placeholder="Select your role"
        >
          <IonSelectOption value="ContentCreator">
            Content Creator
          </IonSelectOption>
          <IonSelectOption value="Viewer">Viewer</IonSelectOption>
        </IonSelect>

        {error && <IonText color="danger">{error}</IonText>}

        <IonButton
          expand="block"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Details"}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SetupProfile;
