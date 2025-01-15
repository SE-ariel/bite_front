import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db, auth as firebaseAuth } from "../firebaseConfig";
import { useHistory } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  AuthProvider,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
export const useRegister = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [surName, setSurName] = useState<string>("");
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  const handleAuthError = (err: any) => {
    switch (err.code) {
      case "auth/user-not-found":
        setError("No user found with this email.");
        break;
      case "auth/wrong-password":
        setError("Incorrect password.");
        break;
      case "auth/account-exists-with-different-credential":
        setError(
          "This email is already registered with a different sign-in method. Please use that method."
        );
        break;
      default:
        setError(err.message || "An unexpected error occurred.");
    }
  };
  const validateInputs = (): boolean => {
    setError(null); // Reset error state before validation
    if (!firstName.trim()) {
      setError("First name is required.");
      return false;
    }
    if (!surName.trim()) {
      setError("Last name is required.");
      return false;
    }
    if (!role) {
      setError("Role is required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError("A valid email is required.");
      return false;
    }
    if (!password.trim() || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email.trim(),
        password.trim()
      );
      const user = userCredential.user;

      // Save additional user information to Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          firstName: firstName.trim(),
          surName: surName.trim(),
          role: role || "user", // Default role to "user" if not set
          email: email.trim(),
        },
        { merge: true }
      );

      console.log("User registered successfully!");
      history.push("/home"); // Redirect to home after successful registration
    } catch (err: any) {
      console.error("Error during registration:", err);
      setError(err.message || "Failed to register. Please try again.");
    }
  };

  const handleSubmit = async () => {
    setError(null); // Reset error state before submitting

    const user = firebaseAuth.currentUser;
    if (!user) {
      setError("User not logged in.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          firstName: firstName.trim(),
          surName: surName.trim(),
          role: role || "user", // Default role to "user" if not set
        },
        { merge: true }
      );

      console.log("Details saved successfully!");
      history.push("/home"); // Redirect to home after saving
    } catch (err: any) {
      console.error("Error saving details:", err);
      setError(err.message || "Failed to save details. Please try again.");
    }
  };
  const handleSocialLogin = async (authProvider: AuthProvider) => {
    setError(null);
  
    try {
      // Sign in with the selected provider
      await signInWithPopup(auth, authProvider);
  
      // Redirect to /home after successful social login
      console.log("Social login successful!");
      history.push("/home");
    } catch (err: any) {
      handleAuthError(err);
    }
  };
  
  const triggerSocialLogin = (providerType: string) => {
    let authProvider: AuthProvider;
  
    switch (providerType) {
      case "Google":
        authProvider = new GoogleAuthProvider();
        break;
      case "Facebook":
        authProvider = new FacebookAuthProvider();
        break;
      default:
        setError("Unsupported authentication provider.");
        return;
    }
  
    // Perform social login
    handleSocialLogin(authProvider);
  };
  
  return {
    firstName,
    setFirstName,
    surName,
    setSurName,
    role,
    setRole,
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleRegister,
    triggerSocialLogin,
    handleSubmit,
  };
};
