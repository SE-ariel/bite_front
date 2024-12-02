import { useLogin } from "../logics/LoginLogout";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonInput,
  IonPage,
  IonTitle,
} from "@ionic/react";

// Login Component Example
const Login: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    setProvider,
    error,
    handleLogin,
  } = useLogin();

  return (
    <IonPage>
      {error && <IonTitle>{error}</IonTitle>}
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>use email and password to login</IonCardTitle>
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
            <IonButton onClick={handleLogin} fill="solid">
              Login
            </IonButton>
          </IonCardContent>
        </IonCard>{" "}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>or</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton
              fill="solid"
              onClick={() => {
                setProvider("Google");
                handleLogin();
              }}
            >
              Login with Google
            </IonButton>
            <IonButton
              fill="solid"
              onClick={() => {
                setProvider("Facebook");
                handleLogin();
              }}
            >
              Login with Facebook
            </IonButton>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>don't you have an account?</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton fill="solid" href="/register">
              sign up
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
