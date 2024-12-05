import {
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonPage,
  IonContent,
  IonIcon,
  IonText,
} from "@ionic/react";
import { useRegister } from "../logics/Register";
import "./Register.css"; // Reuse or customize the CSS for Register
import { logoGoogle, logoFacebook } from "ionicons/icons";

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
      <IonContent className="ion-padding">
        {/* Header */}
        <div className="header-icon">
          <img src="/public/favicon2.png" alt="App Logo" />
        </div>
        {/* Main Container */}
        <div className="main-container">
          {/* Personal Details Section */}
          <div className="card-container">
            <h3>Fill in your details</h3>
            <IonInput
              label="First Name"
              type="text"
              value={firstName}
              onIonInput={(e) => setFirstName(e.detail.value || "")}
              labelPlacement="floating"
              placeholder="Enter your first name"
            />
            <IonInput
              label="Surname"
              type="text"
              value={surName}
              onIonInput={(e) => setSurName(e.detail.value || "")}
              labelPlacement="floating"
              placeholder="Enter your surname"
            />
            <IonSelect
              value={role}
              onIonChange={(e) => setRole(e.detail.value)}
              placeholder="Select your role"
            >
              <IonSelectOption value="Admin">Admin</IonSelectOption>
              <IonSelectOption value="User">User</IonSelectOption>
            </IonSelect>
          </div>
          {/* Email and Password Section */}
          <div className="card-container">
            <h3>Use email and password</h3>
            <IonInput
              label="Email"
              type="email"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value || "")}
              labelPlacement="floating"
              placeholder="Enter your email"
            />
            <IonInput
              label="Password"
              type="password"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value || "")}
              labelPlacement="floating"
              placeholder="Enter your password"
            />
            {error && <IonText color="danger">{error}</IonText>}
            <IonButton expand="block" onClick={handleRegister}>
              Register with Email
            </IonButton>
          </div>
          {/* Social Buttons Section */}
          <div className="card-container">
            <h3>Or sign up with</h3>
            <div className="social-buttons">
              <IonButton
                size="large"
                className="social-button google-button"
                onClick={() => {
                  setProvider("Google");
                  handleRegister();
                }}
              >
                <IonIcon size="large" slot="icon-only" icon={logoGoogle} />
              </IonButton>
              <IonButton
                size="large"
                className="social-button facebook-button"
                onClick={() => {
                  setProvider("Facebook");
                  handleRegister();
                }}
              >
                <IonIcon size="large" slot="icon-only" icon={logoFacebook} />
              </IonButton>
            </div>
          </div>
          {/* Footer Section */}
          <div className="footer">
            Already have an account?{" "}
            <a className="login" href="/login">
              Login
            </a>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
