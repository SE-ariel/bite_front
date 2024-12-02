import React, { useState } from "react";
import { useHistory } from "react-router-dom"; 
import {
  IonContent,
  IonPage,
  IonButton,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import InputField from "../components/InputField";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const history = useHistory(); // Initialize useHistory hook

  const handleFormSubmit = () => {
    if (!email || !password || !name || !surname || !role) {
      setError("One of your fields is empty.");
      return;
    }
    
    setError(""); // Clear error if fields are valid
    console.log("Sign Up Successful!", {
      name,
      surname,
      email,
      password,
      role,
    });
    history.push("/login"); // Navigate to the Login page after successful sign-up
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        {/* Header */}
        <div className="header-icon">
          <img src="/public/favicon2.png" alt="App Logo" />
        </div>
        {/* Main Container */}
        <div className="main-container">
          {/* Name Input */}
          <InputField
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={setName}
          />
          {/* Surname Input */}
          <InputField
            label="Surname"
            type="text"
            placeholder="Enter your surname"
            value={surname}
            onChange={setSurname}
          />
          {/* Role Selection */}
          <IonItem>
            <IonLabel>User Type</IonLabel>
            <IonSelect
              value={role}
              onIonChange={(e) => setRole(e.detail.value!)}
              placeholder="Select your role"
            >
              <IonSelectOption value="regular_user">
                Regular User
              </IonSelectOption>
              <IonSelectOption value="recipe_creator">
                Recipe Creator
              </IonSelectOption>
            </IonSelect>
          </IonItem>
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
          {/* Sign Up Button */}
          <IonButton
            color="success"
            expand="block"
            className="action-button-green"
            onClick={handleFormSubmit}
          >
            Sign Up
          </IonButton>
          {/* Footer */}
          <div className="footer">
            Already a member?{" "}
            <span onClick={() => history.push("/login")}>Login here</span>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUpPage;
