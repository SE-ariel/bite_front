import { useAuth } from "./Auth";
import { useState } from "react";

import { setDoc, doc } from "firebase/firestore";
import { db, auth as authFirst } from "../firebaseConfig";
import { useHistory } from "react-router";
export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [role, setRole] = useState("");
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  const auth = useAuth({
    additionalUserInfo: {
      firstName: firstName.trim(),
      surName: surName.trim(),
      role,
    },
  });

  const handleRegister = () => {
    // Validate first name and surname
    if (!firstName.trim()) {
      setRegistrationError("First name is required");
      return;
    }

    if (!surName.trim()) {
      setRegistrationError("Surname is required");
      return;
    }

    // Clear any previous errors
    setRegistrationError(null);

    // Proceed with login
    auth.handleLogin();
  };
  
  const handleSubmit = async () => {
    const user = authFirst.currentUser;
    if (!user) {
      setError("User not logged in.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { firstName, surName, role }, { merge: true });
      history.push("/home"); // Redirect to home after saving
    } catch (err: any) {
      setError("Failed to save details. Please try again.");
    }
  };
  return {
    ...auth,
    firstName,
    setFirstName,
    surName,
    setSurName,
    role,
    setRole,
    error: registrationError || auth.error,
    handleRegister,
    handleSubmit,
  };
};
