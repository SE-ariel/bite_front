import { useLogin } from "../logics/LoginLogout";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import "./Login.css";
import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonIcon,
  IonText,
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
      <IonContent className="ion-padding">
        {/* Header */}
        <div className="header-icon">
          <img src="../favicon2.png" alt="App Logo" />
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
          {error && <IonText color="danger">{error}</IonText>}
          <IonButton expand="block" onClick={handleLogin}>
            Login
          </IonButton>
          <div className="divider">Or login with</div>
          <div className="social-buttons">
            <IonButton
              size="large"
              className="social-button google-button"
              onClick={() => {
                setProvider("Google");
                handleLogin();
              }}
            >
              <IonIcon size="large" slot="icon-only" icon={logoGoogle} />
            </IonButton>
            <IonButton
              size="large"
              className="social-button facebook-button"
              onClick={() => {
                setProvider("Facebook");
                handleLogin();
              }}
            >
              <IonIcon size="large" slot="icon-only" icon={logoFacebook} />
            </IonButton>
          </div>
          <div className="footer">
            Not a member?{" "}
            <a className = "register"
              href="/register"
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
