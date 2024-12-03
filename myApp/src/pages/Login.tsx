import { useHistory } from "react-router-dom"; // Import useHistory from React Router v5
import { IonContent, IonPage, IonButton, IonIcon } from "@ionic/react";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import InputField from "../components/InputField"; // Ensure this path matches your file structure
import "./login.css";
import { useLogin } from "../logics/LoginLogout";
const LoginPage = () => {
  const history = useHistory();
  const { email, setEmail, password, setPassword, error, handleLogin } =
    useLogin();

  return (
    <IonPage>
      <IonContent className="ion-padding" style={{ textAlign: "center" }}>
        {/* Header */}
        <div className="header-icon">
          <img src="/public/favicon2.png" alt="App Logo" />
        </div>

        {/* Main Container */}
        <div className="main-container">
          {/* Email Input */}
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
          />

          {/* Password Input */}
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
          />

          {/* Error Message */}
          {error && (
            <p style={{ color: "red", marginTop: "10px", textAlign: "left" }}>
              {error}
            </p>
          )}

          {/* Login Button */}
          <IonButton expand="block" onClick={handleLogin}>
            Login
          </IonButton>

          {/* Divider */}
          <div className="divider">Or login with</div>
          {/* Social Buttons */}
          <div className="social-buttons">
            {/* Facebook Login */}
            <IonButton
              className="social-button facebook-button"
              onClick={handleLogin}
            >
              <IonIcon slot="icon-only" icon={logoFacebook} />
            </IonButton>
            {/* Google Login */}
            <IonButton
              className="social-button google-button"
              onClick={handleLogin}
            >
              <IonIcon slot="icon-only" icon={logoGoogle} />
            </IonButton>
          </div>
          {/* Footer */}
          <div className="footer" style={{ marginTop: "20px" }}>
            Not a member?{" "}
            <span
              onClick={() => history.push("/signup")} // Navigate to Sign-Up page
              style={{ color: "blue", cursor: "pointer" }}
            >
              Sign up now
            </span>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
