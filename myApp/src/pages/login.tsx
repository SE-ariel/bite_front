import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory from React Router v5
import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import InputField from "../components/InputField"; // Ensure this path matches your file structure
import "./login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory(); // Initialize useHistory hook

  const handleFormSubmit = () => {
    if (!email || !password) {
      setError("One of your fields is empty.");
      return;
    }

    const isValidEmail = email === "test@example.com"; // Replace with actual validation logic
    const isValidPassword = password === "mypassword"; // Replace with actual validation logic

    if (!isValidEmail || !isValidPassword) {
      setError("Email or password is incorrect.");
      return;
    }

    setError(""); // Clear the error if credentials are valid
    console.log("Login successful!");
    history.push("/home"); // Navigate to the Home page after successful login
  };

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
          <IonButton expand="block" onClick={handleFormSubmit}>
            Login
          </IonButton>
          {/* Divider */}
          <div className="divider">Or login with</div>
          {/* Social Buttons */}
          <div className="social-buttons">
            <IonButton className="social-button facebook-button">
              <IonIcon slot="icon-only" icon={logoFacebook} />
            </IonButton>
            <IonButton className="social-button google-button">
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
