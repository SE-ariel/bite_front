import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from "@ionic/react";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import "./login.css"; // Import the CSS file
import InputField from "../components/InputField";
const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState("");
  const handleFormSubmit = () => {
    if (!email || !password) {
      setError("Email and password cannot be empty.");
      return;
    }
    const isValidEmail = email === "test@example.com"; // Replace with your validation logic
    const isValidPassword = password === "mypassword"; // Replace with your validation logic

    if (!isValidEmail || !isValidPassword) {
      setError("  Email or password is incorrect.");
      return;
    }
    setError(""); // Clear the error if credentials are correct
    if (isSignUp) {
      console.log("Sign Up", { name, surname, role, email, password });
    } else {
      console.log("Login", { email, password });
    }
  };
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp); // Toggle between Sign Up and Login
    setEmail(""); // Clear email field
    setPassword(""); // Clear password field
    setError(""); // Clear error messages
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
          {/* Sign Up Fields */}
          {isSignUp && (
            <>
              <InputField
                label="Name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={setName}
              />
              <InputField
                label="Surname"
                type="text"
                placeholder="Enter your surname"
                value={surname}
                onChange={setSurname}
              />
            </>
          )}
           {/* Role Selection */}
           {isSignUp && (
            <IonItem>
              <IonLabel>User Type</IonLabel>
              <IonSelect
                value={role}
                onIonChange={(e) => setRole(e.detail.value!)}
              >
                <IonSelectOption value="regular_user">
                  Regular User
                </IonSelectOption>
                <IonSelectOption value="recipe_creator">
                  Recipe Creator
                </IonSelectOption>
              </IonSelect>
            </IonItem>
          )}
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
         
          {/* Action Button */}
          <IonButton
            expand="block"
            className={`action-button ${isSignUp ? "signup-button" : ""}`}
            onClick={handleFormSubmit}
          >
            {isSignUp ? "Sign Up" : "Login"}
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
          <div className="footer">
            {isSignUp ? (
              <>
                Already a member?{" "}
                <span onClick={() => setIsSignUp(false)}>Login here</span>
              </>
            ) : (
              <>
                Not a member?{" "}
                <span
                  onClick={toggleSignUp}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  Sign up now
                </span>
              </>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
