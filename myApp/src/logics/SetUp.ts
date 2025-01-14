import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db, auth as firebaseAuth } from "../firebaseConfig";
import { useHistory } from "react-router";

export const useSetup = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [surName, setSurName] = useState<string>("");
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    if (!email.trim()) {
      setError("Email is required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Invalid email format.");
      return false;
    }
    if (!role) {
      setError("Role is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    setIsSubmitting(true);
    const user = firebaseAuth.currentUser;

    if (!user) {
      setError("User not logged in.");
      setIsSubmitting(false);
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
          email: email.trim(),
        },
        { merge: true }
      );

      console.log("Details saved successfully!");
      history.push("/home"); // Redirect to home after saving
    } catch (err: any) {
      console.error("Error saving details:", err);
      setError("Failed to save details. Please try again.");
    } finally {
      setIsSubmitting(false);
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
    error,
    isSubmitting,
    handleSubmit,
  };
};
