import {
  IonCard,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonTitle,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonPage,
  IonContent,
} from "@ionic/react";
import { useRegister } from "../logics/Register";

// Registration Component Example
const Register: React.FC = () => {
  const {
    role,
    setRole,
    surName,
    setSurName,
    firstName,
    setFirstName,
    email,
    setEmail,
    password,
    setPassword,
    setProvider,
    error,
    handleRegister,
  } = useRegister();

  return (
    <IonPage>
      {error && <IonTitle>{error}</IonTitle>}
      <IonContent>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>fill in your details</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonInput
            type="text"
            value={firstName}
            onIonInput={(e) => setFirstName(e.detail.value || "")}
            placeholder="First Name"
          />
          <IonInput
            type="text"
            value={surName}
            onIonInput={(e) => setSurName(e.detail.value || "")}
            placeholder="Surname"
          />
          <IonSelect value={role} onIonChange={(e) => setRole(e.detail.value)}>
            <IonSelectOption value="">Select Role</IonSelectOption>
            <IonSelectOption value="Admin">Admin</IonSelectOption>
            <IonSelectOption value="user">User</IonSelectOption>
          </IonSelect>
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>use email and password</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonInput
            type="email"
            value={email}
            onIonInput={(e) => setEmail(e.detail.value || "")}
            placeholder="Email"
          />
          <IonInput
            type="password"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value || "")}
            placeholder="Password"
          />

          {/* Email/Password Registration */}
          <IonButton onClick={handleRegister}>Register</IonButton>
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>or</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {/* Social Registration */}
          <IonButton
            onClick={() => {
              setProvider("Google");
              handleRegister();
            }}
          >
            Register with Google
          </IonButton>
          <IonButton
            onClick={() => {
              setProvider("Facebook");
              handleRegister();
            }}
          >
            Register with Facebook
          </IonButton>
        </IonCardContent>
      </IonCard>
      <IonCard>
          <IonCardHeader>
            <IonCardTitle>I already have an account</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton fill="solid" href="/login">
              login
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
export default Register;
