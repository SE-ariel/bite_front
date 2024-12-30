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
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useHistory } from "react-router";
import { useRegister } from "../logics/Register";

const SetupProfile: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState<string | null>(null);

  const {
    role,
    setRole,
    surName,
    setSurName,
    firstName,
    setFirstName,
  } = useRegister();

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) {
      setError("User not logged in.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { firstName, surName, role }, { merge: true });
      history.push("/home"); // Redirect to home after saving
    } catch (err: any) {
      setError("Failed to save details. Please try again.");
    }
  };

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
