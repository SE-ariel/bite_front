import { useLogin } from "../logics/LoginLogout";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import "./Login.css";
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
  IonIcon,
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
      <IonContent className="ion-padding" style={{ textAlign: "center" }}>
        {/* Header */}
        <div className="header-icon">
          <img src="/public/favicon2.png" alt="App Logo" />
        </div>
        <div className="main-container">
          <IonInput
            label="Email"
            labelPlacement="floating"
            type="email"
            value={email}
            onIonInput={(e) => setEmail(e.detail.value || "")}
            placeholder="Enter your email"
          />
          <IonInput
            label="Password"
            labelPlacement="floating"
            type="password"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value || "")}
            placeholder="Enter your password"
          />
          {error && (
            <p style={{ color: "red", marginTop: "10px", textAlign: "left" }}>
              {error}
            </p>
          )}
          <IonButton expand="block" onClick={handleLogin}>
            Login
          </IonButton>
          <div className="divider">Or login with</div>
          <div className="social-buttons">
          <IonButton
            className="social-button google-button"
            onClick={() => {
              setProvider("Google");
              handleLogin();
            }}
          >
            <IonIcon slot="icon-only" icon={logoGoogle} />
          </IonButton>
          <IonButton
            className="social-button facebook-button"
            onClick={() => {
              setProvider("Facebook");
              handleLogin();
            }}
          >
            <IonIcon slot="icon-only" icon={logoFacebook} />
          </IonButton>
        </div>
        <div className="footer" style={{ marginTop: "20px" }}>
          Not a member?{" "}
        <a
          href="/register"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Sign up
        </a>
        </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
