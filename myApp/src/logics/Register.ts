import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db, auth as firebaseAuth } from "../firebaseConfig";
import { useHistory } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useRegister = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [surName, setSurName] = useState<string>("");
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

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
    handleSubmit,
  };
};
